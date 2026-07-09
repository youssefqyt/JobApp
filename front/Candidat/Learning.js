import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import BottomNavBar from './component/Navbar';
import { useCandidateTheme } from '../context/CandidateThemeContext'; // adjust relative path

// ---- Icons ----

const SchoolIcon = ({ color, size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13.5L4.5 12.6V16c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-3.4L12 16.5z" />
  </Svg>
);

const PsychologyIcon = ({ color, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7zm-1 19h2a1 1 0 001-1v-1h-4v1a1 1 0 001 1z" />
  </Svg>
);

const PlayIcon = ({ color, size = 18 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M8 5v14l11-7z" />
  </Svg>
);

const StarIcon = ({ color, size = 14 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </Svg>
);

const ArrowIcon = ({ color, size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </Svg>
);

// ---- Data ----

const COURSES = [
  {
    title: 'Docker & Kubernetes Masterclass',
    provider: 'Udemy',
    rating: '4.8',
    duration: '14h',
    students: '18k inscrits',
  },
  {
    title: 'AWS Solutions Architect',
    provider: 'AWS Training',
    rating: '4.9',
    duration: '20h',
    students: '42k inscrits',
  },
  {
    title: 'CI/CD avec GitHub Actions',
    provider: 'GitHub Lab',
    rating: '4.7',
    duration: '8h',
    students: '5k inscrits',
  },
];

const MASTERED_SKILLS = [
  { label: 'React.js', percent: 85 },
  { label: 'Node.js', percent: 78 },
  { label: 'Python', percent: 65 },
  { label: 'SQL/PostgreSQL', percent: 72 },
];

const MISSING_SKILLS = [
  { label: 'Docker', percent: 15 },
  { label: 'Kubernetes', percent: 5 },
  { label: 'AWS / Cloud', percent: 20 },
];

// ---- Main Screen ----

export default function LearningHub({ activeTab, onTabChange }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);

  // ---- Sub-components (defined inside so they can use `colors`/`styles`) ----

  const CourseCard = ({ course }) => (
    <TouchableOpacity style={styles.courseCard} activeOpacity={0.8}>
      <View style={styles.courseTopRow}>
        <View style={styles.courseThumb} />
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
          <Text style={styles.courseProvider}>{course.provider}</Text>
        </View>
        <TouchableOpacity style={styles.playButton} activeOpacity={0.7}>
          <PlayIcon color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.courseMetaRow}>
        <View style={styles.courseRatingRow}>
          <StarIcon color={colors.yellow} />
          <Text style={styles.courseRatingText}>{course.rating}</Text>
        </View>
        <Text style={styles.courseMetaText}>{course.duration}</Text>
        <Text style={styles.courseMetaText}>{course.students}</Text>
      </View>
    </TouchableOpacity>
  );

  const SkillBar = ({ label, percent, variant }) => {
    const isGap = variant === 'gap';
    return (
      <View style={styles.skillBarWrapper}>
        <View style={styles.skillBarLabelRow}>
          <Text style={styles.skillBarLabel}>{label}</Text>
          <Text style={[styles.skillBarValue, { color: isGap ? colors.tertiary : colors.primary }]}>
            {isGap ? `Lacune - ${percent}%` : `${percent}%`}
          </Text>
        </View>
        <View style={styles.skillBarTrack}>
          <View
            style={[
              styles.skillBarFill,
              {
                width: `${percent}%`,
                backgroundColor: isGap ? colors.tertiaryContainer : colors.primaryContainer,
              },
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* ======== TOP APP BAR ======== */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Learning Hub</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ======== HEADER ======== */}
        <Text style={styles.subtitle}>Comblez vos lacunes, boostez votre carrière</Text>

        {/* ======== RECOMMENDED COURSES ======== */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderLeft}>
            <SchoolIcon color={colors.primary} />
            <Text style={styles.sectionTitle}>Formations recommandées</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.voirTout}>Tout voir</Text>
          </TouchableOpacity>
        </View>

        {COURSES.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}

        {/* ======== SKILL GAP ANALYZER ======== */}
        <View style={styles.analyzerCard}>
          <View style={styles.analyzerHeader}>
            <View style={styles.analyzerHeaderLeft}>
              <View style={styles.analyzerIconWrapper}>
                <PsychologyIcon color={colors.primary} />
              </View>
              <Text style={styles.sectionTitle}>Skill Gap Analyzer</Text>
            </View>
            <View style={styles.targetPill}>
              <View style={styles.targetDot} />
              <Text style={styles.targetPillText}>Cible : DevOps</Text>
            </View>
          </View>

          <View style={styles.skillsColumn}>
            <Text style={styles.columnLabel}>Compétences maîtrisées</Text>
            {MASTERED_SKILLS.map((skill, index) => (
              <SkillBar key={index} label={skill.label} percent={skill.percent} />
            ))}
          </View>

          <View style={styles.skillsColumn}>
            <Text style={styles.columnLabel}>Compétences à acquérir</Text>
            {MISSING_SKILLS.map((skill, index) => (
              <SkillBar key={index} label={skill.label} percent={skill.percent} variant="gap" />
            ))}
          </View>

          <View style={styles.analyzerFooter}>
            <Text style={styles.analyzerFooterText}>3 compétences manquantes identifiées</Text>
            <TouchableOpacity style={styles.planLink} activeOpacity={0.7}>
              <Text style={styles.planLinkText}>Plan de formation</Text>
              <ArrowIcon color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ======== BOTTOM NAV (same shared component) ======== */}
      <BottomNavBar initialTab={activeTab || 'Formation'} onTabChange={onTabChange} />
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    height: 64,
    paddingTop: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  topBarTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: -0.3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100, // room for nav bar
  },

  // ---- Header ----
  subtitle: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    marginBottom: 20,
  },

  // ---- Section header ----
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.onSurface,
    letterSpacing: -0.2,
  },
  voirTout: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },

  // ---- Course cards ----
  courseCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  courseTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  courseThumb: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: colors.surfaceContainerLow,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
    lineHeight: 18,
  },
  courseProvider: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  courseRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  courseRatingText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurface,
  },
  courseMetaText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },

  // ---- Skill Gap Analyzer ----
  analyzerCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 20,
    marginTop: 4,
    marginBottom: 24,
  },
  analyzerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 12,
  },
  analyzerHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  analyzerIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
  },
  targetDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  targetPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSecondaryContainer,
  },
  skillsColumn: {
    marginBottom: 20,
  },
  columnLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  skillBarWrapper: {
    marginBottom: 14,
  },
  skillBarLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  skillBarLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  skillBarValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  skillBarTrack: {
    height: 8,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 999,
    overflow: 'hidden',
  },
  skillBarFill: {
    height: '100%',
    borderRadius: 999,
  },
  analyzerFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  analyzerFooterText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.onSurfaceVariant,
  },
  planLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  planLinkText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});