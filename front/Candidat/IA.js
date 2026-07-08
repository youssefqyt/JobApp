import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import BottomNavBar from './component/Navbar';

const COLORS = {
  primary: '#006c49',
  primaryContainer: '#10b981',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#00422b',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  surfaceContainerHighest: '#e1e3e4',
  surfaceContainer: '#edeeef',
  surfaceContainerLowest: '#ffffff',
  secondaryContainer: '#adedd3',
  onSecondaryContainer: '#306d58',
  secondary: '#2b6954',
  outlineVariant: '#bbcabf',
  background: '#f8f9fa',
};

// ---- Static conversation seed, matching the mockup ----
const INITIAL_MESSAGES = [
  {
    id: '1',
    from: 'bot',
    type: 'text',
    text: 'Bonjour Ahmed ! Je suis Amira, votre assistant carrière. Comment puis-je vous aider aujourd\'hui ?',
    time: '09:12',
  },
  {
    id: '2',
    from: 'user',
    type: 'text',
    text: 'Comment améliorer mon CV pour postuler à des postes DevOps ?',
    time: '09:14',
  },
  {
    id: '3',
    from: 'bot',
    type: 'checklist',
    intro: 'Votre profil Full Stack est une excellente base ! Pour les postes DevOps, je recommande :',
    items: [
      'Ajouter Docker & Kubernetes',
      'Mentionner vos pipelines CI/CD',
      'Obtenir la certification AWS',
    ],
    ctaLabel: 'Générer le CV DevOps',
    time: '09:15',
  },
];

function BotTextBubble({ text, time }) {
  return (
    <View style={styles.botMessageWrap}>
      <View style={styles.botBubble}>
        <Text style={styles.bodyText}>{text}</Text>
      </View>
      <Text style={styles.timeTextLeft}>{time}</Text>
    </View>
  );
}

function UserBubble({ text, time }) {
  return (
    <View style={styles.userMessageWrap}>
      <View style={styles.userBubble}>
        <Text style={styles.userBodyText}>{text}</Text>
      </View>
      <Text style={styles.timeTextRight}>{time}</Text>
    </View>
  );
}

function BotChecklistBubble({ intro, items, ctaLabel, time, onCtaPress }) {
  return (
    <View style={styles.botMessageWrap}>
      <View style={styles.botBubble}>
        <Text style={[styles.bodyText, styles.checklistIntro]}>{intro}</Text>
        {items.map((item, i) => (
          <View key={i} style={styles.checklistItem}>
            <MaterialIcons name="check-circle" size={18} color={COLORS.primary} />
            <Text style={styles.checklistText}>{item}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.ctaButton} onPress={onCtaPress}>
          <MaterialIcons name="auto-awesome" size={18} color={COLORS.onPrimary} />
          <Text style={styles.ctaButtonText}>{ctaLabel}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.timeTextLeft}>{time}</Text>
    </View>
  );
}

function QuickReplyChip({ label, onPress }) {
  return (
    <View style={styles.quickReplyRow}>
      <TouchableOpacity style={styles.quickReplyChip} onPress={onPress}>
        <Text style={styles.quickReplyText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function IA({ activeTab, onTabChange }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [showQuickReply, setShowQuickReply] = useState(true);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const currentTime = () =>
    new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  const appendMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    appendMessage({
      id: Date.now().toString(),
      from: 'user',
      type: 'text',
      text: input.trim(),
      time: currentTime(),
    });
    setInput('');
    // TODO: call your assistant API here and append the bot's reply
  };

  const handleQuickReply = () => {
    setShowQuickReply(false);
    appendMessage({
      id: Date.now().toString(),
      from: 'user',
      type: 'text',
      text: 'Oui, génère une version améliorée',
      time: currentTime(),
    });
  };

  const handleGenerateCv = () => {
    // TODO: trigger CV generation flow
    console.log('Generate DevOps CV pressed');
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Assistant IA</Text>
      </View>

      {/* Chat */}
      <ScrollView
        ref={scrollRef}
        style={styles.chat}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => {
          if (msg.type === 'checklist') {
            return (
              <BotChecklistBubble
                key={msg.id}
                intro={msg.intro}
                items={msg.items}
                ctaLabel={msg.ctaLabel}
                time={msg.time}
                onCtaPress={handleGenerateCv}
              />
            );
          }
          return msg.from === 'bot' ? (
            <BotTextBubble key={msg.id} text={msg.text} time={msg.time} />
          ) : (
            <UserBubble key={msg.id} text={msg.text} time={msg.time} />
          );
        })}

        {showQuickReply && (
          <QuickReplyChip
            label="Oui, génère une version améliorée"
            onPress={handleQuickReply}
          />
        )}
      </ScrollView>

      {/* Input dock */}
      <View style={styles.inputDock}>
        <TouchableOpacity style={styles.micButton}>
          <MaterialIcons name="mic" size={22} color={COLORS.onSurfaceVariant} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Posez votre question..."
          placeholderTextColor={COLORS.onSurfaceVariant}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          returnKeyType="send"
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <MaterialIcons name="send" size={20} color={COLORS.onPrimary} />
        </TouchableOpacity>
      </View>

      {/* Bottom nav */}
      <BottomNavBar initialTab={activeTab || 'IA'} onTabChange={onTabChange} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.2,
    color: COLORS.primary,
  },
  chat: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 20,
  },

  // Bot bubble
  botMessageWrap: {
    maxWidth: '85%',
    alignSelf: 'flex-start',
  },
  botBubble: {
    backgroundColor: COLORS.surfaceContainerHighest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    padding: 16,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.onSurface,
  },
  timeTextLeft: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
    marginLeft: 4,
  },

  // User bubble
  userMessageWrap: {
    maxWidth: '85%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
  },
  userBodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.onPrimary,
  },
  timeTextRight: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
    marginRight: 4,
  },

  // Checklist
  checklistIntro: {
    marginBottom: 12,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  checklistText: {
    fontSize: 15,
    color: COLORS.onSurface,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primaryContainer,
    height: 48,
    borderRadius: 12,
    marginTop: 4,
  },
  ctaButtonText: {
    color: COLORS.onPrimary,
    fontWeight: '600',
    fontSize: 14,
  },

  // Quick reply
  quickReplyRow: {
    alignItems: 'flex-end',
  },
  quickReplyChip: {
    backgroundColor: COLORS.secondaryContainer,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  quickReplyText: {
    color: COLORS.onSecondaryContainer,
    fontWeight: '600',
    fontSize: 14,
  },

  // Input dock
  inputDock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 6,
    backgroundColor: COLORS.surfaceContainer,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 18,
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.onSurface,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    outlineStyle: 'none',
    outlineWidth: 0,
    outlineColor: 'transparent',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});