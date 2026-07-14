import React, { useState, useRef, useEffect } from 'react';
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
import { useCandidateTheme } from '../../context/CandidateThemeContext';

// ---- Reusable row ----

function SettingsRow({ icon, iconRenderer, title, subtitle, right, onPress }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);
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

function ChevronRight() {
  const { colors } = useCandidateTheme();
  return <MaterialIcons name="chevron-right" size={22} color={colors.outline} />;
}

function SectionLabel({ children }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);
  return <Text style={styles.sectionLabel}>{children}</Text>;
}

// ---- Main component ----

export default function SettingsSheet({
  visible,
  onClose,
  onLanguagePress,
  onHelpPress,
  onContactPress,
  onPrivacyPolicyPress,
  onAboutPress,
  onSecurityPress,
  onLogout,
  appVersion = '1.0.0',
  language = 'Français',
  focusNotifications = false,
}) {
  const { colors, darkMode, toggleTheme } = useCandidateTheme();
  const styles = getStyles(colors);
  const [pushNotifications, setPushNotifications] = useState(true);
  const scrollRef = useRef(null);
  const notificationsY = useRef(0);

  // When focusNotifications becomes true, scroll the Notifications row
  // into view so the label is prominent.
  useEffect(() => {
    if (focusNotifications && notificationsY.current > 0) {
      // Small delay to let the sheet animate in before scrolling
      const timer = setTimeout(() => {
        scrollRef.current?.scrollTo({ y: notificationsY.current - 40, animated: true });
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [focusNotifications]);

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
            ref={scrollRef}
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* APPARENCE */}
            <View style={styles.section}>
              <SectionLabel>APPARENCE</SectionLabel>
              <SettingsRow
                icon="dark-mode"
                title="Mode sombre"
                subtitle={darkMode ? 'Thème sombre activé' : 'Thème clair activé'}
                right={
                  <Switch
                    value={darkMode}
                    onValueChange={toggleTheme}
                    trackColor={{
                      false: colors.surfaceContainerHighest,
                      true: colors.primaryContainer,
                    }}
                    thumbColor={colors.white}
                  />
                }
              />
            </View>

            {/* NOTIFICATIONS */}
            <View
              style={styles.section}
              onLayout={(e) => {
                if (notificationsY.current === 0) {
                  notificationsY.current = e.nativeEvent.layout.y;
                }
              }}
            >
              <SectionLabel>NOTIFICATIONS</SectionLabel>
              <SettingsRow
                icon="notifications"
                title="Notifications push"
                subtitle="Nouvelles offres, réponses, entretiens"
                right={
                  <Switch
                    value={pushNotifications}
                    onValueChange={setPushNotifications}
                    trackColor={{ false: colors.surfaceContainerHighest, true: colors.primaryContainer }}
                    thumbColor={colors.white}
                  />
                }
              />
            </View>

            {/* LANGUE */}
            <View style={styles.section}>
              <SectionLabel>LANGUE</SectionLabel>
              <SettingsRow
                iconRenderer={() => <Text style={styles.langBadge}>TN</Text>}
                title="Langue"
                subtitle={language}
                onPress={onLanguagePress}
                right={
                  <View style={styles.langRight}>
                    <Text style={styles.langRightText}>{language}</Text>
                    <ChevronRight />
                  </View>
                }
              />
            </View>

            {/* SUPPORT */}
            <View style={styles.section}>
              <SectionLabel>SUPPORT</SectionLabel>
              <View style={styles.stackedRows}>
                <SettingsRow
                  icon="help"
                  title="Centre d'aide"
                  subtitle="FAQ et guides d'utilisation"
                  onPress={onHelpPress}
                  right={<ChevronRight />}
                />
                <SettingsRow
                  icon="chat-bubble"
                  title="Nous contacter"
                  subtitle="support@TunWork.tn"
                  onPress={onContactPress}
                  right={<ChevronRight />}
                />
              </View>
            </View>

            {/* LÉGAL */}
            <View style={styles.section}>
              <SectionLabel>LÉGAL</SectionLabel>
              <View style={styles.stackedRows}>
                <SettingsRow
                  icon="verified-user"
                  title="Politique de confidentialité"
                  onPress={onPrivacyPolicyPress}
                  right={<ChevronRight />}
                />
                <SettingsRow
                  icon="info"
                  title="À propos de Wazifa"
                  subtitle={`Version ${appVersion}`}
                  onPress={onAboutPress}
                  right={<ChevronRight />}
                />
                <SettingsRow
                  icon="security"
                  title="Sécurité et confidentialité"
                  onPress={onSecurityPress}
                  right={<ChevronRight />}
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
