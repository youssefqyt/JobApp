import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCompanyTheme } from '../../context/EnterpriseThemeContext';

export default function CandidateCard({
  initials,
  name,
  role,
  experience,
  location,
  matchPercent,
  skills = [],
  onProfilePress,
  onContactPress,
}) {
  const { colors } = useCompanyTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.card}>
      {/* ---- Top row: avatar, name/subtitle, match badge ---- */}
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <View style={styles.infoCol}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {role} · {experience} · {location}
          </Text>
        </View>

        {matchPercent != null && (
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>{matchPercent}% match</Text>
          </View>
        )}
      </View>

      {/* ---- Skills tags ---- */}
      {skills.length > 0 && (
        <View style={styles.tagsRow}>
          {skills.map((skill, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{skill}</Text>
            </View>
          ))}
        </View>
      )}

      {/* ---- Action buttons ---- */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.profileButton}
          activeOpacity={0.7}
          onPress={onProfilePress}
        >
          <Text style={styles.profileButtonText}>Profil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactButton}
          activeOpacity={0.85}
          onPress={onContactPress}
        >
          <Text style={styles.contactButtonText}>Contacter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  infoCol: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  subtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  matchBadge: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  matchText: {
    color: colors.onSecondaryContainer,
    fontWeight: '700',
    fontSize: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  tag: {
    backgroundColor: colors.surfaceContainerHighest,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  profileButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainerLowest,
  },
  profileButtonText: {
    color: colors.onSurface,
    fontWeight: '700',
    fontSize: 14,
  },
  contactButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  contactButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
});