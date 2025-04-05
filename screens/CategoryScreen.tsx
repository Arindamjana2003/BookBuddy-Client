import React, { useRef } from 'react';

import { router } from 'expo-router';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { booksData } from '@/data/bookData';
import ThemeText from '@/components/global/TheamText';

interface CategoryScreenProps {
  category: string;
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({ category }) => {
  const theme = Colors[useColorScheme() ?? 'light'];

  const data = booksData.filter((book) => book.category === category);

  const flatListRef = useRef<FlatList>(null);

  //   console.log(flatListRef);

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.surface }]}
            onPress={() => router.navigate('/book-details')}
          >
            <View style={[styles.badge, { backgroundColor: theme.accent }]}>
              <ThemeText size={10} color={Colors.light.textPrimary}>
                Popular
              </ThemeText>
            </View>
            <Image source={{ uri: item.coverPhoto }} style={styles.image} resizeMode="cover" />
            <ThemeText numberOfLines={1} style={styles.price}>
              {item.bookName}
            </ThemeText>
            <ThemeText numberOfLines={1} style={styles.subtitle} size={12} color={theme.gray}>
              {item.author}
            </ThemeText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const CARD_WIDTH = Dimensions.get('window').width / 2 - 24;

const styles = StyleSheet.create({
  grid: {
    paddingBottom: 150,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 150,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginHorizontal: 10,
  },
  subtitle: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
});

export default CategoryScreen;
