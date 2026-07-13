import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
// Requires: npm install @expo/vector-icons  (or react-native-vector-icons)
import { MaterialIcons } from '@expo/vector-icons';

// ---- Design tokens (ported from the original Tailwind config) ----
const colors = {
  primary: '#006c49',
  onPrimary: '#ffffff',
  primaryContainer: '#10b981',
  onPrimaryContainer: '#00422b',
  secondaryContainer: '#adedd3',
  onSecondaryContainer: '#306d58',
  onSecondaryFixedVariant: '#0b513d',
  surface: '#f8f9fa',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainerHigh: '#e7e8e9',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  outline: '#6c7a71',
  outlineVariant: '#bbcabf',
};

const Chip = ({ icon, label, style, textStyle }) => (
  <View style={[styles.chip, style]}>
    {icon ? <MaterialIcons name={icon} size={14} color={textStyle?.color || colors.onSurfaceVariant} style={{ marginRight: 4 }} /> : null}
    <Text style={[styles.chipText, textStyle]}>{label}</Text>
  </View>
);

const SectionCard = ({ title, icon, children }) => (
  <View style={styles.card}>
    <View style={styles.cardHeaderRow}>
      <Text style={styles.cardTitle}>{title}</Text>
      {icon ? <MaterialIcons name={icon} size={20} color={colors.outline} /> : null}
    </View>
    {children}
  </View>
);

const ContactRow = ({ icon, label, value }) => (
  <View style={styles.contactRow}>
    <View style={styles.contactIconWrap}>
      <MaterialIcons name={icon} size={20} color={colors.onSecondaryContainer} />
    </View>
    <View>
      <Text style={styles.contactLabel}>{label}</Text>
      <Text style={styles.contactValue}>{value}</Text>
    </View>
  </View>
);

const TimelineItem = ({ icon, title, org, meta, description }) => (
  <View style={styles.timelineItem}>
    <View style={styles.timelineIconBox}>
      <MaterialIcons name={icon} size={22} color={colors.outline} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.timelineTitle}>{title}</Text>
      <Text style={styles.timelineOrg}>{org}</Text>
      <Text style={styles.timelineMeta}>{meta}</Text>
      {description ? <Text style={styles.timelineDesc}>{description}</Text> : null}
    </View>
  </View>
);

const LinkRow = ({ icon, label }) => (
  <TouchableOpacity style={styles.linkRow} activeOpacity={0.7}>
    <MaterialIcons name={icon} size={20} color={colors.primary} />
    <Text style={styles.linkText}>{label}</Text>
  </TouchableOpacity>
);

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="arrow-back" size={24} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Informations personnelles</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Modifier</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Identity Card */}
        <View style={styles.identityCard}>
          <View style={styles.avatarWrap}>
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN4hbV2e2Dsd2ecUSK2Q_IcUQ91D9NT-dc9zSkVzmekClgfjK6IQFX901rV5hCOt1bWmOpT3KnurXgn0L-g46au7tNrXBBZZePOp_28xojG8Ob1bMEg9J5i3ciG105tnFjHXavrdWgnvKA4YXw2LP9_FJ9en5H8Yj366TGk7OOHn7RJz-EJUBRHTv05eJcc13z8CLwlYjOD5Y49XAfbco5IWHSCv_xG2mv_ng8X04oP2AFg4wfaPVGfn9yMr_H26liTKVZJAZJZrRF',
              }}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <MaterialIcons name="photo-camera" size={18} color={colors.onPrimary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Ahmed Mansour</Text>
          <Text style={styles.role}>Senior UX Designer</Text>
          <View style={styles.chipRow}>
            <Chip
              icon="verified"
              label="Vérifié"
              style={{ backgroundColor: colors.secondaryContainer }}
              textStyle={{ color: colors.onSecondaryContainer }}
            />
            <Chip label="Tunis, Tunisie" style={{ backgroundColor: colors.surfaceContainerHigh }} />
          </View>
        </View>

        {/* Visibility Card */}
        <View style={styles.visibilityCard}>
          <Text style={styles.visibilityTitle}>Visibilité du profil</Text>
          <Text style={styles.visibilityText}>
            Votre profil est actuellement visible par les recruteurs.
          </Text>
          <TouchableOpacity style={styles.visibilityButton}>
            <Text style={styles.visibilityButtonText}>Modifier les informations</Text>
          </TouchableOpacity>
        </View>

        {/* Bio */}
        <SectionCard title="Résumé professionnel" icon="history-edu">
          <Text style={styles.bodyText}>
            Designer passionné par la création d'expériences numériques intuitives et
            performantes. Spécialisé dans le secteur de la FinTech et du e-commerce avec plus
            de 5 ans d'expérience dans l'écosystème tech tunisien.
          </Text>
        </SectionCard>

        {/* Contact */}
        <SectionCard title="Coordonnées">
          <ContactRow icon="mail" label="Email" value="ahmed.mansour@email.tn" />
          <ContactRow icon="call" label="Téléphone" value="+216 22 333 444" />
          <ContactRow icon="location-on" label="Localisation" value="Tunis, Tunisie" />
        </SectionCard>

        {/* Experience */}
        <SectionCard title="Expériences professionnelles" icon="work">
          <TimelineItem
            icon="business"
            title="Product Designer"
            org="TechTunisia"
            meta="2021 - Présent • Tunis"
            description="Conception d'interfaces centrées utilisateur pour des solutions SaaS innovantes. Collaboration étroite avec les équipes produit et engineering."
          />
        </SectionCard>

        {/* Education */}
        <SectionCard title="Formation & Diplômes" icon="school">
          <TimelineItem
            icon="history-edu"
            title="Master en Design Numérique"
            org="Université de Tunis"
            meta="Obtenu en 2019"
          />
        </SectionCard>

        {/* Skills */}
        <SectionCard title="Compétences">
          <View style={styles.chipRow}>
            <Chip label="Figma" style={styles.skillChip} textStyle={styles.skillChipText} />
            <Chip label="UX Research" style={styles.skillChip} textStyle={styles.skillChipText} />
            <Chip label="Prototypage" style={styles.skillChip} textStyle={styles.skillChipText} />
          </View>
        </SectionCard>

        {/* Languages */}
        <SectionCard title="Langues">
          <View style={styles.languageRow}>
            <Text style={styles.languageName}>Français</Text>
            <Text style={styles.languageLevel}>Courant</Text>
          </View>
          <View style={styles.languageRow}>
            <Text style={styles.languageName}>Anglais</Text>
            <Text style={styles.languageLevel}>Professionnel</Text>
          </View>
        </SectionCard>

        {/* Social Links */}
        <SectionCard title="Liens & Réseaux">
          <LinkRow icon="language" label="mansourdesign.tn" />
          <LinkRow icon="link" label="LinkedIn" />
          <LinkRow icon="code" label="GitHub" />
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.surface },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: colors.surfaceContainerLowest,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1 },
  iconButton: { padding: 8, borderRadius: 999 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: colors.onSurface, flexShrink: 1 },
  editButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  editButtonText: { color: colors.primary, fontWeight: '600', fontSize: 14 },

  scrollContent: { padding: 16, paddingBottom: 40, gap: 16 },

  identityCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    gap: 4,
  },
  avatarWrap: { marginBottom: 8 },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: colors.secondaryContainer,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 999,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 4 },
    }),
  },
  name: { fontSize: 24, fontWeight: '700', color: colors.onSurface, marginTop: 8 },
  role: { fontSize: 16, color: colors.primary, fontWeight: '500' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8, justifyContent: 'center' },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipText: { fontSize: 12, fontWeight: '500', color: colors.onSurfaceVariant },

  visibilityCard: {
    backgroundColor: colors.primaryContainer,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,108,73,0.2)',
    gap: 8,
  },
  visibilityTitle: { fontSize: 14, fontWeight: '600', color: colors.onPrimaryContainer },
  visibilityText: { fontSize: 12, color: colors.onPrimaryContainer, opacity: 0.9 },
  visibilityButton: {
    marginTop: 16,
    backgroundColor: colors.onPrimaryContainer,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  visibilityButtonText: { color: colors.primaryContainer, fontWeight: '600', fontSize: 14 },

  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 24,
    gap: 12,
  },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardTitle: { fontSize: 20, fontWeight: '600', color: colors.onSurface },
  bodyText: { fontSize: 16, color: colors.onSurfaceVariant, lineHeight: 24 },

  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  contactIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: { fontSize: 12, color: colors.outline },
  contactValue: { fontSize: 16, fontWeight: '500', color: colors.onSurface },

  timelineItem: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
  },
  timelineIconBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineTitle: { fontSize: 16, fontWeight: '600', color: colors.onSurface },
  timelineOrg: { fontSize: 14, fontWeight: '500', color: colors.primary },
  timelineMeta: { fontSize: 12, color: colors.outline, marginTop: 2 },
  timelineDesc: { fontSize: 14, color: colors.onSurfaceVariant, marginTop: 6, lineHeight: 20 },

  skillChip: { backgroundColor: 'rgba(11,81,61,0.1)', borderWidth: 1, borderColor: 'rgba(11,81,61,0.2)' },
  skillChipText: { color: colors.onSecondaryFixedVariant },

  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  languageName: { fontSize: 14, fontWeight: '600', color: colors.onSurface },
  languageLevel: { fontSize: 12, fontWeight: '500', color: colors.primary },

  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 8,
    padding: 12,
  },
  linkText: { fontSize: 14, fontWeight: '600', color: colors.onSurface },
});