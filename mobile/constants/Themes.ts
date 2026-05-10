import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { Colors } from './colors';

export const CampusCrushLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.crushPink,
    background: Colors.offWhite,
    card: Colors.white,
    text: Colors.black,
    border: Colors.roseTint,
    notification: Colors.crushPink,
  },
};

export const CampusCrushDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.crushPink,
    background: Colors.black,
    card: '#1A1A1A',
    text: Colors.white,
    border: '#333333',
    notification: Colors.crushPink,
  },
};
