import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Colors } from '../../../constants/colors';
import { CCButton } from '../../../components/CCButton';
import { useRouter } from 'expo-router';

const CAMPUS_PROMPTS = [
  "Hot take about PDEU canteen food:",
  "My department in 3 words:",
  "The one thing I actually learned from college:",
  "3AM canteen or sunrise run?",
  "The most underrated spot on campus:",
];

export default function Step4Screen() {
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const router = useRouter();

  const handleNext = () => {
    router.push('/(auth)/onboarding/step5');
  };

  const PromptCard = ({ prompt }: { prompt: string }) => (
    <View style={styles.card}>
      <Text style={styles.promptText}>{prompt}</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your answer..."
        placeholderTextColor={Colors.muted}
        multiline
        maxLength={120}
        value={answers[prompt] || ''}
        onChangeText={(text) => setAnswers({...answers, [prompt]: text})}
      />
      <Text style={styles.charCount}>{(answers[prompt] || '').length}/120</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Pick your vibe</Text>
        <Text style={styles.subtitle}>Answer 3 prompts to show your personality.</Text>
      </View>

      <View style={styles.promptList}>
        {CAMPUS_PROMPTS.slice(0, 3).map(p => (
          <PromptCard key={p} prompt={p} />
        ))}
      </View>

      <View style={styles.footer}>
        <CCButton
          title="Continue"
          onPress={handleNext}
          disabled={Object.values(answers).filter(a => a.length > 0).length < 3}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginTop: 40,
    marginBottom: 32,
  },
  title: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 32,
    color: Colors.dark,
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: Colors.muted,
    marginTop: 12,
  },
  promptList: {
    gap: 20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.muted + '33',
    minHeight: 160,
  },
  promptText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18,
    color: Colors.dark,
    marginBottom: 12,
  },
  input: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 20,
    color: Colors.crushPink,
    lineHeight: 28,
    flex: 1,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: Colors.muted,
    marginTop: 8,
  },
  footer: {
    marginTop: 40,
  },
});
