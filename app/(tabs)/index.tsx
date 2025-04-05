import React, { useState } from 'react';

import { Stack } from 'expo-router';
import { useColorScheme, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { GlobalStyle } from '@/styles/GlobalStyle';
import CategoryScreen from '@/screens/CategoryScreen';
import HomeHeader from '@/components/ui/headers/HomeHeader';
import CategoriesOption from '@/components/ui/CategoriesOption';

export default function Books() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [activeCategory, setActiveCategory] = useState<string>('Literature');

  return (
    <View style={[GlobalStyle.container, { backgroundColor: theme.background }]}>
      <Stack.Screen
        options={{
          header: () => <HomeHeader />,
        }}
      />
      <CategoriesOption setActiveCategory={setActiveCategory} />

      {/* Book List for Selected Category */}
      <CategoryScreen category={activeCategory} />
    </View>
  );
}
