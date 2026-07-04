import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SplashScreen({ onFinish }) {
  // Logo fade-in + scale animation
  const logoAnim = useRef(new Animated.Value(0)).current;

  // Pulse animation on the logo (subtle opacity oscillation)
  const pulseAnim = useRef(new Animated.Value(0)).current;

  // Loading bar width animation
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Overall splash fade-out
  const fadeOutAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Logo entrance: fade in + scale up
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // 2. Pulse loop on logo (starts after entrance)
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    setTimeout(() => pulseLoop.start(), 1200);

    // 3. Progress bar fills up over ~3 seconds
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      // 4. Fade out splash
      Animated.timing(fadeOutAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        if (onFinish) onFinish();
      });
    });

    return () => {
      pulseLoop.stop();
    };
  }, []);

  const logoScale = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  const logoOpacity = logoAnim;

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeOutAnim },
      ]}
    >
      {/* Logo Branding Centerpiece — white card, sized relative to screen */}
      <Animated.View
        style={[
          styles.logoWrapper,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Animated.Image
          source={require('../assets/splash-icon.png')}
          style={[
            styles.logo,
            { opacity: pulseOpacity },
          ]}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Loading Bar */}
      <View style={styles.loadingContainer}>
        <View style={styles.trackBar}>
          <Animated.View
            style={[styles.progressBar, { width: progressWidth }]}
          />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    // subtle card shadow, matching the elevated white panel in the design
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  logo: {
    width: '90%',
    height: '85%',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 48,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  trackBar: {
    width: 48,
    height: 2,
    backgroundColor: '#bbcabf',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 9999,
  },
});