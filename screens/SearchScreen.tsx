import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useColorScheme,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Animated as RNAnimated,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { format } from 'date-fns';
import { apiClient } from '@/api/axios.config';
import { Book } from '@/types/books';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? 'light'];
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const searchInputRef = useRef<TextInput>(null);
  const scaleAnim = useRef(new RNAnimated.Value(1)).current;
  const [isFocused, setIsFocused] = useState(false);

  const fetchBooks = async (query: string, category: string) => {
    try {
      setLoading(true);
      setError('');

      const response = await apiClient.get('/book/search', {
        params: {
          q: query,
          category: category || undefined,
        },
      });

      if (response.data) {
        setBooks(response.data);
      } else {
        setError('Failed to fetch books');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (searchQuery || selectedCategory) {
        fetchBooks(searchQuery, selectedCategory);
      } else {
        setBooks([]);
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
  };

  const handleClear = () => {
    setSearchQuery('');
    handleSearch('');
  };

  const animateFocus = () => {
    RNAnimated.timing(scaleAnim, {
      toValue: 1.02,
      duration: 200,
      // easing: RNAnimated.Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const animateBlur = () => {
    RNAnimated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      // easing: RNAnimated.Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const renderBookItem = ({ item, index }: { item: Book; index: number }) => (
    <Animated.View
      entering={FadeIn.delay(index * 100)}
      exiting={FadeOut}
      style={[styles.bookContainer, { backgroundColor: themeColor.surface }]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.coverImage?.url || 'https://via.placeholder.com/150' }}
          style={[styles.bookImage, { backgroundColor: themeColor.surface }]}
        />
        <View style={styles.likeIcon}>
          <AntDesign name="heart" size={20} color={themeColor.primaryVariant} />
        </View>
        <View style={styles.ratingIcon}>
          <AntDesign name="star" size={16} color={themeColor.accent} />
          <Text style={styles.ratingText}>{item.averageRating.toFixed(1)}/5</Text>
        </View>
      </View>
      <View style={[styles.textContainer, { backgroundColor: themeColor.surface }]}>
        <Text style={[styles.bookName, { color: themeColor.textPrimary }]}>{item.name}</Text>
        <Text style={[styles.bookDescription, { color: themeColor.textSecondary }]}>
          {item.description}
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.author, { color: themeColor.textPrimary }]}>{item.author}</Text>
          <View style={styles.dateContainer}>
            <AntDesign name="calendar" size={14} color={themeColor.textSecondary} />
            <Text style={[styles.date, { color: themeColor.textSecondary }]}>
              {item.publishedDate ? format(new Date(item.publishedDate), 'MMM d, yyyy') : 'No date'}
            </Text>
          </View>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: themeColor.primary }]}>
          <Text style={[styles.categoryText, { color: themeColor.primaryVariant }]}>
            {item.category.name}
          </Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderHeader = () => (
    <View style={[styles.headerContainer, { paddingTop: top + 15 }]}>
      <View style={styles.headerTextContainer}>
        <Text style={[styles.headerSubtitle, { color: themeColor.textSecondary }]}>
          Search your
        </Text>
        <Text style={[styles.headerTitle, { color: themeColor.textPrimary }]}>"Books"</Text>
      </View>

      <RNAnimated.View
        style={[
          styles.searchContainer,
          {
            borderColor: isFocused ? themeColor.primary : themeColor.textSecondary,
            backgroundColor: themeColor.surface,
            transform: [{ scale: scaleAnim }],
            shadowColor: isFocused ? themeColor.primary : 'transparent',
          },
        ]}
      >
        <AntDesign
          name="search1"
          size={20}
          color={isFocused ? themeColor.primary : themeColor.textPrimary}
        />
        <TextInput
          ref={searchInputRef}
          style={[
            styles.searchInput,
            {
              color: themeColor.textPrimary,
            },
          ]}
          placeholder="Search books here..."
          placeholderTextColor={themeColor.textSecondary}
          inputMode="search"
          value={searchQuery}
          onChangeText={handleSearch}
          onFocus={() => {
            setIsFocused(true);
            animateFocus();
          }}
          onBlur={() => {
            setIsFocused(false);
            animateBlur();
          }}
          returnKeyType="search"
        />
        {searchQuery ? (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <AntDesign name="closecircle" size={18} color={themeColor.textSecondary} />
          </TouchableOpacity>
        ) : null}
      </RNAnimated.View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeColor.background }]}>
      {renderHeader()}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={themeColor.primary} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <AntDesign name="warning" size={32} color={themeColor.error} />
          <Text style={[styles.errorText, { color: themeColor.error }]}>{error}</Text>
        </View>
      ) : books.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AntDesign name="search1" size={48} color={themeColor.textSecondary} />
          <Text style={[styles.emptyText, { color: themeColor.textSecondary }]}>
            {searchQuery || selectedCategory ? 'No books found' : 'Search for books'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={books}
          renderItem={renderBookItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTextContainer: {
    marginBottom: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold',
    marginTop: -8,
  },
  searchContainer: {
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 25,
    flexDirection: 'row',
    gap: 12,
    borderWidth: StyleSheet.hairlineWidth,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    includeFontPadding: false,
  },
  clearButton: {
    padding: 8,
    marginRight: -8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  bookContainer: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  bookImage: {
    width: '100%',
    height: 180,
    objectFit: 'cover',
  },
  likeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: '#00000080',
    padding: 6,
    borderRadius: 20,
  },
  ratingIcon: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00000080',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  textContainer: {
    padding: 16,
  },
  bookName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bookDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    marginLeft: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
});

// import React, { useLayoutEffect } from 'react';
// import { View, Text, Image, StyleSheet, useColorScheme } from 'react-native';
// import { Colors } from '@/constants/Colors';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { useNavigation } from 'expo-router';
// import SearchHeader from '@/components/ui/headers/SearchHeader';
// import Animated, { SlideInLeft, SlideInRight, useAnimatedRef } from 'react-native-reanimated';

// export default function SearchScreen() {
//   const colorScheme = useColorScheme();
//   const themeColor = Colors[colorScheme ?? 'light'];
//   const navigation = useNavigation();

//   const scrollRef = useAnimatedRef<Animated.ScrollView>();

//   const books = [
//     {
//       image: {
//         uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY6m4L92Nc5ci_goy7928WoAgBfl5Sn5vyWw&s',
//       },
//       name: 'C ',
//       description: 'Authentic Guide to C programmimg',
//       author: ' Yashavant Kanethkar',
//       date: '2023-04-01',
//       rating: 4.5,
//     },
//     {
//       image: {
//         uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwftdwzSOyRt9okVxJBEvaCKH7Bp3n9mPC1w&',
//       },
//       name: 'Let Us C',
//       description: 'From the beginning to pro sixth edition',
//       author: 'Ivor horton',
//       date: '2023-03-15',
//       rating: 4.0,
//     },
//     {
//       image: {
//         uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN8iyuNyKoBa7jzoOY68Bi1LYgl3c9cR0bNg&s',
//       },
//       name: 'Python',
//       description: 'Introduction to computation and programmimg using Python',
//       author: 'Jhon V.Guttak',
//       date: '2023-03-20',
//       rating: 4.2,
//     },
//     {
//       image: {
//         uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpKEIeqZ4I0XTZL2KDuVo4q_FqgrtHgg31Uw&s',
//       },
//       name: 'Javascript',
//       description: 'javascript language for absolute beginners',
//       author: 'Willium Sulivan',
//       date: '2023-03-25',
//       rating: 4.3,
//     },
//     {
//       image: {
//         uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdAWrjRl_ukTlrgXMVRDQqlF52GhR09ISWSw&s',
//       },
//       name: 'Algebra',
//       description: 'Abstact & Linear, Fifth Edition',
//       author: 'Sk Mapa',
//       date: '2023-03-30',
//       rating: 4.4,
//     },
//   ];

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTitle: '',
//       headerTransparent: true,
//       headerBackVisible: false,
//     });
//   }, []);

//   return (
//     <Animated.ScrollView
//       ref={scrollRef}
//       scrollEventThrottle={16}
//       style={[styles.container, { backgroundColor: themeColor.background }]}
//       showsVerticalScrollIndicator={false}
//     >
//       <SearchHeader />
//       {/* <Stack.Screen options={{ header: () => <SearchHeader /> }} /> */}
//       {books.map((book, index) => (
//         <Animated.View
//           entering={SlideInLeft.delay(index * 150)}
//           exiting={SlideInRight}
//           key={index}
//           style={[styles.bookContainer, { backgroundColor: themeColor.surface }]}
//         >
//           <View style={styles.imageContainer}>
//             <Image
//               source={{ uri: book.image.uri }}
//               style={[styles.bookImage, { backgroundColor: themeColor.surface }]}
//             />
//             <View style={styles.likeIcon}>
//               <AntDesign name="heart" size={24} color={themeColor.primaryVariant} />
//             </View>
//             <View style={styles.ratingIcon}>
//               <AntDesign name="star" size={24} color={themeColor.accent} />
//               <Text style={styles.ratingText}>{book.rating}/5</Text>
//             </View>
//           </View>
//           <View style={[styles.textContainer, { backgroundColor: themeColor.surface }]}>
//             <Text style={[styles.bookName, { color: themeColor.textPrimary }]}>{book.name}</Text>
//             <Text style={[styles.bookDescription, { color: themeColor.textPrimary }]}>
//               {book.description}
//             </Text>
//             <View style={styles.footer}>
//               <Text style={[styles.author, { color: themeColor.textPrimary }]}>{book.author}</Text>
//               <View style={styles.dateContainer}>
//                 <AntDesign name="calendar" size={18} color={themeColor.textPrimary} />
//                 <Text style={[styles.date, { color: themeColor.textPrimary }]}>{book.date}</Text>
//               </View>
//             </View>
//           </View>
//         </Animated.View>
//       ))}
//     </Animated.ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   bookContainer: {
//     marginBottom: 20,
//     // marginHorizontal: 10,
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   imageContainer: {
//     position: 'relative',
//     width: '100%',
//   },
//   bookImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     objectFit: 'cover',
//   },
//   likeIcon: {
//     position: 'absolute',
//     right: 10,
//     top: 10,
//     backgroundColor: '#00000080',
//     padding: 5,
//     borderRadius: 15,
//   },
//   ratingIcon: {
//     position: 'absolute',
//     left: 10,
//     bottom: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#00000080',
//     padding: 5,
//     borderRadius: 15,
//   },
//   ratingText: {
//     color: '#fff',
//     marginLeft: 5,
//     fontSize: 16,
//   },
//   textContainer: {
//     padding: 15,
//   },
//   bookName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   bookDescription: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 15,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   author: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   date: {
//     fontSize: 16,
//     fontWeight: '400',
//     color: '#999',
//     marginLeft: 5,
//   },
// });
