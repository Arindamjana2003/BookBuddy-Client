// books.tsx
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { Alert, useColorScheme, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { GlobalStyle } from '@/styles/GlobalStyle';
import CategoryScreen from '@/screens/CategoryScreen';
import HomeHeader from '@/components/ui/headers/HomeHeader';
import CategoriesOption from '@/components/ui/CategoriesOption';
import { apiClient } from '@/api/axios.config';

type Category = {
  _id: string;
  name: string;
};

export default function Books() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await apiClient.get('/categories');
        if (data) {
          setCategories(data);
          setActiveCategory(data[0]); // Set default active category
        }
      } catch {
        Alert.alert('Error', 'Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  return (
    <View style={[GlobalStyle.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ header: () => <HomeHeader /> }} />
      <CategoriesOption
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      {activeCategory && <CategoryScreen categoryId={activeCategory._id} />}
    </View>
  );
}

// import React, { useState } from 'react';

// import { Stack } from 'expo-router';
// import { useColorScheme, View } from 'react-native';

// import { Colors } from '@/constants/Colors';
// import { GlobalStyle } from '@/styles/GlobalStyle';
// import CategoryScreen from '@/screens/CategoryScreen';
// import HomeHeader from '@/components/ui/headers/HomeHeader';
// import CategoriesOption from '@/components/ui/CategoriesOption';

// export default function Books() {
//   const colorScheme = useColorScheme();
//   const theme = Colors[colorScheme ?? 'light'];

//   const [activeCategory, setActiveCategory] = useState<string>('Literature');

//   return (
//     <View style={[GlobalStyle.container, { backgroundColor: theme.background }]}>
//       <Stack.Screen
//         options={{
//           header: () => <HomeHeader />,
//         }}
//       />
//       <CategoriesOption setActiveCategory={setActiveCategory} />

//       {/* Book List for Selected Category */}
//       <CategoryScreen category={activeCategory} />
//     </View>
//   );
// }
