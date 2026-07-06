import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './front/SplashScreen';
import Onboarding from './front/Onboarding';
import Home from './front/Home';

export default function App() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  const [userType, setUserType] = useState(null); // 'candidate' | 'company' | null

  if (!isSplashDone) {
    return (
      <>
        <StatusBar style="dark" />
        <SplashScreen onFinish={() => setIsSplashDone(true)} />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {userType ? (
        <Home userType={userType} onLogout={() => setUserType(null)} />
      ) : (
        <Onboarding onSelect={(type) => setUserType(type)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});