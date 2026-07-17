import React, { useEffect, useState, useRef } from 'react';
import Home from './Home';
import Search from './Search';
import IA from './IA';
import Learning from './Learning';
import Profile from './Profile/Profile';
import SimulationScreen from '././SimulationInterview'; // adjust path if needed
import { CandidateThemeProvider } from '../context/CandidateThemeContext';

export default function CandidateNavigator({
  initialTab = 'Accueil',
  initialSettingsPage = null,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Holds the settings page that should be opened the *next* time the
  // Profile screen mounts. This is owned here (in the navigator, which
  // persists across tab switches) instead of only in Profile's local
  // state, so we can clear it after it has been consumed once.
  const [pendingSettingsPage, setPendingSettingsPage] = useState(initialSettingsPage);

  // Once the settings page has been consumed by Profile, we must never
  // re-apply the prop again (even if it's still set in App.js). This ref
  // guards against that.
  const consumedRef = useRef(false);

  // Signal from the notification bell: when true, Profile should open
  // the settings sheet and scroll to the Notifications section.
  const [focusNotifications, setFocusNotifications] = useState(false);

  // Signal from the avatar in Home: when true, Profile should open
  // the PersonalInfoScreen directly.
  const [openPersonalInfo, setOpenPersonalInfo] = useState(false);

  // Which mock-interview item was tapped in Search, and which tab to
  // return to when the user hits back on the simulation screen.
  const [selectedSimulation, setSelectedSimulation] = useState(null);
  const [simulationReturnTab, setSimulationReturnTab] = useState('Recherche');

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Only sync the prop into state if it hasn't been consumed yet.
  // This prevents the stale "editProfile" prop from re-applying every
  // time the Profile component remounts after a tab switch.
  useEffect(() => {
    if (!consumedRef.current) {
      setPendingSettingsPage(initialSettingsPage);
    }
  }, [initialSettingsPage]);

  // Called when the bell icon in Home is pressed — switch to Profile
  // tab and request that it open the settings sheet on the Notifications row.
  const handleNotificationPress = () => {
    setFocusNotifications(true);
    setActiveTab('Profil');
  };

  // Called when the avatar in Home is pressed — switch to Profile tab
  // and request that it open the PersonalInfoScreen directly.
  const handleAvatarPress = () => {
    setOpenPersonalInfo(true);
    setActiveTab('Profil');
  };

  // Called from Search when a mock-interview row is tapped — switch to
  // the Simulation screen and remember which tab to return to.
  const handleOpenSimulation = (item) => {
    setSelectedSimulation(item);
    setSimulationReturnTab(activeTab);
    setActiveTab('Simulation');
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'Recherche':
        return (
          <Search
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onOpenSimulation={handleOpenSimulation}
          />
        );
      case 'Simulation':
        return (
          <SimulationScreen
            role={selectedSimulation}
            onBack={() => setActiveTab(simulationReturnTab)}
          />
        );
      case 'IA':
        return <IA activeTab={activeTab} onTabChange={setActiveTab} />;
      case 'Formation':
        return <Learning activeTab={activeTab} onTabChange={setActiveTab} />;
      case 'Profil':
        return (
          <Profile
            activeTab={activeTab}
            onTabChange={setActiveTab}
            initialSettingsPage={pendingSettingsPage}
            onSettingsPageConsumed={() => {
              consumedRef.current = true;
              setPendingSettingsPage(null);
            }}
            onLogout={onLogout}
            focusNotifications={focusNotifications}
            onNotificationsConsumed={() => setFocusNotifications(false)}
            openPersonalInfo={openPersonalInfo}
            onPersonalInfoConsumed={() => setOpenPersonalInfo(false)}
          />
        );
      case 'Accueil':
      default:
        return (
          <Home
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onNotificationPress={handleNotificationPress}
            onAvatarPress={handleAvatarPress}
          />
        );
    }
  };

  return (
    <CandidateThemeProvider>
      {renderScreen()}
    </CandidateThemeProvider>
  );
}