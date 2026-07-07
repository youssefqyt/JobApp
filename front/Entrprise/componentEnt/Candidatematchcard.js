import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// ---- Colors (from your Tailwind theme) ----
const COLORS = {
  primary: '#006c49',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  onSecondaryContainer: '#306d58',
  secondaryContainer: '#adedd3',
  surfaceContainerLowest: '#ffffff',
  outlineVariant: '#bbcabf',
  white: '#ffffff',
};

/**
 * CandidateMatchCard
 *
 * Reusable card showing a candidate's avatar (initials), name, role,
 * and a match-percentage pill. Meant to be rendered inside a grid/list
 * of candidate suggestions.
 *
 * Props:
 * - initials: string (e.g. "AM")
 * - name: string (e.g. "Ahmed M.")
 * - role: string (e.g. "Full-Stack Dev")
 * - matchPercent: number (e.g. 94)
 * - onPress: optional press handler
 */
export default function CandidateMatchCard({ initials, name, role, matchPercent, onPress }) {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.role} numberOfLines={1}>{role}</Text>
      <View style={styles.matchPill}>
        <Text style={styles.matchText}>{matchPercent}% match</Text>
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 2,
  },
  role: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
    marginBottom: 14,
  },
  matchPill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.secondaryContainer,
  },
  matchText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.onSecondaryContainer,
  },
});