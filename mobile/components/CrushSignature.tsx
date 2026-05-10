import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../constants/colors';

interface CrushSignatureProps {
  type: 'underline' | 'circle' | 'highlight';
  color?: string;
  width?: number;
  height?: number;
}

export const CrushSignature: React.FC<CrushSignatureProps> = ({ 
  type, 
  color = Colors.crushPink,
  width = 100,
  height = 20
}) => {
  const getPath = () => {
    switch (type) {
      case 'underline':
        return "M5 15C20 12 50 13 95 14";
      case 'circle':
        return "M50 5C25 5 5 15 5 25C5 35 25 45 50 45C75 45 95 35 95 25C95 15 75 5 50 5Z";
      case 'highlight':
        return "M2 10C30 8 60 9 98 11M5 14C35 12 65 13 95 15";
      default:
        return "";
    }
  };

  return (
    <View style={{ width, height, position: 'absolute' }}>
      <Svg width={width} height={height} viewBox="0 0 100 20" preserveAspectRatio="none">
        <Path
          d={getPath()}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity={0.6}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({});
