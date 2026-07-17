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
import JobManagementScreen from './componentEnt/Jobmanagementscreen';
import { useCompanyTheme } from '../context/EnterpriseThemeContext';

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
    location: 'Tunis',
    type: 'CDI',
  },
  {
    title: 'UX Designer Senior',
    status: 'Active',
    publishedLabel: 'Publié il y a 5 jours',
    views: 198,
    applications: 22,
    location: 'Sfax',
    type: 'CDI',
  },
];

const RECOMMENDED_CANDIDATES = [
  { initials: 'AM', name: 'Ahmed M.', role: 'Full-Stack Dev', matchPercent: 94 },
  { initials: 'SB', name: 'Sarra B.', role: 'UX Designer', matchPercent: 89 },
  { initials: 'YK', name: 'Yassine K.', role: 'DevOps', matchPercent: 85 },
  { initials: 'LM', name: 'Leila M.', role: 'Product Manager', matchPercent: 82 },
];

// ---- Sub-components ----

function StatCard({ label, value, suffix, trend, trendType, colors, styles }) {
  const trendIcon =
    trendType === 'up' ? 'trending-up' : trendType === 'flat' ? 'remove' : null;
  const trendColor = trendType === 'flat' ? colors.onSurfaceVariant : colors.primaryContainer;

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
              <MaterialIcons key={i} name="star" size={14} color={colors.primaryContainer} />
            ))}
            <MaterialIcons name="star-half" size={14} color={colors.primaryContainer} />
          </View>
        ) : (
          trendIcon && <MaterialIcons name={trendIcon} size={14} color={trendColor} />
        )}
        <Text style={[styles.statTrendText, { color: trendColor }]}>{trend}</Text>
      </View>
    </View>
  );
}

function SectionHeader({ title, onSeeAll, styles }) {
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

export default function RecruiterDashboard({
  onSearch,
  onAddJob,
  onOpenCandidate,
  onNotificationsPress,
}) {
  const { colors } = useCompanyTheme();
  const styles = getStyles(colors);
  const [query, setQuery] = useState('');

  // Local navigation: which job (if any) is currently open in the
  // "Gestion de l'offre" screen. Selecting a job posting card sets
  // this; JobManagementScreen's back arrow clears it.
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobOffers, setJobOffers] = useState(JOB_OFFERS);

  function handleOpenJob(job) {
    setSelectedJob(job);
  }

  function handleBackFromJob() {
    setSelectedJob(null);
  }

  function handleCloseJob(job) {
    setJobOffers((prev) =>
      prev.map((j) => (j.title === job.title ? { ...j, status: 'Fermé' } : j))
    );
  }

  function handleReopenJob(job) {
    setJobOffers((prev) =>
      prev.map((j) => (j.title === job.title ? { ...j, status: 'Active' } : j))
    );
  }

  function handleEditJob(job, updatedFields) {
    setJobOffers((prev) =>
      prev.map((j) => (j.title === job.title ? { ...j, ...updatedFields } : j))
    );
    // Keep selectedJob in sync so re-opening the modal shows fresh values.
    setSelectedJob((prev) => (prev && prev.title === job.title ? { ...prev, ...updatedFields } : prev));
  }

  // Show the job management screen instead of the dashboard when a
  // job posting card has been tapped.
  if (selectedJob) {
    return (
      <JobManagementScreen
        job={selectedJob}
        onBack={handleBackFromJob}
        onCloseJob={handleCloseJob}
        onReopenJob={handleReopenJob}
        onEditJob={handleEditJob}
      />
    );
  }

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          <Text style={styles.logoTun}>Tun</Text>
          <Text style={styles.logoWork}>Work</Text>
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.bellButton}
            activeOpacity={0.7}
            onPress={onNotificationsPress}
          >
            <MaterialIcons name="notifications" size={22} color={colors.onSurfaceVariant} />
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
          <MaterialIcons name="search" size={20} color={colors.onSurfaceVariant} />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => onSearch && onSearch(query)}
            placeholder="Rechercher un candidat..."
            placeholderTextColor={colors.onSurfaceVariant}
          />
        </View>

        {/* Stats bento grid */}
        <View style={styles.statsGrid}>
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} colors={colors} styles={styles} />
          ))}
        </View>

        {/* Last job offers */}
        <View style={styles.section}>
          <SectionHeader title="DERNIÈRES OFFRES PUBLIÉES" styles={styles} />
          <View style={styles.jobList}>
            {jobOffers.map((job) => (
              <JobPostingCard
                key={job.title}
                {...job}
                onPress={() => handleOpenJob(job)}
              />
            ))}
          </View>
        </View>

        {/* AI recommended profiles */}
        <View style={styles.section}>
          <SectionHeader title="PROFILS RECOMMANDÉS PAR L'IA" styles={styles} />
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
        <MaterialIcons name="add" size={24} color={colors.onPrimaryContainer} />
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
  },
  logo: {
    fontSize: 22,
    fontWeight: '700',
  },
  logoTun: {
    color: colors.onSurface,
  },
  logoWork: {
    color: colors.primaryContainer,
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
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
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
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.onSurface,
    backgroundColor: colors.surfaceContainerLow,
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
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 14,
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
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
    color: colors.onSurface,
  },
  statSuffix: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
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
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaryContainer,
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
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
});