import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import React from 'react';
import SearchScreen from '@/screens/SearchScreen';
import { GlobalStyle } from '@/styles/GlobalStyle';
import ThemeText from '@/components/global/TheamText';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';

const Search = () => {
  const theme = Colors[useColorScheme() ?? 'light'];
  return (
    <View style={[GlobalStyle.container, { backgroundColor: theme.background }]}>
      <SearchScreen />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
