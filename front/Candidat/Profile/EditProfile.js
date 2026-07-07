import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// If you're not using Expo: `npm install react-native-vector-icons`
// and import MaterialIcons from 'react-native-vector-icons/MaterialIcons' instead.

// ---- Theme (from your design tokens) ----
const colors = {
  surface: '#f8f9fa',
  primary: '#006c49',
  primaryContainer: '#10b981',
  onPrimary: '#ffffff',
  secondary: '#2b6954',
  secondaryContainer: '#adedd3',
  onSecondaryContainer: '#306d58',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  outline: '#6c7a71',
  outlineVariant: '#bbcabf',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerHigh: '#e7e8e9',
  surfaceContainerHighest: '#e1e3e4',
};

const JOB_TYPES = ['Plein-temps', 'Freelance', 'Remote', 'CDD / Projet'];

export default function EditProfileScreen({ navigation }) {
  const [fullName, setFullName] = useState('Ahmed Mansour');
  const [jobTitle, setJobTitle] = useState('Senior UX Designer');
  const [location, setLocation] = useState('Tunis, Tunisie');
  const [phone, setPhone] = useState('+216 22 333 444');
  const [bio, setBio] = useState(
    "Designer passionné par la création d'expériences numériques intuitives et performantes. Spécialisé dans le secteur de la FinTech et du e-commerce avec plus de 5 ans d'expérience dans l'écosystème tech tunisien."
  );
  const [portfolio, setPortfolio] = useState('mansourdesign.tn');
  const [available, setAvailable] = useState(true);
  const [selectedJobTypes, setSelectedJobTypes] = useState(['Plein-temps', 'Remote']);
  const [skills, setSkills] = useState(['Figma', 'UX Research', 'Prototypage']);
  const [newSkill, setNewSkill] = useState('');

  const toggleJobType = (type) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const removeSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setNewSkill('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation?.goBack?.()}
          accessibilityLabel="Fermer"
        >
          <MaterialIcons name="close" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modifier le profil</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section 1: Photo & Identité */}
        <View style={styles.section}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN4hbV2e2Dsd2ecUSK2Q_IcUQ91D9NT-dc9zSkVzmekClgfjK6IQFX901rV5hCOt1bWmOpT3KnurXgn0L-g46au7tNrXBBZZePOp_28xojG8Ob1bMEg9J5i3ciG105tnFjHXavrdWgnvKA4YXw2LP9_FJ9en5H8Yj366TGk7OOHn7RJz-EJUBRHTv05eJcc13z8CLwlYjOD5Y49XAfbco5IWHSCv_xG2mv_ng8X04oP2AFg4wfaPVGfn9yMr_H26liTKVZJAZJZrRF',
                }}
              />
              <TouchableOpacity style={styles.editAvatarButton}>
                <MaterialIcons name="edit" size={16} color={colors.onPrimary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.avatarLabel}>Photo de profil</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Votre nom"
              placeholderTextColor={colors.outline}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Poste actuel</Text>
            <TextInput
              style={styles.input}
              value={jobTitle}
              onChangeText={setJobTitle}
              placeholder="Ex: Développeur Fullstack"
              placeholderTextColor={colors.outline}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.fieldGroup, styles.halfWidth]}>
              <Text style={styles.label}>Expérience</Text>
              <TouchableOpacity style={styles.selectInput}>
                <Text style={styles.selectText}>3-5 ans</Text>
                <MaterialIcons name="expand-more" size={20} color={colors.outline} />
              </TouchableOpacity>
            </View>
            <View style={[styles.fieldGroup, styles.halfWidth]}>
              <Text style={styles.label}>Localisation</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Ville, Pays"
                placeholderTextColor={colors.outline}
              />
            </View>
          </View>
        </View>

        {/* Section 2: Contact & Bio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact & Bio</Text>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Numéro de téléphone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Bio / Résumé</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Section 3: Préférences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences</Text>

          <View
            style={[
              styles.availabilityCard,
              available && styles.availabilityCardActive,
            ]}
          >
            <View style={styles.availabilityLeft}>
              <MaterialIcons name="work-history" size={22} color={colors.primary} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.availabilityTitle}>Statut de disponibilité</Text>
                <Text style={styles.availabilitySubtitle}>Ouvert aux opportunités</Text>
              </View>
            </View>
            <Switch
              value={available}
              onValueChange={setAvailable}
              trackColor={{ false: colors.outlineVariant, true: colors.primary }}
              thumbColor="#ffffff"
            />
          </View>

          <Text style={styles.label}>Type d'emploi souhaité</Text>
          <View style={styles.chipRow}>
            {JOB_TYPES.map((type) => {
              const selected = selectedJobTypes.includes(type);
              return (
                <TouchableOpacity
                  key={type}
                  style={[styles.chip, selected && styles.chipSelected]}
                  onPress={() => toggleJobType(type)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selected && styles.chipTextSelected,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section 4: Expériences & Éducation */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Expériences & Éducation</Text>
            <TouchableOpacity style={styles.addButton}>
              <MaterialIcons name="add" size={16} color={colors.primary} />
              <Text style={styles.addButtonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.timelineCard}>
            <View style={styles.timelineIcon}>
              <MaterialIcons name="business" size={22} color={colors.outline} />
            </View>
            <View style={styles.timelineContent}>
              <View style={styles.timelineHeaderRow}>
                <Text style={styles.timelineTitle}>Product Designer</Text>
                <MaterialIcons name="edit" size={16} color={colors.outline} />
              </View>
              <Text style={styles.timelineSubtitle}>TechTunisia • 2021 - Présent</Text>
            </View>
          </View>

          <View style={styles.timelineCard}>
            <View style={styles.timelineIcon}>
              <MaterialIcons name="school" size={22} color={colors.outline} />
            </View>
            <View style={styles.timelineContent}>
              <View style={styles.timelineHeaderRow}>
                <Text style={styles.timelineTitle}>Master en Design Numérique</Text>
                <MaterialIcons name="edit" size={16} color={colors.outline} />
              </View>
              <Text style={styles.timelineSubtitle}>Université de Tunis • 2019</Text>
            </View>
          </View>
        </View>

        {/* Section 5: Compétences & Langues */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compétences & Langues</Text>

          <Text style={styles.label}>Compétences clés</Text>
          <View style={styles.skillsBox}>
            {skills.map((skill) => (
              <View key={skill} style={styles.skillTag}>
                <Text style={styles.skillTagText}>{skill}</Text>
                <TouchableOpacity onPress={() => removeSkill(skill)}>
                  <MaterialIcons name="close" size={16} color={colors.onSurface} />
                </TouchableOpacity>
              </View>
            ))}
            <TextInput
              style={styles.skillInput}
              value={newSkill}
              onChangeText={setNewSkill}
              onSubmitEditing={addSkill}
              placeholder="Ajouter..."
              placeholderTextColor={colors.outline}
              returnKeyType="done"
            />
          </View>

          <Text style={[styles.label, { marginTop: 20 }]}>Langues</Text>
          <View style={styles.chipRow}>
            <TouchableOpacity style={styles.languageChip}>
              <Text style={styles.languageChipText}>Français • Courant</Text>
              <MaterialIcons name="expand-more" size={16} color={colors.onSurface} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.languageChip}>
              <Text style={styles.languageChipText}>Anglais • Professionnel</Text>
              <MaterialIcons name="expand-more" size={16} color={colors.onSurface} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addLanguageChip}>
              <Text style={styles.addLanguageChipText}>+ Ajouter</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 6: Documents & Liens */}
        <View style={[styles.section, { borderBottomWidth: 0 }]}>
          <Text style={styles.sectionTitle}>Documents & Liens</Text>

          <Text style={styles.label}>CV / Resume (PDF)</Text>
          <TouchableOpacity style={styles.uploadBox}>
            <MaterialIcons name="cloud-upload" size={28} color={colors.outline} />
            <Text style={styles.uploadTitle}>Cliquer pour télécharger</Text>
            <Text style={styles.uploadSubtitle}>Max 5MB • PDF, DOCX</Text>
          </TouchableOpacity>

          <View style={[styles.fieldGroup, { marginTop: 20 }]}>
            <Text style={styles.label}>Portfolio / Website</Text>
            <View style={styles.inputWithIcon}>
              <MaterialIcons
                name="language"
                size={20}
                color={colors.outline}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputWithIconField}
                value={portfolio}
                onChangeText={setPortfolio}
                placeholder="https://votre-site.com"
                placeholderTextColor={colors.outline}
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    backgroundColor: colors.surface,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.onSurface,
  },
  saveButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: colors.primaryContainer,
    overflow: 'visible',
    backgroundColor: colors.surfaceContainerHigh,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 48,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  avatarLabel: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.outline,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.onSurface,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  selectInput: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 16,
    color: colors.onSurface,
  },
  availabilityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(173, 237, 211, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(173, 237, 211, 0.3)',
    borderRadius: 12,
    marginBottom: 24,
  },
  availabilityCardActive: {
    borderColor: colors.primary,
  },
  availabilityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  availabilitySubtitle: {
    fontSize: 12,
    color: colors.outline,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.secondaryContainer,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  chipTextSelected: {
    color: colors.onSecondaryContainer,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  timelineCard: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    marginBottom: 12,
  },
  timelineIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineContent: {
    flex: 1,
  },
  timelineHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  timelineSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  skillsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 12,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
    alignItems: 'center',
  },
  skillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 4,
  },
  skillTagText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurface,
  },
  skillInput: {
    flex: 1,
    minWidth: 100,
    fontSize: 16,
    color: colors.onSurface,
    paddingVertical: 6,
  },
  languageChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
  },
  languageChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurface,
  },
  addLanguageChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    borderRadius: 8,
  },
  addLanguageChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainerLow,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
    marginTop: 8,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: colors.outline,
    marginTop: 2,
  },
  inputWithIcon: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 14,
    zIndex: 1,
  },
  inputWithIconField: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
    paddingLeft: 44,
    paddingRight: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.onSurface,
  },
});