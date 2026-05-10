import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../../../constants/colors';
import { CCButton } from '../../../components/CCButton';
import { CCInput } from '../../../components/CCInput';
import { useRouter } from 'expo-router';

const GENDERS = ['Man', 'Woman', 'Non-binary', 'Prefer not to say'];
const INTERESTS = ['Men', 'Women', 'Everyone'];
const YEARS = ['1st', '2nd', '3rd', '4th', 'Masters', 'PhD'];

export default function Step2Screen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [interestedIn, setInterestedIn] = useState('');
  const [year, setYear] = useState('');
  const [dept, setDept] = useState('');
  
  const router = useRouter();

  const handleNext = () => {
    // Validation would go here
    router.push('/(auth)/onboarding/step3');
  };

  const Pill = ({ label, selected, onSelect }: { label: string, selected: boolean, onSelect: () => void }) => (
    <TouchableOpacity
      onPress={onSelect}
      style={[styles.pill, selected && styles.pillSelected]}
    >
      <Text style={[styles.pillText, selected && styles.pillTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Tell us about yourself</Text>
        </View>

        <CCInput
          label="Display Name"
          placeholder="What should we call you?"
          value={name}
          onChangeText={setName}
        />

        <CCInput
          label="Age"
          placeholder="Must be 18+"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <Text style={styles.sectionLabel}>Gender</Text>
        <View style={styles.pillContainer}>
          {GENDERS.map(g => (
            <Pill key={g} label={g} selected={gender === g} onSelect={() => setGender(g)} />
          ))}
        </View>

        <Text style={styles.sectionLabel}>Interested in</Text>
        <View style={styles.pillContainer}>
          {INTERESTS.map(i => (
            <Pill key={i} label={i} selected={interestedIn === i} onSelect={() => setInterestedIn(i)} />
          ))}
        </View>

        <Text style={styles.sectionLabel}>Year of Study</Text>
        <View style={styles.pillContainer}>
          {YEARS.map(y => (
            <Pill key={y} label={y} selected={year === y} onSelect={() => setYear(y)} />
          ))}
        </View>

        <CCInput
          label="Department"
          placeholder="e.g. Computer Science"
          value={dept}
          onChangeText={setDept}
        />

        <View style={styles.footer}>
          <CCButton title="Continue" onPress={handleNext} />
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
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 32,
    color: Colors.dark,
  },
  sectionLabel: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: Colors.dark,
    marginTop: 20,
    marginBottom: 12,
    marginLeft: 4,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.muted + '33',
  },
  pillSelected: {
    backgroundColor: Colors.crushPink,
    borderColor: Colors.crushPink,
  },
  pillText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: Colors.dark,
  },
  pillTextSelected: {
    color: Colors.white,
  },
  footer: {
    marginTop: 40,
  },
});
