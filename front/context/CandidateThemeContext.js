import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CANDIDATE_LIGHT, CANDIDATE_DARK } from '../theme/colors/candidateTheme';

// Dedicated storage key — never touched by the enterprise side.
const STORAGE_KEY = '@tunwork/candidate/dark_mode';

const CandidateThemeContext = createContext(null);

// Wrap the candidate stack/navigator with this provider:
//
//   <CandidateThemeProvider>
//     <CandidateNavigator />
//   </CandidateThemeProvider>
//
export function CandidateThemeProvider({ children }) {
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

  const colors = useMemo(() => (isDark ? CANDIDATE_DARK : CANDIDATE_LIGHT), [isDark]);
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
    <CandidateThemeContext.Provider value={value}>
      {children}
    </CandidateThemeContext.Provider>
  );
}

// Use inside any candidate-side screen/component:
//   const { colors, isDark, setDarkMode } = useCandidateTheme();
export function useCandidateTheme() {
  const ctx = useContext(CandidateThemeContext);
  if (!ctx) {
    throw new Error('useCandidateTheme must be used inside a <CandidateThemeProvider>');
  }
  return ctx;
}