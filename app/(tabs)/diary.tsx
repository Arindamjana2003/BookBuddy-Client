import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import React from 'react';
import { GlobalStyle } from '@/styles/GlobalStyle';
import DiaryScreen from '@/screens/DiaryScreen';
import { Colors } from '@/constants/Colors';

export default function Diary() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  return (
    <View style={[GlobalStyle.container, { backgroundColor: theme.background }]}>
      <DiaryScreen />
    </View>
  );
}

const styles = StyleSheet.create({});
