import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// If not using Expo: `npm install react-native-vector-icons`
// and import from 'react-native-vector-icons/MaterialIcons' instead.

// ---- Theme ----
const colors = {
  bg: '#F8FAFC',
  outerBg: '#EEF2FF',
  primary: '#4F46E5',
  secondary: '#E0E7FF',
  accentGreen: '#22C55E',
  emerald600: '#059669',
  emerald700: '#047857',
  emerald50: '#ECFDF5',
  emerald100: '#D1FAE5',
  red50: '#FEF2F2',
  red100: '#FEE2E2',
  red500: '#EF4444',
  red600: '#DC2626',
  slate900: '#0F172A',
  slate800: '#1E293B',
  slate700: '#334155',
  slate600: '#475569',
  slate500: '#64748B',
  slate400: '#94A3B8',
  slate200: '#E2E8F0',
  slate100: '#F1F5F9',
  white: '#FFFFFF',
};

// ---- Mock data (swap with real props / API data) ----
const job = {
  company: 'Telnet Holding',
  companyInitials: 'TH',
  title: 'Développeur Full Stack',
  verified: true,
  location: 'Lac II, Tunis',
  contractType: 'CDI • Télétravail',
  postedAgo: 'Publié il y a 2 heures',
  applicantsCount: 85,
  missingSkill: {
    name: 'AWS / Cloud',
    note: 'Niveau requis non atteint',
    gapLabel: 'Lacune - 20%',
    gapPercent: 20,
  },
  description:
    "En tant que Développeur Full Stack chez Telnet Holding, vous participerez activement au cycle de vie complet de nos applications innovantes. Vous travaillerez sur des projets stimulants mêlant technologies web modernes et systèmes critiques.",
  missions: [
    'Conception et développement de nouvelles fonctionnalités (React/Node.js).',
    'Maintenance évolutive et correction de bugs sur les plateformes existantes.',
    'Collaboration étroite avec les équipes Design et Product Owner.',
  ],
  skills: ['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Agile Scrum'],
};

export default function JobDetailsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <View style={styles.backRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack?.()}
          >
            <MaterialIcons name="arrow-back" size={22} color={colors.slate600} />
          </TouchableOpacity>
        </View>

        {/* Job Overview */}
        <View style={styles.overview}>
          <CompanyLogo initials={job.companyInitials} />

          <Text style={styles.jobTitle}>{job.title}</Text>

          <View style={styles.companyRow}>
            <Text style={styles.companyName}>{job.company}</Text>
            {job.verified && (
              <MaterialIcons name="check-circle" size={16} color={colors.accentGreen} />
            )}
          </View>

          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={16} color={colors.slate500} />
            <Text style={styles.locationText}>{job.location}</Text>
          </View>

          <MissingSkillsCard skill={job.missingSkill} />
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Type de contrat</Text>
            <Text style={styles.statValue}>{job.contractType}</Text>
          </View>
        </View>

        {/* Description */}
        <Section title="Description du poste">
          <Text style={styles.paragraph}>{job.description}</Text>
        </Section>

        {/* Missions */}
        <Section title="Missions">
          {job.missions.map((mission, index) => (
            <View key={index} style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>{mission}</Text>
            </View>
          ))}
        </Section>

        {/* Requirements */}
        <Section title="Profil recherché" last>
          <View style={styles.skillsRow}>
            {job.skills.map((skill) => (
              <View key={skill} style={styles.skillPill}>
                <Text style={styles.skillPillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </Section>
      </ScrollView>

      {/* Footer / Apply Button */}
      <View style={styles.footer}>
        <View style={styles.footerMetaRow}>
          <Text style={styles.footerMetaMuted}>{job.postedAgo}</Text>
          <Text style={styles.footerMetaBold}>{job.applicantsCount} candidatures</Text>
        </View>
        <TouchableOpacity style={styles.applyButton} activeOpacity={0.85}>
          <Text style={styles.applyButtonText}>Postuler maintenant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ---- Sub-components ----

function CompanyLogo({ initials }) {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>{initials}</Text>
    </View>
  );
}

function MissingSkillsCard({ skill }) {
  return (
    <View style={styles.missingSkillsCard}>
      <Text style={styles.missingSkillsTitle}>Compétences manquantes</Text>

      <View style={styles.missingSkillsRow}>
        <View style={styles.missingSkillsLeft}>
          <Text style={styles.missingSkillName}>{skill.name}</Text>
          <Text style={styles.missingSkillNote}>{skill.note}</Text>
        </View>
        <View style={styles.missingSkillsRight}>
          <Text style={styles.missingSkillGapLabel}>{skill.gapLabel}</Text>
          <View style={styles.gapBarTrack}>
            <View
              style={[styles.gapBarFill, { width: `${skill.gapPercent}%` }]}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.trainingLink} activeOpacity={0.7}>
        <Text style={styles.trainingLinkText}>Voir le plan de formation</Text>
        <MaterialIcons name="arrow-forward" size={14} color={colors.emerald600} />
      </TouchableOpacity>
    </View>
  );
}

function Section({ title, children, last }) {
  return (
    <View style={[styles.section, last && { marginBottom: 0 }]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

// ---- Styles ----
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 160,
  },
  backRow: {
    paddingTop: 8,
    marginBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate100,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  overview: {
    marginTop: 16,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.emerald50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.emerald100,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.emerald600,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.slate900,
    textAlign: 'center',
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  companyName: {
    color: colors.emerald600,
    fontWeight: '600',
    fontSize: 15,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  locationText: {
    color: colors.slate500,
    fontSize: 13,
  },
  missingSkillsCard: {
    marginTop: 16,
    width: '100%',
    backgroundColor: colors.red50,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.red100,
  },
  missingSkillsTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.slate900,
    marginBottom: 12,
    textAlign: 'left',
  },
  missingSkillsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  missingSkillsLeft: {
    alignItems: 'flex-start',
  },
  missingSkillName: {
    color: colors.slate800,
    fontWeight: '600',
    fontSize: 14,
  },
  missingSkillNote: {
    color: colors.slate500,
    fontSize: 11,
    marginTop: 2,
  },
  missingSkillsRight: {
    alignItems: 'flex-end',
  },
  missingSkillGapLabel: {
    color: colors.red600,
    fontWeight: '700',
    fontSize: 13,
  },
  gapBarTrack: {
    width: 96,
    height: 6,
    backgroundColor: colors.slate200,
    borderRadius: 999,
    marginTop: 4,
    overflow: 'hidden',
  },
  gapBarFill: {
    height: '100%',
    backgroundColor: colors.red500,
    borderRadius: 999,
  },
  trainingLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  trainingLinkText: {
    color: colors.emerald600,
    fontWeight: '600',
    fontSize: 13,
  },
  statsGrid: {
    marginTop: 32,
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate100,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.slate800,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.slate900,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.slate600,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.emerald600,
    marginTop: 7,
    flexShrink: 0,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: colors.slate600,
    lineHeight: 20,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.slate100,
    borderRadius: 999,
  },
  skillPillText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.slate700,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopWidth: 1,
    borderTopColor: colors.slate100,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  footerMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  footerMetaMuted: {
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.slate400,
  },
  footerMetaBold: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.slate500,
  },
  applyButton: {
    width: '100%',
    backgroundColor: colors.emerald600,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: colors.emerald600,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  applyButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});