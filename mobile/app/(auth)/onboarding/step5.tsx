import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Colors } from '../../../constants/colors';
import { CCButton } from '../../../components/CCButton';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step5Screen() {
  const [discovery, setDiscovery] = useState('My college only');
  const [ghostMode, setGhostMode] = useState(false);
  const router = useRouter();

  const handleFinish = () => {
    // Navigate to the main app
    router.replace('/(tabs)/discover');
  };

  const Option = ({ label, selected, onSelect }: { label: string, selected: boolean, onSelect: () => void }) => (
    <TouchableOpacity
      style={[styles.option, selected && styles.optionSelected]}
      onPress={onSelect}
    >
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
      {selected && <Ionicons name="checkmark-circle" size={24} color={Colors.crushPink} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Discovery & Privacy</Text>
        <Text style={styles.subtitle}>Last step! Set your preferences.</Text>
      </View>

      <Text style={styles.sectionLabel}>Show me people from</Text>
      <View style={styles.optionContainer}>
        {['My college only', 'All of Gandhinagar', 'Everywhere'].map(o => (
          <Option key={o} label={o} selected={discovery === o} onSelect={() => setDiscovery(o)} />
        ))}
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>Ghost Mode</Text>
            <Text style={styles.cardSubtitle}>People in your department won't see you.</Text>
          </View>
          <Switch
            value={ghostMode}
            onValueChange={setGhostMode}
            trackColor={{ false: Colors.muted + '33', true: Colors.crushPink }}
            thumbColor={Colors.white}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <CCButton title="Find your Crush ❤️" onPress={handleFinish} />
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
  sectionLabel: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: Colors.dark,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  optionContainer: {
    gap: 12,
    marginBottom: 32,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.muted + '33',
  },
  optionSelected: {
    borderColor: Colors.crushPink,
  },
  optionText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 16,
    color: Colors.dark,
  },
  optionTextSelected: {
    color: Colors.crushPink,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  card: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.muted + '33',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18,
    color: Colors.dark,
  },
  cardSubtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: Colors.muted,
    marginTop: 4,
  },
  footer: {
    marginTop: 60,
  },
});
