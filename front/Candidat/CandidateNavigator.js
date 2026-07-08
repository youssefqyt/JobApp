import React, { useEffect, useState } from 'react';
import Home from './Home';
import Search from './Search';
import IA from './IA';
import Learning from './Learning';
import Profile from './Profile/Profile';

export default function CandidateNavigator({
  initialTab = 'Accueil',
  initialSettingsPage = null,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const renderScreen = () => {
    switch (activeTab) {
      case 'Recherche':
        return <Search activeTab={activeTab} onTabChange={setActiveTab} />;
      case 'IA':
        return <IA activeTab={activeTab} onTabChange={setActiveTab} />;
      case 'Formation':
        return <Learning activeTab={activeTab} onTabChange={setActiveTab} />;
      case 'Profil':
        return (
          <Profile
            activeTab={activeTab}
            onTabChange={setActiveTab}
            initialSettingsPage={initialSettingsPage}
            onLogout={onLogout}
          />
        );
      case 'Accueil':
      default:
        return <Home activeTab={activeTab} onTabChange={setActiveTab} />;
    }
  };

  return renderScreen();
}
