import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import BottomNavBarEntreprise from './componentEnt/NavbarEntreprise';

// ---- Colors (from your Tailwind theme) ----
const COLORS = {
  primary: '#006c49',
  onPrimary: '#ffffff',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  onSecondaryContainer: '#306d58',
  secondaryContainer: '#adedd3',
  surface: '#f8f9fa',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainerHigh: '#e7e8e9',
  surfaceContainerLowest: '#ffffff',
  outline: '#6c7a71',
  outlineVariant: '#bbcabf',
  white: '#ffffff',
};

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

function SuggestionChip({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.chip} activeOpacity={0.7} onPress={onPress}>
      <MaterialIcons name={icon} size={16} color={COLORS.onSurfaceVariant} />
      <Text style={styles.chipText}>{label}</Text>
    </TouchableOpacity>
  );
}

function AiAvatar() {
  return (
    <View style={styles.aiAvatar}>
      <MaterialIcons name="psychology" size={20} color={COLORS.white} />
    </View>
  );
}

function AiBubble({ children, timestamp }) {
  return (
    <View style={styles.messageRow}>
      <AiAvatar />
      <View style={styles.messageColumn}>
        <View style={styles.aiBubble}>{children}</View>
        {timestamp ? <Text style={styles.timestamp}>{timestamp}</Text> : null}
      </View>
    </View>
  );
}

function UserBubble({ text, timestamp }) {
  return (
    <View style={[styles.messageRow, styles.messageRowUser]}>
      <View style={styles.userAvatar}>
        <MaterialIcons name="person" size={18} color={COLORS.onSecondaryContainer} />
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

function CandidateResultCard({ candidate, onPress }) {
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

// ---- Main screen ----

export default function AIAssistant() {
  const [message, setMessage] = useState('');

  const handleSuggestionPress = (label) => {
    if (label === 'Suggérer des candidats') {
      setMessage('Quels sont les meilleurs candidats pour le poste de Product Manager ?');
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
            />
          ))}
        </View>

        {/* AI greeting */}
        <AiBubble timestamp="AI Assistant • 09:41 AM">
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
        />

        {/* AI response with candidate results */}
        <AiBubble>
          <Text style={[styles.messageText, styles.messageTextSpaced]}>
            J'ai trouvé 3 profils exceptionnels correspondant à vos critères à Tunis. Voici un
            résumé de leurs compétences clés :
          </Text>
          <View style={styles.candidateList}>
            {CANDIDATE_RESULTS.map((candidate) => (
              <CandidateResultCard key={candidate.name} candidate={candidate} />
            ))}
          </View>
        </AiBubble>
      </ScrollView>

      {/* Input bar */}
      <View style={styles.inputBarWrapper}>
        <TouchableOpacity style={styles.attachButton} activeOpacity={0.7}>
          <MaterialIcons name="attach-file" size={20} color={COLORS.onSurfaceVariant} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Posez une question sur vos recrutements..."
          placeholderTextColor={COLORS.outline}
          multiline
        />
        <TouchableOpacity style={styles.micButton} activeOpacity={0.7}>
          <MaterialIcons name="mic" size={20} color={COLORS.onSurfaceVariant} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} activeOpacity={0.85}>
          <MaterialIcons name="send" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Same Entreprise bottom nav (Offres tab instead of Formation) */}
      <BottomNavBarEntreprise initialTab="IA" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surface,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
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
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 999,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
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
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiBubble: {
    padding: 14,
    backgroundColor: COLORS.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 16,
    borderTopLeftRadius: 4,
  },
  userBubble: {
    padding: 14,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    borderTopRightRadius: 4,
  },
  userBubbleText: {
    fontSize: 15,
    lineHeight: 21,
    color: COLORS.white,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 21,
    color: COLORS.onSurface,
  },
  messageTextSpaced: {
    marginBottom: 12,
  },
  timestamp: {
    fontSize: 10,
    color: COLORS.outline,
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
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
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
    color: COLORS.onSurface,
  },
  matchPill: {
    backgroundColor: COLORS.secondaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  matchPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.onSecondaryContainer,
  },
  candidateRole: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
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
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  tagChipText: {
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
  },

  // Input bar
  inputBarWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
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
    color: COLORS.onSurface,
    paddingHorizontal: 4,
    paddingVertical: 8,
    maxHeight: 100,
  },
  micButton: {
    padding: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});