import React from 'react';
import { TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface ScrollToTopButtonProps {
  visible: boolean;
  onPress: () => void;
}

export const ScrollToTopButton = ({ visible, onPress }: ScrollToTopButtonProps) => {
  if (!visible) return null;

  const theme = Colors[useColorScheme() ?? 'light'];

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={onPress}>
      <Ionicons name="arrow-up" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
