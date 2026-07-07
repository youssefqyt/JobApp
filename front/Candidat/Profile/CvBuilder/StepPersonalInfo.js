import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
  primary: '#006c49',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  onSecondaryContainer: '#306d58',
  secondaryContainer: '#adedd3',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerHigh: '#e7e8e9',
  outlineVariant: '#bbcabf',
  white: '#ffffff',
};

function Field({ label, value, onChangeText, placeholder, multiline }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textarea]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.onSurfaceVariant}
        multiline={multiline}
        numberOfLines={multiline ? 5 : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

export default function StepPersonalInfo({ value, onChange, userFirstName = 'Ahmed' }) {
  const data = value || {};

  const setField = (key) => (text) => onChange({ ...data, [key]: text });

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* AI greeting bubble */}
      <View style={styles.aiRow}>
        <View style={styles.aiAvatar}>
          <MaterialIcons name="psychology" size={18} color={COLORS.white} />
        </View>
        <View style={styles.aiBubble}>
          <Text style={styles.aiBubbleText}>
            Bonjour {userFirstName} ! Commençons par vérifier vos informations de base pour votre
            nouveau CV. J'ai pré-rempli ce que je savais déjà.
          </Text>
        </View>
      </View>

      <Field
        label="Nom Complet"
        value={data.fullName}
        onChangeText={setField('fullName')}
        placeholder="Ahmed Mansouri"
      />
      <Field
        label="Titre Professionnel"
        value={data.title}
        onChangeText={setField('title')}
        placeholder="Product Designer"
      />
      <Field
        label="Localisation"
        value={data.location}
        onChangeText={setField('location')}
        placeholder="Tunis, Tunisie"
      />
      <Field
        label="Bio & Résumé"
        value={data.bio}
        onChangeText={setField('bio')}
        placeholder="Designer passionné par la création d'interfaces intuitives..."
        multiline
      />

      {/* AI tip banner */}
      <View style={styles.aiTipBanner}>
        <MaterialIcons name="auto-awesome" size={18} color={COLORS.primary} />
        <Text style={styles.aiTipText}>
          Astuce IA : Votre bio est excellente, mais ajouter votre spécialisation en SaaS pourrait
          attirer +20% de recruteurs.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 18,
  },
  aiRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  aiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiBubble: {
    flex: 1,
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: 14,
    borderTopLeftRadius: 4,
    padding: 12,
  },
  aiBubbleText: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.onSurface,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },
  input: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: COLORS.onSurface,
  },
  textarea: {
    minHeight: 110,
  },
  aiTipBanner: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: COLORS.secondaryContainer,
    borderRadius: 12,
    padding: 14,
  },
  aiTipText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.onSecondaryContainer,
  },
});