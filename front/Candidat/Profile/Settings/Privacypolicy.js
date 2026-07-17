import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Linking,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// Adjust the relative path to match this screen's actual folder depth,
// same as Contact.js (Profile/Settings/Contact.js -> '../../../context/...').
import { useCandidateTheme } from '../../../context/CandidateThemeContext';

// ---- Sub-components — each pulls its own theme, same pattern as
// Contact.js's SocialButton/InfoCard. ----

function Card({ children, style, colors }) {
  const styles = getStyles(colors);
  return <View style={[styles.card, style]}>{children}</View>;
}

function SectionIcon({ name, colors }) {
  const styles = getStyles(colors);
  return (
    <View style={styles.iconBadge}>
      <MaterialIcons name={name} size={20} color={colors.primary} />
    </View>
  );
}

function Bullet({ children, colors }) {
  const styles = getStyles(colors);
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.cardText}>{children}</Text>
    </View>
  );
}

export default function PrivacyPolicyScreen({ navigation }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack?.()}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>TunWork</Text>
        </View>
        <MaterialIcons name="work" size={22} color={colors.primary} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headline}>Politique de confidentialité</Text>
          <Text style={styles.subtitle}>
            Chez TunWork, votre vie privée est notre priorité absolue. Nous nous
            engageons à protéger vos données personnelles et à être transparents
            sur la manière dont nous les traitons.
          </Text>
        </View>

        {/* Intro Card */}
        <Card colors={colors}>
          <View style={styles.rowStart}>
            <View style={[styles.iconBadge, { backgroundColor: colors.secondaryContainer }]}>
              <MaterialIcons name="security" size={20} color={colors.onSecondaryContainer} />
            </View>
            <View style={styles.flexShrink}>
              <Text style={styles.cardTitle}>Notre Engagement</Text>
              <Text style={styles.cardText}>
                TunWork facilite la mise en relation entre professionnels et
                entreprises. Pour offrir ce service, nous traitons certaines
                informations. Cette politique décrit comment nous collectons,
                utilisons et sécurisons vos données conformément à la
                réglementation en vigueur.
              </Text>
            </View>
          </View>
        </Card>

        {/* Collecte des données */}
        <Card colors={colors}>
          <View style={styles.cardHeaderRow}>
            <SectionIcon name="person-search" colors={colors} />
            <Text style={styles.sectionTitle}>Collecte des données</Text>
          </View>
          <Bullet colors={colors}>
            <Text style={styles.bold}>Informations de profil : </Text>
            Nom, prénom, photo, expériences professionnelles et compétences.
          </Bullet>
          <Bullet colors={colors}>
            <Text style={styles.bold}>Coordonnées : </Text>
            Adresse e-mail, numéro de téléphone et localisation approximative.
          </Bullet>
          <Bullet colors={colors}>
            <Text style={styles.bold}>Données d'utilisation : </Text>
            Historique de recherche d'emploi et interactions avec l'IA
            TunWork.
          </Bullet>
        </Card>

        {/* Utilisation des informations */}
        <Card colors={colors}>
          <View style={styles.cardHeaderRow}>
            <SectionIcon name="analytics" colors={colors} />
            <Text style={styles.sectionTitle}>Utilisation des informations</Text>
          </View>
          <Text style={[styles.cardText, styles.mb8]}>
            Nous utilisons vos données pour :
          </Text>
          <Bullet colors={colors}>Personnaliser vos recommandations d'offres et de formations.</Bullet>
          <Bullet colors={colors}>Améliorer notre algorithme d'IA pour mieux cerner vos besoins.</Bullet>
          <Bullet colors={colors}>Assurer la communication entre recruteurs et candidats.</Bullet>
        </Card>

        {/* Partage avec des tiers */}
        <Card colors={colors}>
          <View style={styles.cardHeaderRow}>
            <SectionIcon name="share" colors={colors} />
            <Text style={styles.sectionTitle}>Partage avec des tiers</Text>
          </View>
          <Text style={styles.cardText}>
            Vos données de profil sont partagées uniquement avec les
            recruteurs auxquels vous postulez explicitement. Nous ne vendons
            jamais vos données personnelles à des tiers à des fins
            publicitaires.
          </Text>
        </Card>

        {/* Vos droits */}
        <Card colors={colors}>
          <View style={styles.cardHeaderRow}>
            <SectionIcon name="gavel" colors={colors} />
            <Text style={styles.sectionTitle}>Vos droits</Text>
          </View>
          <Text style={[styles.cardText, styles.mb8]}>Vous disposez d'un droit :</Text>
          <View style={styles.chipsRow}>
            {['Accès', 'Rectification', 'Suppression'].map((label) => (
              <View key={label} style={styles.chip}>
                <Text style={styles.chipText}>{label}</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.cardText, styles.mt12]}>
            Contactez-nous à{' '}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('mailto:privacy@tunwork.tn')}
            >
              privacy@tunwork.tn
            </Text>{' '}
            pour toute demande.
          </Text>
        </Card>

        {/* Sécurité des données */}
        <Card colors={colors}>
          <View style={styles.cardHeaderRow}>
            <SectionIcon name="enhanced-encryption" colors={colors} />
            <Text style={styles.sectionTitle}>Sécurité des données</Text>
          </View>
          <Text style={styles.cardText}>
            TunWork utilise des protocoles de chiffrement de pointe (AES-256)
            pour protéger vos données lors du stockage et de la transmission.
            Nos serveurs sont hébergés dans des environnements hautement
            sécurisés.
          </Text>
        </Card>

        {/* Decorative banner — overlay stays a fixed dark tint since it
            sits on top of a photo, not a themed surface, in both modes. */}
        <ImageBackground
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCb8M_w18Zs4G74hmv13HzOESQWRN6xYjol8NHDviDJII0wD40OloaBSsJVMH-FPpKpXaMCAm37biqlRp4_GEdkEvaLPabUEYTSDn0ZRz9xOj4kjhNkiHzXQTGlsNAov1N-GRXiWbbBOrM_Y6claxzXmawF2VC98XY29xpVahpGYVMobb-jQOryDsUwZOmUEi588hAWkXgDghgm_VYJLdIaDdVfXAL_ysvqfDG__1vRUMKW32WwAy8ruHk469Y8lG1rd6pPrD2KHjKO',
          }}
          style={styles.banner}
          imageStyle={styles.bannerImage}
        >
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Transparence Totale</Text>
            <Text style={styles.bannerText}>
              Nous croyons que la confiance est le socle de toute relation
              professionnelle réussie.
            </Text>
          </View>
        </ImageBackground>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Dernière mise à jour : 24 Mai 2024</Text>
          <Text style={styles.footerText}>© 2024 TunWork. Tous droits réservés.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  appBar: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  appBarLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarTitle: { fontSize: 20, fontWeight: '700', color: colors.primary },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  header: { marginBottom: 20 },
  headline: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.onSurface,
    letterSpacing: -0.4,
    marginBottom: 10,
  },
  subtitle: { fontSize: 15, lineHeight: 22, color: colors.onSurfaceVariant },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: 18,
    marginBottom: 16,
  },
  rowStart: { flexDirection: 'row', gap: 14 },
  flexShrink: { flex: 1 },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.tertiaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: colors.primary, marginBottom: 6 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: colors.primary },
  cardText: { fontSize: 15, lineHeight: 22, color: colors.onSurfaceVariant },
  bold: { fontWeight: '700', color: colors.onSurfaceVariant },
  bulletRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  bulletDot: { color: colors.primary, fontSize: 15, lineHeight: 22 },
  mb8: { marginBottom: 8 },
  mt12: { marginTop: 12 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipText: { fontSize: 12, fontWeight: '500', color: colors.onSecondaryContainer },
  link: { color: colors.primary, fontWeight: '600' },
  banner: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 16,
    justifyContent: 'center',
  },
  bannerImage: { resizeMode: 'cover' },
  bannerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    padding: 20,
    height: '100%',
    justifyContent: 'center',
  },
  bannerTitle: { color: colors.white, fontSize: 18, fontWeight: '600', marginBottom: 6 },
  bannerText: { color: colors.white, fontSize: 14, opacity: 0.9 },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    paddingTop: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  footerText: { fontSize: 12, color: colors.onSurfaceVariant, marginTop: 2 },
});