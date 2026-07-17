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
import JobCard from './component/CardJob';
import BottomNavBar from './component/Navbar';
import { useCandidateTheme } from '../context/CandidateThemeContext'; // adjust relative path

// ---- Static data (matches the HTML) ----
const SPECIALTIES = [
  { key: 'medicine', label: 'Médecine', icon: 'medical-services' },
  { key: 'nursing', label: 'Infirmier', icon: 'health-and-safety' },
  { key: 'engineering', label: 'Ingénierie', icon: 'engineering' },
  { key: 'education', label: 'Éducation', icon: 'school' },
  { key: 'finance', label: 'Finance', icon: 'payments' },
  { key: 'it', label: 'IT & Tech', icon: 'terminal' },
  { key: 'marketing', label: 'Marketing & Communication', icon: 'campaign' },
  { key: 'law', label: 'Droit & Juridique', icon: 'gavel' },
  { key: 'commerce', label: 'Commerce & Vente', icon: 'shopping-cart' },
  { key: 'architecture', label: 'Architecture & Design', icon: 'draw' },
  { key: 'accounting', label: 'Comptabilité & Gestion', icon: 'account-balance' },
  { key: 'hr', label: 'Ressources Humaines', icon: 'people' },
  { key: 'logistics', label: 'Logistique & Transport', icon: 'local-shipping' },
  { key: 'communication', label: 'Communication & Médias', icon: 'mic' },
  { key: 'pharma', label: 'Pharmacie & Biotech', icon: 'biotech' },
  { key: 'tourism', label: 'Tourisme & Hôtellerie', icon: 'hotel' },
];

const BEST_OFFERS = [
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
  },
];

const MOCK_INTERVIEWS = [
  {
    icon: 'architecture',
    title: 'Design Industriel & Prototypage',
    modules: 12,
    minutes: 45,
  },
  {
    icon: 'settings-suggest',
    title: 'Maintenance des Systèmes',
    modules: 8,
    minutes: 30,
  },
  {
    icon: 'precision-manufacturing',
    title: 'Automatisation & Robotique',
    modules: 15,
    minutes: 60,
  },
];

const TOP_COMPANIES = [
  { initials: 'TT', name: 'Tunis Tech' },
  { initials: 'SI', name: 'Smart Ind.' },
  { initials: 'TH', name: 'Telnet' },
  { initials: 'EN', name: 'Ennakl' },
];

const REVIEWS = [
  { name: 'Tunis Tech Corp', rating: '4.8', desc: 'Leader innovation technologique Tunis' },
  { name: 'Smart Industries', rating: '4.2', desc: 'Expert solutions industrielles durables' },
  { name: 'Telnet Holding', rating: '4.5', desc: 'Ingénierie et conseil en technologies' },
];

const SAVED_JOB = {
  initials: 'TH',
  title: 'Développeur Full Stack',
  company: 'Telnet Holding',
  location: 'Tunis',
  contract: 'CDI',
  postedAt: 'Il y a 2 jours',
};

export default function Search({ activeTab, onTabChange, onOpenSimulation }) {
  const [activeSpecialty, setActiveSpecialty] = useState('nursing');
  const [query, setQuery] = useState('');
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);
  const [showAllOffers, setShowAllOffers] = useState(false);
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);

  function SpecialtyRow({ label, icon, active, onPress }) {
    return (
      <TouchableOpacity
        style={[styles.specialtyRow, active && styles.specialtyRowActive]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.specialtyLeft}>
          <View style={[styles.specialtyIconWrap, active && styles.specialtyIconWrapActive]}>
            <MaterialIcons
              name={icon}
              size={20}
              color={active ? colors.onPrimary : colors.primary}
            />
          </View>
          <Text style={[styles.specialtyLabel, active && styles.specialtyLabelActive]}>
            {label}
          </Text>
        </View>
        <MaterialIcons
          name="chevron-right"
          size={18}
          color={active ? colors.primary : colors.textDisabled}
        />
      </TouchableOpacity>
    );
  }

  function MockInterviewItem({ icon, title, modules, minutes }) {
    return (
      <TouchableOpacity
        style={styles.mockItem}
        activeOpacity={0.8}
        onPress={() =>
          onOpenSimulation && onOpenSimulation({ icon, title, modules, minutes })
        }
      >
        <View style={styles.mockLeft}>
          <View style={styles.mockIconWrap}>
            <MaterialIcons name={icon} size={22} color={colors.primary} />
          </View>
          <View style={styles.mockTextWrap}>
            <Text style={styles.mockTitle}>{title}</Text>
            <View style={styles.mockMetaRow}>
              <MaterialIcons name="view-module" size={13} color={colors.textMuted} />
              <Text style={styles.mockMetaText}>{modules} modules</Text>
              <View style={styles.dotSeparator} />
              <MaterialIcons name="schedule" size={13} color={colors.textMuted} />
              <Text style={styles.mockMetaText}>{minutes} min</Text>
            </View>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={20} color={colors.onSurfaceVariant} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Recherche</Text>

        {/* Search bar */}
        <View style={styles.searchWrap}>
          <MaterialIcons
            name="search"
            size={20}
            color={colors.textMuted}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Recherche Spécialités"
            placeholderTextColor={colors.textFaint}
            value={query}
            onChangeText={setQuery}
            underlineColorAndroid="transparent"
          />
        </View>

        {/* Spécialités */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Spécialités</Text>
          {!showAllSpecialties && (
            <TouchableOpacity onPress={() => setShowAllSpecialties(true)}>
              <Text style={styles.seeAllLink}>Voir tout</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.specialtyList}>
          {(showAllSpecialties ? SPECIALTIES : SPECIALTIES.slice(0, 6)).map((s) => (
            <SpecialtyRow
              key={s.key}
              label={s.label}
              icon={s.icon}
              active={activeSpecialty === s.key}
              onPress={() => setActiveSpecialty(s.key)}
            />
          ))}
        </View>

        {/* Meilleures offres */}
        <View style={styles.bestOffersSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Meilleures offres</Text>
            {!showAllOffers && (
              <TouchableOpacity onPress={() => setShowAllOffers(true)}>
                <Text style={styles.seeAllLink}>Voir tout</Text>
              </TouchableOpacity>
            )}
          </View>
          {(showAllOffers ? BEST_OFFERS : BEST_OFFERS.slice(0, 3)).map((job, index) => (
            <JobCard
              key={index}
              initials={job.initials}
              title={job.title}
              company={job.company}
              verified={job.verified}
              location={job.location}
              tags={job.tags}
              postedAt={job.postedAt}
            />
          ))}
        </View>

        {/* Préparation & Simulation */}
        <View style={styles.prepCard}>
          <View style={styles.prepHeader}>
            <View style={styles.prepHeaderLeft}>
              <View style={styles.prepIconWrap}>
                <MaterialIcons name="psychology" size={22} color={colors.onPrimary} />
              </View>
              <View>
                <Text style={styles.prepTitle}>Préparation & Simulation</Text>
                <Text style={styles.prepSubtitle}>Boostez vos chances avec notre IA</Text>
              </View>
            </View>
            <MaterialIcons
              name="auto-awesome"
              size={32}
              color={colors.overlayOnPrimarySoft}
            />
          </View>

          <View style={styles.prepBody}>
            <View style={styles.prepBodyHeaderRow}>
              <Text style={styles.prepBodyLabel}>MOCK INTERVIEWS POPULAIRES</Text>
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>NOUVEAU</Text>
              </View>
            </View>
            {MOCK_INTERVIEWS.map((item) => (
              <MockInterviewItem key={item.title} {...item} />
            ))}
          </View>
        </View>

        {/* Entreprises */}
        <View style={styles.panelCard}>
          <View style={styles.panelHeaderRow}>
            <View style={styles.panelBadge}>
              <Text style={styles.panelBadgeText}>ENTREPRISES</Text>
            </View>
            <MaterialIcons name="bar-chart" size={20} color={colors.primaryTintStrong} />
          </View>

          <Text style={styles.subLabel}>TOP ENTREPRISES</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.companiesRow}
          >
            {TOP_COMPANIES.map((c) => (
              <TouchableOpacity key={c.initials} style={styles.companyChip}>
                <View style={styles.companyChipIcon}>
                  <Text style={styles.companyChipIconText}>{c.initials}</Text>
                </View>
                <Text style={styles.companyChipLabel}>{c.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={[styles.subLabel, { marginTop: 20 }]}>DERNIERS AVIS</Text>
          <View style={{ gap: 10 }}>
            {REVIEWS.map((r) => (
              <View key={r.name} style={styles.reviewCard}>
                <View style={styles.reviewTextWrap}>
                  <View style={styles.reviewTopRow}>
                    <Text style={styles.reviewName}>{r.name}</Text>
                    <View style={styles.ratingRow}>
                      <MaterialIcons name="star" size={13} color={colors.primary} />
                      <Text style={styles.ratingText}>{r.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewDesc}>{r.desc}</Text>
                </View>
                <MaterialIcons name="more-vert" size={18} color={colors.textDisabled} />
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>Voir tous les avis</Text>
          </TouchableOpacity>
        </View>

        {/* Offres Enregistrées */}
        <View style={[styles.panelCard, { marginTop: 24 }]}>
          <View style={styles.panelHeaderRow}>
            <View style={styles.panelBadge}>
              <Text style={styles.panelBadgeText}>OFFRES ENREGISTRÉES</Text>
            </View>
            <MaterialIcons name="bookmark" size={20} color={colors.primaryTintStrong} />
          </View>

          <View style={styles.savedJobCard}>
            <View style={styles.savedJobTopRow}>
              <View style={styles.savedJobLeft}>
                <View style={styles.savedJobIcon}>
                  <Text style={styles.savedJobIconText}>{SAVED_JOB.initials}</Text>
                </View>
                <View>
                  <Text style={styles.savedJobTitle}>{SAVED_JOB.title}</Text>
                  <Text style={styles.savedJobMeta}>
                    {SAVED_JOB.company} • {SAVED_JOB.location}
                  </Text>
                </View>
              </View>
              <MaterialIcons name="bookmark" size={20} color={colors.primary} />
            </View>
            <View style={styles.savedJobBottomRow}>
              <View style={styles.contractBadge}>
                <Text style={styles.contractBadgeText}>{SAVED_JOB.contract}</Text>
              </View>
              <Text style={styles.savedJobDate}>{SAVED_JOB.postedAt}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>Voir toutes les offres</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavBar initialTab={activeTab || 'Recherche'} onTabChange={onTabChange} />
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 110,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 24,
  },

  // Search bar
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.onSurface,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 0,
    borderColor: 'transparent',
    outlineStyle: 'none',
    outlineWidth: 0,
    outlineColor: 'transparent',
  },
  tuneButton: {
    padding: 8,
  },

  // Section header
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
  },
  seeAllLink: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },

  // Best offers section
  bestOffersSection: {
    marginBottom: 32,
  },

  // Specialty rows
  specialtyList: {
    gap: 10,
    marginBottom: 32,
  },
  specialtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.borderFaint,
  },
  specialtyRowActive: {
    backgroundColor: colors.secondaryContainerFaint,
    borderColor: colors.primaryTintStrong,
  },
  specialtyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  specialtyIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialtyIconWrapActive: {
    backgroundColor: colors.primary,
  },
  specialtyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  specialtyLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },

  // Prep card
  prepCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  prepHeader: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  prepHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  prepIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.overlayOnPrimarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prepTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  prepSubtitle: {
    fontSize: 12,
    color: colors.overlayOnPrimaryStrong,
    marginTop: 2,
  },
  prepBody: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: 20,
  },
  prepBodyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  prepBodyLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  newBadge: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  newBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.onSecondaryContainer,
    textTransform: 'uppercase',
  },
  mockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: 12,
  },
  mockLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  mockIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mockTextWrap: {
    flex: 1,
  },
  mockTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  mockMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  mockMetaText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.outlineVariant,
    marginHorizontal: 2,
  },

  // Generic panel card (Entreprises / Offres)
  panelCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  panelHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  panelBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 12,
  },
  panelBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onPrimary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  subLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  companiesRow: {
    flexDirection: 'row',
  },
  companyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceFaintMedium,
    borderWidth: 1,
    borderColor: colors.borderFainter,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  companyChipIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.primaryTintFaint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyChipIconText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  companyChipLabel: {
    fontSize: 12,
    color: colors.onSurface,
  },
  reviewCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    borderRadius: 16,
    backgroundColor: colors.surfaceFaint,
    borderWidth: 1,
    borderColor: colors.borderFainter,
  },
  reviewTextWrap: {
    flex: 1,
  },
  reviewTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  reviewDesc: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  seeMoreButton: {
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primaryTintMedium,
    alignItems: 'center',
  },
  seeMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },

  // Saved job
  savedJobCard: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.surfaceFaint,
    borderWidth: 1,
    borderColor: colors.borderFainter,
  },
  savedJobTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  savedJobLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  savedJobIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.primaryTintFaint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedJobIconText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  savedJobTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  savedJobMeta: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  savedJobBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  contractBadge: {
    backgroundColor: colors.secondaryContainerFaint,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  contractBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSecondaryContainer,
    textTransform: 'uppercase',
  },
  savedJobDate: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: 'auto',
  },
});