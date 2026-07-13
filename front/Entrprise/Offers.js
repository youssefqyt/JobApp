import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCompanyTheme } from '../context/EnterpriseThemeContext';

// "Draft" status badge isn't part of the enterprise theme (no amber token
// defined there yet), so it stays static rather than shifting with dark mode.
const STATUS_DRAFT = {
  bg: '#fffbeb',
  text: '#b45309',
};

const TABS = ['Pipeline ATS', 'Toutes les offres', 'Brouillons'];

const PIPELINE_COLUMNS = [
  {
    title: 'Candidatures',
    count: 12,
    candidates: [
      { initials: 'AM', name: 'Ahmed M.', match: '94% match', highlighted: true },
      { initials: 'YK', name: 'Yassine K.', match: '85% match', highlighted: false },
    ],
  },
  {
    title: 'Présélection',
    count: 6,
    candidates: [{ initials: 'SB', name: 'Sarra B.', match: '89% match', highlighted: true }],
  },
  {
    title: 'Entretien',
    count: 3,
    candidates: [{ initials: 'MT', name: 'Mehdi T.', match: '91% match', highlighted: true }],
  },
];

const JOB_OFFERS = [
  {
    title: 'Développeur Full-Stack',
    location: 'Tunis · CDI',
    status: 'Active',
    views: 284,
    applicants: 37,
  },
  {
    title: 'UX Designer Senior',
    location: 'Sousse · CDI',
    status: 'Brouillon',
    views: 0,
    applicants: 0,
  },
];

export default function OffresATSScreen({ onAddOffer }) {
  const { colors } = useCompanyTheme();
  const styles = getStyles(colors);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Offres et ATS</Text>
        <Text style={styles.headerSubtitle}>
          <Text style={styles.headerSubtitleBold}>6 actives</Text>
          <Text> · </Text>
          <Text style={styles.headerSubtitleBold}>2 brouillons</Text>
          <Text> · </Text>
          <Text style={styles.headerSubtitleBold}>14 clôturées</Text>
        </Text>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {TABS.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(index)}
              style={[styles.tabItem, activeTab === index && styles.tabItemActive]}
            >
              <Text style={[styles.tabText, activeTab === index && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.mainContent} contentContainerStyle={styles.mainContentInner}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PIPELINE · DÉVELOPPEUR FULL-STACK</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {PIPELINE_COLUMNS.map((column) => (
              <View key={column.title} style={styles.pipelineColumn}>
                <View style={styles.pipelineColumnHeader}>
                  <Text style={styles.pipelineColumnTitle}>{column.title}</Text>
                  <View style={styles.countBadge}>
                    <Text style={styles.countBadgeText}>{column.count}</Text>
                  </View>
                </View>
                <View style={styles.pipelineCards}>
                  {column.candidates.map((c) => (
                    <View key={c.initials} style={styles.candidateCard}>
                      <View style={styles.candidateAvatar}>
                        <Text style={styles.candidateAvatarText}>{c.initials}</Text>
                      </View>
                      <View>
                        <Text style={styles.candidateName}>{c.name}</Text>
                        <Text
                          style={[
                            styles.candidateMatch,
                            !c.highlighted && styles.candidateMatchMuted,
                          ]}
                        >
                          {c.match}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>VOS OFFRES PUBLIÉES</Text>
          <View style={styles.jobsList}>
            {JOB_OFFERS.map((job) => (
              <View key={job.title} style={styles.jobCard}>
                <View style={styles.jobCardHeader}>
                  <View>
                    <Text style={styles.jobTitle}>{job.title}</Text>
                    <Text style={styles.jobLocation}>{job.location}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      job.status === 'Active' ? styles.statusActive : styles.statusDraft,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusBadgeText,
                        job.status === 'Active'
                          ? styles.statusActiveText
                          : styles.statusDraftText,
                      ]}
                    >
                      {job.status}
                    </Text>
                  </View>
                </View>
                <View style={styles.jobStats}>
                  <View style={styles.jobStatItem}>
                    <MaterialIcons name="visibility" size={16} color={colors.onSurfaceVariant} />
                    <Text style={styles.jobStatText}>{job.views}</Text>
                  </View>
                  <View style={styles.jobStatItem}>
                    <MaterialIcons name="group" size={16} color={colors.onSurfaceVariant} />
                    <Text style={styles.jobStatText}>{job.applicants}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        accessibilityLabel="Add Offer"
        onPress={onAddOffer}
      >
        <MaterialIcons name="add" size={24} color={colors.onPrimaryContainer} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: colors.surfaceContainerLowest,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  headerSubtitleBold: {
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
    paddingLeft: 16,
  },
  tabItem: {
    marginRight: 24,
    paddingBottom: 8,
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryContainer,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.outline,
  },
  tabTextActive: {
    color: colors.primary,
  },
  mainContent: {
    flex: 1,
  },
  mainContentInner: {
    paddingTop: 16,
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.outline,
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  pipelineColumn: {
    minWidth: 140,
    marginRight: 12,
  },
  pipelineColumnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  pipelineColumnTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
  },
  countBadge: {
    backgroundColor: colors.outlineVariant,
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
  },
  pipelineCards: {
    gap: 12,
  },
  candidateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  candidateAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  candidateAvatarText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  candidateName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurface,
  },
  candidateMatch: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
  },
  candidateMatchMuted: {
    color: colors.outline,
  },
  jobsList: {
    gap: 12,
  },
  jobCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  jobCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
  jobLocation: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusActive: {
    backgroundColor: colors.primaryTintFaint,
  },
  statusDraft: {
    backgroundColor: STATUS_DRAFT.bg,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusActiveText: {
    color: colors.primary,
  },
  statusDraftText: {
    color: STATUS_DRAFT.text,
  },
  jobStats: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  jobStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  jobStatText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
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