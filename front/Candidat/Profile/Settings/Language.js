import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useCandidateTheme } from '../../../context/CandidateThemeContext'; // adjust relative path if needed

const LANGUAGES = [
  {
    value: 'fr',
    name: 'Français',
    subtitle: 'Français',
    flag: require('../../../../assets/flags/fr.png'),
  },
  {
    value: 'ar',
    name: 'العربية',
    subtitle: 'Arabe',
    flag: require('../../../../assets/flags/ar.png'),
  },
  {
    value: 'en',
    name: 'English',
    subtitle: 'Anglais',
    flag: require('../../../../assets/flags/en.png'),
  },
];

export default function LanguageScreen({ navigation }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);
  const [selected, setSelected] = useState('fr');

  const handleSelect = (value) => {
    setSelected(value);
    // Persist the choice / trigger i18n change here, e.g.:
    // i18n.changeLanguage(value);
    console.log(`Language changed to: ${value}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Top App Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation?.goBack?.()}
            activeOpacity={0.7}
            accessibilityLabel="Retour"
          >
            <Icon name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Langue</Text>
        </View>
        <Icon name="language" size={24} color={colors.primary} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro */}
        <Text style={styles.introText}>
          Choisissez votre langue préférée pour l'interface de TunWork.
        </Text>

        {/* Language Options */}
        <View style={styles.optionsList}>
          {LANGUAGES.map((lang) => {
            const isSelected = selected === lang.value;
            return (
              <TouchableOpacity
                key={lang.value}
                style={styles.option}
                activeOpacity={0.85}
                onPress={() => handleSelect(lang.value)}
              >
                <View style={styles.optionLeft}>
                  <View style={styles.flagWrapper}>
                    <Image source={lang.flag} style={styles.flagImage} />
                  </View>
                  <View>
                    <Text style={styles.optionName}>{lang.name}</Text>
                    <Text style={styles.optionSubtitle}>{lang.subtitle}</Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.radioOuter,
                    isSelected && styles.radioOuterSelected,
                  ]}
                >
                  {isSelected && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Icon
            name="translate"
            size={120}
            color={colors.onSecondaryContainer}
            style={styles.infoCardIcon}
          />
          <View style={styles.infoCardContent}>
            <Text style={styles.infoCardTitle}>Expansion du contenu</Text>
            <Text style={styles.infoCardText}>
              Le choix de la langue s'applique à l'interface, aux
              notifications et aux ressources de formation.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 48,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.onSurfaceVariant,
    marginBottom: 24,
  },
  optionsList: {
    gap: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  flagWrapper: {
    width: 40,
    height: 40,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainer,
  },
  flagImage: {
    width: '100%',
    height: '100%',
  },
  optionName: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 0.14,
    color: colors.onSurface,
  },
  optionSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  infoCard: {
    marginTop: 48,
    backgroundColor: colors.secondaryContainer,
    borderRadius: 12,
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  infoCardIcon: {
    position: 'absolute',
    right: -16,
    bottom: -16,
    opacity: 0.1,
  },
  infoCardContent: {
    zIndex: 1,
  },
  infoCardTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    letterSpacing: -0.24,
    color: colors.onSecondaryContainer,
    marginBottom: 8,
  },
  infoCardText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.onSecondaryContainer,
    opacity: 0.9,
    maxWidth: 280,
  },
});