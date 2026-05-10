import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Colors } from '../../constants/colors';
import { CCButton } from '../../components/CCButton';
import { useRouter } from 'expo-router';
import { API_URL } from '../../constants/api';

export default function LoginScreen() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      // For Vercel demo: attempt fetch but bypass on failure or timeout
      fetch(`${API_URL}/auth/google`, { method: 'POST' }).catch(() => {});
      console.log('Demo Login: Bypassing auth for frontend preview');
      router.push('/(auth)/onboarding/step1');
    } catch (error) {
      router.push('/(auth)/onboarding/step1');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>CampusCrush</Text>
          <Text style={styles.tagline}>Same campus, different story.</Text>
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.illustration} />
        </View>

        <View style={styles.footer}>
          <CCButton
            title="Sign in with Google"
            onPress={handleGoogleLogin}
            style={styles.loginButton}
          />
          <Text style={styles.terms}>
            By signing in, you agree to our Terms and Privacy Policy.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 42,
    color: Colors.crushPink,
    letterSpacing: -1,
  },
  tagline: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 16,
    color: Colors.dark,
    marginTop: 8,
    opacity: 0.8,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 280,
    height: 280,
    backgroundColor: Colors.roseTint,
    borderRadius: 140,
    opacity: 0.5,
  },
  footer: {
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    backgroundColor: Colors.crushPink,
  },
  terms: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: Colors.muted,
    textAlign: 'center',
    marginTop: 16,
  },
});
