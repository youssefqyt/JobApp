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
import BottomNavBar from './component/Navbar';

const COLORS = {
  primary: '#006c49',
  primaryContainer: '#10b981',
  onPrimary: '#ffffff',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  surface: '#f8f9fa',
  surfaceBright: '#f8f9fa',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainerHigh: '#e7e8e9',
  outlineVariant: '#bbcabf',
  secondaryContainer: '#adedd3',
  onSecondaryContainer: '#306d58',
};

// ---- Static data (matches the HTML) ----
const SPECIALTIES = [
  { key: 'medicine', label: 'Médecine', icon: 'medical-services' },
  { key: 'nursing', label: 'Infirmier', icon: 'health-and-safety' },
  { key: 'engineering', label: 'Ingénierie', icon: 'engineering' },
  { key: 'education', label: 'Éducation', icon: 'school' },
  { key: 'finance', label: 'Finance', icon: 'payments' },
  { key: 'it', label: 'IT & Tech', icon: 'terminal' },
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
            color={active ? COLORS.onPrimary : COLORS.primary}
          />
        </View>
        <Text style={[styles.specialtyLabel, active && styles.specialtyLabelActive]}>
          {label}
        </Text>
      </View>
      <MaterialIcons
        name="chevron-right"
        size={18}
        color={active ? COLORS.primary : 'rgba(60,74,66,0.4)'}
      />
    </TouchableOpacity>
  );
}

function MockInterviewItem({ icon, title, modules, minutes }) {
  return (
    <TouchableOpacity style={styles.mockItem} activeOpacity={0.8}>
      <View style={styles.mockLeft}>
        <View style={styles.mockIconWrap}>
          <MaterialIcons name={icon} size={22} color={COLORS.primary} />
        </View>
        <View style={styles.mockTextWrap}>
          <Text style={styles.mockTitle}>{title}</Text>
          <View style={styles.mockMetaRow}>
            <MaterialIcons name="view-module" size={13} color="rgba(60,74,66,0.7)" />
            <Text style={styles.mockMetaText}>{modules} modules</Text>
            <View style={styles.dotSeparator} />
            <MaterialIcons name="schedule" size={13} color="rgba(60,74,66,0.7)" />
            <Text style={styles.mockMetaText}>{minutes} min</Text>
          </View>
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={20} color={COLORS.onSurfaceVariant} />
    </TouchableOpacity>
  );
}

export default function Search({ activeTab, onTabChange }) {
  const [activeSpecialty, setActiveSpecialty] = useState('nursing');
  const [query, setQuery] = useState('');

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
            color="rgba(60,74,66,0.7)"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Poste, entreprise ou mot-clé..."
            placeholderTextColor="rgba(60,74,66,0.5)"
            value={query}
            onChangeText={setQuery}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity style={styles.tuneButton}>
            <MaterialIcons name="tune" size={18} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* Spécialités */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Spécialités</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllLink}>Voir tout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.specialtyList}>
          {SPECIALTIES.map((s) => (
            <SpecialtyRow
              key={s.key}
              label={s.label}
              icon={s.icon}
              active={activeSpecialty === s.key}
              onPress={() => setActiveSpecialty(s.key)}
            />
          ))}
        </View>

        {/* Préparation & Simulation */}
        <View style={styles.prepCard}>
          <View style={styles.prepHeader}>
            <View style={styles.prepHeaderLeft}>
              <View style={styles.prepIconWrap}>
                <MaterialIcons name="psychology" size={22} color={COLORS.onPrimary} />
              </View>
              <View>
                <Text style={styles.prepTitle}>Préparation & Simulation</Text>
                <Text style={styles.prepSubtitle}>Boostez vos chances avec notre IA</Text>
              </View>
            </View>
            <MaterialIcons
              name="auto-awesome"
              size={32}
              color="rgba(255,255,255,0.2)"
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
            <MaterialIcons name="bar-chart" size={20} color="rgba(0,108,73,0.4)" />
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
                      <MaterialIcons name="star" size={13} color={COLORS.primary} />
                      <Text style={styles.ratingText}>{r.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewDesc}>{r.desc}</Text>
                </View>
                <MaterialIcons name="more-vert" size={18} color="rgba(60,74,66,0.4)" />
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
            <MaterialIcons name="bookmark" size={20} color="rgba(0,108,73,0.4)" />
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
              <MaterialIcons name="bookmark" size={20} color={COLORS.primary} />
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 110,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 24,
  },

  // Search bar
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
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
    color: COLORS.onSurface,
    backgroundColor: COLORS.surface,
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
    color: COLORS.onSurface,
  },
  seeAllLink: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    textDecorationLine: 'underline',
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
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: 'rgba(187,202,191,0.4)',
  },
  specialtyRowActive: {
    backgroundColor: 'rgba(173,237,211,0.2)',
    borderColor: 'rgba(0,108,73,0.4)',
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
    backgroundColor: COLORS.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialtyIconWrapActive: {
    backgroundColor: COLORS.primary,
  },
  specialtyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  specialtyLabelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },

  // Prep card
  prepCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(187,202,191,0.6)',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  prepHeader: {
    backgroundColor: COLORS.primary,
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prepTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.onPrimary,
  },
  prepSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  prepBody: {
    backgroundColor: COLORS.surfaceBright,
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
    color: COLORS.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  newBadge: {
    backgroundColor: COLORS.secondaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  newBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.onSecondaryContainer,
    textTransform: 'uppercase',
  },
  mockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: 'rgba(187,202,191,0.5)',
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
    backgroundColor: COLORS.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mockTextWrap: {
    flex: 1,
  },
  mockTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  mockMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  mockMetaText: {
    fontSize: 11,
    color: 'rgba(60,74,66,0.7)',
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.outlineVariant,
    marginHorizontal: 2,
  },

  // Generic panel card (Entreprises / Offres)
  panelCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: 'rgba(187,202,191,0.6)',
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
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 12,
  },
  panelBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.onPrimary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  subLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(60,74,66,0.7)',
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
    backgroundColor: 'rgba(243,244,245,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(187,202,191,0.2)',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  companyChipIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(0,108,73,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyChipIconText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  companyChipLabel: {
    fontSize: 12,
    color: COLORS.onSurface,
  },
  reviewCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(243,244,245,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(187,202,191,0.2)',
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
    color: COLORS.onSurface,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  reviewDesc: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
  },
  seeMoreButton: {
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,108,73,0.2)',
    alignItems: 'center',
  },
  seeMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // Saved job
  savedJobCard: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(243,244,245,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(187,202,191,0.2)',
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
    backgroundColor: 'rgba(0,108,73,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedJobIconText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  savedJobTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  savedJobMeta: {
    fontSize: 12,
    color: 'rgba(60,74,66,0.7)',
    marginTop: 2,
  },
  savedJobBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  contractBadge: {
    backgroundColor: 'rgba(173,237,211,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  contractBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.onSecondaryContainer,
    textTransform: 'uppercase',
  },
  savedJobDate: {
    fontSize: 12,
    color: 'rgba(60,74,66,0.7)',
    marginLeft: 'auto',
  },
});