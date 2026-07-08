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

const COLORS = {
  emerald500: '#10b981',
  emerald600: '#059669',
  emerald700: '#047857',
  emeraldBg: '#ecfdf5',
  amberBg: '#fffbeb',
  amber700: '#b45309',
  gray900: '#111827',
  gray600: '#4b5563',
  gray500: '#6b7280',
  gray400: '#9ca3af',
  gray200: '#e5e7eb',
  gray100: '#f3f4f6',
  white: '#ffffff',
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
                    <MaterialIcons name="visibility" size={16} color={COLORS.gray500} />
                    <Text style={styles.jobStatText}>{job.views}</Text>
                  </View>
                  <View style={styles.jobStatItem}>
                    <MaterialIcons name="group" size={16} color={COLORS.gray500} />
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
        <MaterialIcons name="add" size={24} color={COLORS.emerald700} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.emerald600,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.gray500,
    marginTop: 4,
  },
  headerSubtitleBold: {
    fontWeight: '600',
    color: COLORS.gray600,
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    backgroundColor: COLORS.white,
    paddingLeft: 16,
  },
  tabItem: {
    marginRight: 24,
    paddingBottom: 8,
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.emerald500,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray400,
  },
  tabTextActive: {
    color: COLORS.emerald600,
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
    color: COLORS.gray400,
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
    color: COLORS.gray600,
  },
  countBadge: {
    backgroundColor: COLORS.gray200,
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.gray600,
  },
  pipelineCards: {
    gap: 12,
  },
  candidateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  candidateAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.emerald600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  candidateAvatarText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  candidateName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  candidateMatch: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.emerald600,
  },
  candidateMatchMuted: {
    color: COLORS.gray400,
  },
  jobsList: {
    gap: 12,
  },
  jobCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
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
    color: COLORS.gray900,
  },
  jobLocation: {
    fontSize: 12,
    color: COLORS.gray500,
    marginTop: 2,
  },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusActive: {
    backgroundColor: COLORS.emeraldBg,
  },
  statusDraft: {
    backgroundColor: COLORS.amberBg,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusActiveText: {
    color: COLORS.emerald700,
  },
  statusDraftText: {
    color: COLORS.amber700,
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
    color: COLORS.gray500,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 88,
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.emerald500,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
});
