import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCandidateTheme } from '../../../context/CandidateThemeContext'; // adjust relative path if needed

const DEFAULT_SKILLS = ['React.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'TypeScript'];

export default function StepSkillsGenerate({ value, onChange, generating, onGenerate }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);

  const skills = value?.skills?.length ? value.skills : DEFAULT_SKILLS;
  const [newSkill, setNewSkill] = useState('');

  const setSkills = (list) => onChange({ ...value, skills: list });

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setNewSkill('');
  };

  const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill));

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Compétences & Génération</Text>
      <Text style={styles.subtitle}>
        Listez vos compétences clés, puis laissez l'IA composer votre CV final.
      </Text>

      {/* Skill input */}
      <View style={styles.addSkillRow}>
        <TextInput
          style={styles.skillInput}
          value={newSkill}
          onChangeText={setNewSkill}
          placeholder="Ajouter une compétence..."
          placeholderTextColor={colors.outline}
          onSubmitEditing={addSkill}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addSkillButton} activeOpacity={0.8} onPress={addSkill}>
          <MaterialIcons name="add" size={18} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Skill chips */}
      <View style={styles.chipWrap}>
        {skills.map((skill) => (
          <View key={skill} style={styles.skillChip}>
            <Text style={styles.skillChipText}>{skill}</Text>
            <TouchableOpacity onPress={() => removeSkill(skill)} hitSlop={8}>
              <MaterialIcons name="close" size={14} color={colors.onSecondaryContainer} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* AI generate card */}
      <View style={styles.generateCard}>
        <View style={styles.generateIconWrap}>
          <MaterialIcons name="auto-awesome" size={22} color={colors.primary} />
        </View>
        <Text style={styles.generateTitle}>Prêt à générer votre CV</Text>
        <Text style={styles.generateSubtitle}>
          L'IA va assembler votre modèle, vos informations et vos compétences en un CV optimisé
          pour les recruteurs.
        </Text>
        <TouchableOpacity
          style={styles.generateButton}
          activeOpacity={0.85}
          onPress={onGenerate}
          disabled={generating}
        >
          <MaterialIcons
            name={generating ? 'hourglass-top' : 'auto-awesome'}
            size={18}
            color={colors.white}
          />
          <Text style={styles.generateButtonText}>
            {generating ? 'Génération en cours...' : 'Générer mon CV'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: 18,
  },
  addSkillRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  skillInput: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: colors.onSurface,
  },
  addSkillButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: colors.secondaryContainerFaint,
    borderWidth: 1,
    borderColor: colors.secondaryContainer,
  },
  skillChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSecondaryContainer,
  },
  generateCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  generateIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  generateTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 6,
  },
  generateSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 18,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    justifyContent: 'center',
  },
  generateButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
  },
});