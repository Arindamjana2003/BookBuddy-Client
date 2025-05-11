import { StyleSheet, useColorScheme } from 'react-native';
import React from 'react';
import DiaryScreen from '@/screens/DiaryScreen';
import { Colors } from '@/constants/Colors';
import DiaryHeader from '@/components/ui/headers/DiaryHeader';

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
