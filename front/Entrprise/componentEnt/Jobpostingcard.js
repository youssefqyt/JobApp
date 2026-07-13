import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCompanyTheme } from '../../context/EnterpriseThemeContext';

// "Pausé" and "Fermé" aren't part of the enterprise theme (no tokens
// defined there yet for paused/closed states), so they stay static
// rather than shifting with dark mode. "Active" does use the theme
// via colors.secondaryContainer / colors.onSecondaryContainer below.
const STATIC_STATUS_STYLES = {
  Pausé: { bg: '#e1e3e4', text: '#3c4a42' },
  Fermé: { bg: '#ffdad6', text: '#ba1a1a' },
};

/**
 * JobPostingCard
 *
 * Reusable card summarizing a posted job offer: title, status pill,
 * publish date, view count, and application count.
 *
 * Props:
 * - title: string (e.g. "Développeur Full-Stack")
 * - status: string, one of "Active" | "Pausé" | "Fermé" (default "Active")
 * - publishedLabel: string (e.g. "Publié il y a 2 jours")
 * - views: number
 * - applications: number
 * - onPress: optional press handler
 */
export default function JobPostingCard({
  title,
  status = 'Active',
  publishedLabel,
  views,
  applications,
  onPress,
}) {
  const { colors } = useCompanyTheme();
  const styles = getStyles(colors);
  const Wrapper = onPress ? TouchableOpacity : View;

  const statusStyle =
    status === 'Active'
      ? { bg: colors.secondaryContainer, text: colors.onSecondaryContainer }
      : STATIC_STATUS_STYLES[status] || { bg: colors.secondaryContainer, text: colors.onSecondaryContainer };

  return (
    <Wrapper style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <View style={[styles.statusPill, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.statusText, { color: statusStyle.text }]}>{status}</Text>
        </View>
      </View>

      <Text style={styles.publishedLabel}>{publishedLabel}</Text>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <MaterialIcons name="visibility" size={16} color={colors.onSurfaceVariant} />
          <Text style={styles.statText}>{views} vues</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialIcons name="groups" size={16} color={colors.onSurfaceVariant} />
          <Text style={styles.statText}>{applications} candidatures</Text>
        </View>
      </View>
    </Wrapper>
  );
}

const getStyles = (colors) => StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  publishedLabel: {
    fontSize: 13,
    color: colors.onSecondaryContainer,
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
});