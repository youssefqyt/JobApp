import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import JobCard from './component/CardJob';
import BottomNavBar from './component/Navbar';
import FilterModal from './component/FilterModal';
import { useCandidateTheme } from '../context/CandidateThemeContext';

// ---- Icons ----
// Icon colors are passed in as props so they can react to theme changes.

const BellIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Path
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

const SearchIcon = ({ color, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Path
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

const FilterIcon = ({ color }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Path
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

// ---- Job data (matching the HTML) ----
const JOBS = [
  {
    initials: 'TH',
    title: 'Développeur Full Stack',
    company: 'Telnet Holding',
    verified: true,
    location: 'Lac II, Tunis',
    tags: [
      { label: 'CDI' },
      { label: 'Télétravail', variant: 'highlight' },
    ],
    postedAt: 'Il y a 2h',
  },
  {
    initials: 'BI',
    title: 'Data Scientist',
    company: 'BIAT',
    verified: true,
    location: 'Les Berges du Lac',
    tags: [
      { label: 'CDI' },
    ],
    postedAt: 'Il y a 5h',
  },
  {
    initials: 'VM',
    title: 'DevOps Engineer',
    company: 'Vermeg',
    verified: true,
    location: 'El Ghazala, Ariana',
    tags: [
      { label: 'CDD' },
      { label: 'Télétravail', variant: 'highlight' },
    ],
    postedAt: 'Il y a 1j',
  },
];

export default function Home({ activeTab, onTabChange }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ======== HEADER ======== */}
        <View style={styles.header}>
          {/* Logo + Notification + Avatar row */}
          <View style={styles.headerTopRow}>
            {/* Logo */}
            <View style={styles.logoRow}>
              <Text style={styles.logoTun}>Tun</Text>
              <Text style={styles.logoWork}>Work</Text>
            </View>

            {/* Right icons */}
            <View style={styles.headerRight}>
              <View style={styles.bellWrapper}>
                <BellIcon color={colors.onSurfaceVariant} />
                <View style={styles.bellDot} />
              </View>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>AH</Text>
              </View>
            </View>
          </View>

          {/* ======== SEARCH BAR ======== */}
          <View style={styles.searchRow}>
            <View style={styles.searchInputWrapper}>
              <SearchIcon color={colors.onSurfaceVariant} size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Poste, entreprise, secteur..."
                placeholderTextColor={colors.onSurfaceVariant}
                underlineColorAndroid="transparent"
              />
            </View>
            <TouchableOpacity
              style={styles.filterButton}
              activeOpacity={0.7}
              onPress={() => setShowFilters(true)}
            >
              <FilterIcon color={colors.primary} />
              <Text style={styles.filterText}>Filtres</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ======== JOB LIST SECTION ======== */}
        <View style={styles.jobSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Meilleurs matchs</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.voirTout}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          {JOBS.map((job, index) => (
            <JobCard
              key={index}
              initials={job.initials}
              title={job.title}
              company={job.company}
              verified={job.verified}
              location={job.location}
              tags={job.tags}
              postedAt={job.postedAt}
            />
          ))}
        </View>
      </ScrollView>

      {/* ======== BOTTOM NAV ======== */}
      <BottomNavBar initialTab={activeTab || 'Accueil'} onTabChange={onTabChange} />

      {/* ======== FILTERS BOTTOM SHEET ======== */}
      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={(filters) => {
          console.log('Selected filters:', filters);
          // TODO: refetch/filter JOBS with the selected filters
        }}
        resultCount={47}
      />
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // room for nav bar
  },

  // ---- Header ----
  header: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: colors.background,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoTun: {
    color: colors.onSurface,
    fontWeight: '700',
    fontSize: 22,
    letterSpacing: -0.5,
  },
  logoWork: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 22,
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  bellWrapper: {
    width: 40,
    height: 40,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: colors.error,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.background,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: colors.primaryContainer,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },

  // ---- Search Bar ----
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    paddingLeft: 12,
    paddingRight: 12,
    // card-shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 10,
    fontSize: 14,
    color: colors.onSurface,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 0,
    borderColor: 'transparent',
    outlineStyle: 'none',
    outlineWidth: 0,
    outlineColor: 'transparent',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    // card-shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 2,
  },
  filterText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },

  // ---- Job Section ----
  jobSection: {
    paddingHorizontal: 24,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    color: colors.onSurface,
    fontWeight: '700',
    fontSize: 18,
  },
  voirTout: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});