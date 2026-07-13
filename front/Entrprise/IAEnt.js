import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import { useCompanyTheme } from '../context/EnterpriseThemeContext';

// ---- Data ----

const SUGGESTIONS = [
  { icon: 'groups', label: 'Suggérer des candidats' },
  { icon: 'edit-note', label: 'Améliorer une offre' },
  { icon: 'find-in-page', label: 'Analyser un CV' },
];

const CANDIDATE_RESULTS = [
  {
    name: 'Mohamed K.',
    match: 98,
    role: 'Senior React & Node.js • 8 ans exp.',
    tags: ['TypeScript', 'AWS'],
  },
  {
    name: 'Sarra B.',
    match: 94,
    role: 'Fullstack Python/Vue • 6 ans exp.',
    tags: ['Django', 'Postgres'],
  },
];

// ---- Sub-components ----

function SuggestionChip({ icon, label, onPress, colors, styles }) {
  return (
    <TouchableOpacity style={styles.chip} activeOpacity={0.7} onPress={onPress}>
      <MaterialIcons name={icon} size={16} color={colors.onSurfaceVariant} />
      <Text style={styles.chipText}>{label}</Text>
    </TouchableOpacity>
  );
}

function AiAvatar({ colors, styles }) {
  return (
    <View style={styles.aiAvatar}>
      <MaterialIcons name="psychology" size={20} color={colors.white} />
    </View>
  );
}

function AiBubble({ children, timestamp, colors, styles }) {
  return (
    <View style={styles.messageRow}>
      <AiAvatar colors={colors} styles={styles} />
      <View style={styles.messageColumn}>
        <View style={styles.aiBubble}>{children}</View>
        {timestamp ? <Text style={styles.timestamp}>{timestamp}</Text> : null}
      </View>
    </View>
  );
}

function UserBubble({ text, timestamp, colors, styles }) {
  return (
    <View style={[styles.messageRow, styles.messageRowUser]}>
      <View style={styles.userAvatar}>
        <MaterialIcons name="person" size={18} color={colors.onSecondaryContainer} />
      </View>
      <View style={[styles.messageColumn, styles.messageColumnUser]}>
        <View style={styles.userBubble}>
          <Text style={styles.userBubbleText}>{text}</Text>
        </View>
        {timestamp ? <Text style={[styles.timestamp, styles.timestampUser]}>{timestamp}</Text> : null}
      </View>
    </View>
  );
}

function CandidateResultCard({ candidate, onPress, styles }) {
  return (
    <TouchableOpacity style={styles.candidateCard} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.candidateHeaderRow}>
        <Text style={styles.candidateName}>{candidate.name}</Text>
        <View style={styles.matchPill}>
          <Text style={styles.matchPillText}>MATCH {candidate.match}%</Text>
        </View>
      </View>
      <Text style={styles.candidateRole}>{candidate.role}</Text>
      <View style={styles.tagRow}>
        {candidate.tags.map((tag) => (
          <View key={tag} style={styles.tagChip}>
            <Text style={styles.tagChipText}>{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

function AttachmentChip({ file, onRemove, colors, styles }) {
  const isImage = file.mimeType?.startsWith('image/');
  const isVoice = file.isVoice;
  const icon = isVoice ? 'graphic-eq' : isImage ? 'image' : 'insert-drive-file';
  return (
    <View style={styles.attachmentChip}>
      <MaterialIcons name={icon} size={16} color={colors.onSurfaceVariant} />
      <Text style={styles.attachmentChipText} numberOfLines={1}>
        {file.name}
      </Text>
      <TouchableOpacity onPress={() => onRemove(file.id)} hitSlop={8}>
        <MaterialIcons name="close" size={14} color={colors.onSurfaceVariant} />
      </TouchableOpacity>
    </View>
  );
}

// ---- Main screen ----

export default function AIAssistant() {
  const { colors } = useCompanyTheme();
  const styles = getStyles(colors);
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);

  const handleSuggestionPress = (label) => {
    if (label === 'Suggérer des candidats') {
      setMessage('Quels sont les meilleurs candidats pour le poste de Product Manager ?');
    }
  };

  const handleAttachPress = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const picked = (result.assets || []).map((asset) => ({
        id: `${asset.uri}-${asset.name}-${Date.now()}-${Math.random()}`,
        name: asset.name,
        uri: asset.uri,
        size: asset.size,
        mimeType: asset.mimeType,
      }));

      setAttachments((prev) => [...prev, ...picked]);
    } catch (error) {
      Alert.alert(
        'Erreur',
        "Impossible d'ajouter le fichier. Veuillez réessayer."
      );
    }
  };

  const handleRemoveAttachment = (id) => {
    setAttachments((prev) => prev.filter((file) => file.id !== id));
  };

  const handleMicPress = async () => {
    // Currently recording -> stop, save, and attach the voice note.
    if (isRecording) {
      try {
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
        const uri = recording.getURI();
        const timeLabel = new Date().toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        });
        setAttachments((prev) => [
          ...prev,
          {
            id: `voice-${Date.now()}`,
            name: `Message vocal • ${timeLabel}`,
            uri,
            mimeType: 'audio/m4a',
            isVoice: true,
          },
        ]);
      } catch (error) {
        Alert.alert('Erreur', "Impossible d'enregistrer le message vocal.");
      } finally {
        setRecording(null);
        setIsRecording(false);
      }
      return;
    }

    // Not recording yet -> request permission and start.
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Micro non autorisé',
          "Merci d'activer l'accès au micro dans les réglages pour enregistrer un message vocal."
        );
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      Alert.alert('Erreur', "Impossible de démarrer l'enregistrement.");
    }
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Recruitment Assistant</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Suggestion chips */}
        <View style={styles.chipRow}>
          {SUGGESTIONS.map((s) => (
            <SuggestionChip
              key={s.label}
              icon={s.icon}
              label={s.label}
              onPress={() => handleSuggestionPress(s.label)}
              colors={colors}
              styles={styles}
            />
          ))}
        </View>

        {/* AI greeting */}
        <AiBubble timestamp="AI Assistant • 09:41 AM" colors={colors} styles={styles}>
          <Text style={styles.messageText}>
            Bonjour ! Je suis votre assistant RecruitHub. Je peux vous aider à identifier les
            meilleurs talents tunisiens ou à optimiser vos processus de recrutement. Que
            souhaitez-vous faire aujourd'hui ?
          </Text>
        </AiBubble>

        {/* User message */}
        <UserBubble
          text="Peux-tu analyser les profils de développeurs Fullstack à Tunis disponibles pour un poste Senior ?"
          timestamp="Vous • 09:42 AM"
          colors={colors}
          styles={styles}
        />

        {/* AI response with candidate results */}
        <AiBubble colors={colors} styles={styles}>
          <Text style={[styles.messageText, styles.messageTextSpaced]}>
            J'ai trouvé 3 profils exceptionnels correspondant à vos critères à Tunis. Voici un
            résumé de leurs compétences clés :
          </Text>
          <View style={styles.candidateList}>
            {CANDIDATE_RESULTS.map((candidate) => (
              <CandidateResultCard key={candidate.name} candidate={candidate} styles={styles} />
            ))}
          </View>
        </AiBubble>
      </ScrollView>

      {/* Recording indicator */}
      {isRecording && (
        <View style={styles.recordingRow}>
          <View style={styles.recordingDot} />
          <Text style={styles.recordingText}>Enregistrement en cours…</Text>
        </View>
      )}

      {/* Attachment previews */}
      {attachments.length > 0 && (
        <View style={styles.attachmentsRow}>
          {attachments.map((file) => (
            <AttachmentChip
              key={file.id}
              file={file}
              onRemove={handleRemoveAttachment}
              colors={colors}
              styles={styles}
            />
          ))}
        </View>
      )}

      {/* Input bar */}
      <View style={styles.inputBarWrapper}>
        <TouchableOpacity style={styles.attachButton} activeOpacity={0.7} onPress={handleAttachPress}>
          <MaterialIcons name="attach-file" size={20} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Posez une question sur vos recrutements..."
          placeholderTextColor={colors.outline}
          multiline
          underlineColorAndroid="transparent"
          selectionColor={colors.primary}
        />
        <TouchableOpacity
          style={[styles.micButton, isRecording && styles.micButtonActive]}
          activeOpacity={0.7}
          onPress={handleMicPress}
        >
          <MaterialIcons
            name={isRecording ? 'stop' : 'mic'}
            size={20}
            color={isRecording ? colors.white : colors.onSurfaceVariant}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} activeOpacity={0.85}>
          <MaterialIcons name="send" size={18} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 20,
  },

  // Suggestion chips
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 999,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },

  // Message layout
  messageRow: {
    flexDirection: 'row',
    gap: 12,
    maxWidth: '90%',
  },
  messageRowUser: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  messageColumn: {
    gap: 6,
    flexShrink: 1,
  },
  messageColumnUser: {
    alignItems: 'flex-end',
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiBubble: {
    padding: 14,
    backgroundColor: colors.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 16,
    borderTopLeftRadius: 4,
  },
  userBubble: {
    padding: 14,
    backgroundColor: colors.primary,
    borderRadius: 16,
    borderTopRightRadius: 4,
  },
  userBubbleText: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.white,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.onSurface,
  },
  messageTextSpaced: {
    marginBottom: 12,
  },
  timestamp: {
    fontSize: 10,
    color: colors.outline,
    marginLeft: 4,
  },
  timestampUser: {
    marginLeft: 0,
    marginRight: 4,
  },

  // Candidate result cards
  candidateList: {
    gap: 10,
  },
  candidateCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 14,
  },
  candidateHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  candidateName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  matchPill: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  matchPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSecondaryContainer,
  },
  candidateRole: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginBottom: 10,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagChip: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  tagChipText: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },

  // Attachment previews (shown above the input bar)
  attachmentsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  attachmentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    maxWidth: 180,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  attachmentChipText: {
    flexShrink: 1,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },

  // Voice recording indicator
  recordingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error ?? '#ba1a1a',
  },
  recordingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.error ?? '#ba1a1a',
  },

  // Input bar
  inputBarWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 20,
    margin: 16,
    marginBottom: 8,
    padding: 8,
  },
  attachButton: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: colors.onSurface,
    paddingHorizontal: 4,
    paddingVertical: 8,
    maxHeight: 100,
    // These four properties remove the default black focus
    // rectangle that browsers draw on <input>/<textarea> elements
    // when running through React Native Web. They're simply ignored
    // on native iOS/Android, so it's safe to keep them everywhere.
    outlineStyle: 'none',
    outlineWidth: 0,
    outlineColor: 'transparent',
    boxShadow: 'none',
  },
  micButton: {
    padding: 8,
    borderRadius: 12,
  },
  micButtonActive: {
    backgroundColor: colors.error ?? '#ba1a1a',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});