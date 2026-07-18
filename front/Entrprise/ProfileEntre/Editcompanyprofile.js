import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  StatusBar,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

// ---- Design tokens (mapped from the web mockup) ----
const colors = {
  primary: '#006c49',
  onPrimary: '#ffffff',
  primaryContainer: '#10b981',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  background: '#f8f9fa',
  surface: '#f8f9fa',
  surfaceContainerLow: '#f3f4f5',
  outlineVariant: '#bbcabf',
  secondaryContainer: '#adedd3',
  onSecondaryContainer: '#306d58',
  white: '#ffffff',
  success: '#16a34a',
};

const COVER_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC5jCNyaXU3OLoyF2WZ372_BfFRL3MS1zv8U1BJiMDZZR06TPVn0D1TEmGJeAvhJk-boOTUE_sDpSQPN8qGdlCmZ2kgv_iOsyq8psFJrVBDMmbjKMrVM3p0qCmZ2kLUPMBIe0N-cR8DTDb1iJo7UgH-WHm0z1809DPe6DsP5QPFsFt8usLIwxfxHmy_U4TXLKod3QRdLme7MxlGLyqnQ6Q6-UQPdsuzEkIH016deu0HNbguNXyMwAuL3iNvJh7XF0wslKJrT9m0iove';
const LOGO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBpLUIBVljib26GZAk4HLrYONB8TcaIdy6PxvyCM83dGjbqsQxPxPWjToIp91EmHuSnZrwW9O4fMRUjBSvzZ82ChXq5reVMQEyyTNbo1kqtF2Q2Uw09gzA1y_erxslhjhqzI9OvR4dwNzzSFbCW23UPzUVZ9vX-FVvmBAtom6RbBmrt6Cm1N9DPb5Cw_66JaHG5nkXTEGVh-CnBKxWtbcWqIfPtrzYm3Mnq5y68JS_qb4E32jC5zCGK3PlGKxNkQzRHQPApzabTB7Z4';

// ---- Image picker helper ----
// Requests gallery permission, launches the picker, and returns the picked
// image's local URI (or null if the user cancelled / permission was denied).
async function pickImageFromLibrary({ aspect } = {}) {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Permission requise',
      "Merci d'autoriser l'accès à vos photos pour changer cette image."
    );
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: aspect || [1, 1],
    quality: 0.8,
  });

  if (result.canceled || !result.assets || !result.assets.length) {
    return null;
  }

  return result.assets[0].uri;
}

// ---- Reusable field ----
function LabeledInput({ label, value, onChangeText, icon, ...props }) {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputRow}>
        {icon ? (
          <MaterialIcons
            name={icon}
            size={20}
            color={colors.outlineVariant}
            style={styles.inputIcon}
          />
        ) : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, icon ? styles.inputWithIcon : null]}
          placeholderTextColor="#9aa5a0"
          {...props}
        />
      </View>
    </View>
  );
}

function Card({ title, icon, children }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTitleRow}>
        <MaterialIcons name={icon} size={20} color={colors.primary} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

export default function EditCompanyProfileScreen({ onBack, onSave }) {
  const [companyName, setCompanyName] = useState('Orrange Tunis');
  const [tagline, setTagline] = useState(
    'Pioneering Tech Recruitment Solutions in the MENA Region'
  );
  const [about, setAbout] = useState(
    "Orrange Tunis est un leader technologique spécialisé dans le recrutement de talents tech de haut niveau. Fondée en 2018, notre mission est de connecter les entreprises innovantes avec les esprits les plus brillants de Tunisie. Nous utilisons des algorithmes propriétaires pour garantir un matching parfait entre les aspirations des candidats et les besoins stratégiques des entreprises."
  );
  const [companySize, setCompanySize] = useState('250 - 500 Employees');
  const [headquarters, setHeadquarters] = useState('Les Berges du Lac, Tunis');
  const [foundedYear, setFoundedYear] = useState('2018');
  const [website, setWebsite] = useState('https://www.tunwork.tn');
  const [linkedin, setLinkedin] = useState('');

  // Cover & logo images, now editable via the device's image library
  const [coverImage, setCoverImage] = useState(COVER_IMAGE);
  const [logoImage, setLogoImage] = useState(LOGO_IMAGE);
  const [coverUploading, setCoverUploading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);

  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved

  const handlePickCover = async () => {
    if (coverUploading) return;
    setCoverUploading(true);
    try {
      const uri = await pickImageFromLibrary({ aspect: [16, 9] });
      if (uri) setCoverImage(uri);
    } finally {
      setCoverUploading(false);
    }
  };

  const handlePickLogo = async () => {
    if (logoUploading) return;
    setLogoUploading(true);
    try {
      const uri = await pickImageFromLibrary({ aspect: [1, 1] });
      if (uri) setLogoImage(uri);
    } finally {
      setLogoUploading(false);
    }
  };

  const handleSave = () => {
    if (saveState !== 'idle') return;
    setSaveState('saving');
    setTimeout(() => {
      setSaveState('saved');
      if (onSave) {
        onSave({
          companyName,
          tagline,
          about,
          companySize,
          headquarters,
          foundedYear,
          website,
          linkedin,
          coverImage,
          logoImage,
        });
      }
      setTimeout(() => setSaveState('idle'), 2000);
    }, 1500);
  };

  const renderSaveButtonContent = () => {
    if (saveState === 'saving') {
      return (
        <>
          <ActivityIndicator size="small" color={colors.onPrimary} />
          <Text style={styles.saveButtonText}>Enregistrement...</Text>
        </>
      );
    }
    if (saveState === 'saved') {
      return (
        <>
          <MaterialIcons name="done-all" size={20} color={colors.onPrimary} />
          <Text style={styles.saveButtonText}>Enregistré !</Text>
        </>
      );
    }
    return (
      <>
        <MaterialIcons name="check" size={20} color={colors.onPrimary} />
        <Text style={styles.saveButtonText}>Enregistrer</Text>
      </>
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Top App Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => onBack && onBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Modifier le profil</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.saveButton,
            saveState === 'saved' ? styles.saveButtonSuccess : null,
          ]}
          onPress={handleSave}
          disabled={saveState !== 'idle'}
        >
          {renderSaveButtonContent()}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Media section */}
        <View style={styles.mediaCard}>
          <TouchableOpacity activeOpacity={0.85} onPress={handlePickCover}>
            <ImageBackground
              source={{ uri: coverImage }}
              style={styles.coverImage}
              imageStyle={styles.coverImageInner}
            >
              <View style={styles.coverEditButton}>
                {coverUploading ? (
                  <ActivityIndicator size="small" color={colors.onSurface} />
                ) : (
                  <MaterialIcons name="photo-camera" size={18} color={colors.onSurface} />
                )}
                <Text style={styles.coverEditText}>
                  {coverUploading ? 'Chargement...' : 'Modifier la couverture'}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <View style={styles.mediaFooter}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.logoWrapper}
              onPress={handlePickLogo}
            >
              <Image source={{ uri: logoImage }} style={styles.logo} resizeMode="contain" />
              <View style={styles.logoEditButton}>
                {logoUploading ? (
                  <ActivityIndicator size="small" color={colors.onPrimary} />
                ) : (
                  <MaterialIcons name="edit" size={16} color={colors.onPrimary} />
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.mediaFooterText}>
              <Text style={styles.companyTitle}>{companyName}</Text>
              <Text style={styles.companySubtitle}>Mise à jour du logo et de la couverture</Text>
            </View>
          </View>
        </View>

        {/* Basic info */}
        <Card title="Informations de base" icon="info">
          <LabeledInput
            label="Nom de l'entreprise"
            value={companyName}
            onChangeText={setCompanyName}
          />
          <LabeledInput label="Slogan" value={tagline} onChangeText={setTagline} />
          <View style={styles.fieldWrapper}>
            <Text style={styles.fieldLabel}>Secteur d'activité</Text>
            <View style={styles.selectRow}>
              <Text style={styles.selectText}>Information Technology &amp; Services</Text>
              <MaterialIcons name="arrow-drop-down" size={22} color={colors.outlineVariant} />
            </View>
          </View>
        </Card>

        {/* About */}
        <Card title="À propos" icon="description">
          <Text style={styles.fieldLabel}>Description de l'entreprise</Text>
          <TextInput
            value={about}
            onChangeText={setAbout}
            multiline
            numberOfLines={8}
            style={styles.textArea}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{about.length} / 2000 caractères</Text>
        </Card>

        {/* Company details */}
        <Card title="Détails de l'entreprise" icon="business">
          <LabeledInput
            label="Taille de l'entreprise"
            value={companySize}
            onChangeText={setCompanySize}
            icon="groups"
          />
          <LabeledInput
            label="Siège social"
            value={headquarters}
            onChangeText={setHeadquarters}
            icon="location-on"
          />
          <LabeledInput
            label="Année de création"
            value={foundedYear}
            onChangeText={setFoundedYear}
            icon="event"
            keyboardType="number-pad"
          />
        </Card>

        {/* Online presence */}
        <Card title="Présence en ligne" icon="public">
          <LabeledInput
            label="Site Web"
            value={website}
            onChangeText={setWebsite}
            icon="language"
            keyboardType="url"
            autoCapitalize="none"
          />
          <LabeledInput
            label="LinkedIn URL"
            value={linkedin}
            onChangeText={setLinkedin}
            icon="link"
            placeholder="https://linkedin.com/company/..."
            keyboardType="url"
            autoCapitalize="none"
          />
        </Card>

        {/* Support card */}
        <View style={styles.supportCard}>
          <Text style={styles.supportTitle}>Besoin d'aide ?</Text>
          <Text style={styles.supportBody}>
            Notre équipe de support est là pour vous aider à optimiser votre profil entreprise
            pour attirer les meilleurs talents.
          </Text>
          <TouchableOpacity style={styles.supportLink}>
            <Text style={styles.supportLinkText}>Contacter le support</Text>
            <MaterialIcons name="arrow-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    backgroundColor: colors.background,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.onSurface,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  saveButtonSuccess: {
    backgroundColor: colors.success,
  },
  saveButtonText: {
    color: colors.onPrimary,
    fontWeight: '600',
    fontSize: 14,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  mediaCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  coverImage: {
    height: 180,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  coverImageInner: {
    resizeMode: 'cover',
  },
  coverEditButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 12,
  },
  coverEditText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurface,
  },
  mediaFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: -40,
  },
  logoWrapper: {
    width: 88,
    height: 88,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 4,
    borderColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      },
      android: { elevation: 4 },
    }),
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  logoEditButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: colors.primary,
    padding: 6,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.white,
  },
  mediaFooterText: {
    marginLeft: 16,
    flex: 1,
  },
  companyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
  },
  companySubtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  fieldWrapper: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    marginBottom: 6,
    marginLeft: 2,
  },
  inputRow: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 14,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.onSurface,
  },
  inputWithIcon: {
    paddingLeft: 44,
  },
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectText: {
    fontSize: 16,
    color: colors.onSurface,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.onSurface,
    minHeight: 140,
  },
  charCount: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 8,
    textAlign: 'right',
  },
  supportCard: {
    backgroundColor: 'rgba(173,237,211,0.3)',
    borderWidth: 1,
    borderColor: colors.secondaryContainer,
    borderRadius: 12,
    padding: 16,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSecondaryContainer,
    marginBottom: 6,
  },
  supportBody: {
    fontSize: 13,
    color: colors.onSecondaryContainer,
    opacity: 0.85,
    marginBottom: 12,
    lineHeight: 18,
  },
  supportLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  supportLinkText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});