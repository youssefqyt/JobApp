import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// ---- Colors (from your Tailwind theme) ----
const COLORS = {
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  onSecondaryContainer: '#306d58',
  secondaryContainer: '#adedd3',
  surfaceContainerLowest: '#ffffff',
  outlineVariant: '#bbcabf',
};

const STATUS_STYLES = {
  Active: { bg: COLORS.secondaryContainer, text: COLORS.onSecondaryContainer },
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
 * - status: string, one of the keys in STATUS_STYLES (default "Active")
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
  const Wrapper = onPress ? TouchableOpacity : View;
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.Active;

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
          <MaterialIcons name="visibility" size={16} color={COLORS.onSurfaceVariant} />
          <Text style={styles.statText}>{views} vues</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialIcons name="groups" size={16} color={COLORS.onSurfaceVariant} />
          <Text style={styles.statText}>{applications} candidatures</Text>
        </View>
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
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
    color: COLORS.onSurface,
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
    color: COLORS.onSecondaryContainer,
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
    color: COLORS.onSurfaceVariant,
  },
});