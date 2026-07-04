import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './front/SplashScreen';

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
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
