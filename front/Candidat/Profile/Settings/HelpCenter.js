import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ---- Colors (from the Tailwind theme in the HTML) ----
const COLORS = {
  primary: '#006c49',
  onPrimary: '#ffffff',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  outline: '#6c7a71',
  outlineVariant: '#bbcabf',
  surface: '#f8f9fa',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f4f5',
  secondaryContainer: '#adedd3',
  onSecondaryContainer: '#306d58',
};

// ---- Category data ----
const CATEGORIES = [
  { key: 'compte', icon: 'person', label: 'Compte' },
  { key: 'candidatures', icon: 'work', label: 'Candidatures' },
  { key: 'securite', icon: 'security', label: 'Sécurité' },
  { key: 'paiements', icon: 'payments', label: 'Paiements' },
];

// ---- FAQ data ----
const FAQS = [
  {
    key: 'matching',
    question: 'Comment fonctionne le matching IA ?',
    answer:
      "Notre algorithme d'IA analyse en temps réel les compétences listées dans votre profil et les compare aux exigences spécifiques des offres d'emploi. Il prend en compte non seulement les mots-clés, mais aussi le contexte de votre expérience, votre localisation et vos préférences salariales pour vous proposer les opportunités les plus pertinentes. Plus votre profil est complet, plus le matching est précis.",
  },
  {
    key: 'verif-entreprise',
    question: 'Comment vérifier mon entreprise ?',
    answer:
      "Pour vérifier votre entreprise, rendez-vous dans les paramètres de votre profil recruteur et téléchargez un extrait Kbis ou une preuve d'identité fiscale valide. Notre équipe examinera vos documents sous 24 à 48 heures ouvrées.",
  },
  {
    key: 'modifier-cv',
    question: 'Comment modifier mon CV ?',
    answer:
      "Allez dans votre section 'Profil', cliquez sur l'onglet 'Documents' et sélectionnez 'Remplacer' sur votre CV actuel. Nous acceptons les formats PDF, DOC et DOCX.",
  },
  {
    key: 'multi-candidature',
    question: 'Puis-je postuler à plusieurs offres simultanément ?',
    answer:
      "Oui, il n'y a aucune limite au nombre de candidatures que vous pouvez envoyer. Cependant, nous vous conseillons de personnaliser votre lettre de motivation pour chaque poste afin d'augmenter vos chances.",
  },
];

function CategoryTile({ icon, label }) {
  return (
    <TouchableOpacity style={styles.categoryTile} activeOpacity={0.7}>
      <MaterialIcons name={icon} size={28} color={COLORS.primary} />
      <Text style={styles.categoryLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function FaqItem({ question, answer, expanded, onToggle }) {
  return (
    <View style={styles.faqCard}>
      <TouchableOpacity
        style={styles.faqHeader}
        activeOpacity={0.7}
        onPress={onToggle}
      >
        <Text style={styles.faqQuestion}>{question}</Text>
        <MaterialIcons
          name={expanded ? 'expand-less' : 'expand-more'}
          size={22}
          color={COLORS.primary}
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.faqBody}>
          <Text style={styles.faqAnswer}>{answer}</Text>
        </View>
      )}
    </View>
  );
}

export default function HelpCenter({ navigation }) {
  const [search, setSearch] = useState('');
  const [expandedKey, setExpandedKey] = useState('matching'); // first item open by default

  const filteredFaqs = FAQS.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFaq = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedKey((prev) => (prev === key ? null : key));
  };

  const handleContact = () => {
    // TODO: open mail composer, support chat, or contact screen
    console.log('Nous contacter pressed');
  };

  return (
    <View style={styles.root}>
      {/* TopAppBar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack?.()}
          accessibilityLabel="Retour"
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Centre d'aide</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Search Section */}
        <View style={styles.searchSection}>
          <Text style={styles.searchTitle}>
            Comment pouvons-nous vous aider ?
          </Text>
          <View style={styles.searchInputWrapper}>
            <MaterialIcons name="search" size={20} color={COLORS.outline} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher une question..."
              placeholderTextColor={COLORS.outline}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* Category Grid */}
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => (
            <CategoryTile key={cat.key} icon={cat.icon} label={cat.label} />
          ))}
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.faqSectionTitle}>Questions Fréquentes</Text>
          {filteredFaqs.length === 0 ? (
            <Text style={styles.noResultsText}>
              Aucune question ne correspond à votre recherche.
            </Text>
          ) : (
            filteredFaqs.map((faq) => (
              <FaqItem
                key={faq.key}
                question={faq.question}
                answer={faq.answer}
                expanded={expandedKey === faq.key}
                onToggle={() => toggleFaq(faq.key)}
              />
            ))
          )}
        </View>

        {/* Support CTA */}
        <View style={styles.ctaCard}>
          <View style={styles.ctaDecoCircle} />
          <Text style={styles.ctaTitle}>Besoin d'aide supplémentaire ?</Text>
          <Text style={styles.ctaSubtitle}>
            Nos conseillers sont disponibles du lundi au vendredi pour
            répondre à toutes vos questions techniques ou administratives.
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.85}
            onPress={handleContact}
          >
            <MaterialIcons name="mail" size={18} color={COLORS.onPrimary} />
            <Text style={styles.ctaButtonText}>Nous contacter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
  },
  backButton: {
    padding: 8,
    borderRadius: 999,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },

  // Search section
  searchSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  searchTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.onSurface,
    textAlign: 'center',
    marginBottom: 16,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.onSurface,
  },

  // Category grid
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  categoryTile: {
    width: '47%',
    padding: 16,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
    gap: 8,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onSurface,
  },

  // FAQ section
  faqSection: {
    gap: 12,
    marginBottom: 32,
  },
  faqSectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.onSurface,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    paddingVertical: 16,
  },
  faqCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onSurface,
    paddingRight: 12,
  },
  faqBody: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    borderTopWidth: 1,
    borderTopColor: COLORS.outlineVariant,
    paddingTop: 12,
  },
  faqAnswer: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.onSurfaceVariant,
  },

  // CTA card
  ctaCard: {
    padding: 28,
    borderRadius: 20,
    backgroundColor: COLORS.secondaryContainer,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  ctaDecoCircle: {
    position: 'absolute',
    top: -48,
    right: -48,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.primary,
    opacity: 0.1,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.onSecondaryContainer,
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 15,
    color: COLORS.onSecondaryContainer,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 999,
  },
  ctaButtonText: {
    color: COLORS.onPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});