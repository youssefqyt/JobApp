import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
// This screen lives at Profile/Settings/Contact.js, one level deeper than
// Profile/Profile.js (which imports '../../context/CandidateThemeContext'),
// so it needs one extra '../'. Adjust if your folder layout differs.
import { useCandidateTheme } from '../../../context/CandidateThemeContext';

const SUBJECTS = [
  { label: 'Support Technique', value: 'support' },
  { label: 'Facturation', value: 'billing' },
  { label: 'Partenariat', value: 'partnership' },
  { label: 'Autre', value: 'other' },
];

// Social icon paths (LinkedIn, Facebook, Instagram) carried over from the web SVGs
const ICONS = {
  linkedin:
    'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z',
  facebook:
    'M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9V15.36H8.2V12.06h2.24V9.53c0-2.22 1.32-3.44 3.33-3.44.96 0 1.97.17 1.97.17v2.17h-1.1c-1.1 0-1.44.68-1.44 1.38v1.65h2.44l-.39 3.3h-2.05v6.6c4.78-.75 8.44-4.9 8.44-9.9 0-5.53-4.5-10.02-10-10.02z',
  instagram:
    'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2C5.1 4 4 5.1 4 7.6v8.8C4 18.9 5.1 20 7.6 20h8.8c2.5 0 3.6-1.1 3.6-3.6V7.6C20 5.1 18.9 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z',
};

// ---- Sub-components — each pulls its own theme, same pattern as
// SettingsSheet.js's SettingsRow/ChevronRight/SectionLabel. ----

function SocialButton({ iconPath, onPress }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);
  return (
    <TouchableOpacity style={styles.socialButton} onPress={onPress} activeOpacity={0.7}>
      <Svg width={22} height={22} viewBox="0 0 24 24" fill={colors.onSurfaceVariant}>
        <Path d={iconPath} />
      </Svg>
    </TouchableOpacity>
  );
}

// Bento-style info card with a subtle surfaceContainerLowest ->
// surfaceContainerLow gradient (mirrors the web's .contact-card-gradient),
// plus a press-scale to mimic `active:scale-95`.
function InfoCard({ icon, label, value, onPress }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);
  const [pressed, setPressed] = useState(false);
  return (
    <TouchableOpacity
      style={[styles.infoCardTouchable, pressed && styles.infoCardPressed]}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={[colors.surfaceContainerLowest, colors.surfaceContainerLow]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.infoCard}
      >
        <View style={styles.infoIconBadge}>
          <MaterialIcons name={icon} size={20} color={colors.onSecondaryContainer} />
        </View>
        <View>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={styles.infoValue} numberOfLines={1}>
            {value}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// Bottom-sheet style select for "Sujet" — matches the app's green theme
// (and dark mode) instead of the OS-native picker.
function SubjectPicker({ value, onChange }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);
  const [open, setOpen] = useState(false);
  const selected = SUBJECTS.find((s) => s.value === value);

  return (
    <>
      <TouchableOpacity
        style={styles.selectInput}
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.selectInputText}>{selected?.label}</Text>
        <MaterialIcons name="expand-more" size={22} color={colors.onSurfaceVariant} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.sheetOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.sheet}>
          <View style={styles.sheetGrabber} />
          <Text style={styles.sheetTitle}>Sujet</Text>
          {SUBJECTS.map((s) => {
            const isSelected = s.value === value;
            return (
              <TouchableOpacity
                key={s.value}
                style={[styles.sheetOption, isSelected && styles.sheetOptionSelected]}
                activeOpacity={0.7}
                onPress={() => {
                  onChange(s.value);
                  setOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.sheetOptionText,
                    isSelected && styles.sheetOptionTextSelected,
                  ]}
                >
                  {s.label}
                </Text>
                {isSelected && (
                  <MaterialIcons name="check" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    </>
  );
}

export default function ContactScreen({ navigation }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('support');
  const [message, setMessage] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleSubmit = () => {
    if (status !== 'idle') return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => {
        setStatus('idle');
        setFullName('');
        setEmail('');
        setSubject('support');
        setMessage('');
      }, 2000);
    }, 1500);
  };

  const labelStyle = (field) => [
    styles.label,
    focusedField === field && { color: colors.primary },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack?.()}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Nous contacter</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Welcome */}
        <View style={styles.welcome}>
          <Text style={styles.headline}>Besoin d'aide ?</Text>
          <Text style={styles.subtitle}>
            Notre équipe est là pour vous accompagner dans votre recherche
            d'emploi ou de talents.
          </Text>
        </View>

        {/* Contact info cards — bento grid, 2 columns */}
        <View style={styles.infoRow}>
          <InfoCard
            icon="mail"
            label="Email"
            value="support@tunwork.tn"
            onPress={() => Linking.openURL('mailto:support@tunwork.tn')}
          />
          <InfoCard
            icon="call"
            label="Téléphone"
            value="+216 71 000 000"
            onPress={() => Linking.openURL('tel:+21671000000')}
          />
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          <View style={styles.field}>
            <Text style={labelStyle('full_name')}>Nom complet</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Ex: Ahmed Ben Salah"
              placeholderTextColor={colors.outline}
              onFocus={() => setFocusedField('full_name')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          <View style={styles.field}>
            <Text style={labelStyle('email')}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="votre@email.com"
              placeholderTextColor={colors.outline}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          <View style={styles.field}>
            <Text style={labelStyle('subject')}>Sujet</Text>
            <SubjectPicker value={subject} onChange={setSubject} />
          </View>

          <View style={styles.field}>
            <Text style={labelStyle('message')}>Message</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={message}
              onChangeText={setMessage}
              placeholder="Comment pouvons-nous vous aider ?"
              placeholderTextColor={colors.outline}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              status === 'sent' && { backgroundColor: colors.tertiary },
              status === 'sending' && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={status !== 'idle'}
            activeOpacity={0.85}
          >
            {status === 'sending' && (
              <>
                <ActivityIndicator color={colors.onPrimaryContainer} />
                <Text style={styles.submitText}>Envoi...</Text>
              </>
            )}
            {status === 'sent' && (
              <>
                <MaterialIcons name="check-circle" size={22} color={colors.onTertiary} />
                <Text style={[styles.submitText, { color: colors.onTertiary }]}>
                  Envoyé !
                </Text>
              </>
            )}
            {status === 'idle' && (
              <>
                <Text style={styles.submitText}>Envoyer le message</Text>
                <MaterialIcons name="send" size={20} color={colors.onPrimaryContainer} />
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Social media */}
        <View style={styles.socialSection}>
          <Text style={styles.socialLabel}>Suivez-nous sur les réseaux sociaux</Text>
          <View style={styles.socialRow}>
            <SocialButton iconPath={ICONS.linkedin} onPress={() => {}} />
            <SocialButton iconPath={ICONS.facebook} onPress={() => {}} />
            <SocialButton iconPath={ICONS.instagram} onPress={() => {}} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  appBar: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 999,
  },
  appBarTitle: { fontSize: 24, fontWeight: '600', color: colors.primary },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingTop: 32, paddingBottom: 40 },
  welcome: { marginBottom: 24, gap: 8 },
  headline: { fontSize: 24, fontWeight: '600', color: colors.onSurface },
  subtitle: { fontSize: 16, lineHeight: 24, color: colors.onSurfaceVariant },

  // Bento info cards
  infoRow: { flexDirection: 'row', gap: 16, marginBottom: 32 },
  infoCardTouchable: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
  },
  infoCardPressed: { transform: [{ scale: 0.95 }] },
  infoCard: { padding: 20, gap: 12, alignItems: 'flex-start' },
  infoIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: { fontSize: 12, fontWeight: '500', color: colors.outline, marginBottom: 2 },
  infoValue: { fontSize: 14, fontWeight: '600', color: colors.primary },

  formCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 24,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
    marginBottom: 32,
  },
  field: { gap: 6 },
  label: { fontSize: 14, fontWeight: '600', color: colors.onSurfaceVariant },
  input: {
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 10,
    fontSize: 16,
    color: colors.onSurface,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  selectInput: {
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectInputText: { fontSize: 16, color: colors.onSurface },

  // Bottom sheet (Sujet picker)
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  sheet: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
  },
  sheetGrabber: {
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.outlineVariant,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 12,
  },
  sheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 6,
  },
  sheetOptionSelected: {
    backgroundColor: colors.secondaryContainer,
  },
  sheetOptionText: {
    fontSize: 16,
    color: colors.onSurface,
  },
  sheetOptionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  submitButton: {
    height: 56,
    backgroundColor: colors.primaryContainer,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonDisabled: { opacity: 0.5 },
  submitText: { fontSize: 20, fontWeight: '600', color: colors.onPrimaryContainer },
  socialSection: { alignItems: 'center', gap: 16, paddingVertical: 16 },
  socialLabel: { fontSize: 12, fontWeight: '500', color: colors.outline },
  socialRow: { flexDirection: 'row', gap: 24 },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
});