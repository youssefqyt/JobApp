import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import JobPostingCard from './componentEnt/Jobpostingcard';
import CandidateMatchCard from './componentEnt/Candidatematchcard';

// ---- Colors (from your Tailwind theme) ----
const COLORS = {
  primary: '#006c49',
  primaryContainer: '#10b981',
  onPrimaryContainer: '#00422b',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  surface: '#f8f9fa',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainerHigh: '#e7e8e9',
  surfaceContainerLowest: '#ffffff',
  outlineVariant: '#bbcabf',
  white: '#ffffff',
};

// ---- Data ----

const STATS = [
  { label: 'Candidatures', value: '142', trend: '+18% ce mois', trendType: 'up' },
  { label: 'Vues offres', value: '3 240', trend: '+9% ce mois', trendType: 'up' },
  { label: 'Note entreprise', value: '4.5', suffix: '/5', trend: 'Avis des candidats', trendType: 'rating' },
  { label: 'Postes ouverts', value: '6', trend: 'Stable', trendType: 'flat' },
  { label: 'Postes clôturés', value: '14', trend: '+5% ce mois', trendType: 'up' },
];

const JOB_OFFERS = [
  {
    title: 'Développeur Full-Stack',
    status: 'Active',
    publishedLabel: 'Publié il y a 2 jours',
    views: 284,
    applications: 37,
  },
  {
    title: 'UX Designer Senior',
    status: 'Active',
    publishedLabel: 'Publié il y a 5 jours',
    views: 198,
    applications: 22,
  },
];

const RECOMMENDED_CANDIDATES = [
  { initials: 'AM', name: 'Ahmed M.', role: 'Full-Stack Dev', matchPercent: 94 },
  { initials: 'SB', name: 'Sarra B.', role: 'UX Designer', matchPercent: 89 },
  { initials: 'YK', name: 'Yassine K.', role: 'DevOps', matchPercent: 85 },
  { initials: 'LM', name: 'Leila M.', role: 'Product Manager', matchPercent: 82 },
];

// ---- Sub-components ----

function StatCard({ label, value, suffix, trend, trendType }) {
  const trendIcon =
    trendType === 'up' ? 'trending-up' : trendType === 'flat' ? 'remove' : null;
  const trendColor = trendType === 'flat' ? COLORS.onSurfaceVariant : COLORS.primaryContainer;

  return (
    <View style={styles.statCard}>
      <View>
        <Text style={styles.statLabel}>{label}</Text>
        <View style={styles.statValueRow}>
          <Text style={styles.statValue}>{value}</Text>
          {suffix ? <Text style={styles.statSuffix}>{suffix}</Text> : null}
        </View>
      </View>
      <View style={styles.statTrendRow}>
        {trendType === 'rating' ? (
          <View style={styles.starsRow}>
            {[0, 1, 2, 3].map((i) => (
              <MaterialIcons key={i} name="star" size={14} color={COLORS.primaryContainer} />
            ))}
            <MaterialIcons name="star-half" size={14} color={COLORS.primaryContainer} />
          </View>
        ) : (
          trendIcon && <MaterialIcons name={trendIcon} size={14} color={trendColor} />
        )}
        <Text style={[styles.statTrendText, { color: trendColor }]}>{trend}</Text>
      </View>
    </View>
  );
}

function SectionHeader({ title, onSeeAll }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <Text style={styles.sectionHeaderTitle}>{title}</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={onSeeAll}>
        <Text style={styles.seeAll}>Tout voir</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---- Main screen ----

export default function RecruiterDashboard({ onSearch, onAddJob, onOpenJob, onOpenCandidate }) {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          <Text style={styles.logoTun}>Tun</Text>
          <Text style={styles.logoWork}>Work</Text>
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
            <MaterialIcons name="notifications" size={22} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>RH</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color={COLORS.onSurfaceVariant} />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => onSearch && onSearch(query)}
            placeholder="Rechercher un candidat..."
            placeholderTextColor={COLORS.onSurfaceVariant}
          />
        </View>

        {/* Stats bento grid */}
        <View style={styles.statsGrid}>
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </View>

        {/* Last job offers */}
        <View style={styles.section}>
          <SectionHeader title="DERNIÈRES OFFRES PUBLIÉES" />
          <View style={styles.jobList}>
            {JOB_OFFERS.map((job) => (
              <JobPostingCard
                key={job.title}
                {...job}
                onPress={() => onOpenJob && onOpenJob(job)}
              />
            ))}
          </View>
        </View>

        {/* AI recommended profiles */}
        <View style={styles.section}>
          <SectionHeader title="PROFILS RECOMMANDÉS PAR L'IA" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.candidateRow}
          >
            {RECOMMENDED_CANDIDATES.map((candidate) => (
              <CandidateMatchCard
                key={candidate.name}
                {...candidate}
                onPress={() => onOpenCandidate && onOpenCandidate(candidate)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* FAB for adding a job */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={onAddJob}>
        <MaterialIcons name="add" size={24} color={COLORS.onPrimaryContainer} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surface,
  },
  logo: {
    fontSize: 22,
    fontWeight: '700',
  },
  logoTun: {
    color: COLORS.onSurface,
  },
  logoWork: {
    color: COLORS.primaryContainer,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
    gap: 24,
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.onSurface,
    backgroundColor: COLORS.surface,
    borderWidth: 0,
    borderColor: 'transparent',
    outlineStyle: 'none',
    outlineWidth: 0,
    outlineColor: 'transparent',
  },

  // Stats grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    minHeight: 110,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
    padding: 14,
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
    marginBottom: 4,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  statSuffix: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    marginBottom: 2,
  },
  statTrendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 1,
  },
  statTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Sections
  section: {
    gap: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeaderTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primaryContainer,
  },
  jobList: {
    gap: 12,
  },
  candidateRow: {
    gap: 12,
    paddingRight: 16,
  },

  // FAB
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 88,
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
});