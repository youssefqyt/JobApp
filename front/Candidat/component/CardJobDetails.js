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
import { useCandidateTheme } from '../../context/CandidateThemeContext';

// ---- Fallback data, used only if no `job` prop is passed (e.g. previewing
// this screen in isolation). In normal use, `job` comes from whichever job
// card the user tapped on the Home screen. ----
const DEFAULT_JOB = {
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

export default function JobDetailsScreen({ job, onBack, navigation, onGenerateCv }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);

  // Merge with defaults so the screen doesn't break if a card only has
  // partial data (e.g. missing `missions` or `missingSkill`).
  const data = { ...DEFAULT_JOB, ...job };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation?.goBack?.();
    }
  };

  const handleGenerateCv = () => {
    if (onGenerateCv) {
      onGenerateCv(data);
    } else {
      // TODO: wire this up to your CV-generation flow / navigation route
      console.log('Generate CV for job:', data.title, '@', data.company);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={colors.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <View style={styles.backRow}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <MaterialIcons name="arrow-back" size={22} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* Job Overview */}
        <View style={styles.overview}>
          <CompanyLogo initials={data.companyInitials} colors={colors} styles={styles} />

          <Text style={styles.jobTitle}>{data.title}</Text>

          <View style={styles.companyRow}>
            <Text style={styles.companyName}>{data.company}</Text>
            {data.verified && (
              <MaterialIcons name="check-circle" size={16} color={colors.tertiary} />
            )}
          </View>

          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={16} color={colors.onSurfaceVariant} />
            <Text style={styles.locationText}>{data.location}</Text>
          </View>

          {data.missingSkill && (
            <MissingSkillsCard skill={data.missingSkill} colors={colors} styles={styles} />
          )}

          {/* Build a CV tailored to this specific job announcement */}
          <TouchableOpacity
            style={styles.generateCvButton}
            activeOpacity={0.85}
            onPress={handleGenerateCv}
          >
            <MaterialIcons name="auto-awesome" size={18} color={colors.onPrimary} />
            <Text style={styles.generateCvButtonText}>Générer un CV pour cette offre</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Type de contrat</Text>
            <Text style={styles.statValue}>{data.contractType}</Text>
          </View>
        </View>

        {/* Description */}
        {data.description ? (
          <Section title="Description du poste" styles={styles}>
            <Text style={styles.paragraph}>{data.description}</Text>
          </Section>
        ) : null}

        {/* Missions */}
        {data.missions?.length ? (
          <Section title="Missions" styles={styles}>
            {data.missions.map((mission, index) => (
              <View key={index} style={styles.bulletRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>{mission}</Text>
              </View>
            ))}
          </Section>
        ) : null}

        {/* Requirements */}
        {data.skills?.length ? (
          <Section title="Profil recherché" last styles={styles}>
            <View style={styles.skillsRow}>
              {data.skills.map((skill) => (
                <View key={skill} style={styles.skillPill}>
                  <Text style={styles.skillPillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </Section>
        ) : null}
      </ScrollView>

      {/* Footer / Apply Button */}
      <View style={styles.footer}>
        <View style={styles.footerMetaRow}>
          <Text style={styles.footerMetaMuted}>{data.postedAgo}</Text>
          <Text style={styles.footerMetaBold}>{data.applicantsCount} candidatures</Text>
        </View>
        <TouchableOpacity style={styles.applyButton} activeOpacity={0.85}>
          <Text style={styles.applyButtonText}>Postuler maintenant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ---- Sub-components ----
// These take `colors`/`styles` as props (rather than reading context
// themselves) so they stay in sync with the parent's single theme read —
// same pattern as BottomNavBar deriving styles once from useCandidateTheme().

function CompanyLogo({ initials, styles }) {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>{initials}</Text>
    </View>
  );
}

function MissingSkillsCard({ skill, colors, styles }) {
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
        <MaterialIcons name="arrow-forward" size={14} color={colors.tertiary} />
      </TouchableOpacity>
    </View>
  );
}

function Section({ title, children, last, styles }) {
  return (
    <View style={[styles.section, last && { marginBottom: 0 }]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

// ---- Styles ----
// Built from theme tokens instead of a hardcoded palette, mirroring
// BottomNavBar's getStyles(colors) pattern so this screen follows the
// same light/dark switch.
//
// Token mapping used (extend CandidateThemeContext if any are missing):
//   background              -> page background
//   surfaceContainerLowest  -> cards / raised surfaces (white in light mode)
//   surfaceContainerHigh    -> subtle chips / pills (was slate100)
//   onSurface                -> primary text (was slate900/800)
//   onSurfaceVariant         -> secondary/muted text (was slate600/500/700)
//   outline                  -> faint borders (was slate400 tint use)
//   outlineVariant           -> hairline borders (was slate100/200)
//   primary                  -> brand accent
//   tertiary / tertiaryContainer / onTertiaryContainer -> "success/verified"
//     accent (was emerald*), used for company name, verified check,
//     logo bg, bullets, training link, apply button
//   error / errorContainer / onErrorContainer -> "missing skill" warning
//     accent (was red*)
const getStyles = (colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    shadowColor: '#000',
    shadowOpacity: colors.isDark ? 0 : 0.05,
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
    backgroundColor: colors.tertiaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onTertiaryContainer,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.onSurface,
    textAlign: 'center',
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  companyName: {
    color: colors.tertiary,
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
    color: colors.onSurfaceVariant,
    fontSize: 13,
  },
  missingSkillsCard: {
    marginTop: 16,
    width: '100%',
    backgroundColor: colors.errorContainer,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  missingSkillsTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.onSurface,
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
    color: colors.onSurface,
    fontWeight: '600',
    fontSize: 14,
  },
  missingSkillNote: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    marginTop: 2,
  },
  missingSkillsRight: {
    alignItems: 'flex-end',
  },
  missingSkillGapLabel: {
    color: colors.error,
    fontWeight: '700',
    fontSize: 13,
  },
  gapBarTrack: {
    width: 96,
    height: 6,
    backgroundColor: colors.outlineVariant,
    borderRadius: 999,
    marginTop: 4,
    overflow: 'hidden',
  },
  gapBarFill: {
    height: '100%',
    backgroundColor: colors.error,
    borderRadius: 999,
  },
  trainingLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  trainingLinkText: {
    color: colors.tertiary,
    fontWeight: '600',
    fontSize: 13,
  },

  // "Build a CV for this job" button, placed right under the
  // Compétences manquantes card.
  generateCvButton: {
    marginTop: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: colors.primary,
    shadowOpacity: colors.isDark ? 0.15 : 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  generateCvButtonText: {
    color: colors.onPrimary,
    fontWeight: '700',
    fontSize: 14,
  },

  statsGrid: {
    marginTop: 32,
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.outline,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.onSurfaceVariant,
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
    backgroundColor: colors.tertiary,
    marginTop: 7,
    flexShrink: 0,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: colors.onSurfaceVariant,
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
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 999,
  },
  skillPillText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surfaceContainerLowest + 'E6', // ~90% opacity
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
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
    color: colors.outline,
  },
  footerMetaBold: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  applyButton: {
    width: '100%',
    backgroundColor: colors.tertiary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: colors.tertiary,
    shadowOpacity: colors.isDark ? 0.15 : 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  applyButtonText: {
    color: colors.onTertiary,
    fontWeight: '700',
    fontSize: 16,
  },
});