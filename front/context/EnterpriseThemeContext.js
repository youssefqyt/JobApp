import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENTERPRISE_LIGHT, ENTERPRISE_DARK } from '../theme/colors/enterpriseTheme';

// Dedicated storage key — never touched by the candidate side.
const STORAGE_KEY = '@tunwork/enterprise/dark_mode';

const CompanyThemeContext = createContext(null);

// Wrap the enterprise stack/navigator with this provider:
//
//   <CompanyThemeProvider>
//     <CompanyNavigator />
//   </CompanyThemeProvider>
//
export function CompanyThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (!cancelled) setIsDark(value === 'true');
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setDarkMode = (value) => {
    setIsDark(value);
    AsyncStorage.setItem(STORAGE_KEY, value ? 'true' : 'false').catch(() => {});
  };

  const toggleDarkMode = () => setDarkMode(!isDark);

  const colors = useMemo(() => (isDark ? ENTERPRISE_DARK : ENTERPRISE_LIGHT), [isDark]);
  const value = useMemo(
    () => ({
      colors,
      darkMode: isDark,
      setDarkMode,
      toggleTheme: toggleDarkMode,
      ready,
    }),
    [colors, isDark, ready]
  );

  return (
    <CompanyThemeContext.Provider value={value}>
      {children}
    </CompanyThemeContext.Provider>
  );
}

// Use inside any enterprise-side screen/component:
//   const { colors, darkMode, toggleTheme } = useCompanyTheme();
export function useCompanyTheme() {
  const ctx = useContext(CompanyThemeContext);
  if (!ctx) {
    throw new Error('useCompanyTheme must be used inside a <CompanyThemeProvider>');
  }
  return ctx;
}