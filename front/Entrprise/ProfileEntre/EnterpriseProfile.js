import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SettingsSheetEnt from './Settings/SettingSheetEnt';
import LanguageEnt from './Settings/LanguageEnt';
import HelpCenterEnt from './Settings/HelpCenterEnt';
import AboutEnt from './Settings/AboutEnt';
import { useCompanyTheme } from '../../context/EnterpriseThemeContext';

export default function CompanyProfileScreen({
  onLogout,
  initialSettingsPage = null,
  focusNotifications = false,
  onNotificationsFocused,
  onEditProfile,
}) {
  const { colors } = useCompanyTheme();
  const styles = getStyles(colors);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [settingsPage, setSettingsPage] = useState(initialSettingsPage);

  useEffect(() => {
    setSettingsPage(initialSettingsPage);
  }, [initialSettingsPage]);

  // When we arrive here because the user tapped the notification bell
  // on the dashboard, open the settings sheet automatically so the
  // NOTIFICATIONS section can be scrolled to and highlighted.
  useEffect(() => {
    if (focusNotifications) {
      setSettingsPage(null);
      setSettingsVisible(true);
    }
  }, [focusNotifications]);

  const handleOpenSettingsPage = (page) => {
    setSettingsPage(page);
    setSettingsVisible(false);
  };

  const handleCloseSettingsPage = () => {
    setSettingsPage(null);
  };

  if (settingsPage) {
    switch (settingsPage) {
      case 'language':
        return <LanguageEnt navigation={{ goBack: handleCloseSettingsPage }} />;
      case 'help':
        return <HelpCenterEnt navigation={{ goBack: handleCloseSettingsPage }} />;
      case 'about':
        return <AboutEnt navigation={{ goBack: handleCloseSettingsPage }} />;
      default:
        return null;
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Profile</Text>
        <View style={styles.topBarRight}>
           <View style={styles.avatarSmall}>
            <Text style={styles.avatarSmallText}>HR</Text>
          </View>
          <TouchableOpacity
            style={styles.settingsIconButton}
            activeOpacity={0.7}
            onPress={() => setSettingsVisible(true)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialIcons name="settings" size={22} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.coverContainer}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA0b_MdcvIMaCa42itSa0MkSbSCqqNlUKuwgt6liyD8j4IiFpvfs5fxt-kd5iKHBk0TrTvO4zFR9RlkimF6T0CGgV7wQUTkIndi5Bf5hE7PWNJUndcM2-Ueabh4u38XuXdnEQ63c8glxe3k0UpRbyTlOU469dTod7Yel1OBb7NAS3xA-rBTTKQFJOKzvnCdCI-b5-ujLpmzcZdI42NSXYipMl3EWo840PTGBPDBuJPGlmeFakEjKl7BN17HA16t07zFMUMA5uixgaw',
            }}
            style={styles.coverImage}
          />
          <View style={styles.coverOverlay} />
        </View>

        <View style={styles.profileHeader}>
          <View style={styles.logoWrap}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhPibEwVOG6LINu_1bmQ63zsB1mQMKo02tzrD9wDY1HM-_7MifmiGP80o-eDxenL1E9GLLbK2sVMGRKI6UcCb6eZcYHH8-gPvXyhYm_Ase82hU9FJNpnSDVp7G47gAASj-H5-MhyqncV7hEQdnOnetIKM5ms3YTVJPmDeg-SyLmR8_TcgqCd4qQrcNt3HiXbxCIWnYqF69g2wRPu1h6cnx_x03OlAvuTMJ9Mg14SqWTk3mW4OaTxqnbVU_gZtwhj8g0qRvS0D7rW4t',
              }}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.nameRow}>
            <Text style={styles.companyName}>Orrange Tunis</Text>
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="verified" size={12} color={colors.onSecondaryContainer} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
          <Text style={styles.tagline}>Pioneering Tech Recruitment Solutions in North Africa</Text>

          <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
            <MaterialIcons name="edit" size={18} color={colors.onPrimary} />
            <Text style={styles.editButtonText}>Edit Public Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <MaterialIcons name="info" size={20} color={colors.primary} />
              <Text style={styles.cardTitle}>Company Details</Text>
            </View>
            <TouchableOpacity onPress={onEditProfile}>
              <Text style={styles.updateLink}>Update</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailsGrid}>
            <DetailField label="Industry" value="Information Technology & Services" styles={styles} />
            <DetailField label="Company Size" value="250 - 500 Employees" styles={styles} />
            <DetailField label="Headquarters" value="Les Berges du Lac, Tunis" styles={styles} />
            <DetailField label="Founded" value="March 2018" styles={styles} />
            <DetailField label="Website URL" value="https://www.tunwork.tn" isLink styles={styles} />
          </View>

          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionLabel}>Company Description</Text>
            <View style={styles.descriptionContent}>
              <Text style={styles.descriptionText}>
                TunWork Enterprise is Tunisia's leading platform for connecting world-class tech
                talent with innovative startups and global enterprises. We focus on bridging the
                gap between local expertise and international opportunities.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <MaterialIcons name="card-membership" size={20} color={colors.primary} />
              <Text style={styles.cardTitle}>Plan</Text>
            </View>
          </View>

          <View style={styles.planBox}>
            <Text style={styles.planName}>PRO Enterprise</Text>
            <Text style={styles.planBilling}>Next billing date: Jan 12, 2025</Text>
          </View>

          <View style={styles.planFeatures}>
            <PlanFeature text="Unlimited ATS Postings" colors={colors} styles={styles} />
            <PlanFeature text="AI Candidate Screening" colors={colors} styles={styles} />
            <PlanFeature text="Advanced Analytics Export" colors={colors} styles={styles} />
          </View>

          <TouchableOpacity style={styles.manageButton}>
            <Text style={styles.manageButtonText}>Manage Billing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Downgrade or Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <MaterialIcons name="settings" size={20} color={colors.primary} />
              <Text style={styles.cardTitle}>Paramètres</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <MaterialIcons name="logout" size={20} color={colors.error} />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 TunWork. All rights reserved.</Text>
        </View>
      </ScrollView>

      <SettingsSheetEnt
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        onLogout={() => {
          setSettingsVisible(false);
          onLogout && onLogout();
        }}
        onCompanyDetailsPress={() => {}}
        onTeamMembersPress={() => {}}
        onBillingPress={() => {}}
        onLanguagePress={() => handleOpenSettingsPage('language')}
        onHelpPress={() => handleOpenSettingsPage('help')}
        onContactPress={() => handleOpenSettingsPage('help')}
        onPrivacyPolicyPress={() => handleOpenSettingsPage('about')}
        onAboutPress={() => handleOpenSettingsPage('about')}
        onSecurityPress={() => handleOpenSettingsPage('help')}
        highlightSection={focusNotifications ? 'notifications' : null}
        onHighlightHandled={onNotificationsFocused}
      />
    </SafeAreaView>
  );
}

function DetailField({ label, value, isLink, styles }) {
  return (
    <View style={styles.detailField}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, isLink && styles.detailValueLink]}>{value}</Text>
    </View>
  );
}

function PlanFeature({ text, colors, styles }) {
  return (
    <View style={styles.planFeatureRow}>
      <MaterialIcons name="check-circle" size={18} color={colors.primary} />
      <Text style={styles.planFeatureText}>{text}</Text>
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainerLow,
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSmallText: {
    color: colors.onPrimaryContainer,
    fontWeight: '700',
    fontSize: 12,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  coverContainer: {
    height: 160,
    width: '100%',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  profileHeader: {
    paddingHorizontal: 20,
    marginTop: -40,
  },
  logoWrap: {
    width: 96,
    height: 96,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: colors.background,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  companyName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSecondaryContainer,
    textTransform: 'uppercase',
  },
  tagline: {
    marginTop: 4,
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  editButtonText: {
    color: colors.onPrimary,
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginHorizontal: 16,
    marginTop: 24,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    paddingBottom: 12,
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.onSurface,
  },
  updateLink: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  detailsGrid: {
    gap: 16,
  },
  detailField: {
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    paddingBottom: 8,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: colors.onSurface,
  },
  detailValueLink: {
    color: colors.primary,
  },
  descriptionBox: {
    marginTop: 16,
  },
  descriptionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  descriptionContent: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: 16,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
  },
  planBox: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: colors.primaryTintFaint,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primaryTintMedium,
    marginBottom: 20,
  },
  planName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  planBilling: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  planFeatures: {
    gap: 12,
    marginBottom: 20,
  },
  planFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  planFeatureText: {
    fontSize: 14,
    color: colors.onSurface,
  },
  manageButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  manageButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  cancelButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  logoutText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
});