import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Dimensions, StatusBar, PanResponder, Animated as RNAnimated } from 'react-native';
import { Colors } from '../../constants/colors';
import { ProfileCard } from '../../components/ProfileCard';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
  FadeIn
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

const { width, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.4; // More deliberate swipe needed for Editorial

import { API_URL } from '../../constants/api';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function DiscoverScreen() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);

  // Gesture Values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const nextCardScale = useSharedValue(0.95);
  const dummyScrollY = useSharedValue(0);

  useEffect(() => {
    fetch(`${API_URL}/feed`)
      .then(res => res.json())
      .then(data => {
        setProfiles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const onSwipeComplete = (direction: 'left' | 'right') => {
    if (direction === 'right') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Move to next profile
    setCurrentIndex(prev => prev + 1);
    translateX.value = 0;
    translateY.value = 0;
    nextCardScale.value = 0.95;
  };

  // 🪄 Spell: Editorial Page Flip Physics
  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-width, 0, width],
      [-25, 0, 25],
      Extrapolation.CLAMP
    );

    const skewX = interpolate(
        translateX.value,
        [-width, 0, width],
        [15, 0, -15],
        Extrapolation.CLAMP
    );

    const scale = interpolate(
        Math.abs(translateX.value),
        [0, width],
        [1, 0.9],
        Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
        { skewX: `${skewX}deg` },
        { scale }
      ],
      zIndex: 10,
    };
  });

  const nextCardAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(translateX.value),
      [0, width],
      [0.95, 1],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
        Math.abs(translateX.value),
        [0, width],
        [0.6, 1],
        Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }],
      opacity,
      zIndex: 1,
    };
  });

  // PanResponder for universal gesture support
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        translateX.value = gestureState.dx;
        translateY.value = gestureState.dy;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > SWIPE_THRESHOLD) {
          const direction = gestureState.dx > 0 ? 'right' : 'left';
          translateX.value = withTiming(
            direction === 'right' ? width * 2 : -width * 2,
            { duration: 400 },
            () => {
              runOnJS(onSwipeComplete)(direction);
            }
          );
        } else {
          translateX.value = withSpring(0, { damping: 15 });
          translateY.value = withSpring(0, { damping: 15 });
        }
      },
    })
  ).current;

  const handleLike = (type: string, id: string) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      translateX.value = withTiming(width * 2, { duration: 600 }, () => {
          runOnJS(onSwipeComplete)('right');
      });
  };

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Curating your campus gallery...</Text>
      </View>
    );
  }

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  if (!currentProfile) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="sparkles-outline" size={48} color={Colors.crushPink} />
        <Text style={styles.emptyHeader}>That's a wrap!</Text>
        <Text style={styles.emptyText}>You've browsed the full Gandhinagar editorial for today.</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={() => setCurrentIndex(0)}>
            <Text style={styles.refreshButtonText}>Browse Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.headerContainer}>
          <AnimatedBlurView intensity={90} tint="light" style={StyleSheet.absoluteFill} />
          <SafeAreaView>
          <View style={styles.header}>
              <View>
              <Text style={styles.brand}>CampusCrush</Text>
              <Text style={styles.campusSubtext}>Gandhinagar Editorial</Text>
              </View>
              <View style={styles.headerRight}>
                  <TouchableOpacity style={styles.coinBadge}>
                  <Ionicons name="flash" size={14} color={Colors.campusAmber} />
                  <Text style={styles.coinText}>120</Text>
              </TouchableOpacity>
              </View>
          </View>
          </SafeAreaView>
      </View>

      <View style={styles.stackContainer}>
          {nextProfile && (
              <Animated.View style={[styles.cardWrapper, nextCardAnimatedStyle]}>
                  <ProfileCard 
                      profile={nextProfile} 
                      onLike={() => {}} 
                      scrollY={dummyScrollY} 
                      index={0} 
                  />
              </Animated.View>
          )}

          {/* Current Profile */}
          <Animated.View 
            style={[styles.cardWrapper, animatedStyle]}
            {...panResponder.panHandlers}
          >
              <ProfileCard 
                  profile={currentProfile} 
                  onLike={handleLike} 
                  scrollY={dummyScrollY} 
                  index={0} 
              />
          </Animated.View>
      </View>

      <View style={styles.floatingActions}>
          <TouchableOpacity 
            style={[styles.actionBtn, styles.skipBtn]} 
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                translateX.value = withTiming(-width * 2, { duration: 600 }, () => runOnJS(onSwipeComplete)('left'));
            }}
          >
              <Ionicons name="close" size={32} color={Colors.muted} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionBtn, styles.likeBtn]} 
            onPress={() => handleLike('profile', currentProfile.id)}
          >
              <Ionicons name="heart" size={32} color={Colors.white} />
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  brand: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 26,
    color: Colors.crushPink,
    letterSpacing: -1.2,
  },
  campusSubtext: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 9,
    color: Colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: -4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.campusAmber + '33',
  },
  coinText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: Colors.campusAmber,
    marginLeft: 4,
  },
  stackContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    position: 'absolute',
    width: width,
    height: '100%',
    backgroundColor: Colors.offWhite,
  },
  floatingActions: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    zIndex: 1000,
  },
  actionBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  skipBtn: {
    backgroundColor: Colors.white,
  },
  likeBtn: {
    backgroundColor: Colors.crushPink,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.offWhite,
    padding: 40,
  },
  emptyHeader: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 24,
    color: Colors.black,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 16,
    color: Colors.muted,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  refreshButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: Colors.dark,
    borderRadius: 30,
  },
  refreshButtonText: {
    color: Colors.white,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
  },
});