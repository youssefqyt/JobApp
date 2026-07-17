import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';
import BottomNavBar from './component/Navbar';
import { useCandidateTheme } from '../context/CandidateThemeContext';

// ---- Static conversation seed, matching the mockup ----
const INITIAL_MESSAGES = [
  {
    id: '1',
    from: 'bot',
    type: 'text',
    text: 'Bonjour Ahmed ! Je suis Amira, votre assistant carrière. Comment puis-je vous aider aujourd\'hui ?',
    time: '09:12',
  },
  {
    id: '2',
    from: 'user',
    type: 'text',
    text: 'Comment améliorer mon CV pour postuler à des postes DevOps ?',
    time: '09:14',
  },
  {
    id: '3',
    from: 'bot',
    type: 'checklist',
    intro: 'Votre profil Full Stack est une excellente base ! Pour les postes DevOps, je recommande :',
    items: [
      'Ajouter Docker & Kubernetes',
      'Mentionner vos pipelines CI/CD',
      'Obtenir la certification AWS',
    ],
    ctaLabel: 'Générer le CV DevOps',
    time: '09:15',
  },
];

function BotTextBubble({ text, time, styles }) {
  return (
    <View style={styles.botMessageWrap}>
      <View style={styles.botBubble}>
        <Text style={styles.bodyText}>{text}</Text>
      </View>
      <Text style={styles.timeTextLeft}>{time}</Text>
    </View>
  );
}

function UserBubble({ text, time, styles }) {
  return (
    <View style={styles.userMessageWrap}>
      <View style={styles.userBubble}>
        <Text style={styles.userBodyText}>{text}</Text>
      </View>
      <Text style={styles.timeTextRight}>{time}</Text>
    </View>
  );
}

function BotChecklistBubble({ intro, items, ctaLabel, time, onCtaPress, styles, colors }) {
  return (
    <View style={styles.botMessageWrap}>
      <View style={styles.botBubble}>
        <Text style={[styles.bodyText, styles.checklistIntro]}>{intro}</Text>
        {items.map((item, i) => (
          <View key={i} style={styles.checklistItem}>
            <MaterialIcons name="check-circle" size={18} color={colors.primary} />
            <Text style={styles.checklistText}>{item}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.ctaButton} onPress={onCtaPress}>
          <MaterialIcons name="auto-awesome" size={18} color={colors.white} />
          <Text style={styles.ctaButtonText}>{ctaLabel}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.timeTextLeft}>{time}</Text>
    </View>
  );
}

function QuickReplyChip({ label, onPress, styles }) {
  return (
    <View style={styles.quickReplyRow}>
      <TouchableOpacity style={styles.quickReplyChip} onPress={onPress}>
        <Text style={styles.quickReplyText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

function FileBubble({ name, time, styles, colors }) {
  return (
    <View style={styles.userMessageWrap}>
      <View style={[styles.userBubble, styles.fileBubble]}>
        <MaterialIcons name="insert-drive-file" size={20} color={colors.white} />
        <Text style={styles.userBodyText} numberOfLines={1}>
          {name}
        </Text>
      </View>
      <Text style={styles.timeTextRight}>{time}</Text>
    </View>
  );
}

function AttachmentChip({ file, onRemove, colors, styles }) {
  const isImage = file.mimeType?.startsWith('image/');
  return (
    <View style={styles.attachmentChip}>
      <MaterialIcons
        name={isImage ? 'image' : 'insert-drive-file'}
        size={16}
        color={colors.onSurfaceVariant}
      />
      <Text style={styles.attachmentChipText} numberOfLines={1}>
        {file.name}
      </Text>
      <TouchableOpacity onPress={() => onRemove(file.id)} hitSlop={8}>
        <MaterialIcons name="close" size={14} color={colors.onSurfaceVariant} />
      </TouchableOpacity>
    </View>
  );
}

export default function IA({ activeTab, onTabChange }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [showQuickReply, setShowQuickReply] = useState(true);
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef(null);
  // Tracks the input value at the moment recognition started, so live
  // partial transcripts don't wipe out text the user had already typed.
  const baseInputRef = useRef('');

  const currentTime = () =>
    new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  const appendMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  };

  // ---- Voice input (speech-to-text) ----
  useSpeechRecognitionEvent('start', () => setIsListening(true));

  useSpeechRecognitionEvent('end', () => setIsListening(false));

  useSpeechRecognitionEvent('result', (event) => {
    const transcript = event.results?.[0]?.transcript ?? '';
    const base = baseInputRef.current;
    setInput(base ? `${base} ${transcript}` : transcript);
  });

  useSpeechRecognitionEvent('error', (event) => {
    setIsListening(false);
    if (event.error === 'no-speech') return; // silence timeout, no need to alert
    Alert.alert(
      'Erreur',
      "La reconnaissance vocale a échoué. Veuillez réessayer."
    );
  });

  const handleMicPress = async () => {
    if (isListening) {
      ExpoSpeechRecognitionModule.stop();
      return;
    }

    try {
      const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Micro requis',
          "Veuillez autoriser l'accès au micro dans les réglages pour utiliser la saisie vocale."
        );
        return;
      }

      baseInputRef.current = input.trim();
      ExpoSpeechRecognitionModule.start({
        lang: 'fr-FR',
        interimResults: true,
        continuous: false,
        maxAlternatives: 1,
      });
    } catch (error) {
      Alert.alert(
        'Erreur',
        "Impossible de démarrer la saisie vocale. Veuillez réessayer."
      );
    }
  };

  const handleSend = () => {
    if (isListening) {
      ExpoSpeechRecognitionModule.stop();
    }

    const hasText = input.trim().length > 0;
    const hasAttachments = attachments.length > 0;
    if (!hasText && !hasAttachments) return;

    if (hasAttachments) {
      attachments.forEach((file) => {
        appendMessage({
          id: `${Date.now()}-${file.id}`,
          from: 'user',
          type: 'file',
          text: file.name,
          time: currentTime(),
        });
      });
      setAttachments([]);
    }

    if (hasText) {
      appendMessage({
        id: Date.now().toString(),
        from: 'user',
        type: 'text',
        text: input.trim(),
        time: currentTime(),
      });
      setInput('');
    }
    // TODO: call your assistant API here (with text and/or file uris) and append the bot's reply
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

  const handleQuickReply = () => {
    setShowQuickReply(false);
    appendMessage({
      id: Date.now().toString(),
      from: 'user',
      type: 'text',
      text: 'Oui, génère une version améliorée',
      time: currentTime(),
    });
  };

  const handleGenerateCv = () => {
    // TODO: trigger CV generation flow
    console.log('Generate DevOps CV pressed');
  };

  return (
    <View style={styles.root}>
      {/* */}
      <KeyboardAvoidingView
        style={styles.keyboardArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Chat */}
        <ScrollView
          ref={scrollRef}
          style={styles.chat}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          <Text style={styles.pageTitle}>Assistant IA</Text>

          {messages.map((msg) => {
            if (msg.type === 'checklist') {
              return (
                <BotChecklistBubble
                  key={msg.id}
                  intro={msg.intro}
                  items={msg.items}
                  ctaLabel={msg.ctaLabel}
                  time={msg.time}
                  onCtaPress={handleGenerateCv}
                  styles={styles}
                  colors={colors}
                />
              );
            }
            if (msg.type === 'file') {
              return (
                <FileBubble
                  key={msg.id}
                  name={msg.text}
                  time={msg.time}
                  styles={styles}
                  colors={colors}
                />
              );
            }
            return msg.from === 'bot' ? (
              <BotTextBubble key={msg.id} text={msg.text} time={msg.time} styles={styles} />
            ) : (
              <UserBubble key={msg.id} text={msg.text} time={msg.time} styles={styles} />
            );
          })}

          {showQuickReply && (
            <QuickReplyChip
              label="Oui, génère une version améliorée"
              onPress={handleQuickReply}
              styles={styles}
            />
          )}
        </ScrollView>

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

        {/* Listening indicator */}
        {isListening && (
          <View style={styles.listeningRow}>
            <View style={styles.listeningDot} />
            <Text style={styles.listeningText}>À l'écoute... parlez maintenant</Text>
          </View>
        )}

        {/* Input dock */}
        <View style={styles.inputDock}>
          <TouchableOpacity style={styles.attachButton} onPress={handleAttachPress}>
            <MaterialIcons name="attach-file" size={22} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder={isListening ? 'Parlez maintenant...' : 'Posez votre question...'}
            placeholderTextColor={colors.onSurfaceVariant}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            returnKeyType="send"
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            style={[styles.micButton, isListening && styles.micButtonActive]}
            onPress={handleMicPress}
          >
            <MaterialIcons
              name={isListening ? 'mic' : 'mic-none'}
              size={22}
              color={isListening ? colors.white : colors.onSurfaceVariant}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <MaterialIcons name="send" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Bottom nav - fixed, outside the keyboard-avoiding area */}
      <BottomNavBar initialTab={activeTab || 'IA'} onTabChange={onTabChange} />
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 16,
  },
  keyboardArea: {
    flex: 1,
  },
  chat: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 20,
  },

  // Bot bubble
  botMessageWrap: {
    maxWidth: '85%',
    alignSelf: 'flex-start',
  },
  botBubble: {
    backgroundColor: colors.surfaceContainerHighest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: 16,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.onSurface,
  },
  timeTextLeft: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 4,
    marginLeft: 4,
  },

  // User bubble
  userMessageWrap: {
    maxWidth: '85%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  userBubble: {
    backgroundColor: colors.primary,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
  },
  userBodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.white,
  },
  timeTextRight: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 4,
    marginRight: 4,
  },

  // File message bubble (sent attachment)
  fileBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    maxWidth: 220,
  },

  // Checklist
  checklistIntro: {
    marginBottom: 12,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  checklistText: {
    fontSize: 15,
    color: colors.onSurface,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primaryContainer,
    height: 48,
    borderRadius: 12,
    marginTop: 4,
  },
  ctaButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },

  // Quick reply
  quickReplyRow: {
    alignItems: 'flex-end',
  },
  quickReplyChip: {
    backgroundColor: colors.primaryContainer,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  quickReplyText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },

  // Attachment previews (shown above the input dock)
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
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  attachmentChipText: {
    flexShrink: 1,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },

  // Listening indicator (shown above input dock while recording)
  listeningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  listeningDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  listeningText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },

  // Input dock
  inputDock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 6,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 18,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButtonActive: {
    backgroundColor: '#ef4444',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.onSurface,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    outlineStyle: 'none',
    outlineWidth: 0,
    outlineColor: 'transparent',
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