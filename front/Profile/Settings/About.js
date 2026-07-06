import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// ---- Colors (from the Tailwind theme in the HTML) ----
const COLORS = {
  primary: '#006c49',
  primaryContainer: '#10b981',
  onPrimaryContainer: '#00422b',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  outline: '#6c7a71',
  outlineVariant: '#bbcabf',
  surface: '#f8f9fa',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainerHigh: '#e7e8e9',
};

const HERO_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBSx9OonEwDOHI9QMGY1SjwzIHnni62oDXLG6W7J-57EJb7roOxvv2D5wbloUvJbjsfWAcAAk9DTi2Krzmr1IxPMAYI9102Nfts6-Hfzwd2XVmnMcRHf1rikuxgtMfcl3AcPsVAwN3di1YYC9Owq3nJpTHr-iwZVzcblfKyFSEmJmdPUr6au6L1BFsuId953IuGZIwv3bRgCBgfWQUl8uBTW-66MmzVDPUDWK4LUw1GOKsDCmwdg4vIWqDFln6eRbujoAQwhM1ZbIuA';

const LEGAL_LINKS = [
  { key: 'terms', icon: 'description', label: "Conditions d'utilisation" },
  { key: 'privacy', icon: 'gavel', label: 'Politique de confidentialité' },
  { key: 'licenses', icon: 'folder-special', label: 'Licences open source' },
];

export default function About({ navigation }) {
  const openWebsite = () => {
    Linking.openURL('https://www.tunwork.tn');
  };

  const handleLegalPress = (key) => {
    // TODO: navigate to the relevant legal screen or open a URL
    console.log('Navigate to legal doc:', key);
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
        <Text style={styles.headerTitle}>À propos</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo & Version */}
        <View style={styles.logoSection}>
          <View style={styles.logoCard}>
            <Text style={styles.logoText}>
              <Text style={{ color: COLORS.onSurface }}>Tun</Text>
              <Text style={{ color: COLORS.primaryContainer }}>Work</Text>
            </Text>
          </View>
          <View style={styles.versionPill}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>

        {/* Notre Mission */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <MaterialIcons
              name="rocket-launch"
              size={26}
              color={COLORS.primaryContainer}
            />
            <Text style={styles.cardTitle}>Notre Mission</Text>
          </View>
          <Text style={styles.missionText}>
            TunWork s'engage à révolutionner le marché de l'emploi en
            Tunisie. En exploitant la puissance de l'intelligence
            artificielle, nous créons des ponts intelligents entre les
            talents tunisiens et les opportunités de carrière les plus
            prometteuses, favorisant ainsi une croissance économique durable
            et inclusive.
          </Text>
        </View>

        {/* Website Link */}
        <TouchableOpacity
          style={styles.websiteCard}
          activeOpacity={0.85}
          onPress={openWebsite}
        >
          <View>
            <Text style={styles.websiteTitle}>Visiter notre site web</Text>
            <Text style={styles.websiteSubtitle}>
              Découvrez nos services et actualités directement en ligne.
            </Text>
          </View>
          <View style={styles.websiteLinkRow}>
            <Text style={styles.websiteUrl}>www.tunwork.tn</Text>
            <MaterialIcons
              name="open-in-new"
              size={18}
              color={COLORS.onPrimaryContainer}
            />
          </View>
        </TouchableOpacity>

        {/* Legal Links */}
        <View style={styles.legalCard}>
          <View style={styles.legalHeader}>
            <Text style={styles.legalHeaderText}>
              INFORMATIONS LÉGALES
            </Text>
          </View>
          {LEGAL_LINKS.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.legalRow,
                index !== LEGAL_LINKS.length - 1 && styles.legalRowDivider,
              ]}
              activeOpacity={0.6}
              onPress={() => handleLegalPress(item.key)}
            >
              <View style={styles.legalRowLeft}>
                <MaterialIcons
                  name={item.icon}
                  size={22}
                  color={COLORS.onSurfaceVariant}
                />
                <Text style={styles.legalLabel}>{item.label}</Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={22}
                color={COLORS.outline}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Decorative Illustration */}
        <View style={styles.heroWrap}>
          <Image source={{ uri: HERO_IMAGE_URL }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroCaptionWrap}>
            <View style={styles.heroCaptionCard}>
              <Text style={styles.heroCaptionText}>
                L'avenir du travail est ici.
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 TunWork. Tous droits réservés.
          </Text>
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
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 24,
  },

  // Logo & version
  logoSection: {
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },
  logoCard: {
    padding: 24,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  versionPill: {
    backgroundColor: COLORS.surfaceContainerHigh,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 999,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },

  // Generic card
  card: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  missionText: {
    fontSize: 18,
    lineHeight: 28,
    color: COLORS.onSurfaceVariant,
  },

  // Website card
  websiteCard: {
    padding: 24,
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 12,
    justifyContent: 'space-between',
    gap: 24,
  },
  websiteTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.onPrimaryContainer,
    marginBottom: 8,
  },
  websiteSubtitle: {
    fontSize: 16,
    color: COLORS.onPrimaryContainer,
    opacity: 0.9,
  },
  websiteLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  websiteUrl: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onPrimaryContainer,
  },

  // Legal links
  legalCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
    overflow: 'hidden',
  },
  legalHeader: {
    padding: 20,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
  },
  legalHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    color: COLORS.onSurfaceVariant,
  },
  legalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  legalRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
  },
  legalRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  legalLabel: {
    fontSize: 16,
    color: COLORS.onSurface,
  },

  // Hero illustration
  heroWrap: {
    height: 256,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16,185,129,0.05)',
  },
  heroCaptionWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCaptionCard: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  heroCaptionText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },
});