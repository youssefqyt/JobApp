import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Switch,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCompanyTheme } from '../../../context/EnterpriseThemeContext';

// ---- Reusable row ----

function SettingsRow({ icon, iconRenderer, title, subtitle, right, onPress, colors, styles }) {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper style={styles.row} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.rowLeft}>
        <View style={styles.rowIconWrap}>
          {iconRenderer ? iconRenderer() : (
            <MaterialIcons name={icon} size={20} color={colors.primary} />
          )}
        </View>
        <View style={styles.rowTextWrap}>
          <Text style={styles.rowTitle}>{title}</Text>
          {subtitle ? <Text style={styles.rowSubtitle} numberOfLines={1}>{subtitle}</Text> : null}
        </View>
      </View>
      {right}
    </Wrapper>
  );
}

function ChevronRight({ colors }) {
  return <MaterialIcons name="chevron-right" size={22} color={colors.outline} />;
}

function SectionLabel({ children, styles }) {
  return <Text style={styles.sectionLabel}>{children}</Text>;
}

// ---- Main component ----

export default function SettingsSheetEnt({
  visible,
  onClose,
  onCompanyDetailsPress,
  onTeamMembersPress,
  onBillingPress,
  onLanguagePress,
  onHelpPress,
  onContactPress,
  onPrivacyPolicyPress,
  onAboutPress,
  onSecurityPress,
  onLogout,
  appVersion = '1.0.0',
  language = 'Français',
}) {
  const { colors, darkMode, toggleTheme } = useCompanyTheme();
  const styles = getStyles(colors);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlayContainer}>
        {/* Tap outside to close */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlayTouchable} />
        </TouchableWithoutFeedback>

        <View style={styles.sheet}>
          {/* Sheet header */}
          <View style={styles.sheetHeaderWrap}>
            <View style={styles.grabber} />
            <View style={styles.sheetHeaderRow}>
              <Text style={styles.sheetTitle}>Paramètres</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
                <MaterialIcons name="close" size={20} color={colors.onSurfaceVariant} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* ENTREPRISE */}
            <View style={styles.section}>
              <SectionLabel styles={styles}>ENTREPRISE</SectionLabel>
              <View style={styles.stackedRows}>
                <SettingsRow
                  icon="business"
                  title="Détails de l'entreprise"
                  subtitle="Secteur, taille, siège social"
                  onPress={onCompanyDetailsPress}
                  right={<ChevronRight colors={colors} />}
                  colors={colors}
                  styles={styles}
                />
                <SettingsRow
                  icon="groups"
                  title="Membres de l'équipe"
                  subtitle="Gérer les accès recruteurs"
                  onPress={onTeamMembersPress}
                  right={<ChevronRight colors={colors} />}
                  colors={colors}
                  styles={styles}
                />
                <SettingsRow
                  icon="card-membership"
                  title="Abonnement & Facturation"
                  subtitle="PRO Enterprise"
                  onPress={onBillingPress}
                  right={<ChevronRight colors={colors} />}
                  colors={colors}
                  styles={styles}
                />
              </View>
            </View>

            {/* APPARENCE */}
            <View style={styles.section}>
              <SectionLabel styles={styles}>APPARENCE</SectionLabel>
              <SettingsRow
                icon="dark-mode"
                title="Mode sombre"
                subtitle={darkMode ? 'Thème sombre activé' : 'Thème clair activé'}
                colors={colors}
                styles={styles}
                right={
                  <Switch
                    value={darkMode}
                    onValueChange={toggleTheme}
                    trackColor={{
                      false: colors.surfaceVariant,
                      true: colors.primaryContainer,
                    }}
                    thumbColor={colors.white}
                  />
                }
              />
            </View>

            {/* NOTIFICATIONS */}
            <View style={styles.section}>
              <SectionLabel styles={styles}>NOTIFICATIONS</SectionLabel>
              <View style={styles.stackedRows}>
                <SettingsRow
                  icon="notifications"
                  title="Notifications push"
                  subtitle="Nouvelles candidatures, messages"
                  colors={colors}
                  styles={styles}
                  right={
                    <Switch
                      value={pushNotifications}
                      onValueChange={setPushNotifications}
                      trackColor={{ false: colors.surfaceVariant, true: colors.primaryContainer }}
                      thumbColor={colors.white}
                    />
                  }
                />
                <SettingsRow
                  icon="mail"
                  title="Alertes par e-mail"
                  subtitle="Résumés et rapports hebdomadaires"
                  colors={colors}
                  styles={styles}
                  right={
                    <Switch
                      value={emailAlerts}
                      onValueChange={setEmailAlerts}
                      trackColor={{ false: colors.surfaceVariant, true: colors.primaryContainer }}
                      thumbColor={colors.white}
                    />
                  }
                />
              </View>
            </View>

            {/* LANGUE */}
            <View style={styles.section}>
              <SectionLabel styles={styles}>LANGUE</SectionLabel>
              <SettingsRow
                iconRenderer={() => <Text style={styles.langBadge}>TN</Text>}
                title="Langue"
                subtitle={language}
                onPress={onLanguagePress}
                colors={colors}
                styles={styles}
                right={
                  <View style={styles.langRight}>
                    <Text style={styles.langRightText}>{language}</Text>
                    <ChevronRight colors={colors} />
                  </View>
                }
              />
            </View>

            {/* SUPPORT */}
            <View style={styles.section}>
              <SectionLabel styles={styles}>SUPPORT</SectionLabel>
              <View style={styles.stackedRows}>
                <SettingsRow
                  icon="help"
                  title="Centre d'aide"
                  subtitle="FAQ et guides d'utilisation"
                  onPress={onHelpPress}
                  right={<ChevronRight colors={colors} />}
                  colors={colors}
                  styles={styles}
                />
                <SettingsRow
                  icon="chat-bubble"
                  title="Nous contacter"
                  subtitle="support@TunWork.tn"
                  onPress={onContactPress}
                  right={<ChevronRight colors={colors} />}
                  colors={colors}
                  styles={styles}
                />
              </View>
            </View>

            {/* LÉGAL */}
            <View style={styles.section}>
              <SectionLabel styles={styles}>LÉGAL</SectionLabel>
              <View style={styles.stackedRows}>
                <SettingsRow
                  icon="verified-user"
                  title="Politique de confidentialité"
                  onPress={onPrivacyPolicyPress}
                  right={<ChevronRight colors={colors} />}
                  colors={colors}
                  styles={styles}
                />
                <SettingsRow
                  icon="info"
                  title="À propos de TunWork"
                  subtitle={`Version ${appVersion}`}
                  onPress={onAboutPress}
                  right={<ChevronRight colors={colors} />}
                  colors={colors}
                  styles={styles}
                />
                <SettingsRow
                  icon="security"
                  title="Sécurité et confidentialité"
                  onPress={onSecurityPress}
                  right={<ChevronRight colors={colors} />}
                  colors={colors}
                  styles={styles}
                />
              </View>
            </View>

            {/* Logout */}
            <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7} onPress={onLogout}>
              <View style={styles.logoutIconWrap}>
                <MaterialIcons name="logout" size={20} color={colors.error} />
              </View>
              <Text style={styles.logoutText}>Déconnexion</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (colors) => StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  overlayTouchable: {
    flex: 1,
    width: '100%',
  },
  sheet: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: '85%',
    overflow: 'hidden',
  },
  sheetHeaderWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  grabber: {
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.outlineVariant,
    opacity: 0.5,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.onSurface,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.outline,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  stackedRows: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
    marginRight: 8,
  },
  rowIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTextWrap: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  rowSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  langBadge: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  langRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  langRightText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  logoutIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.errorContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.error,
  },
});