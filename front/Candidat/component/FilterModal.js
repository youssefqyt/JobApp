import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
  primary: '#006c49',
  primaryContainer: '#10b981',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainer: '#edeeef',
  outlineVariant: '#bbcabf',
  star: '#eab308',
};

const GOUVERNORATS = [
  'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul',
  'Bizerte', 'Sousse', 'Monastir', 'Sfax', 'Kairouan', 'Gabès',
];
const CONTRACTS = ['CDI', 'CDD', 'Stage', 'Freelance', 'Temps partiel'];
const WORK_MODES = [
  { key: 'remote', label: 'Télétravail' },
  { key: 'onsite', label: 'Présentiel' },
  { key: 'hybrid', label: 'Hybride' },
  { key: 'verified', label: 'Vérifiées', highlight: true },
];
const EXPERIENCE_LEVELS = [
  { key: 'junior', label: 'Junior', icon: 'school' },
  { key: 'mid', label: 'Intermédiaire', icon: 'trending-up' },
  { key: 'senior', label: 'Senior', icon: 'stars' },
  { key: 'expert', label: 'Expert', icon: 'workspace-premium' },
];
const SECTORS = ['IT & Tech', 'Finance', 'Marketing', 'Santé', 'Education', 'Design'];
const RATINGS = ['4', '3', '2', 'Tous'];

function Chip({ label, active, onPress, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive, style]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

// visible: boolean
// onClose: () => void
// onApply: (filters) => void  — called with the selected filter state when "Voir X offres" is pressed
// resultCount: number — shown on the apply button
export default function FilterModal({ visible, onClose, onApply, resultCount = 47 }) {
  const [gouvernorat, setGouvernorat] = useState('Tunis');
  const [contract, setContract] = useState('CDD');
  const [workModes, setWorkModes] = useState(['remote', 'hybrid', 'verified']);
  const [experience, setExperience] = useState('mid');
  const [sector, setSector] = useState('IT & Tech');
  const [rating, setRating] = useState('3');

  const toggleWorkMode = (key) => {
    setWorkModes((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleReset = () => {
    setGouvernorat(null);
    setContract(null);
    setWorkModes([]);
    setExperience(null);
    setSector(null);
    setRating(null);
  };

  const handleApply = () => {
    onApply &&
      onApply({ gouvernorat, contract, workModes, experience, sector, rating });
    onClose && onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={styles.sheet}>
          <View style={styles.dragHandleWrap}>
            <View style={styles.dragHandle} />
          </View>

          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filtres</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialIcons name="close" size={20} color={COLORS.onSurface} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Gouvernorat */}
            <Text style={styles.sectionLabel}>GOUVERNORAT</Text>
            <View style={styles.wrapRow}>
              {GOUVERNORATS.map((g) => (
                <Chip
                  key={g}
                  label={g}
                  active={gouvernorat === g}
                  onPress={() => setGouvernorat(g)}
                />
              ))}
            </View>

            {/* Type de contrat */}
            <Text style={[styles.sectionLabel, styles.sectionSpacing]}>
              TYPE DE CONTRAT
            </Text>
            <View style={styles.wrapRow}>
              {CONTRACTS.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  active={contract === c}
                  onPress={() => setContract(c)}
                  style={styles.chipSquare}
                />
              ))}
            </View>

            {/* Mode de travail */}
            <Text style={[styles.sectionLabel, styles.sectionSpacing]}>
              MODE DE TRAVAIL
            </Text>
            <View style={styles.grid2}>
              {WORK_MODES.map((mode) => {
                const checked = workModes.includes(mode.key);
                return (
                  <TouchableOpacity
                    key={mode.key}
                    style={[
                      styles.checkRow,
                      mode.highlight && checked && styles.checkRowHighlight,
                    ]}
                    onPress={() => toggleWorkMode(mode.key)}
                  >
                    <Text
                      style={[
                        styles.checkLabel,
                        mode.highlight && checked && styles.checkLabelHighlight,
                      ]}
                    >
                      {mode.label}
                    </Text>
                    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                      {checked && (
                        <MaterialIcons name="check" size={14} color="#fff" />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Niveau d'expérience */}
            <Text style={[styles.sectionLabel, styles.sectionSpacing]}>
              NIVEAU D'EXPÉRIENCE
            </Text>
            <View style={styles.grid2}>
              {EXPERIENCE_LEVELS.map((level) => {
                const active = experience === level.key;
                return (
                  <TouchableOpacity
                    key={level.key}
                    style={[styles.expCard, active && styles.expCardActive]}
                    onPress={() => setExperience(level.key)}
                  >
                    <MaterialIcons name={level.icon} size={20} color={COLORS.primary} />
                    <Text style={styles.expLabel}>{level.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Secteur d'activité */}
            <Text style={[styles.sectionLabel, styles.sectionSpacing]}>
              SECTEUR D'ACTIVITÉ
            </Text>
            <View style={styles.wrapRow}>
              {SECTORS.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  active={sector === s}
                  onPress={() => setSector(s)}
                />
              ))}
            </View>

            {/* Note entreprise */}
            <Text style={[styles.sectionLabel, styles.sectionSpacing]}>
              NOTE ENTREPRISE
            </Text>
            <View style={styles.ratingRow}>
              {RATINGS.map((r) => {
                const active = rating === r;
                return (
                  <TouchableOpacity
                    key={r}
                    style={[styles.ratingChip, active && styles.ratingChipActive]}
                    onPress={() => setRating(r)}
                  >
                    {r === 'Tous' ? (
                      <Text style={styles.ratingText}>Tous</Text>
                    ) : (
                      <>
                        <Text style={styles.ratingText}>{r}</Text>
                        <MaterialIcons name="star" size={14} color={COLORS.star} />
                        <Text style={styles.ratingText}>+</Text>
                      </>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Réinitialiser</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Voir {resultCount} offres</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '92%',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  dragHandleWrap: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 4,
  },
  dragHandle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.outlineVariant,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceContainer,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: COLORS.onSurfaceVariant,
    marginBottom: 12,
  },
  sectionSpacing: {
    marginTop: 28,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  chipSquare: {
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  chipActive: {
    backgroundColor: COLORS.primaryContainer,
    borderColor: COLORS.primaryContainer,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },
  chipTextActive: {
    color: '#ffffff',
  },
  grid2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  checkRow: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  checkRowHighlight: {
    backgroundColor: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.3)',
  },
  checkLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.onSurface,
  },
  checkLabelHighlight: {
    color: COLORS.primary,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  expCard: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  expCardActive: {
    backgroundColor: 'rgba(0,108,73,0.05)',
    borderColor: COLORS.primary,
  },
  expLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.onSurface,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  ratingChipActive: {
    backgroundColor: 'rgba(0,108,73,0.05)',
    borderColor: COLORS.primary,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.onSurface,
  },
  footer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceContainer,
  },
  resetButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  applyButton: {
    flex: 2,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
});