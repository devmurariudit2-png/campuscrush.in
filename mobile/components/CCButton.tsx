import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../constants/colors';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface CCButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const CCButton: React.FC<CCButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.98);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  const getBackgroundColor = () => {
    if (disabled) return Colors.muted;
    switch (type) {
      case 'primary': return Colors.crushPink;
      case 'secondary': return Colors.campusAmber;
      case 'ghost': return 'transparent';
      default: return Colors.crushPink;
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'ghost': return Colors.crushPink;
      default: return Colors.white;
    }
  };

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled || loading}
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        type === 'ghost' && styles.ghostBorder,
        animatedStyle,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
          {title}
        </Text>
      )}
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginVertical: 8,
  },
  ghostBorder: {
    borderWidth: 2,
    borderColor: Colors.crushPink,
  },
  text: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    letterSpacing: -0.5,
  },
});
