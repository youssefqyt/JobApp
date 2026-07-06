import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // npm install @expo/vector-icons
// If not using Expo: npm install react-native-vector-icons
// and import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// ---- Theme tokens (ported from the web mockup) ----
const colors = {
  primary: '#006c49',
  onPrimary: '#ffffff',
  onPrimaryFixedVariant: '#005236',
  secondaryContainer: '#adedd3',
  onSecondaryContainer: '#306d58',
  surface: '#f8f9fa',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainerLowest: '#ffffff',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  outline: '#6c7a71',
  outlineVariant: '#bbcabf',
};

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Live validation, derived from newPassword
  const reqLength = newPassword.length >= 8;
  const reqNumber = /\d/.test(newPassword);
  const reqSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

  const handleSubmit = () => {
    // Plug in real validation + API call here
    Alert.alert('TunWork', 'Traitement de la mise à jour du mot de passe...');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* TopAppBar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack?.()}
          accessibilityLabel="Retour"
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modifier le mot de passe</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Introduction */}
        <Text style={styles.intro}>
          Pour garantir la sécurité de votre compte TunWork, nous vous
          recommandons d'utiliser un mot de passe robuste et unique que vous
          n'utilisez pas sur d'autres sites.
        </Text>

        {/* Current Password */}
        <PasswordField
          label="Mot de passe actuel"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          visible={showCurrent}
          onToggleVisible={() => setShowCurrent((v) => !v)}
        />

        {/* New Password */}
        <PasswordField
          label="Nouveau mot de passe"
          value={newPassword}
          onChangeText={setNewPassword}
          visible={showNew}
          onToggleVisible={() => setShowNew((v) => !v)}
        />

        {/* Security Requirements */}
        <View style={styles.reqCard}>
          <View style={styles.reqHeader}>
            <MaterialIcons
              name="verified-user"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.reqTitle}>Exigences de sécurité</Text>
          </View>

          <RequirementItem label="Au moins 8 caractères" valid={reqLength} />
          <RequirementItem label="Au moins un chiffre" valid={reqNumber} />
          <RequirementItem
            label="Au moins un caractère spécial"
            valid={reqSpecial}
          />
        </View>

        {/* Confirm New Password */}
        <PasswordField
          label="Confirmer le nouveau mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          visible={showConfirm}
          onToggleVisible={() => setShowConfirm((v) => !v)}
        />

        {/* Info Alert Card */}
        <View style={styles.infoCard}>
          <MaterialIcons
            name="info"
            size={20}
            color={colors.onSecondaryContainer}
            style={{ marginTop: 1 }}
          />
          <Text style={styles.infoText}>
            La mise à jour de votre mot de passe entraînera la déconnexion de
            tous vos autres appareils actifs par mesure de sécurité.
          </Text>
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.85}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>
            Mettre à jour le mot de passe
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---- Reusable subcomponents ----

function PasswordField({ label, value, onChangeText, visible, onToggleVisible }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <MaterialIcons
          name="lock"
          size={20}
          color={colors.outline}
          style={styles.leadingIcon}
        />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="••••••••"
          placeholderTextColor={colors.outline}
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.trailingIcon}
          onPress={onToggleVisible}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialIcons
            name={visible ? 'visibility-off' : 'visibility'}
            size={20}
            color={colors.outline}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function RequirementItem({ label, valid }) {
  return (
    <View style={styles.reqItem}>
      <MaterialIcons
        name="check-circle"
        size={18}
        color={valid ? colors.primary : colors.onSurfaceVariant}
      />
      <Text style={[styles.reqLabel, valid && styles.reqLabelValid]}>
        {label}
      </Text>
    </View>
  );
}

// ---- Styles ----

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  backButton: {
    padding: 8,
    borderRadius: 999,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 24,
  },
  intro: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.onSurfaceVariant,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
  },
  leadingIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  trailingIcon: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  input: {
    flex: 1,
    paddingLeft: 48,
    paddingRight: 48,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.onSurface,
  },
  reqCard: {
    padding: 20,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerLowest,
    gap: 16,
  },
  reqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reqTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  reqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  reqLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  reqLabelValid: {
    color: colors.primary,
  },
  infoCard: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.secondaryContainer,
    borderWidth: 1,
    borderColor: 'rgba(187,202,191,0.3)',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    color: colors.onSecondaryContainer,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.onPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});