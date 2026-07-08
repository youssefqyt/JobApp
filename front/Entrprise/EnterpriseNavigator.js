import React, { useState } from 'react';
import RecruiterDashboard from './Recruiterdashboard';
import Recherche from './SearchEnt';
import AIAssistant from './IAEnt';
import PostJob from './Postjob';
import EnterpriseProfile from './EnterpriseProfile';
import OffresATSScreen from './Offers';
import BottomNavBarEntreprise from './componentEnt/NavBarEnt';

export default function EnterpriseNavigator({ onLogout }) {
  const [activeTab, setActiveTab] = useState('Accueil');
  const [showPostJob, setShowPostJob] = useState(false);

  const handleAddJob = () => {
    setShowPostJob(true);
    setActiveTab('Accueil');
  };

  const handleBackFromPostJob = () => {
    setShowPostJob(false);
    setActiveTab('Accueil');
  };

  const renderScreen = () => {
    if (showPostJob) {
      return <PostJob onBack={handleBackFromPostJob} />;
    }

    switch (activeTab) {
      case 'Recherche':
        return <Recherche />;
      case 'IA':
        return <AIAssistant />;
      case 'Offres':
        return <OffresATSScreen onAddOffer={handleAddJob} />;
      case 'Profil':
        return <EnterpriseProfile onLogout={onLogout} />;
      case 'Accueil':
      default:
        return <RecruiterDashboard onAddJob={handleAddJob} />;
    }
  };

  return (
    <>
      {renderScreen()}
      <BottomNavBarEntreprise
        initialTab={activeTab}
        onTabChange={(tab) => {
          setShowPostJob(false);
          setActiveTab(tab);
        }}
      />
    </>
  );
}
