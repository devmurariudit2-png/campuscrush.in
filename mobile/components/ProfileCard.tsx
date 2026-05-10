import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { CrushSignature } from './CrushSignature';
import Animated, { 
  useAnimatedStyle, 
  interpolate, 
  Extrapolation,
  FadeInUp
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const { width, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ProfileData {
  id: string;
  display_name: string;
  age: number;
  college: string;
  department: string;
  photos: { url: string; caption?: string }[];
  prompts: { question: string; answer: string }[];
}

interface ProfileCardProps {
  profile: ProfileData;
  onLike: (type: 'photo' | 'prompt', id: string) => void;
  scrollY: Animated.SharedValue<number>;
  index: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onLike, scrollY, index }) => {
  // 1. Parallax Effect for Hero Photo
  const parallaxStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [(index - 1) * SCREEN_HEIGHT, index * SCREEN_HEIGHT, (index + 1) * SCREEN_HEIGHT],
      [-50, 0, 50],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY }],
    };
  });

  // 2. Scale effect for hero frame
  const frameStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [(index - 1) * SCREEN_HEIGHT, index * SCREEN_HEIGHT, (index + 1) * SCREEN_HEIGHT],
      [0.9, 1, 0.9],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }, { rotate: '-2deg' }],
    };
  });

  const handleLikePress = (type: 'photo' | 'prompt', id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onLike(type, id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        <Animated.View style={[styles.photoFrame, frameStyle]}>
          <Animated.Image 
            source={{ uri: profile.photos[0]?.url }} 
            style={[styles.heroPhoto, parallaxStyle]} 
          />
          <View style={styles.signatureContainer}>
            <CrushSignature type="circle" width={120} height={120} />
          </View>
        </Animated.View>
        
        <Animated.View entering={FadeInUp.delay(200)} style={styles.heroInfo}>
          <Text style={styles.nameText}>{profile.display_name}</Text>
          <View style={styles.ageBadge}>
            <Text style={styles.ageText}>{profile.age}</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300)} style={styles.collegeBadge}>
          <Ionicons name="school" size={12} color={Colors.white} />
          <Text style={styles.collegeText}>{profile.college} • {profile.department}</Text>
        </Animated.View>
      </View>

      {/* 2. Prompt Section - Editorial Typography with subtle reveal */}
      {profile.prompts[0] && (
        <View style={styles.promptSection}>
          <View style={styles.promptHeader}>
            <Text style={styles.promptQuestion}>{profile.prompts[0].question}</Text>
            <CrushSignature type="underline" width={150} height={10} color={Colors.crushPink} />
          </View>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => handleLikePress('prompt', '0')}
            style={styles.promptAnswerContainer}
          >
            <Text style={styles.promptAnswer}>{profile.prompts[0].answer}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 3. Secondary Photo Section - Bleeding edge with parallax */}
      {profile.photos[1] && (
        <View style={styles.secondarySection}>
          <Image source={{ uri: profile.photos[1].url }} style={styles.secondaryPhoto} />
          {profile.photos[1].caption && (
            <View style={styles.captionFrame}>
              <Text style={styles.captionText}>{profile.photos[1].caption}</Text>
            </View>
          )}
          <TouchableOpacity 
            style={styles.floatingLike}
            onPress={() => handleLikePress('photo', '1')}
          >
            <Ionicons name="heart" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      )}

      {/* 4. Prompt 2 - Different layout with glass-morphic feel */}
      {profile.prompts[1] && (
        <View style={styles.promptSectionAlt}>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => handleLikePress('prompt', '1')}
          >
            <Text style={styles.promptAnswerAlt}>"{profile.prompts[1].answer}"</Text>
            <Text style={styles.promptQuestionAlt}>— {profile.prompts[1].question}</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.footerSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: Colors.offWhite,
  },
  heroSection: {
    padding: 20,
    marginBottom: 40,
    marginTop: 20,
  },
  photoFrame: {
    width: width * 0.85,
    height: width * 1.1,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 10,
  },
  heroPhoto: {
    width: '100%',
    height: '110%', // Larger for parallax
    position: 'absolute',
    top: -5,
  },
  signatureContainer: {
    position: 'absolute',
    top: -20,
    right: -20,
    zIndex: 10,
  },
  heroInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 24,
    marginLeft: 10,
  },
  nameText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 48,
    color: Colors.black,
    letterSpacing: -1,
  },
  ageBadge: {
    backgroundColor: Colors.crushPink,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  ageText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18,
    color: Colors.white,
  },
  collegeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
    marginLeft: 10,
    gap: 6,
  },
  collegeText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: Colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  promptSection: {
    paddingHorizontal: 30,
    marginBottom: 60,
  },
  promptHeader: {
    marginBottom: 16,
  },
  promptQuestion: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 16,
    color: Colors.muted,
  },
  promptAnswerContainer: {
    marginTop: 8,
  },
  promptAnswer: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 32,
    color: Colors.black,
    lineHeight: 40,
  },
  secondarySection: {
    width: width,
    height: width * 1.3,
    marginBottom: 60,
  },
  secondaryPhoto: {
    width: '100%',
    height: '100%',
  },
  captionFrame: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 80,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  captionText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 16,
    color: Colors.black,
    fontStyle: 'italic',
  },
  floatingLike: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.crushPink,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.crushPink,
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  promptSectionAlt: {
    padding: 40,
    backgroundColor: Colors.roseTint,
    marginHorizontal: 20,
    borderRadius: 40,
    marginBottom: 100,
  },
  promptAnswerAlt: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 28,
    color: Colors.crushPink,
    textAlign: 'center',
    lineHeight: 36,
  },
  promptQuestionAlt: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: Colors.muted,
    textAlign: 'center',
    marginTop: 16,
  },
  footerSpacer: {
    height: 150,
  }
});
