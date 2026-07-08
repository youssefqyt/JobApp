import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './front/SplashScreen';
import Onboarding from './front/Onboarding';
import Login from './front/Login';
import Welcome from './front/Welcome';
import CandidateNavigator from './front/Candidat/CandidateNavigator';
import CandidateSignUp from './front/Candidat/SingUp';
import EnterpriseNavigator from './front/Entrprise/EnterpriseNavigator';
import EnterpriseSignUp from './front/Entrprise/SingUpEnt';

export default function App() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  const [userType, setUserType] = useState(null); // 'candidate' | 'company' | null
  const [selectedRole, setSelectedRole] = useState(null); // 'candidate' | 'company' | null
  const [showLogin, setShowLogin] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [candidateInitialTab, setCandidateInitialTab] = useState('Accueil');
  const [candidateInitialSettingsPage, setCandidateInitialSettingsPage] = useState(null);

  const handleLogout = () => {
    setUserType(null);
    setSelectedRole(null);
    setShowWelcome(false);
    setShowLogin(true);
    setCandidateInitialTab('Accueil');
    setCandidateInitialSettingsPage(null);
  };

  if (!isSplashDone) {
    return (
      <>
        <StatusBar style="dark" />
        <SplashScreen onFinish={() => setIsSplashDone(true)} />
      </>
    );
  }

  const renderContent = () => {
    if (userType === 'candidate') {
      return (
        <CandidateNavigator
          initialTab={candidateInitialTab}
          initialSettingsPage={candidateInitialSettingsPage}
          onLogout={handleLogout}
        />
      );
    }
    if (userType === 'company') return <EnterpriseNavigator onLogout={handleLogout} />;

    if (showWelcome) {
      return (
        <Welcome
          onGetStarted={() => {
            setShowWelcome(false);
            setShowLogin(false);
            setCandidateInitialTab('Profil');
            setCandidateInitialSettingsPage('editProfile');
            setUserType('candidate');
          }}
        />
      );
    }

    if (selectedRole === 'candidate') {
      return (
        <CandidateSignUp
          onSignUp={() => {
            setSelectedRole(null);
            setShowWelcome(true);
          }}
          onSkip={() => {
            setUserType('candidate');
            setSelectedRole(null);
          }}
          onSignIn={() => {
            setSelectedRole(null);
            setShowLogin(true);
          }}
        />
      );
    }

    if (selectedRole === 'company') {
      return (
        <EnterpriseSignUp
          navigation={null}
          onSignUp={() => {
            setUserType('company');
            setSelectedRole(null);
          }}
          onSkip={() => {
            setUserType('company');
            setSelectedRole(null);
          }}
          onSignIn={() => {
            setSelectedRole(null);
            setShowLogin(true);
          }}
        />
      );
    }

    if (showLogin) {
      return (
        <Login
          onLogin={({ email, password }) => {
            // TODO: replace with real authentication call.
            // For now, log the user into the candidate flow by default.
            console.log('login attempt', email, password);
            setUserType('candidate');
            setCandidateInitialTab('Accueil');
            setCandidateInitialSettingsPage(null);
            setShowLogin(false);
          }}
          onSkip={() => setShowLogin(false)}
          onSignUp={() => setShowLogin(false)}
          onForgotPassword={() => {
            // TODO: navigate to a password-reset screen if you add one
          }}
        />
      );
    }

    return (
      <Onboarding
        onSelect={(type) => setSelectedRole(type)}
        onLoginPress={() => setShowLogin(true)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});