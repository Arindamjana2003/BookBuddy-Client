import { StyleSheet } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function BookLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[pdfUrl]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="upload"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="book-details"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="myUploades"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({});
