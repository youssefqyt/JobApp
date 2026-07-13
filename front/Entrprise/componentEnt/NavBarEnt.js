import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { useCompanyTheme } from '../../context/EnterpriseThemeContext';

// ---- Icons (mirroring the SVG paths from your HTML) ----
const HomeIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Path
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

const SearchIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Path
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

const IaIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Path
      d="M13 10V3L4 14h7v7l9-11h-7z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

// Briefcase icon, replaces FormationIcon for Entreprise pages
const OffresIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Rect
      x={3}
      y={7}
      width={18}
      height={13}
      rx={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <Path
      d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

const ProfilIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Path
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

// ---- Tab definitions (Entreprise variant: Formation -> Offres) ----
const TABS = [
  { key: 'Accueil', Icon: HomeIcon },
  { key: 'Recherche', Icon: SearchIcon },
  { key: 'IA', Icon: IaIcon },
  { key: 'Offres', Icon: OffresIcon },
  { key: 'Profil', Icon: ProfilIcon },
];

export default function BottomNavBarEntreprise({ initialTab = 'Accueil', onTabChange }) {
  const { colors } = useCompanyTheme();
  const styles = getStyles(colors);
  const [active, setActive] = useState(initialTab);

  const handlePress = (key) => {
    setActive(key);
    if (onTabChange) onTabChange(key);
  };

  return (
    <View style={styles.navBar}>
      {TABS.map(({ key, Icon }) => {
        const isActive = active === key;
        const color = isActive ? colors.primary : colors.onSurfaceVariant;

        return (
          <TouchableOpacity
            key={key}
            style={styles.tab}
            activeOpacity={0.7}
            onPress={() => handlePress(key)}
          >
            {/* Top indicator bar — only visible/colored when active */}
            <View
              style={[
                styles.indicator,
                isActive && styles.indicatorActive,
              ]}
            />
            <Icon color={color} />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {key}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    paddingHorizontal: 24,
    paddingVertical: 12,
    // Fix to bottom if used as a custom tab bar:
    // position: 'absolute', bottom: 0, left: 0, right: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  indicator: {
    width: 48,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'transparent',
    marginBottom: 6,
  },
  indicatorActive: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  labelActive: {
    color: colors.primary,
  },
});