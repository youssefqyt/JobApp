import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import CandidateCard from './componentEnt/JobCard';
import { useCompanyTheme } from '../context/EnterpriseThemeContext';

// ---- Icons ----
const SearchIcon = ({ color, size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Path
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

const PlusIcon = ({ color, size = 18 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Path d="M12 4v16m-8-8h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </Svg>
);

// ---- Filter chip definitions ----
const FILTERS = ['Tous', 'React.js', 'Tunis', 'Disponible'];

// ---- Candidate data (matching the HTML mockup) ----
// avatarColor kept as fixed brand accents (not theme-driven) so each
// candidate keeps a distinct identity color across light/dark mode.
const CANDIDATES = [
  {
    initials: 'AM',
    name: 'Ahmed Mansour',
    role: 'Dev Full-Stack',
    experience: '4 ans',
    location: 'Tunis',
    matchPercent: 94,
    skills: ['React', 'Node.js', 'TypeScript'],
    avatarColor: '#006c49',
  },
  {
    initials: 'SB',
    name: 'Sarra Belhadj',
    role: 'UX Designer',
    experience: '3 ans',
    location: 'Sousse',
    matchPercent: 89,
    skills: ['Figma', 'UI Design', 'Prototypage'],
    avatarColor: '#3f6212',
  },
  {
    initials: 'YK',
    name: 'Yassine Karoui',
    role: 'DevOps Eng.',
    experience: '5 ans',
    location: 'Sfax',
    matchPercent: 85,
    skills: ['Docker', 'AWS', 'Kubernetes'],
    avatarColor: '#7c2d12',
  },
];

export default function Recherche() {
  const { colors } = useCompanyTheme();
  const styles = getStyles(colors);
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* ---- Header ---- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rechercher des talents</Text>
        <Text style={styles.headerSubtitle}>{CANDIDATES.length * 413} profils disponibles</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ---- Search bar ---- */}
        <View style={styles.searchWrapper}>
          <SearchIcon color={colors.onSurfaceVariant} />
          <TextInput
            style={styles.searchInput}
            placeholder="Poste, compétence, nom..."
            placeholderTextColor={colors.onSurfaceVariant}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* ---- Filter chips ---- */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersRow}
          contentContainerStyle={styles.filtersContent}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                activeOpacity={0.7}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[styles.filterChipText, isActive && styles.filterChipTextActive]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.filterChip} activeOpacity={0.7}>
            <PlusIcon color={colors.onSurfaceVariant} />
            <Text style={styles.filterChipText}>Filtres</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* ---- Results label ---- */}
        <Text style={styles.resultsLabel}>Résultats triés par pertinence IA</Text>

        {/* ---- Candidate list ---- */}
        {CANDIDATES.map((candidate, i) => (
          <CandidateCard
            key={i}
            initials={candidate.initials}
            name={candidate.name}
            role={candidate.role}
            experience={candidate.experience}
            location={candidate.location}
            matchPercent={candidate.matchPercent}
            skills={candidate.skills}
            avatarColor={candidate.avatarColor}
            onProfilePress={() => console.log('Profil', candidate.name)}
            onContactPress={() => console.log('Contacter', candidate.name)}
          />
        ))}
      </ScrollView>

      {/* ---- Bottom nav (existing Entreprise navbar, Offres tab) ---- */}
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: colors.primary,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  // ---- Search ----
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    paddingLeft: 10,
    fontSize: 16,
    color: colors.onSurface,
    outlineStyle: 'none',
    outlineWidth: 0,
    outlineColor: 'transparent',
    boxShadow: 'none',
  },

  // ---- Filters ----
  filtersRow: {
    marginBottom: 24,
  },
  filtersContent: {
    gap: 8,
    paddingRight: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
  },
  filterChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.secondaryContainer,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  filterChipTextActive: {
    color: colors.onSecondaryContainer,
  },

  // ---- Results ----
  resultsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
});