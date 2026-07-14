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
  Linking,
  Alert,
} from 'react-native';
// Requires: npm install @expo/vector-icons  (or react-native-vector-icons)
import { MaterialIcons } from '@expo/vector-icons';
import { useCandidateTheme } from '../../context/CandidateThemeContext'; // adjust relative path

// ---- Small presentational pieces (all take `colors` as a prop so they
// re-render correctly with the active theme) ----

const Chip = ({ icon, label, style, textStyle, colors }) => (
  <View style={[styles(colors).chip, style]}>
    {icon ? (
      <MaterialIcons
        name={icon}
        size={14}
        color={textStyle?.color || colors.onSurfaceVariant}
        style={{ marginRight: 4 }}
      />
    ) : null}
    <Text style={[styles(colors).chipText, textStyle]}>{label}</Text>
  </View>
);

const SectionCard = ({ title, icon, children, colors }) => (
  <View style={styles(colors).card}>
    <View style={styles(colors).cardHeaderRow}>
      <Text style={styles(colors).cardTitle}>{title}</Text>
      {icon ? <MaterialIcons name={icon} size={20} color={colors.outline} /> : null}
    </View>
    {children}
  </View>
);

const ContactRow = ({ icon, label, value, colors }) => (
  <View style={styles(colors).contactRow}>
    <View style={styles(colors).contactIconWrap}>
      <MaterialIcons name={icon} size={20} color={colors.onSecondaryContainer} />
    </View>
    <View>
      <Text style={styles(colors).contactLabel}>{label}</Text>
      <Text style={styles(colors).contactValue}>{value}</Text>
    </View>
  </View>
);

const TimelineItem = ({ icon, title, org, meta, description, colors }) => (
  <View style={styles(colors).timelineItem}>
    <View style={styles(colors).timelineIconBox}>
      <MaterialIcons name={icon} size={22} color={colors.outline} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles(colors).timelineTitle}>{title}</Text>
      <Text style={styles(colors).timelineOrg}>{org}</Text>
      <Text style={styles(colors).timelineMeta}>{meta}</Text>
      {description ? <Text style={styles(colors).timelineDesc}>{description}</Text> : null}
    </View>
  </View>
);

const LinkRow = ({ icon, label, onPress, colors }) => (
  <TouchableOpacity style={styles(colors).linkRow} activeOpacity={0.7} onPress={onPress}>
    <MaterialIcons name={icon} size={20} color={colors.primary} />
    <Text style={styles(colors).linkText}>{label}</Text>
  </TouchableOpacity>
);

// Card used for the CV section: shows a small file preview row and a
// primary button that opens the CV (PDF/URL) in the device's viewer/browser.
const CvRow = ({ fileName, updatedAt, onOpen, colors }) => (
  <View style={styles(colors).cvRow}>
    <View style={styles(colors).cvIconWrap}>
      <MaterialIcons name="picture-as-pdf" size={22} color={colors.onSecondaryContainer} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles(colors).cvFileName}>{fileName}</Text>
      {updatedAt ? <Text style={styles(colors).cvMeta}>Mis à jour le {updatedAt}</Text> : null}
    </View>
    <TouchableOpacity style={styles(colors).cvOpenButton} onPress={onOpen} activeOpacity={0.8}>
      <MaterialIcons name="open-in-new" size={16} color={colors.onPrimary} />
      <Text style={styles(colors).cvOpenButtonText}>Ouvrir</Text>
    </TouchableOpacity>
  </View>
);

// ---- Fallback data used only if no `profile` prop is passed in ----
const DEFAULT_PROFILE = {
  initials: 'AM',
  name: 'Ahmed Mansour',
  role: 'Senior UX Designer',
  location: 'Tunis, Tunisie',
  bio: "Designer passionné par la création d'expériences numériques intuitives et performantes. Spécialisé dans le secteur de la FinTech et du e-commerce avec plus de 5 ans d'expérience dans l'écosystème tech tunisien.",
  email: 'ahmed.mansour@email.tn',
  phone: '+216 22 333 444',
  experience: {
    title: 'Product Designer',
    company: 'TechTunisia',
    period: '2021 - Présent • Tunis',
    description:
      "Conception d'interfaces centrées utilisateur pour des solutions SaaS innovantes. Collaboration étroite avec les équipes produit et engineering.",
  },
  education: {
    title: 'Master en Design Numérique',
    school: 'Université de Tunis',
    year: 'Obtenu en 2019',
  },
  avatarUri:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCN4hbV2e2Dsd2ecUSK2Q_IcUQ91D9NT-dc9zSkVzmekClgfjK6IQFX901rV5hCOt1bWmOpT3KnurXgn0L-g46au7tNrXBBZZePOp_28xojG8Ob1bMEg9J5i3ciG105tnFjHXavrdWgnvKA4YXw2LP9_FJ9en5H8Yj366TGk7OOHn7RJz-EJUBRHTv05eJcc13z8CLwlYjOD5Y49XAfbco5IWHSCv_xG2mv_ng8X04oP2AFg4wfaPVGfn9yMr_H26liTKVZJAZJZrRF',
  // CV / resume file. Point this at a hosted PDF (or local asset URI) so
  // "Ouvrir" can open it. cvUpdatedAt is optional display text.
  cvUri: null,
  cvFileName: 'CV_Ahmed_Mansour.pdf',
  cvUpdatedAt: null,
};

export default function PersonalInfoScreen({ profile, onBack, onEdit, onViewCv }) {
  const { colors } = useCandidateTheme();
  const s = styles(colors);

  // Merge whatever was passed in over the defaults so missing fields don't break the UI
  const data = { ...DEFAULT_PROFILE, ...profile };
  const experience = { ...DEFAULT_PROFILE.experience, ...(profile?.experience || {}) };
  const education = { ...DEFAULT_PROFILE.education, ...(profile?.education || {}) };

  const handleOpenCv = async () => {
    // Prefer a caller-provided handler (e.g. custom in-app PDF viewer/navigation)
    if (onViewCv) {
      onViewCv(data.cvUri);
      return;
    }
    if (!data.cvUri) {
      Alert.alert('CV indisponible', "Aucun CV n'a encore été ajouté à ce profil.");
      return;
    }
    try {
      const canOpen = await Linking.canOpenURL(data.cvUri);
      if (canOpen) {
        await Linking.openURL(data.cvUri);
      } else {
        Alert.alert('Erreur', "Impossible d'ouvrir le CV.");
      }
    } catch (e) {
      Alert.alert('Erreur', "Impossible d'ouvrir le CV.");
    }
  };

  return (
    <SafeAreaView style={s.safeArea}>
      {/* Top App Bar */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <TouchableOpacity style={s.iconButton} onPress={onBack}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Informations personnelles</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scrollContent}>
        {/* Identity Card */}
        <View style={s.identityCard}>
          <View style={s.avatarWrap}>
            {data.avatarUri ? (
              <Image style={s.avatar} source={{ uri: data.avatarUri }} />
            ) : (
              <View style={[s.avatar, s.avatarFallback]}>
                <Text style={s.avatarFallbackText}>{data.initials}</Text>
              </View>
            )}
            <TouchableOpacity style={s.cameraButton}>
              <MaterialIcons name="photo-camera" size={18} color={colors.onPrimary} />
            </TouchableOpacity>
          </View>
          <Text style={s.name}>{data.name}</Text>
          <Text style={s.role}>{data.role}</Text>
          <View style={s.chipRow}>
            <Chip
              icon="verified"
              label="Vérifié"
              style={{ backgroundColor: colors.secondaryContainer }}
              textStyle={{ color: colors.onSecondaryContainer }}
              colors={colors}
            />
            <Chip
              label={data.location}
              style={{ backgroundColor: colors.surfaceContainerHigh }}
              colors={colors}
            />
          </View>
        </View>

        {/* Visibility Card */}
        <View style={s.visibilityCard}>
          <Text style={s.visibilityTitle}>Visibilité du profil</Text>
          <Text style={s.visibilityText}>
            Votre profil est actuellement visible par les recruteurs.
          </Text>
          <TouchableOpacity style={s.visibilityButton} onPress={onEdit}>
            <Text style={s.visibilityButtonText}>Modifier les informations</Text>
          </TouchableOpacity>
        </View>

        {/* Bio */}
        <SectionCard title="Résumé professionnel" icon="history-edu" colors={colors}>
          <Text style={s.bodyText}>{data.bio}</Text>
        </SectionCard>

        {/* CV */}
        <SectionCard title="CV" icon="description" colors={colors}>
          <CvRow
            fileName={data.cvFileName}
            updatedAt={data.cvUpdatedAt}
            onOpen={handleOpenCv}
            colors={colors}
          />
        </SectionCard>

        {/* Contact */}
        <SectionCard title="Coordonnées" colors={colors}>
          <ContactRow icon="mail" label="Email" value={data.email} colors={colors} />
          <ContactRow icon="call" label="Téléphone" value={data.phone} colors={colors} />
          <ContactRow
            icon="location-on"
            label="Localisation"
            value={data.location}
            colors={colors}
          />
        </SectionCard>

        {/* Experience */}
        <SectionCard title="Expériences professionnelles" icon="work" colors={colors}>
          <TimelineItem
            icon="business"
            title={experience.title}
            org={experience.company}
            meta={experience.period}
            description={experience.description}
            colors={colors}
          />
        </SectionCard>

        {/* Education */}
        <SectionCard title="Formation & Diplômes" icon="school" colors={colors}>
          <TimelineItem
            icon="history-edu"
            title={education.title}
            org={education.school}
            meta={education.year}
            colors={colors}
          />
        </SectionCard>

        {/* Skills */}
        <SectionCard title="Compétences" colors={colors}>
          <View style={s.chipRow}>
            {(data.skills && data.skills.length > 0
              ? data.skills
              : ['Figma', 'UX Research', 'Prototypage']
            ).map((skill) => (
              <Chip
                key={skill}
                label={skill}
                style={s.skillChip}
                textStyle={s.skillChipText}
                colors={colors}
              />
            ))}
          </View>
        </SectionCard>

        {/* Languages */}
        <SectionCard title="Langues" colors={colors}>
          <View style={s.languageRow}>
            <Text style={s.languageName}>Français</Text>
            <Text style={s.languageLevel}>Courant</Text>
          </View>
          <View style={s.languageRow}>
            <Text style={s.languageName}>Anglais</Text>
            <Text style={s.languageLevel}>Professionnel</Text>
          </View>
        </SectionCard>

        {/* Social Links */}
        <SectionCard title="Liens & Réseaux" colors={colors}>
          <LinkRow icon="language" label="mansourdesign.tn" colors={colors} />
          <LinkRow icon="link" label="LinkedIn" colors={colors} />
          <LinkRow icon="code" label="GitHub" colors={colors} />
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---- Styles are now a function of the active theme's `colors`, mirroring
// the getStyles(colors) pattern used in Search.js ----
const styles = (colors) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.surface ?? colors.background },
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
    headerTitle: { fontSize: 18, fontWeight: '600', color: colors.primary, flexShrink: 1 },

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
    avatarFallback: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.secondaryContainer,
    },
    avatarFallbackText: {
      fontSize: 36,
      fontWeight: '700',
      color: colors.onSecondaryContainer,
    },
    cameraButton: {
      position: 'absolute',
      bottom: 2,
      right: 2,
      backgroundColor: colors.primary,
      padding: 8,
      borderRadius: 999,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
        },
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
      borderColor: colors.primaryTintMedium ?? 'rgba(0,108,73,0.2)',
      gap: 8,
    },
    visibilityTitle: { fontSize: 14, fontWeight: '600', color: colors.onPrimary },
    visibilityText: { fontSize: 12, color: colors.onPrimary, opacity: 0.9 },
    visibilityButton: {
      marginTop: 16,
      backgroundColor: colors.onPrimary,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    visibilityButtonText: { color: colors.primary, fontWeight: '600', fontSize: 14 },

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

    skillChip: {
      backgroundColor: colors.primaryTintFaint ?? 'rgba(11,81,61,0.1)',
      borderWidth: 1,
      borderColor: colors.primaryTintMedium ?? 'rgba(11,81,61,0.2)',
    },
    skillChipText: { color: colors.onSecondaryContainer },

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

    cvRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      backgroundColor: colors.surfaceContainerLow,
      borderRadius: 8,
      padding: 12,
    },
    cvIconWrap: {
      width: 40,
      height: 40,
      borderRadius: 999,
      backgroundColor: colors.secondaryContainer,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cvFileName: { fontSize: 14, fontWeight: '600', color: colors.onSurface },
    cvMeta: { fontSize: 12, color: colors.outline, marginTop: 2 },
    cvOpenButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
    },
    cvOpenButtonText: { color: colors.onPrimary, fontWeight: '600', fontSize: 13 },
  });