import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
// If not using Expo: `npm install react-native-vector-icons`
// and import from 'react-native-vector-icons/MaterialIcons' & 'MaterialCommunityIcons'.

// ---- Theme (from your design tokens) ----
const colors = {
  surface: '#f8f9fa',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainerLowest: '#ffffff',
  primary: '#006c49',
  primaryContainer: '#10b981',
  onPrimary: '#ffffff',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  outline: '#6c7a71',
  outlineVariant: '#bbcabf',
  black: '#000000',
};

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [regNumber, setRegNumber] = useState('');
  const [verifiedBadge, setVerifiedBadge] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const iconColor = (field) =>
    focusedField === field ? colors.primary : colors.outline;

  const handleSubmit = () => {
    // TODO: wire up to your auth logic
    console.log({ fullName, email, password, regNumber, verifiedBadge });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      {/* Top Navigation */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Text style={styles.logoTun}>Tun</Text>
          <Text style={styles.logoWork}>Work</Text>
        </View>
        <TouchableOpacity style={styles.skipRow}>
          <Text style={styles.skipText}>Passer pour l'instant</Text>
          <MaterialIcons name="chevron-right" size={18} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Header Section */}
          <Text style={styles.title}>Inscription</Text>
          <Text style={styles.subtitle}>
            Rejoignez la communauté TunWork et boostez votre carrière.
          </Text>

          {/* Full Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nom complet</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons
                name="person"
                size={20}
                color={iconColor('full_name')}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                onFocus={() => setFocusedField('full_name')}
                onBlur={() => setFocusedField(null)}
                placeholder="Ex: Ahmed Ben Salah"
                placeholderTextColor={colors.outline}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons
                name="mail"
                size={20}
                color={iconColor('email')}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="nom@exemple.com"
                placeholderTextColor={colors.outline}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Mot de passe</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons
                name="lock"
                size={20}
                color={iconColor('password')}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, styles.inputWithTrailingIcon]}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                placeholder="••••••••"
                placeholderTextColor={colors.outline}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.trailingIcon}
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <MaterialIcons
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={20}
                  color={colors.outline}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.helperText}>Minimum 8 caractères</Text>
          </View>

          {/* Company Verification Section */}
          <View style={styles.verificationSection}>
            <Text style={styles.sectionTitle}>Vérification de l'entreprise</Text>

            {/* Registration Number */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Numéro de registre du commerce</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="corporate-fare"
                  size={20}
                  color={iconColor('reg_number')}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={regNumber}
                  onChangeText={setRegNumber}
                  onFocus={() => setFocusedField('reg_number')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Ex: B123456789"
                  placeholderTextColor={colors.outline}
                />
              </View>
            </View>

            {/* Verified Badge Toggle */}
            <TouchableOpacity
              style={styles.badgeCard}
              activeOpacity={0.8}
              onPress={() => setVerifiedBadge((prev) => !prev)}
            >
              <View
                style={[
                  styles.checkbox,
                  verifiedBadge && styles.checkboxChecked,
                ]}
              >
                {verifiedBadge && (
                  <MaterialIcons name="check" size={16} color={colors.onPrimary} />
                )}
              </View>
              <View style={styles.badgeTextWrapper}>
                <Text style={styles.badgeTitle}>
                  Demander le badge 'Entreprise vérifiée'
                </Text>
                <Text style={styles.badgeSubtitle}>
                  Cette option nécessite une validation administrative manuelle
                  de vos documents.
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Créer mon compte</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Ou continuer avec</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Options */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Image
                style={styles.googleIcon}
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXXMqd0WZKsN64UqOfJXzaM1vfeW-1g2-k8ZwKy8S3nJwGRm40RrdavNW7Sp6e4RM2fX9tVs5d8BZS-7Cr_NBP8dcVux0HRxUPqNdJniN8aRf7eHS7axLAdIIxdBJ01uZCgCIYPkhJhShUoYnSTU_enab4BxQveh7wxz55PtRJmJ-NRJ4mntG19JcIlbGN4wV5FPFrXU0sD9HybQpjrDRpYlEcs78WZalqBTtPNLFeaZ3PYXIl-hAZy2Q3FgWCdH20BWPDjq08XEIA',
                }}
              />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <MaterialCommunityIcons name="apple-icloud" size={20} color={colors.black} />
              <Text style={styles.socialButtonText}>iCloud</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Link */}
          <View style={styles.footerLinkWrapper}>
            <Text style={styles.footerLinkText}>
              Déjà un compte ?{' '}
              <Text style={styles.footerLinkAction}>Se connecter</Text>
            </Text>
          </View>
        </View>

        {/* Legal Footer */}
        <View style={styles.legalFooter}>
          <Text style={styles.legalText}>
            © 2024 TunWork. Tous droits réservés.{'\n'}
            <Text style={styles.legalLink}>Conditions d'utilisation</Text>
            {'  '}
            <Text style={styles.legalLink}>Politique de confidentialité</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  logoRow: {
    flexDirection: 'row',
  },
  logoTun: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
  },
  logoWork: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  skipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    marginBottom: 24,
    lineHeight: 22,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  input: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.onSurface,
  },
  inputWithTrailingIcon: {
    paddingRight: 48,
  },
  trailingIcon: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
  helperText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 6,
    paddingHorizontal: 4,
  },
  verificationSection: {
    paddingTop: 16,
    marginTop: 4,
    marginBottom: 24,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  badgeTextWrapper: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 4,
  },
  badgeSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 16,
  },
  submitButton: {
    width: '100%',
    backgroundColor: colors.primaryContainer,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: colors.onPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  footerLinkWrapper: {
    marginTop: 40,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    alignItems: 'center',
  },
  footerLinkText: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
  footerLinkAction: {
    color: colors.primary,
    fontWeight: '700',
  },
  legalFooter: {
    width: '100%',
    maxWidth: 480,
    paddingVertical: 24,
    alignItems: 'center',
  },
  legalText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
  },
  legalLink: {
    textDecorationLine: 'underline',
  },
});