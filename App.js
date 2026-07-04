import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './front/SplashScreen';
import Home from './front/Home';

export default function App() {
  const [isSplashDone, setIsSplashDone] = useState(false);

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
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});
