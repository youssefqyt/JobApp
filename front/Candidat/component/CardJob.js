import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// ---- Colors (from your Tailwind theme) ----
const COLORS = {
  primary: '#006c49',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainer: '#edeeef',
  outlineVariant: '#bbcabf',
  secondaryContainer: '#adedd3',
  onSecondaryContainer: '#306d58',
};

// ---- Icons ----
const BookmarkIcon = ({ color = COLORS.onSurfaceVariant, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Path
      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

const VerifiedIcon = ({ color = COLORS.primary, size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill={color}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    />
  </Svg>
);

const LocationIcon = ({ color = COLORS.onSurfaceVariant, size = 14 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Path
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <Path
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

// ---- Tag component (handles both gray "CDI" style and green "Télétravail" style) ----
const Tag = ({ label, variant = 'default' }) => (
  <View style={[styles.tag, variant === 'highlight' && styles.tagHighlight]}>
    <Text style={[styles.tagText, variant === 'highlight' && styles.tagTextHighlight]}>
      {label}
    </Text>
  </View>
);

/**
 * JobCard
 *
 * Props:
 * - initials: string, e.g. "TH"
 * - title: string, e.g. "Développeur Full Stack"
 * - company: string, e.g. "Telnet Holding"
 * - verified: boolean — shows the green checkmark next to company name
 * - location: string, e.g. "Lac II, Tunis"
 * - tags: array of { label: string, variant?: 'default' | 'highlight' }
 * - postedAt: string, e.g. "Il y a 2h"
 * - onPressBookmark: () => void
 * - onPress: () => void  (tap the whole card)
 * - bookmarked: boolean — toggles filled/outline bookmark (optional visual only here)
 */
export default function JobCard({
  initials = 'TH',
  title = 'Développeur Full Stack',
  company = 'Telnet Holding',
  verified = true,
  location = 'Lac II, Tunis',
  tags = [{ label: 'CDI' }, { label: 'Télétravail', variant: 'highlight' }],
  postedAt = 'Il y a 2h',
  onPress,
  onPressBookmark,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          {/* Company initials avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          <View style={styles.headerInfo}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>

            <View style={styles.companyRow}>
              <Text style={styles.companyText}>{company}</Text>
              {verified && <VerifiedIcon />}
            </View>

            <View style={styles.locationRow}>
              <LocationIcon />
              <Text style={styles.locationText}>{location}</Text>
            </View>
          </View>
        </View>

        {/* Bookmark button */}
        <TouchableOpacity onPress={onPressBookmark} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <BookmarkIcon />
        </TouchableOpacity>
      </View>

      {/* Tags */}
      <View style={styles.tagsRow}>
        {tags.map((tag, idx) => (
          <Tag key={idx} label={tag.label} variant={tag.variant} />
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footerRow}>
        <Text style={styles.postedAtText}>{postedAt}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    // card-shadow equivalent
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    gap: 16,
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 18,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: COLORS.onSurface,
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 2,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  companyText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: COLORS.surfaceContainer,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagHighlight: {
    backgroundColor: COLORS.secondaryContainer,
  },
  tagText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '600',
  },
  tagTextHighlight: {
    color: COLORS.onSecondaryContainer,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  postedAtText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
  },
});