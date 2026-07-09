import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import BottomNavBar from '../component/Navbar';
import SettingsSheet from '../component/SettingsSheet';
import EditProfileScreen from './EditProfile';
import LanguageScreen from './Settings/Language';
import HelpCenter from './Settings/HelpCenter';
import AboutScreen from './Settings/About';
import PasswordScreen from './Settings/Password';
import { useCandidateTheme } from '../../context/CandidateThemeContext'; // adjust relative path if needed

// ---- Static profile data — replace with real data / props later ----
const PROFILE = {
  initials: 'AH',
  name: 'Ahmed Ben Salah',
  role: 'Développeur Full Stack · 2 ans exp.',
  location: 'Tunis, Tunisie',
  completion: 78,
  bio: "Designer passionné par la création d'expériences numériques intuitives et performantes. Spécialisé dans le secteur de la FinTech et du e-commerce avec plus de 5 ans d'expérience...",
  experience: {
    title: 'Product Designer',
    company: 'TechTunisia',
    period: '2021 - Présent',
  },
  education: {
    title: 'Master en Design Numérique',
    school: 'Université de Tunis',
    year: '2019',
  },
  skills: ['React.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'TypeScript'],
  extraSkillsCount: 3,
};

function Card({ children, style, colors }) {
  const styles = getStyles(colors);
  return <View style={[styles.card, style]}>{children}</View>;
}

function InfoRow({ icon, title, subtitle, meta, colors }) {
  const styles = getStyles(colors);
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIconWrap}>
        <MaterialIcons name={icon} size={20} color={colors.primary} />
      </View>
      <View style={styles.infoTextWrap}>
        <Text style={styles.infoTitle}>{title}</Text>
        {subtitle ? <Text style={styles.infoSubtitle}>{subtitle}</Text> : null}
        {meta ? <Text style={styles.infoMeta}>{meta}</Text> : null}
      </View>
    </View>
  );
}

export default function Profile({
  activeTab,
  onTabChange,
  onEditProfile,
  onViewCvPdf,
  onAddSkill,
  initialSettingsPage = null,
  onLogout,
}) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsPage, setSettingsPage] = useState(initialSettingsPage);

  useEffect(() => {
    setSettingsPage(initialSettingsPage);
  }, [initialSettingsPage]);

  const handleOpenSettingsPage = (page) => {
    setSettingsPage(page);
    setShowSettings(false);
  };

  const handleCloseSettingsPage = () => {
    setSettingsPage(null);
  };

  if (settingsPage) {
    switch (settingsPage) {
      case 'language':
        return <LanguageScreen navigation={{ goBack: handleCloseSettingsPage }} />;
      case 'help':
        return <HelpCenter navigation={{ goBack: handleCloseSettingsPage }} />;
      case 'about':
        return <AboutScreen navigation={{ goBack: handleCloseSettingsPage }} />;
      case 'security':
        return <PasswordScreen navigation={{ goBack: handleCloseSettingsPage }} />;
      case 'editProfile':
        return <EditProfileScreen navigation={{ goBack: handleCloseSettingsPage }} />;
      default:
        return null;
    }
  }

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Profil</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setShowSettings(true)}
        >
          <MaterialIcons name="settings" size={22} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main profile card */}
        <Card colors={colors}>
          <View style={styles.identityRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{PROFILE.initials}</Text>
            </View>
            <View style={styles.identityText}>
              <Text style={styles.name}>{PROFILE.name}</Text>
              <Text style={styles.roleText}>{PROFILE.role}</Text>
              <View style={styles.locationRow}>
                <MaterialIcons name="location-on" size={14} color={colors.outline} />
                <Text style={styles.locationText}>{PROFILE.location}</Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleOpenSettingsPage('editProfile')}
              >
                <MaterialIcons name="edit" size={16} color={colors.primary} />
                <Text style={styles.editButtonText}>Modifier le profil</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Completion */}
          <View style={styles.completionSection}>
            <View style={styles.completionHeaderRow}>
              <Text style={styles.completionLabel}>Complétion du profil</Text>
              <Text style={styles.completionValue}>{PROFILE.completion}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[styles.progressFill, { width: `${PROFILE.completion}%` }]}
              />
            </View>
            <View style={styles.completionHintRow}>
              <MaterialIcons name="add-circle" size={13} color={colors.primary} />
              <Text style={styles.completionHint}>
                Ajoutez votre portfolio pour atteindre 90%
              </Text>
            </View>
          </View>
        </Card>

        {/* Bio */}
        <Card colors={colors}>
          <Text style={styles.cardTitle}>Bio / Résumé</Text>
          <Text style={styles.bioText}>{PROFILE.bio}</Text>
        </Card>

        {/* Expériences */}
        <Card colors={colors}>
          <Text style={styles.cardTitle}>Expériences</Text>
          <InfoRow
            icon="work"
            title={PROFILE.experience.title}
            subtitle={PROFILE.experience.company}
            meta={PROFILE.experience.period}
            colors={colors}
          />
        </Card>

        {/* Éducation */}
        <Card colors={colors}>
          <Text style={styles.cardTitle}>Éducation</Text>
          <InfoRow
            icon="school"
            title={PROFILE.education.title}
            subtitle={PROFILE.education.school}
            meta={PROFILE.education.year}
            colors={colors}
          />
        </Card>

        {/* CV Builder IA */}
        <Card colors={colors}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>CV Builder IA</Text>
            <TouchableOpacity style={styles.pdfButton} onPress={onViewCvPdf}>
              <MaterialIcons name="picture-as-pdf" size={16} color={colors.primary} />
              <Text style={styles.pdfButtonText}>Voir PDF</Text>
            </TouchableOpacity>
          </View>
          <InfoRow
            icon="auto-awesome"
            title="Générer un CV optimisé"
            subtitle="Utilisez l'IA pour adapter votre CV aux offres d'emploi."
            colors={colors}
          />
        </Card>

        {/* Compétences */}
        <View style={styles.skillsSection}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Compétences</Text>
            <TouchableOpacity style={styles.addButton} onPress={onAddSkill}>
              <MaterialIcons name="add" size={16} color={colors.primary} />
              <Text style={styles.addButtonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.skillsWrap}>
            {PROFILE.skills.map((skill) => (
              <View key={skill} style={styles.skillChip}>
                <Text style={styles.skillChipText}>{skill}</Text>
              </View>
            ))}
            {PROFILE.extraSkillsCount > 0 && (
              <View style={[styles.skillChip, styles.skillChipMuted]}>
                <Text style={styles.skillChipMutedText}>
                  +{PROFILE.extraSkillsCount} autres
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Same shared bottom nav */}
      <BottomNavBar initialTab={activeTab || 'Profil'} onTabChange={onTabChange} />

      {/* Settings bottom sheet, opened from the header settings icon */}
      <SettingsSheet
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        onLanguagePress={() => handleOpenSettingsPage('language')}
        onHelpPress={() => handleOpenSettingsPage('help')}
        onContactPress={() => {
          // TODO: implement contact destination or support chat
          handleOpenSettingsPage('help');
        }}
        onPrivacyPolicyPress={() => {
          // For now, reuse About screen or add a dedicated privacy route later
          handleOpenSettingsPage('about');
        }}
        onAboutPress={() => handleOpenSettingsPage('about')}
        onSecurityPress={() => handleOpenSettingsPage('security')}
        onLogout={() => {
          setShowSettings(false);
          if (onLogout) {
            onLogout();
          }
        }}
      />
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100,
    gap: 16,
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 16,
  },

  // Identity
  identityRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSecondaryContainer,
  },
  identityText: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
  },
  roleText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: colors.outline,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },

  // Completion
  completionSection: {
    gap: 8,
  },
  completionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  completionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurface,
  },
  completionValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  progressTrack: {
    width: '100%',
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.surfaceContainerHigh,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primaryContainer,
  },
  completionHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  completionHint: {
    fontSize: 12,
    color: colors.primary,
  },

  // Generic card title
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.onSurfaceVariant,
    marginTop: 10,
  },

  // Info row (experience / education / cv builder)
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  infoIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.secondaryContainer,
    opacity: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTextWrap: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  infoSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  infoMeta: {
    fontSize: 12,
    color: colors.outline,
    marginTop: 2,
  },

  // PDF button
  pdfButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  pdfButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },

  // Skills
  skillsSection: {
    marginBottom: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: colors.secondaryContainer,
    opacity: 0.9,
    borderWidth: 1,
    borderColor: colors.secondaryContainer,
  },
  skillChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSecondaryContainer,
  },
  skillChipMuted: {
    backgroundColor: colors.surfaceContainerHigh,
    borderColor: colors.outlineVariant,
  },
  skillChipMutedText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
});