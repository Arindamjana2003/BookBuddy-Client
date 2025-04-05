import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

const Devider = () => {
  const theme = Colors[useColorScheme() ?? 'light'];
  return (
    <View
      style={{
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 1,
        marginVertical: 5,
        borderBottomColor: theme.gray,
      }}
    />
  );
};

export default Devider;

const styles = StyleSheet.create({});
