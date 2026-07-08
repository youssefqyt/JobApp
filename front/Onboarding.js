import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
  primary: '#006c49',
  secondary: '#2b6954',
  secondaryContainer: '#adedd3',
  onSecondaryContainer: '#306d58',
  background: '#f8f9fa',
  onBackground: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  surfaceContainerLowest: '#ffffff',
  outline: '#6c7a71',
  outlineVariant: '#bbcabf',
};

function IdentityCard({ iconName, title, description, badgeIcon, badgeLabel, ctaLabel, onPress, delay }) {
  const anim = useRef(new Animated.Value(0)).current;
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 500,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return (
    <Animated.View style={{ opacity: anim, transform: [{ translateY }] }}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          setSelected(true);
          onPress();
        }}
        style={[styles.card, selected && styles.cardSelected]}
      >
        <View style={styles.cardIconWrap}>
          <MaterialIcons name={iconName} size={40} color={COLORS.primary} />
        </View>

        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>

        <View style={styles.ctaRow}>
          <Text style={styles.ctaLabel}>{ctaLabel}</Text>
          <MaterialIcons name="arrow-forward" size={18} color={COLORS.primary} />
        </View>

        <View style={styles.badge}>
          <MaterialIcons name={badgeIcon} size={14} color={COLORS.outline} />
          <Text style={styles.badgeText}>{badgeLabel}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// onSelect: (userType: 'candidate' | 'company') => void
export default function Onboarding({ onSelect, onLoginPress }) {
  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          <Text style={{ color: '#000000' }}>Tun</Text>
          <Text style={{ color: COLORS.primary }}>Work</Text>
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={onLoginPress}>
            <Text style={styles.headerLink}>Connexion</Text>
          </TouchableOpacity>
          <Text style={styles.headerDivider}>|</Text>
          <TouchableOpacity>
            <Text style={styles.headerLink}>FR</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Trust pill */}
        <View style={styles.pill}>
          <MaterialIcons name="verified" size={18} color={COLORS.onSecondaryContainer} />
        </View>

        <Text style={styles.title}>
          Bienvenue sur <Text style={{ color: COLORS.primary }}>TunWork</Text>
        </Text>

        <Text style={styles.subtitle}>
          La plateforme IA qui connecte les talents et les entreprises en Tunisie.
          Simplifiez votre futur professionnel dès aujourd'hui.
        </Text>

        {/* Identity Cards */}
        <View style={styles.cardsWrap}>
          <IdentityCard
            iconName="person-search"
            title="Candidat"
            description="Je recherche de nouvelles opportunités de carrière et je souhaite booster ma visibilité auprès des recruteurs."
            badgeIcon="auto-awesome"
            badgeLabel="AI MATCHING"
            ctaLabel="Créer mon profil"
            onPress={() => onSelect('candidate')}
            delay={200}
          />
          <IdentityCard
            iconName="business"
            title="Entreprise"
            description="Nous recrutons des talents exceptionnels pour renforcer nos équipes et accélérer notre croissance."
            badgeIcon="query-stats"
            badgeLabel="INSIGHTS PRO"
            ctaLabel="Publier une offre"
            onPress={() => onSelect('company')}
            delay={350}
          />
        </View>

        {/* Trust / social proof */}
        <View style={styles.trustSection}>
          <Text style={styles.trustLabel}>ILS NOUS FONT CONFIANCE</Text>
          <View style={styles.trustLogos}>
            {['TECH.TN', 'BIAT', 'OOREDOO', 'SMART', 'VERMEG'].map((name) => (
              <Text key={name} style={styles.trustLogo}>
                {name}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
    backgroundColor: COLORS.background,
  },
  logo: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerLink: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    fontWeight: '600',
  },
  headerDivider: {
    color: COLORS.outlineVariant,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 48,
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: COLORS.onBackground,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 340,
  },
  cardsWrap: {
    width: '100%',
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  cardSelected: {
    borderColor: COLORS.primary,
  },
  cardIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 999,
    backgroundColor: 'rgba(0,108,73,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.onBackground,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  ctaLabel: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  badge: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: COLORS.outline,
  },
  trustSection: {
    marginTop: 32,
    alignItems: 'center',
    width: '100%',
  },
  trustLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: COLORS.outline,
    marginBottom: 20,
  },
  trustLogos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    opacity: 0.6,
  },
  trustLogo: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.onBackground,
  },
});