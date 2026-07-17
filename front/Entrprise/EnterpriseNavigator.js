import React, { useState } from 'react';
import RecruiterDashboard from './Recruiterdashboard';
import Recherche from './SearchEnt';
import AIAssistant from './IAEnt';
import PostJob from './Postjob';
import EnterpriseProfile from './ProfileEntre/EnterpriseProfile';
import EditCompanyProfileScreen from './ProfileEntre/Editcompanyprofile';
import OffresATSScreen from './Offers';
import BottomNavBarEntreprise from './componentEnt/NavBarEnt';
import { CompanyThemeProvider } from '../context/EnterpriseThemeContext';

export default function EnterpriseNavigator({ onLogout }) {
  const [activeTab, setActiveTab] = useState('Accueil');
  const [showPostJob, setShowPostJob] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [focusNotifications, setFocusNotifications] = useState(false);

  const handleAddJob = () => {
    setShowPostJob(true);
    setActiveTab('Accueil');
  };

  const handleBackFromPostJob = () => {
    setShowPostJob(false);
    setActiveTab('Accueil');
  };

  const handleEditProfile = () => {
    setShowPostJob(false);
    setShowEditProfile(true);
    setActiveTab('Profil');
  };

  const handleBackFromEditProfile = () => {
    setShowEditProfile(false);
    setActiveTab('Profil');
  };

  const handleSaveProfile = (updatedData) => {
    // TODO: persist updatedData (API call / context update) here
    console.log('Profile updated:', updatedData);
  };

  const handleNotificationsPress = () => {
    setShowPostJob(false);
    setShowEditProfile(false);
    setActiveTab('Profil');
    setFocusNotifications(true);
  };

  const renderScreen = () => {
    if (showPostJob) {
      return <PostJob onBack={handleBackFromPostJob} />;
    }

    if (showEditProfile) {
      return (
        <EditCompanyProfileScreen
          onBack={handleBackFromEditProfile}
          onSave={handleSaveProfile}
        />
      );
    }

    switch (activeTab) {
      case 'Recherche':
        return <Recherche />;
      case 'IA':
        return <AIAssistant />;
      case 'Offres':
        return <OffresATSScreen onAddOffer={handleAddJob} />;
      case 'Profil':
        return (
          <EnterpriseProfile
            onLogout={onLogout}
            focusNotifications={focusNotifications}
            onNotificationsFocused={() => setFocusNotifications(false)}
            onEditProfile={handleEditProfile}
          />
        );
      case 'Accueil':
      default:
        return (
          <RecruiterDashboard
            onAddJob={handleAddJob}
            onNotificationsPress={handleNotificationsPress}
          />
        );
    }
  };

  return (
    <CompanyThemeProvider>
      {renderScreen()}
      {!showEditProfile && (
        <BottomNavBarEntreprise
          initialTab={activeTab}
          onTabChange={(tab) => {
            setShowPostJob(false);
            setShowEditProfile(false);
            setActiveTab(tab);
          }}
        />
      )}
    </CompanyThemeProvider>
  );
}