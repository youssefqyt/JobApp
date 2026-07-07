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

// If you use expo, you can swap MaterialIcons for @expo/vector-icons.
// npm install react-native-vector-icons  (or use expo's built-in set)
import Icon from 'react-native-vector-icons/MaterialSymbolsOutlined';
// Fallback: if MaterialSymbolsOutlined isn't available in your icon set,
// use 'MaterialIcons' and swap names: 'arrow_back' -> 'arrow-back', etc.

const COLORS = {
  primary: '#006c49',
  primaryContainer: '#10b981',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#00422b',
  secondaryContainer: '#adedd3',
  onSecondaryContainer: '#306d58',
  surface: '#f8f9fa',
  surfaceContainerLowest: '#ffffff',
  surfaceContainer: '#edeeef',
  surfaceContainerLow: '#f3f4f5',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  outline: '#6c7a71',
  outlineVariant: '#bbcabf',
};

const LANGUAGES = [
  {
    value: 'fr',
    name: 'Français',
    subtitle: 'Français',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_7GET_eUMT_rlr4vQDcA4OqoA_l8eZ_rF0-yC3My6Hr3fKpGRqF896xzGEGP3PkK8E9b7uC25t--foinJ16nYtqUcm9SDBsAkTTHveJkAJiNSeA7Rj3hpVK-G45IW15xeTCgitGjfiRXnFX7yge4OABq3SGN3-PNkOqTSydk3iRjIXCGmvzBEZboE2z5SzzMQ5Ct5az-JJBDVkzc0-EZXdVFvV2JPnIDR04Kzx5qpqiDr-ia_EQGRYqCGdWRO8PsawCG-IwBYf9eD',
  },
  {
    value: 'ar',
    name: 'العربية',
    subtitle: 'Arabe',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTAN7Ai1FFzRYwPn7iJX-DtTM0sS_emGsbY4NalobaYEPCPuRjv13a1W91rr_Nw2nWjcMelvEfAZPAdAuq7au7CoukiQsu7dD7ZxuHxbbzKOU7pgwcD8gxlPkQBrFT7Bhxfu53QfzRFT41aR7zphLp6S7qD7Z0ptSLWxYFvBJiSNyQhxLqZ2dQXw88tmEqvadGCGQru2eUprvCzsigt03qDPDelNdyE5Cra1ctAYhimhW6kNCL5yyZ2ubxFcGlTXPaAoygMohvtvtB',
  },
  {
    value: 'en',
    name: 'English',
    subtitle: 'Anglais',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUIjg2TOsWyzKvQijFS4gq5aIDFXH2MoNiDUf1G0WfVmgXwICrGNYWqABO7-xhu6tglcaf-0IfnHzv5g41Iwv0uC3hvesCsWsYXiFAx1bum0iuZUI-3zY5GQAfgEO8fwUuqN2Rk6F0mlAfvoEJzfwDFL98ELC31fmIkxlRf217nXtzzS1OIlTw_OlGNiLgtLtWRKBmf_z5cL_3eTxnSOwfDgxyguHRosuWpvXOsq5ZWfuJCKxUP9j2U9tEX0j_UvORUgABh4HEzrpu',
  },
];

export default function LanguageScreen({ navigation }) {
  const [selected, setSelected] = useState('fr');

  const handleSelect = (value) => {
    setSelected(value);
    // Persist the choice / trigger i18n change here, e.g.:
    // i18n.changeLanguage(value);
    console.log(`Language changed to: ${value}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      {/* Top App Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation?.goBack?.()}
            activeOpacity={0.7}
          >
            <Icon name="arrow_back" size={24} color={COLORS.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Langue</Text>
        </View>
        <Icon name="language" size={24} color={COLORS.primary} />
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
                    <Image source={{ uri: lang.flag }} style={styles.flagImage} />
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
            color={COLORS.onSecondaryContainer}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 8,
    borderRadius: 999,
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: COLORS.primary,
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
    color: COLORS.onSurfaceVariant,
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
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
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
    backgroundColor: COLORS.surfaceContainer,
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
    color: COLORS.onSurface,
  },
  optionSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: COLORS.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: COLORS.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  infoCard: {
    marginTop: 48,
    backgroundColor: COLORS.secondaryContainer,
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
    color: COLORS.onSecondaryContainer,
    marginBottom: 8,
  },
  infoCardText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.onSecondaryContainer,
    opacity: 0.9,
    maxWidth: 280,
  },
});