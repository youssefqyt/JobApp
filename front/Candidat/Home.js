import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import JobCard from './component/CardJob';
import BottomNavBar from './component/Navbar';
import FilterModal from './component/FilterModal';
import JobDetailsScreen from './component/CardJobDetails'; // adjust path if this file lives elsewhere
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
// Each job now also carries the extra fields JobDetailsScreen needs
// (description, missions, skills, etc.) so tapping a card can hand the
// whole record straight to the details screen.
const JOBS = [
  {
    initials: 'TH',
    title: 'Développeur Full Stack',
    company: 'Telnet Holding',
    companyInitials: 'TH',
    verified: true,
    location: 'Lac II, Tunis',
    tags: [
      { label: 'CDI' },
      { label: 'Télétravail', variant: 'highlight' },
    ],
    postedAt: 'Il y a 2h',
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
  },
  {
    initials: 'BI',
    title: 'Data Scientist',
    company: 'BIAT',
    companyInitials: 'BI',
    verified: true,
    location: 'Les Berges du Lac',
    tags: [
      { label: 'CDI' },
    ],
    postedAt: 'Il y a 5h',
    contractType: 'CDI',
    postedAgo: 'Publié il y a 5 heures',
    applicantsCount: 42,
    missingSkill: {
      name: 'Deep Learning',
      note: 'Niveau requis non atteint',
      gapLabel: 'Lacune - 15%',
      gapPercent: 15,
    },
    description:
      "En tant que Data Scientist chez BIAT, vous exploiterez les données pour développer des modèles prédictifs et accompagner les décisions stratégiques de la banque.",
    missions: [
      'Conception de modèles de machine learning pour la détection de fraude.',
      'Analyse et nettoyage de larges volumes de données.',
      'Présentation des résultats aux équipes métier.',
    ],
    skills: ['Python', 'SQL', 'Scikit-learn', 'TensorFlow', 'Power BI'],
  },
  {
    initials: 'VM',
    title: 'DevOps Engineer',
    company: 'Vermeg',
    companyInitials: 'VM',
    verified: true,
    location: 'El Ghazala, Ariana',
    tags: [
      { label: 'CDD' },
      { label: 'Télétravail', variant: 'highlight' },
    ],
    postedAt: 'Il y a 1j',
    contractType: 'CDD • Télétravail',
    postedAgo: 'Publié il y a 1 jour',
    applicantsCount: 63,
    missingSkill: {
      name: 'Kubernetes',
      note: 'Niveau requis non atteint',
      gapLabel: 'Lacune - 25%',
      gapPercent: 25,
    },
    description:
      "En tant que DevOps Engineer chez Vermeg, vous serez responsable de l'automatisation et de la fiabilité de nos pipelines de déploiement pour nos solutions logicielles financières.",
    missions: [
      'Mise en place et maintenance des pipelines CI/CD.',
      'Gestion de l\'infrastructure cloud et conteneurisée.',
      'Amélioration continue de la supervision et des alertes.',
    ],
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
  },
  {
    initials: 'OC',
    title: 'UI/UX Designer',
    company: 'Orange Tunisie',
    companyInitials: 'OC',
    verified: true,
    location: 'Centre Urbain Nord, Tunis',
    tags: [
      { label: 'CDI' },
      { label: 'Télétravail', variant: 'highlight' },
    ],
    postedAt: 'Il y a 3h',
    contractType: 'CDI • Télétravail',
    postedAgo: 'Publié il y a 3 heures',
    applicantsCount: 38,
    missingSkill: {
      name: 'Design System',
      note: 'Niveau requis non atteint',
      gapLabel: 'Lacune - 10%',
      gapPercent: 10,
    },
    description:
      "En tant que UI/UX Designer chez Orange Tunisie, vous concevrez des interfaces intuitives et accessibles pour nos applications mobiles et web grand public.",
    missions: [
      'Création de maquettes et prototypes interactifs (Figma).',
      'Conduite de tests utilisateurs et itérations sur les designs.',
      'Contribution au design system interne.',
    ],
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design System'],
  },
  {
    initials: 'SS',
    title: 'Ingénieur Cybersécurité',
    company: 'SwissPost Solutions',
    companyInitials: 'SS',
    verified: true,
    location: 'Technopark El Ghazala',
    tags: [
      { label: 'CDD' },
    ],
    postedAt: 'Il y a 6h',
    contractType: 'CDD',
    postedAgo: 'Publié il y a 6 heures',
    applicantsCount: 29,
    missingSkill: {
      name: 'SOC / SIEM',
      note: 'Niveau requis non atteint',
      gapLabel: 'Lacune - 30%',
      gapPercent: 30,
    },
    description:
      "En tant qu'Ingénieur Cybersécurité chez SwissPost Solutions, vous protégerez l'infrastructure IT et les données sensibles contre les menaces internes et externes.",
    missions: [
      'Surveillance et analyse des incidents de sécurité (SOC).',
      'Déploiement de solutions de sécurité (firewalls, SIEM).',
      'Réalisation d\'audits de vulnérabilité et tests d\'intrusion.',
    ],
    skills: ['Python', 'Linux', 'SIEM', 'Network Security', 'ISO 27001'],
  },
  {
    initials: 'MG',
    title: 'Chef de Produit Digital',
    company: 'MAGHIM',
    companyInitials: 'MG',
    verified: true,
    location: 'Sfax, Tunisie',
    tags: [
      { label: 'CDI' },
    ],
    postedAt: 'Il y a 8h',
    contractType: 'CDI',
    postedAgo: 'Publié il y a 8 heures',
    applicantsCount: 17,
    missingSkill: {
      name: 'Growth Hacking',
      note: 'Niveau requis non atteint',
      gapLabel: 'Lacune - 5%',
      gapPercent: 5,
    },
    description:
      "En tant que Chef de Produit Digital chez MAGHIM, vous piloterez la feuille de route de nos solutions SaaS destinées aux PME tunisiennes.",
    missions: [
      'Définition de la vision produit et priorisation du backlog.',
      'Analyse des métriques produit et optimisation de la rétention.',
      'Coordination avec les équipes tech, marketing et commercial.',
    ],
    skills: ['Product Strategy', 'Agile', 'Analytics', 'A/B Testing', 'JIRA'],
  },
];

export default function Home({ activeTab, onTabChange, onNotificationPress, onAvatarPress }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const toastOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (savedToast) {
      Animated.sequence([
        Animated.timing(toastOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.delay(2500),
        Animated.timing(toastOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(() => setSavedToast(false));
    }
  }, [savedToast]);

  const handleSave = () => {
    setSavedToast(true);
  };

  // Show the details screen full-screen in place of the list when a
  // card has been tapped.
  if (selectedJob) {
    return (
      <JobDetailsScreen
        job={selectedJob}
        onBack={() => setSelectedJob(null)}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Saved toast notification */}
      <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
        <Svg width={16} height={16} viewBox="0 0 24 24" fill={colors.primary}>
          <Path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </Svg>
        <Text style={styles.toastText}>Offre enregistrée dans "Recherche"</Text>
      </Animated.View>

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
              <TouchableOpacity
                style={styles.bellWrapper}
                activeOpacity={0.7}
                onPress={onNotificationPress}
              >
                <BellIcon color={colors.onSurfaceVariant} />
                <View style={styles.bellDot} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.avatar}
                activeOpacity={0.7}
                onPress={onAvatarPress}
              >
                <Text style={styles.avatarText}>AH</Text>
              </TouchableOpacity>
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
            {!showAll && (
              <TouchableOpacity activeOpacity={0.7} onPress={() => setShowAll(true)}>
                <Text style={styles.voirTout}>Voir tout</Text>
              </TouchableOpacity>
            )}
          </View>

          {(showAll ? JOBS : JOBS.slice(0, 3)).map((job, index) => (
            <JobCard
              key={index}
              initials={job.initials}
              title={job.title}
              company={job.company}
              verified={job.verified}
              location={job.location}
              tags={job.tags}
              postedAt={job.postedAt}
              onPress={() => setSelectedJob(job)}
              onPressBookmark={handleSave}
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
  toast: {
    position: 'absolute',
    bottom: 100,
    left: 24,
    right: 24,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surfaceContainerLowest,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  toastText: {
    flex: 1,
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '600',
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
