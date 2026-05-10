import React from 'react';
import { Stack, usePathname } from 'expo-router';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '../../../constants/colors';

export default function OnboardingLayout() {
  const pathname = usePathname();
  
  const getStep = () => {
    if (pathname.includes('step1')) return 1;
    if (pathname.includes('step2')) return 2;
    if (pathname.includes('step3')) return 3;
    if (pathname.includes('step4')) return 4;
    if (pathname.includes('step5')) return 5;
    return 0;
  };

  const step = getStep();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <View
            key={i}
            style={[
              styles.progressBar,
              { backgroundColor: i <= step ? Colors.crushPink : Colors.muted + '33' },
            ]}
          />
        ))}
      </View>
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 10,
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
});
