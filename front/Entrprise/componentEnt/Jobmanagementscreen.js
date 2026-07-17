import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCompanyTheme } from '../../context/EnterpriseThemeContext';

const STATIC_STATUS_STYLES = {
  Pausé: { bg: '#e1e3e4', text: '#3c4a42' },
  Fermé: { bg: '#ffdad6', text: '#ba1a1a' },
};

const DEFAULT_MISSIONS = [
  "Concevoir et développer de nouvelles fonctionnalités robustes et scalables.",
  "Assurer la maintenance évolutive des architectures existantes (Frontend & Backend).",
  "Optimiser les performances et la sécurité des applications.",
  "Collaborer avec les équipes produit et design pour offrir une expérience utilisateur exceptionnelle.",
  "Participer aux revues de code et partager vos bonnes pratiques avec l'équipe.",
];

const DEFAULT_PROFIL = [
  "Maîtrise confirmée de JavaScript (React/Vue.js) et Node.js ou Python.",
  "Expérience significative avec les bases de données SQL et NoSQL (PostgreSQL, MongoDB).",
  "Capacité à concevoir et consommer des API RESTful performantes.",
  "Esprit d'équipe, autonomie et excellente capacité de résolution de problèmes.",
  "Un intérêt pour le DevOps (Docker, AWS) serait un atout majeur.",
];

function StatBlock({ label, value, styles }) {
  return (
    <View style={styles.statBlock}>
      <Text style={styles.statBlockLabel}>{label}</Text>
      <Text style={styles.statBlockValue}>{value}</Text>
    </View>
  );
}

/**
 * JobManagementScreen ("Gestion de l'offre")
 *
 * Props:
 * - job: { title, status, publishedLabel, views, applications, location, type, missions?, profil? }
 * - onBack: called when the user taps the back arrow
 * - onCloseJob: called with the job when the user confirms closing it
 * - onReopenJob: called with the job when the user republishes a closed job
 * - onEditJob: called with (job, updatedFields) when the user saves an edit
 */
export default function JobManagementScreen({
  job,
  onBack,
  onCloseJob,
  onReopenJob,
  onEditJob,
}) {
  const { colors } = useCompanyTheme();
  const styles = getStyles(colors);

  const [status, setStatus] = useState(job?.status || 'Active');
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [draftTitle, setDraftTitle] = useState(job?.title || '');
  const [draftLocation, setDraftLocation] = useState(job?.location || 'Tunis');
  const [draftType, setDraftType] = useState(job?.type || 'CDI');
  const [title, setTitle] = useState(job?.title || '');
  const [location, setLocation] = useState(job?.location || 'Tunis');
  const [type, setType] = useState(job?.type || 'CDI');

  if (!job) return null;

  const statusStyle =
    status === 'Active'
      ? { bg: colors.secondaryContainer, text: colors.onSecondaryContainer }
      : STATIC_STATUS_STYLES[status] || { bg: colors.secondaryContainer, text: colors.onSecondaryContainer };

  const missions = job.missions || DEFAULT_MISSIONS;
  const profil = job.profil || DEFAULT_PROFIL;

  function handleCloseOffer() {
    setStatus('Fermé');
    setShowCloseConfirm(false);
    onCloseJob && onCloseJob(job);
  }

  function handleReopenOffer() {
    setStatus('Active');
    onReopenJob && onReopenJob(job);
  }

  function openEdit() {
    setDraftTitle(title);
    setDraftLocation(location);
    setDraftType(type);
    setShowEditModal(true);
  }

  function saveEdit() {
    setTitle(draftTitle);
    setLocation(draftLocation);
    setType(draftType);
    setShowEditModal(false);
    onEditJob && onEditJob(job, { title: draftTitle, location: draftLocation, type: draftType });
  }

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={22} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestion de l'offre</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Overview card */}
        <View style={styles.card}>
          <View style={styles.overviewTopRow}>
            <View style={[styles.statusPill, { backgroundColor: statusStyle.bg }]}>
              <Text style={[styles.statusText, { color: statusStyle.text }]}>{status}</Text>
            </View>
            <Text style={styles.publishedLabel}>{job.publishedLabel}</Text>
          </View>
          <Text style={styles.jobTitle}>{title}</Text>
          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={16} color={colors.onSurfaceVariant} />
            <Text style={styles.locationText}>{location} · {type}</Text>
          </View>
          <View style={styles.statsRow}>
            <StatBlock label="Vues" value={job.views} styles={styles} />
            <StatBlock label="Candidats" value={job.applications} styles={styles} />
          </View>
        </View>

        {/* Missions */}
        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <MaterialIcons name="task-alt" size={18} color={colors.primaryContainer} />
            <Text style={styles.sectionTitle}>Missions</Text>
          </View>
          <Text style={styles.paragraph}>
            En tant que {title}, vous jouerez un rôle central dans l'évolution de nos plateformes digitales. Vos responsabilités incluront :
          </Text>
          {missions.map((m, i) => (
            <View key={i} style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>{m}</Text>
            </View>
          ))}
        </View>

        {/* Profil recherché */}
        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <MaterialIcons name="person-search" size={18} color={colors.primaryContainer} />
            <Text style={styles.sectionTitle}>Profil recherché</Text>
          </View>
          <Text style={styles.paragraph}>
            Nous recherchons un talent passionné, curieux et rigoureux, avec le profil suivant :
          </Text>
          {profil.map((p, i) => (
            <View key={i} style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>{p}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View style={styles.actionBar}>
        {status === 'Active' ? (
          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.8}
            onPress={() => setShowCloseConfirm(true)}
          >
            <Text style={styles.secondaryButtonText}>Clôturer l'offre</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.8}
            onPress={handleReopenOffer}
          >
            <Text style={styles.secondaryButtonText}>Republier</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={openEdit}>
          <Text style={styles.primaryButtonText}>Modifier l'offre</Text>
        </TouchableOpacity>
      </View>

      {/* Close confirmation modal */}
      <Modal
        visible={showCloseConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCloseConfirm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Clôturer cette offre ?</Text>
            <Text style={styles.modalBody}>
              L'offre ne sera plus visible par les candidats. Vous pourrez la republier à tout moment.
            </Text>
            <View style={styles.modalActionsRow}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                activeOpacity={0.8}
                onPress={() => setShowCloseConfirm(false)}
              >
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalDangerButton}
                activeOpacity={0.85}
                onPress={handleCloseOffer}
              >
                <Text style={styles.modalDangerText}>Clôturer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit modal */}
      <Modal
        visible={showEditModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Modifier l'offre</Text>

            <Text style={styles.fieldLabel}>Titre du poste</Text>
            <TextInput
              style={styles.fieldInput}
              value={draftTitle}
              onChangeText={setDraftTitle}
              placeholderTextColor={colors.onSurfaceVariant}
            />

            <Text style={styles.fieldLabel}>Localisation</Text>
            <TextInput
              style={styles.fieldInput}
              value={draftLocation}
              onChangeText={setDraftLocation}
              placeholderTextColor={colors.onSurfaceVariant}
            />

            <Text style={styles.fieldLabel}>Type de contrat</Text>
            <TextInput
              style={styles.fieldInput}
              value={draftType}
              onChangeText={setDraftType}
              placeholderTextColor={colors.onSurfaceVariant}
            />

            <View style={styles.modalActionsRow}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                activeOpacity={0.8}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveButton}
                activeOpacity={0.85}
                onPress={saveEdit}
              >
                <Text style={styles.modalSaveText}>Enregistrer</Text>
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
    backgroundColor: colors.surfaceContainerLowest,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primaryContainer,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 140,
    gap: 16,
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 16,
  },
  overviewTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  publishedLabel: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 14,
  },
  locationText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBlock: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statBlockLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  statBlockValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryContainer,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
    marginBottom: 10,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.onSurfaceVariant,
    marginTop: 7,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
  },

  // Bottom bar
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  primaryButton: {
    flex: 1.5,
    paddingVertical: 13,
    borderRadius: 999,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onPrimaryContainer,
  },

  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(25,28,29,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 14,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 8,
  },
  modalBody: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
    marginBottom: 18,
  },
  modalActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 12,
  },
  modalCancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  modalDangerButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#ba1a1a',
  },
  modalDangerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  modalSaveButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.primaryContainer,
  },
  modalSaveText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onPrimaryContainer,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    marginTop: 10,
    marginBottom: 4,
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.onSurface,
  },
});