import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
  primary: '#006c49',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainerLowest: '#ffffff',
  outlineVariant: '#bbcabf',
  error: '#ba1a1a',
  white: '#ffffff',
};

function makeEntry() {
  return { id: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
}

function EntryCard({ entry, fields, onChangeField, onRemove, removable }) {
  return (
    <View style={styles.entryCard}>
      {removable && (
        <TouchableOpacity style={styles.removeButton} activeOpacity={0.7} onPress={onRemove}>
          <MaterialIcons name="close" size={16} color={COLORS.error} />
        </TouchableOpacity>
      )}
      {fields.map((f) => (
        <View key={f.key} style={styles.field}>
          <Text style={styles.label}>{f.label}</Text>
          <TextInput
            style={styles.input}
            value={entry[f.key] || ''}
            onChangeText={(text) => onChangeField(f.key, text)}
            placeholder={f.placeholder}
            placeholderTextColor={COLORS.onSurfaceVariant}
          />
        </View>
      ))}
    </View>
  );
}

export default function StepExperience({ value, onChange }) {
  const data = value || {};
  const experiences = data.experiences?.length ? data.experiences : [makeEntry()];
  const education = data.education?.length ? data.education : [makeEntry()];

  const updateList = (listKey, list) => onChange({ ...data, [listKey]: list });

  const updateEntry = (listKey, list, id, key, text) =>
    updateList(
      listKey,
      list.map((entry) => (entry.id === id ? { ...entry, [key]: text } : entry))
    );

  const addEntry = (listKey, list) => updateList(listKey, [...list, makeEntry()]);

  const removeEntry = (listKey, list, id) =>
    updateList(listKey, list.filter((entry) => entry.id !== id));

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Expérience & Formation</Text>
      <Text style={styles.subtitle}>
        Ajoutez vos expériences professionnelles et votre parcours académique.
      </Text>

      {/* Experiences */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>EXPÉRIENCES</Text>
        {experiences.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            removable={experiences.length > 1}
            onRemove={() => removeEntry('experiences', experiences, entry.id)}
            onChangeField={(key, text) => updateEntry('experiences', experiences, entry.id, key, text)}
            fields={[
              { key: 'title', label: 'Poste', placeholder: 'Product Designer' },
              { key: 'company', label: 'Entreprise', placeholder: 'TechTunisia' },
              { key: 'period', label: 'Période', placeholder: '2021 - Présent' },
            ]}
          />
        ))}
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => addEntry('experiences', experiences)}
        >
          <MaterialIcons name="add" size={16} color={COLORS.primary} />
          <Text style={styles.addButtonText}>Ajouter une expérience</Text>
        </TouchableOpacity>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>ÉDUCATION</Text>
        {education.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            removable={education.length > 1}
            onRemove={() => removeEntry('education', education, entry.id)}
            onChangeField={(key, text) => updateEntry('education', education, entry.id, key, text)}
            fields={[
              { key: 'title', label: 'Diplôme', placeholder: 'Master en Design Numérique' },
              { key: 'school', label: 'École', placeholder: 'Université de Tunis' },
              { key: 'year', label: 'Année', placeholder: '2019' },
            ]}
          />
        ))}
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => addEntry('education', education)}
        >
          <MaterialIcons name="add" size={16} color={COLORS.primary} />
          <Text style={styles.addButtonText}>Ajouter une formation</Text>
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 12,
  },
  entryCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },
  input: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: COLORS.onSurface,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingVertical: 6,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
});