// CategoryScreen.tsx
import React, { useEffect, useRef } from 'react';
import { router } from 'expo-router';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import ThemeText from '@/components/global/TheamText';
import useBookStore from '@/store/useBookStore'; // Make sure this is the correct path
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

interface CategoryScreenProps {
  categoryId: string;
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({ categoryId }) => {
  const theme = Colors[useColorScheme() ?? 'light'];
  const flatListRef = useRef<FlatList>(null);

  const { books, isLoading, fetchBooksByCategoryId } = useBookStore();

  useEffect(() => {
    if (categoryId) {
      fetchBooksByCategoryId(categoryId);
    }
  }, [categoryId]);

  return (
    <View style={{ marginTop: 10 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.textPrimary} style={{ marginTop: 50 }} />
      ) : books.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 100 }}>
          <Ionicons name="book-outline" size={48} color={theme.gray} style={{ marginBottom: 12 }} />
          <Text
            style={{
              fontSize: 16,
              color: theme.gray,
              fontStyle: 'italic',
              textAlign: 'center',
              paddingHorizontal: 20,
            }}
          >
            No books available in this category yet.
          </Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={books}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: theme.surface }]}
              onPress={() =>
                router.push({
                  pathname: '/(protected)/book/book-details',
                  params: { bookId: item._id },
                })
              }
            >
              <View style={[styles.badge, { backgroundColor: theme.accent }]}>
                <ThemeText size={10} color={Colors.light.textPrimary}>
                  Popular
                </ThemeText>
              </View>
              <Animated.Image
                source={{ uri: item.coverImage?.url || 'https://via.placeholder.com/150' }}
                style={styles.image}
                resizeMode="cover"
                sharedTransitionTag="bookImage"
              />
              <ThemeText numberOfLines={1} style={styles.price}>
                {item.name}
              </ThemeText>
              <ThemeText numberOfLines={1} style={styles.subtitle} size={12} color={theme.gray}>
                {item.author}
              </ThemeText>
            </TouchableOpacity>
          )}
        />
      )}
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

// import React, { useRef } from 'react';

// import { router } from 'expo-router';
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   useColorScheme,
//   View,
// } from 'react-native';

// import { Colors } from '@/constants/Colors';
// import { booksData } from '@/data/bookData';
// import ThemeText from '@/components/global/TheamText';

// interface CategoryScreenProps {
//   category: string;
// }

// const CategoryScreen: React.FC<CategoryScreenProps> = ({ category }) => {
//   const theme = Colors[useColorScheme() ?? 'light'];

//   const data = booksData.filter((book) => book.category === category);

//   const flatListRef = useRef<FlatList>(null);

//   //   console.log(flatListRef);

//   return (
//     <View style={{ marginTop: 10 }}>
//       <FlatList
//         ref={flatListRef}
//         data={data}
//         keyExtractor={(_, index) => index.toString()}
//         numColumns={2}
//         columnWrapperStyle={styles.columnWrapper}
//         contentContainerStyle={styles.grid}
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[styles.card, { backgroundColor: theme.surface }]}
//             onPress={() => router.navigate('/(protected)/book/book-details')}
//           >
//             <View style={[styles.badge, { backgroundColor: theme.accent }]}>
//               <ThemeText size={10} color={Colors.light.textPrimary}>
//                 Popular
//               </ThemeText>
//             </View>
//             <Image source={{ uri: item.coverPhoto }} style={styles.image} resizeMode="cover" />
//             <ThemeText numberOfLines={1} style={styles.price}>
//               {item.bookName}
//             </ThemeText>
//             <ThemeText numberOfLines={1} style={styles.subtitle} size={12} color={theme.gray}>
//               {item.author}
//             </ThemeText>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const CARD_WIDTH = Dimensions.get('window').width / 2 - 24;

// const styles = StyleSheet.create({
//   grid: {
//     paddingBottom: 150,
//   },
//   columnWrapper: {
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   card: {
//     width: CARD_WIDTH,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 16,
//     overflow: 'hidden',
//     elevation: 2,
//     position: 'relative',
//   },
//   badge: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//     backgroundColor: '#3b82f6',
//     borderRadius: 8,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     zIndex: 1,
//   },
//   image: {
//     width: '100%',
//     height: 150,
//   },
//   price: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginTop: 8,
//     marginHorizontal: 10,
//   },
//   subtitle: {
//     marginBottom: 10,
//     marginHorizontal: 10,
//   },
// });

// export default CategoryScreen;
