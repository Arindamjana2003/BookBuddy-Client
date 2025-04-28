import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import React from 'react';
import { GlobalStyle } from '@/styles/GlobalStyle';
import DiaryScreen from '@/screens/DiaryScreen';
import { Colors } from '@/constants/Colors';
import DiaryHeader from '@/components/ui/headers/DiaryHeader';
import { router } from 'expo-router';

export default function Diary() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <>
      <DiaryHeader />
      <DiaryScreen />
    </>
  );
}

const styles = StyleSheet.create({});
