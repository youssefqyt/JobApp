import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import StepTemplate from './StepTemplate';
import StepPersonalInfo from './StepPersonalInfo';
import StepExperience from './StepExperience';
import StepSkillsGenerate from './StepSkillsGenerate';
// Adjust this path if CvBuilderWizard.js lives in a different folder
// relative to the context folder than Home.js does.
import { useCandidateTheme } from '../../../context/CandidateThemeContext';

const STEPS = [
  { key: 'template', label: 'Choisir un modèle', Component: StepTemplate },
  { key: 'personalInfo', label: 'Informations Personnelles', Component: StepPersonalInfo },
  { key: 'experience', label: 'Expérience & Formation', Component: StepExperience },
  { key: 'skillsGenerate', label: 'Compétences & Génération', Component: StepSkillsGenerate },
];

export default function CvBuilderWizard({ onExit, onComplete }) {
  const { colors } = useCandidateTheme();
  const styles = getStyles(colors);

  const [stepIndex, setStepIndex] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
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

  // Header back arrow — always shows exit confirmation (any step)
  const handleHeaderBack = () => {
    setShowExitConfirm(true);
  };

  // Footer "Retour" button — goes to previous step, or shows modal on step 1
  const handleFooterBack = () => {
    if (isFirstStep) {
      setShowExitConfirm(true);
    } else {
      setStepIndex((i) => i - 1);
    }
  };

  const handleDiscard = () => {
    setShowExitConfirm(false);
    onExit && onExit();
  };

  const handleContinue = () => {
    setShowExitConfirm(false);
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
          <TouchableOpacity style={styles.backRow} activeOpacity={0.7} onPress={handleHeaderBack}>
            <MaterialIcons name="arrow-back" size={20} color={colors.primary} />
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
        <TouchableOpacity style={styles.retourButton} activeOpacity={0.7} onPress={handleFooterBack}>
          <MaterialIcons name="chevron-left" size={18} color={colors.onSurfaceVariant} />
          <Text style={styles.retourButtonText}>Retour</Text>
        </TouchableOpacity>

        {!isLastStep && (
          <TouchableOpacity style={styles.continuerButton} activeOpacity={0.85} onPress={goNext}>
            <Text style={styles.continuerButtonText}>Continuer</Text>
            <MaterialIcons name="chevron-right" size={18} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>

      {/* Exit confirmation modal */}
      <Modal
        visible={showExitConfirm}
        transparent
        animationType="fade"
        onRequestClose={handleContinue}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <MaterialIcons name="warning-amber" size={36} color={colors.primary} style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Quitter la génération ?</Text>
            <Text style={styles.modalText}>
              Les informations déjà saisies seront perdues si vous quittez maintenant.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalDiscardButton}
                activeOpacity={0.8}
                onPress={handleDiscard}
              >
                <Text style={styles.modalDiscardText}>Ignorer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalContinueButton}
                activeOpacity={0.85}
                onPress={handleContinue}
              >
                <Text style={styles.modalContinueText}>Continuer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    backgroundColor: colors.background,
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
    color: colors.primary,
  },
  progressPercentText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.surfaceContainerLow,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primaryContainer,
  },
  stepMeta: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
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
    color: colors.onSurfaceVariant,
  },
  continuerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  continuerButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalDiscardButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDiscardText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  modalContinueButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContinueText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
});