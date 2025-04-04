import React from 'react';

import { StyleProp, TextStyle, useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';

interface TabIconProps {
  name: keyof typeof Feather.glyphMap;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

const TabIcon: React.FC<TabIconProps> = ({ name, size = 24, color, style }) => {
  const colorScheme = useColorScheme();
  const defaultColor = Colors[colorScheme ?? 'light'].primary;

  return <Feather name={name} size={size} color={color ?? defaultColor} style={style} />;
};

export default TabIcon;
