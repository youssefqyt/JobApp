import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const COLORS = {
  primary: '#006c49',
  onPrimary: '#ffffff',
  surface: '#f8f9fa',
  surfaceContainer: '#edeeef',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainerHigh: '#e7e8e9',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  outlineVariant: '#bbcabf',
  hintBg: 'rgba(209, 250, 229, 0.3)',
  hintBorder: '#d1fae5',
  hintText: '#064e3b',
};

const TOTAL_QUESTIONS = 5;
const CURRENT_QUESTION = 3;

export default function SimulationScreen() {
  const [answer, setAnswer] = useState('');
  const [focused, setFocused] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);

  const toggleHint = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setHintOpen((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Préparation & Simulation</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Card */}
        <View style={styles.card}>
          <View style={styles.progressRow}>
            <View style={styles.progressPill}>
              <Text style={styles.progressPillText}>
                Question {CURRENT_QUESTION} / 10
              </Text>
            </View>
            <View style={styles.dotsRow}>
              {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i < CURRENT_QUESTION - 1
                      ? styles.dotActive
                      : styles.dotInactive,
                  ]}
                />
              ))}
            </View>
          </View>
          <Text style={styles.roleLabel}>RÔLE VISÉ</Text>
          <Text style={styles.roleTitle}>Design Industriel & Prototypage</Text>
        </View>

        {/* Question bubble */}
        <View style={styles.questionRow}>
          <View style={styles.avatar}>
            <MaterialIcons
              name="smart-toy"
              size={20}
              color={COLORS.onSurfaceVariant}
            />
          </View>
          <View style={styles.questionBubble}>
            <Text style={styles.questionText}>
              Excellent, Ahmed. Passons maintenant à un aspect plus
              technique. Comment abordez-vous la phase de prototypage
              rapide pour un produit de consommation complexe, comme un
              appareil électroménager intelligent ?
            </Text>
          </View>
        </View>

        {/* Answer area */}
        <View style={[styles.card, styles.answerCard, focused && styles.answerCardFocused]}>
          <View style={styles.textAreaWrapper}>
            <TextInput
              style={styles.textArea}
              placeholder="Écrivez votre réponse ici..."
              placeholderTextColor="rgba(60,74,66,0.4)"
              multiline
              value={answer}
              onChangeText={setAnswer}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            <TouchableOpacity style={styles.micButton}>
              <Ionicons name="mic" size={20} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          <View style={styles.answerFooter}>
            <Text style={styles.footerNote}>
              Vos réponses sont analysées en temps réel pour évaluer vos
              compétences techniques.
            </Text>
            <TouchableOpacity style={styles.submitButton} activeOpacity={0.85}>
              <Text style={styles.submitButtonText}>Soumettre la réponse</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.onPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hint */}
        <View style={styles.hintCard}>
          <TouchableOpacity style={styles.hintHeader} onPress={toggleHint}>
            <View style={styles.hintHeaderLeft}>
              <MaterialIcons name="lightbulb" size={20} color={COLORS.hintText} />
              <Text style={styles.hintLabel}>Astuce de l'IA</Text>
            </View>
            <Ionicons
              name={hintOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={COLORS.hintText}
            />
          </TouchableOpacity>
          {hintOpen && (
            <View style={styles.hintContent}>
              <Text style={styles.hintText}>
                Pour cette question, essayez de mentionner les étapes de
                validation fonctionnelle avant l'esthétique. Parlez de
                l'utilisation de l'impression 3D pour l'ergonomie et de la
                simulation logicielle pour les circuits intelligents.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surface,
  },
  backButton: {
    padding: 6,
    marginRight: 6,
    borderRadius: 999,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: -0.2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressPill: {
    backgroundColor: COLORS.surfaceContainer,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  progressPillText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 4,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
  },
  dotInactive: {
    backgroundColor: COLORS.surfaceContainer,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.onSurface,
    letterSpacing: -0.3,
  },
  questionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionBubble: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 16,
    borderTopLeftRadius: 0,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  questionText: {
    fontSize: 18,
    lineHeight: 28,
    color: COLORS.onSurface,
  },
  answerCard: {
    padding: 12,
  },
  answerCardFocused: {
    borderColor: COLORS.primary,
  },
  textAreaWrapper: {
    position: 'relative',
  },
  textArea: {
    minHeight: 160,
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.onSurface,
    textAlignVertical: 'top',
  },
  micButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    padding: 10,
    borderRadius: 999,
    backgroundColor: COLORS.surface,
  },
  answerFooter: {
    marginTop: 16,
    paddingHorizontal: 8,
    gap: 12,
  },
  footerNote: {
    fontSize: 12,
    fontStyle: 'italic',
    color: COLORS.onSurfaceVariant,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonText: {
    color: COLORS.onPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  hintCard: {
    borderWidth: 1,
    borderColor: COLORS.hintBorder,
    backgroundColor: COLORS.hintBg,
    borderRadius: 12,
    overflow: 'hidden',
  },
  hintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  hintHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  hintLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.hintText,
  },
  hintContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  hintText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.hintText,
  },
});