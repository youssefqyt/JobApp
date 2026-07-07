import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
  primary: '#006c49',
  primaryContainer: '#10b981',
  onPrimary: '#ffffff',
  background: '#f8f9fa',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f4f5',
  outline: '#6c7a71',
  outlineVariant: '#bbcabf',
};

// onSignUp: ({ fullName, email, password }) => void
// onSkip: () => void
// onSignIn: () => void
export default function SignUp({ onSignUp, onSkip, onSignIn }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    onSignUp && onSignUp({ fullName, email, password });
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          <Text style={{ color: COLORS.onSurface }}>Tun</Text>
          <Text style={{ color: COLORS.primary }}>Work</Text>
        </Text>
        <TouchableOpacity style={styles.skipRow} onPress={onSkip}>
          <Text style={styles.skipLink}>Passer pour l'instant</Text>
          <MaterialIcons name="chevron-right" size={18} color={COLORS.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          {/* Title */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Inscription</Text>
            <Text style={styles.subtitle}>
              Rejoignez la communauté TunWork et boostez votre carrière.
            </Text>
          </View>

          {/* Full name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nom complet</Text>
            <View style={styles.inputWrap}>
              <MaterialIcons
                name="person"
                size={20}
                color={COLORS.outline}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Ex: Ahmed Ben Salah"
                placeholderTextColor={COLORS.outline}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrap}>
              <MaterialIcons
                name="mail"
                size={20}
                color={COLORS.outline}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="nom@exemple.com"
                placeholderTextColor={COLORS.outline}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Mot de passe</Text>
            <View style={styles.inputWrap}>
              <MaterialIcons
                name="lock"
                size={20}
                color={COLORS.outline}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={COLORS.outline}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword((v) => !v)}
              >
                <MaterialIcons
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={20}
                  color={COLORS.outline}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.helperText}>Minimum 8 caractères</Text>
          </View>

          {/* Submit */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>S'inscrire</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OU CONTINUER AVEC</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <MaterialIcons name="g-mobiledata" size={22} color={COLORS.onSurface} />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <MaterialIcons name="apple" size={18} color={COLORS.onSurface} />
              <Text style={styles.socialButtonText}>iCloud</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Déjà un compte ? </Text>
            <TouchableOpacity onPress={onSignIn}>
              <Text style={styles.footerLink}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Legal footer */}
        <View style={styles.legalFooter}>
          <Text style={styles.legalText}>© 2024 TunWork. Tous droits réservés.</Text>
          <View style={styles.legalLinksRow}>
            <TouchableOpacity>
              <Text style={styles.legalLink}>Conditions d'utilisation</Text>
            </TouchableOpacity>
            <Text style={styles.legalText}>  ·  </Text>
            <TouchableOpacity>
              <Text style={styles.legalLink}>Politique de confidentialité</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  skipRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipLink: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    fontWeight: '600',
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
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
    padding: 28,
    marginTop: 8,
  },
  titleSection: {
    marginBottom: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: COLORS.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.onSurfaceVariant,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.onSurface,
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 8,
  },
  inputIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 15,
    color: COLORS.onSurface,
  },
  eyeButton: {
    paddingHorizontal: 12,
  },
  helperText: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 6,
    paddingHorizontal: 4,
  },
  submitButton: {
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: COLORS.onPrimary,
    fontWeight: '600',
    fontSize: 15,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.outlineVariant,
  },
  dividerText: {
    fontSize: 11,
    letterSpacing: 1,
    color: COLORS.onSurfaceVariant,
    marginHorizontal: 12,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.outlineVariant,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  legalFooter: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  legalText: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
  },
  legalLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  legalLink: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    textDecorationLine: 'underline',
  },
});