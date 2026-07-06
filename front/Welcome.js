import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
  primary: '#006c49',
  primaryContainer: '#10b981',
  onPrimaryContainer: '#00422b',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  surface: '#f8f9fa',
  surfaceContainer: '#edeeef',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainerLowest: '#ffffff',
  outlineVariant: '#bbcabf',
};

const VALUE_PROPS = [
  {
    icon: 'verified',
    title: 'Entreprises vérifiées',
    description: "Postulez en toute sécurité auprès d'employeurs de confiance.",
  },
  {
    icon: 'bolt',
    title: 'Matching Intelligent',
    description: 'Des offres personnalisées selon vos compétences uniques.',
  },
  {
    icon: 'visibility',
    title: 'Visibilité Accrue',
    description: 'Faites-vous repérer par les meilleurs recruteurs de Tunisie.',
  },
];

// onGetStarted: () => void — fires on "Boostez votre carrière"
export default function Welcome({ onGetStarted }) {
  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="work" size={22} color={COLORS.primary} />
        <Text style={styles.logo}>
          <Text style={{ color: COLORS.onSurface }}>Tun</Text>
          <Text style={{ color: COLORS.primaryContainer }}>Work</Text>
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero icon */}
        <View style={styles.heroWrap}>
          <View style={styles.heroCircle}>
            <MaterialIcons name="rocket-launch" size={48} color={COLORS.primary} />
          </View>
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>Nouveau</Text>
          </View>
        </View>

        {/* Welcome message */}
        <Text style={styles.title}>
          Bonjour ! Bienvenue sur <Text style={{ color: COLORS.primary }}>TunWork</Text>
        </Text>
        <Text style={styles.subtitle}>
          Votre carrière mérite un nouvel élan. Rejoignez des milliers de
          professionnels et trouvez l'opportunité qui vous correspond vraiment.
        </Text>

        {/* Main onboarding card */}
        <View style={styles.mainCard}>
          <View style={styles.stepRow}>
            <MaterialIcons
              name="assignment-ind"
              size={18}
              color={COLORS.primaryContainer}
            />
            <Text style={styles.stepLabel}>ÉTAPE 1 : PROFIL</Text>
          </View>

          <Text style={styles.cardTitle}>Prêt à faire le premier pas ?</Text>

          <TouchableOpacity style={styles.ctaButton} onPress={onGetStarted}>
            <Text style={styles.ctaButtonText}>Boostez votre carrière</Text>
            <MaterialIcons
              name="trending-up"
              size={20}
              color={COLORS.onPrimaryContainer}
            />
          </TouchableOpacity>

          <View style={styles.timerRow}>
            <MaterialIcons name="timer" size={14} color={COLORS.onSurfaceVariant} />
            <Text style={styles.timerText}>Cela ne prend que 2 minutes</Text>
          </View>
        </View>

        {/* Trust / value props */}
        <View style={styles.valuePropsWrap}>
          {VALUE_PROPS.map((item) => (
            <View key={item.title} style={styles.valuePropCard}>
              <MaterialIcons name={item.icon} size={22} color={COLORS.primary} />
              <Text style={styles.valuePropTitle}>{item.title}</Text>
              <Text style={styles.valuePropDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerWrap}>
        <View style={styles.footerPill}>
          <Text style={styles.footerText}>
            © 2024 TunWork. La plateforme de l'excellence professionnelle.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surface,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 100,
    alignItems: 'center',
  },

  // Hero
  heroWrap: {
    marginBottom: 32,
    position: 'relative',
  },
  heroCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.surfaceContainer,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: COLORS.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  newBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.onPrimaryContainer,
  },

  // Title / subtitle
  title: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: COLORS.onSurface,
    textAlign: 'center',
    marginBottom: 14,
    maxWidth: 320,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 36,
    maxWidth: 340,
  },

  // Main card
  mainCard: {
    width: '100%',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 16,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.onSurface,
    marginBottom: 28,
    textAlign: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
  ctaButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.onPrimaryContainer,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
  },
  timerText: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
  },

  // Value props
  valuePropsWrap: {
    width: '100%',
    gap: 14,
  },
  valuePropCard: {
    width: '100%',
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 16,
    padding: 20,
    alignItems: 'flex-start',
  },
  valuePropTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onSurface,
    marginTop: 12,
    marginBottom: 4,
  },
  valuePropDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.onSurfaceVariant,
  },

  // Footer
  footerWrap: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  footerPill: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 999,
  },
  footerText: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
  },
});