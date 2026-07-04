import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

// ---- Colors (from your Tailwind theme) ----
const COLORS = {
  primary: '#006c49',
  onSurfaceVariant: '#3c4a42',
  surfaceContainerLowest: '#ffffff',
  outlineVariant: '#bbcabf',
};

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

const FormationIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color}>
    <Path
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
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

// ---- Tab definitions ----
const TABS = [
  { key: 'Accueil', Icon: HomeIcon },
  { key: 'Recherche', Icon: SearchIcon },
  { key: 'IA', Icon: IaIcon },
  { key: 'Formation', Icon: FormationIcon },
  { key: 'Profil', Icon: ProfilIcon },
];

export default function BottomNavBar({ initialTab = 'Accueil', onTabChange }) {
  const [active, setActive] = useState(initialTab);

  const handlePress = (key) => {
    setActive(key);
    if (onTabChange) onTabChange(key);
  };

  return (
    <View style={styles.navBar}>
      {TABS.map(({ key, Icon }) => {
        const isActive = active === key;
        const color = isActive ? COLORS.primary : COLORS.onSurfaceVariant;

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

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: COLORS.outlineVariant,
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
    backgroundColor: COLORS.primary,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
  },
  labelActive: {
    color: COLORS.primary,
  },
});