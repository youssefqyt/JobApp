import React from 'react';
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

const COLORS = {
  primary: '#006c49',
  primaryContainer: '#10b981',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#00422b',
  secondaryContainer: '#adedd3',
  onSecondaryContainer: '#306d58',
  surface: '#f8f9fa',
  surfaceContainerLow: '#f3f4f5',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  outlineVariant: '#bbcabf',
  white: '#ffffff',
  error: '#d14343',
};

export default function CompanyProfileScreen({ onLogout }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Profile</Text>
        <View style={styles.avatarSmall}>
          <Text style={styles.avatarSmallText}>HR</Text>
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
              <MaterialIcons name="verified" size={12} color={COLORS.onSecondaryContainer} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
          <Text style={styles.tagline}>Pioneering Tech Recruitment Solutions in North Africa</Text>

          <TouchableOpacity style={styles.editButton}>
            <MaterialIcons name="edit" size={18} color={COLORS.onPrimary} />
            <Text style={styles.editButtonText}>Edit Public Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <MaterialIcons name="info" size={20} color={COLORS.primary} />
              <Text style={styles.cardTitle}>Company Details</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.updateLink}>Update</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailsGrid}>
            <DetailField label="Industry" value="Information Technology & Services" />
            <DetailField label="Company Size" value="250 - 500 Employees" />
            <DetailField label="Headquarters" value="Les Berges du Lac, Tunis" />
            <DetailField label="Founded" value="March 2018" />
            <DetailField label="Website URL" value="https://www.tunwork.tn" isLink />
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
              <MaterialIcons name="card-membership" size={20} color={COLORS.primary} />
              <Text style={styles.cardTitle}>Plan</Text>
            </View>
          </View>

          <View style={styles.planBox}>
            <Text style={styles.planName}>PRO Enterprise</Text>
            <Text style={styles.planBilling}>Next billing date: Jan 12, 2025</Text>
          </View>

          <View style={styles.planFeatures}>
            <PlanFeature text="Unlimited ATS Postings" />
            <PlanFeature text="AI Candidate Screening" />
            <PlanFeature text="Advanced Analytics Export" />
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
              <MaterialIcons name="settings" size={20} color={COLORS.primary} />
              <Text style={styles.cardTitle}>Paramètres</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <MaterialIcons name="logout" size={20} color={COLORS.error} />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 TunWork. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailField({ label, value, isLink }) {
  return (
    <View style={styles.detailField}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, isLink && styles.detailValueLink]}>{value}</Text>
    </View>
  );
}

function PlanFeature({ text }) {
  return (
    <View style={styles.planFeatureRow}>
      <MaterialIcons name="check-circle" size={18} color={COLORS.primary} />
      <Text style={styles.planFeatureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSmallText: {
    color: COLORS.onPrimaryContainer,
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
    borderColor: COLORS.surface,
    backgroundColor: COLORS.white,
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
    color: COLORS.onSurface,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.secondaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.onSecondaryContainer,
    textTransform: 'uppercase',
  },
  tagline: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  editButtonText: {
    color: COLORS.onPrimary,
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    marginHorizontal: 16,
    marginTop: 24,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
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
    color: COLORS.onSurface,
  },
  updateLink: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  detailsGrid: {
    gap: 16,
  },
  detailField: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
    paddingBottom: 8,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: COLORS.onSurface,
  },
  detailValueLink: {
    color: COLORS.primary,
  },
  descriptionBox: {
    marginTop: 16,
  },
  descriptionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  descriptionContent: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    padding: 16,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.onSurfaceVariant,
  },
  planBox: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: 'rgba(0,108,73,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,108,73,0.1)',
    marginBottom: 20,
  },
  planName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  planBilling: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
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
    color: COLORS.onSurface,
  },
  manageButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  manageButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  cancelButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.onSurfaceVariant,
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
    color: COLORS.error,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
  },
});
