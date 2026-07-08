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

const COLORS = {
  primary: '#006c49',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  surfaceContainerLowest: '#ffffff',
  surfaceContainer: '#edeeef',
  secondaryContainer: '#adedd3',
  onSecondaryContainer: '#306d58',
  outlineVariant: '#bbcabf',
  background: '#f8f9fa',
};

// ---- Icons ----
const SearchIcon = ({ color = COLORS.onSurfaceVariant, size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Path
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

const PlusIcon = ({ color = COLORS.onSurfaceVariant, size = 18 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Path d="M12 4v16m-8-8h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </Svg>
);

// ---- Filter chip definitions ----
const FILTERS = ['Tous', 'React.js', 'Tunis', 'Disponible'];

// ---- Candidate data (matching the HTML mockup) ----
const CANDIDATES = [
  {
    initials: 'AM',
    name: 'Ahmed Mansour',
    role: 'Dev Full-Stack',
    experience: '4 ans',
    location: 'Tunis',
    matchPercent: 94,
    skills: ['React', 'Node.js', 'TypeScript'],
    avatarColor: COLORS.primary,
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
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Poste, compétence, nom..."
            placeholderTextColor={COLORS.onSurfaceVariant}
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
            <PlusIcon />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: COLORS.primary,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
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
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    paddingLeft: 10,
    fontSize: 16,
    color: COLORS.onSurface,
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
    borderColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surfaceContainerLowest,
  },
  filterChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.secondaryContainer,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },
  filterChipTextActive: {
    color: COLORS.onSecondaryContainer,
  },

  // ---- Results ----
  resultsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
});