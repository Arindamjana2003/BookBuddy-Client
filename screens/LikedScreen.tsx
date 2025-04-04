import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import React from 'react';
import { GlobalStyle } from '@/styles/GlobalStyle';
import DontHaveAnyLikedBooks from '@/components/likedPage/dontHaveAnyLikedBook';
import { Colors } from '@/constants/Colors';

export default function LikedScreen() {
  const theme = Colors[useColorScheme() ?? 'light'];
  return (
    <View style={[GlobalStyle.container, { backgroundColor: theme.background }]}>
      <DontHaveAnyLikedBooks />
    </View>
  );
}

const styles = StyleSheet.create({});
