import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCompanyTheme } from '../context/EnterpriseThemeContext';

// Contract type options — CDI / CDD / Freelance / Stage / Alternance
const CONTRACT_TYPES = ['CDI', 'CDD', 'Freelance', 'Stage', 'Alternance'];

function ContractOption({ label, selected, onPress, styles }) {
  return (
    <TouchableOpacity style={styles.contractOption} activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.contractLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function PostJob({ onBack, onPublish }) {
  const { colors } = useCompanyTheme();
  const styles = getStyles(colors);

  const [jobTitle, setJobTitle] = useState('Développeur Full Stack');
  const [contractType, setContractType] = useState('CDI');
  const [location, setLocation] = useState('Tunis, Tunisie (Télétravail)');
  const [missions, setMissions] = useState(
    '- Conception et développement de nouvelles fonctionnalités (React/Node.js)\n- Maintenance évolutive et correction de bugs sur les plateformes existantes\n- Collaboration étroite avec les équipes Design et Product Owner'
  );
  const [profile, setProfile] = useState('React.js, Node.js, TypeScript, PostgreSQL, AWS, Agile Scrum');

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backRow} activeOpacity={0.7} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={22} color={colors.primary} />
          <Text style={styles.headerTitle}>Poste Job</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Publier une offre</Text>

        <View style={styles.formCard}>
          {/* Job Title */}
          <View style={styles.field}>
            <Text style={styles.label}>Intitulé du poste</Text>
            <TextInput
              style={styles.input}
              value={jobTitle}
              onChangeText={setJobTitle}
              placeholder="ex: Développeur Full-Stack Senior"
              placeholderTextColor={colors.onSurfaceVariant}
            />
          </View>

          {/* Contract Type */}
          <View style={styles.field}>
            <Text style={styles.label}>Type de contrat</Text>
            <View style={styles.contractGroup}>
              {CONTRACT_TYPES.map((type) => (
                <ContractOption
                  key={type}
                  label={type}
                  selected={contractType === type}
                  onPress={() => setContractType(type)}
                  styles={styles}
                />
              ))}
            </View>
          </View>

          {/* Location */}
          <View style={styles.field}>
            <Text style={styles.label}>Lieu</Text>
            <View style={styles.inputWithIcon}>
              <MaterialIcons name="location-on" size={20} color={colors.onSurfaceVariant} />
              <TextInput
                style={styles.inputIconField}
                value={location}
                onChangeText={setLocation}
                placeholder="Tunis, Tunisie"
                placeholderTextColor={colors.onSurfaceVariant}
              />
            </View>
          </View>

          {/* Missions */}
          <View style={styles.field}>
            <Text style={styles.label}>Missions</Text>
            <TextInput
              style={styles.textarea}
              value={missions}
              onChangeText={setMissions}
              placeholder="Décrivez les missions et les responsabilités..."
              placeholderTextColor={colors.onSurfaceVariant}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Profil recherché */}
          <View style={styles.field}>
            <Text style={styles.label}>Profil recherché</Text>
            <TextInput
              style={styles.textarea}
              value={profile}
              onChangeText={setProfile}
              placeholder="Décrivez les compétences et l'expérience recherchées..."
              placeholderTextColor={colors.onSurfaceVariant}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={() => onPublish && onPublish({ jobTitle, contractType, location, missions, profile })}
          >
            <MaterialIcons name="send" size={20} color={colors.onPrimary} />
            <Text style={styles.submitButtonText}>Publier l'offre</Text>
          </TouchableOpacity>
        </View>

        {/* Tips card */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeaderRow}>
            <MaterialIcons name="lightbulb" size={20} color={colors.primary} />
            <Text style={styles.tipsTitle}>Conseils de recrutement</Text>
          </View>
          <Text style={styles.tipsText}>
            Un intitulé de poste clair et une description détaillée augmentent de 40% le taux
            de conversion des candidats qualifiés. Utilisez notre outil d'IA pour optimiser vos
            mots-clés.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
  },
  header: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 20,
    letterSpacing: -0.4,
  },
  formCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 16,
    padding: 20,
    gap: 24,
    marginBottom: 24,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  input: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: colors.onSurface,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  inputIconField: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.onSurface,
  },
  textarea: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: colors.onSurface,
    minHeight: 100,
  },

  // Contract type radio group
  contractGroup: {
    gap: 12,
  },
  contractOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.primaryContainer,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryContainer,
  },
  contractLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
  },

  // Submit button
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 4,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onPrimary,
  },

  // Tips card
  tipsCard: {
    backgroundColor: colors.secondaryContainer,
    borderRadius: 16,
    padding: 20,
  },
  tipsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSecondaryContainer,
  },
  tipsText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSecondaryContainer,
    opacity: 0.9,
  },
});