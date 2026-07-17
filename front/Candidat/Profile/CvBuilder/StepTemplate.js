import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCandidateTheme } from '../../../context/CandidateThemeContext'; // adjust relative path if needed

const CATEGORIES = ['Tout', 'IT & Tech', 'Mécanique', 'Finance'];

const TEMPLATES = [
  { id: 'tech-executive', name: 'Tech Executive', recommended: true },
  { id: 'modern-minimalist', name: 'Modern Minimalist', recommended: false },
  { id: 'creative-pro', name: 'Creative Pro', recommended: true },
  { id: 'corporate-leader', name: 'Corporate Leader', recommended: false },
];

export default function StepTemplate({ value, onChange }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);

  const [category, setCategory] = useState('IT & Tech');
  const selectedTemplateId = value?.templateId;

  const visibleTemplates =
    category === 'Tout'
      ? TEMPLATES
      : TEMPLATES.filter((t) =>
          category === 'IT & Tech' ? t.id === 'tech-executive' || t.id === 'modern-minimalist' : true
        );

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Choisir un modèle</Text>
      <Text style={styles.subtitle}>
        Sélectionnez la structure qui correspond le mieux à votre parcours.
      </Text>

      {/* Category filter chips */}
      <View style={styles.chipRow}>
        {CATEGORIES.map((cat) => {
          const isActive = cat === category;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, isActive && styles.chipActive]}
              activeOpacity={0.7}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{cat}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* AI tip banner */}
      <View style={styles.aiTipBanner}>
        <MaterialIcons name="auto-awesome" size={18} color={colors.primary} />
        <View style={styles.aiTipTextWrap}>
          <Text style={styles.aiTipTitle}>ASTUCE IA</Text>
          <Text style={styles.aiTipText}>
            Nous avons sélectionné ces modèles pour mettre en valeur votre expertise technique et
            vos projets récents.
          </Text>
        </View>
      </View>

      {/* Template grid */}
      <View style={styles.grid}>
        {visibleTemplates.map((template) => {
          const isSelected = selectedTemplateId === template.id;
          return (
            <TouchableOpacity
              key={template.id}
              style={[styles.templateCard, isSelected && styles.templateCardSelected]}
              activeOpacity={0.8}
              onPress={() => onChange({ ...value, templateId: template.id })}
            >
              {template.recommended && (
                <View style={styles.recommendedBadge}>
                  <MaterialIcons name="auto-awesome" size={10} color={colors.onSecondaryContainer} />
                  <Text style={styles.recommendedBadgeText}>RECOMMANDÉ</Text>
                </View>
              )}
              <View style={styles.templatePreview}>
                <View style={styles.previewLineWide} />
                <View style={styles.previewLineNarrow} />
                <View style={styles.previewBlock} />
              </View>
              <View style={styles.templateNameRow}>
                <Text style={styles.templateName}>{template.name}</Text>
                {isSelected && (
                  <MaterialIcons name="check-circle" size={16} color={colors.primary} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: 16,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
  },
  chipActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primaryContainer,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  chipTextActive: {
    color: colors.white,
  },
  aiTipBanner: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: colors.secondaryContainer,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  aiTipTextWrap: {
    flex: 1,
  },
  aiTipTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.onSecondaryContainer,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  aiTipText: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.onSecondaryContainer,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  templateCard: {
    width: '48%',
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 10,
  },
  templateCardSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  recommendedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    alignSelf: 'flex-start',
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 8,
  },
  recommendedBadgeText: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.onSecondaryContainer,
  },
  templatePreview: {
    height: 90,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    justifyContent: 'flex-start',
    gap: 6,
  },
  previewLineWide: {
    width: '70%',
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.outlineVariant,
  },
  previewLineNarrow: {
    width: '45%',
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.outlineVariant,
  },
  previewBlock: {
    marginTop: 'auto',
    width: '100%',
    height: 24,
    borderRadius: 4,
    backgroundColor: colors.primaryContainer,
    opacity: 0.5,
  },
  templateNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  templateName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurface,
  },
});