import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import StepTemplate from './StepTemplate';
import StepPersonalInfo from './StepPersonalInfo';
import StepExperience from './StepExperience';
import StepSkillsGenerate from './StepSkillsGenerate';

const COLORS = {
  primary: '#006c49',
  primaryContainer: '#10b981',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  surface: '#f8f9fa',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainerLowest: '#ffffff',
  outlineVariant: '#bbcabf',
  white: '#ffffff',
};

const STEPS = [
  { key: 'template', label: 'Choisir un modèle', Component: StepTemplate },
  { key: 'personalInfo', label: 'Informations Personnelles', Component: StepPersonalInfo },
  { key: 'experience', label: 'Expérience & Formation', Component: StepExperience },
  { key: 'skillsGenerate', label: 'Compétences & Génération', Component: StepSkillsGenerate },
];

export default function CvBuilderWizard({ onExit, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    template: {},
    personalInfo: {},
    experience: {},
    skillsGenerate: {},
  });

  const currentStep = STEPS[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === STEPS.length - 1;
  const progressPercent = Math.round(((stepIndex + 1) / STEPS.length) * 100);

  const updateStepData = (key) => (data) =>
    setFormData((prev) => ({ ...prev, [key]: data }));

  const goBack = () => {
    if (isFirstStep) {
      onExit && onExit();
    } else {
      setStepIndex((i) => i - 1);
    }
  };

  const goNext = () => {
    if (isLastStep) return; // last step uses its own "Générer" action
    setStepIndex((i) => i + 1);
  };

  const handleGenerate = () => {
    setGenerating(true);
    // Simulate AI generation — replace with real API call
    setTimeout(() => {
      setGenerating(false);
      onComplete && onComplete(formData);
    }, 1500);
  };

  const StepComponent = currentStep.Component;
  const stepProps = {
    value: formData[currentStep.key],
    onChange: updateStepData(currentStep.key),
  };
  if (currentStep.key === 'skillsGenerate') {
    stepProps.generating = generating;
    stepProps.onGenerate = handleGenerate;
  }

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity style={styles.backRow} activeOpacity={0.7} onPress={goBack}>
            <MaterialIcons name="arrow-back" size={20} color={COLORS.primary} />
            <Text style={styles.headerTitle}>CV Builder IA</Text>
          </TouchableOpacity>
          <Text style={styles.progressPercentText}>{progressPercent}%</Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
        <Text style={styles.stepMeta}>
          ÉTAPE {stepIndex + 1} SUR {STEPS.length} · {currentStep.label}
        </Text>
      </View>

      {/* Active step content */}
      <StepComponent {...stepProps} />

      {/* Footer navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.retourButton} activeOpacity={0.7} onPress={goBack}>
          <MaterialIcons name="chevron-left" size={18} color={COLORS.onSurfaceVariant} />
          <Text style={styles.retourButtonText}>Retour</Text>
        </TouchableOpacity>

        {!isLastStep && (
          <TouchableOpacity style={styles.continuerButton} activeOpacity={0.85} onPress={goNext}>
            <Text style={styles.continuerButtonText}>Continuer</Text>
            <MaterialIcons name="chevron-right" size={18} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surface,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  progressPercentText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceContainerLow,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: COLORS.primaryContainer,
  },
  stepMeta: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surfaceContainerLowest,
  },
  retourButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  retourButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },
  continuerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  continuerButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
});