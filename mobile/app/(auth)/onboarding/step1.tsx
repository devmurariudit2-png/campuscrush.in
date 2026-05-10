import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Colors } from '../../../constants/colors';
import { CCButton } from '../../../components/CCButton';
import { CCInput } from '../../../components/CCInput';
import { useRouter } from 'expo-router';

const WHITELISTED_DOMAINS = [
  'pdpu.ac.in',
  'daiict.ac.in',
  'iitgn.ac.in',
  'nift.ac.in',
  'nirmauni.ac.in',
  'gnlu.ac.in',
];

export default function Step1Screen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleNext = () => {
    const domain = email.split('@')[1];
    if (!domain || !WHITELISTED_DOMAINS.includes(domain)) {
      setError("We're coming to more colleges soon 👀");
      return;
    }
    setError('');
    router.push('/(auth)/onboarding/step2');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>What's your college email?</Text>
          <Text style={styles.subtitle}>We only allow students from elite universities in Gandhinagar.</Text>
        </View>

        <CCInput
          label="College Email"
          placeholder="yourname@pdpu.ac.in"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          error={error}
        />

        <View style={styles.footer}>
          <CCButton title="Continue" onPress={handleNext} disabled={!email} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 32,
    color: Colors.dark,
    lineHeight: 40,
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: Colors.muted,
    marginTop: 12,
    lineHeight: 24,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: 20,
  },
});
