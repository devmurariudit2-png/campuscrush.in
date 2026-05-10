import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../../constants/colors';
import { CCButton } from '../../../components/CCButton';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step3Screen() {
  const [photos, setPhotos] = useState<string[]>([]);
  const router = useRouter();

  const handleNext = () => {
    router.push('/(auth)/onboarding/step4');
  };

  const PhotoSlot = ({ index, large = false }: { index: number, large?: boolean }) => (
    <TouchableOpacity
      style={[styles.photoSlot, large && styles.photoSlotLarge]}
      onPress={() => {
        // Mock photo picker
        const newPhotos = [...photos];
        newPhotos[index] = 'https://picsum.photos/400/600?random=' + index;
        setPhotos(newPhotos);
      }}
    >
      {photos[index] ? (
        <Image source={{ uri: photos[index] }} style={styles.photoImage} />
      ) : (
        <Ionicons name="add" size={32} color={Colors.muted} />
      )}
      {photos[index] && (
        <View style={styles.captionBadge}>
          <Text style={styles.captionText}>+caption</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Show your vibe</Text>
        <Text style={styles.subtitle}>Upload at least 2 photos to get started.</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.row}>
          <PhotoSlot index={0} large />
        </View>
        <View style={styles.gridInner}>
          <View style={styles.row}>
            <PhotoSlot index={1} />
            <PhotoSlot index={2} />
          </View>
          <View style={styles.row}>
            <PhotoSlot index={3} />
            <PhotoSlot index={4} />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <CCButton title="Continue" onPress={handleNext} disabled={photos.filter(p => !!p).length < 2} />
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
  grid: {
    gap: 12,
  },
  gridInner: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  photoSlot: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.muted + '33',
    overflow: 'hidden',
  },
  photoSlotLarge: {
    aspectRatio: 1.5,
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  captionBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  captionText: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  footer: {
    marginTop: 40,
  },
});
