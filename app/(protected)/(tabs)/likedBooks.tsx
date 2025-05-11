import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/useAuthStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { apiClient } from '@/api/axios.config';
import { Book } from '@/types/books';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import ThemeText from '@/components/global/TheamText';
import FevouriteHeader from '@/components/ui/headers/FevouriteHeader';

const LikedScreen = () => {
  const theme = Colors[useColorScheme() ?? 'light'];
  const { top } = useSafeAreaInsets();
  const { user } = useAuthStore();
  const router = useRouter();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  // const [refreshing, setRefreshing] = useState(false);

  const fetchLikedBooks = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get('/book');
      if (data) {
        const likedBooks = data.filter((book: Book) => book?.likes?.includes(user?._id || ''));
        setBooks(likedBooks);
      }
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
      // setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLikedBooks();
  }, []);

  const onRefresh = () => {
    // setRefreshing(true);
    setLoading(true);
    fetchLikedBooks();
  };

  const handleLike = async (bookId: string, e: any) => {
    e.stopPropagation();
    try {
      // setRefreshing(true);
      setLoading(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await apiClient.patch(`/book/like/${bookId}`);
      fetchLikedBooks();
    } catch (err) {
      console.error('Failed to like book:', err);
    } finally {
      // setRefreshing(false);
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.surface }]}
      onPress={() =>
        router.push({
          pathname: '/(protected)/book/book-details',
          params: { bookId: item._id },
        })
      }
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: item?.coverImage?.url || 'https://via.placeholder.com/150' }}
        style={styles.cover}
      />
      <View style={styles.cardContent}>
        <ThemeText font={Fonts.PoppinsMedium} size={15} numberOfLines={1}>
          {item.name}
        </ThemeText>
        <ThemeText size={13} color={theme.textSecondary} numberOfLines={1}>
          by {item.author}
        </ThemeText>
        <ThemeText size={12} color={theme.textSecondary} numberOfLines={2}>
          {item.description}
        </ThemeText>

        <View style={styles.cardFooter}>
          <TouchableOpacity
            style={[styles.readButton, { backgroundColor: theme.primary + '20' }]}
            onPress={(e) => {
              e.stopPropagation();
              router.push({
                pathname: '/(protected)/book/book-details',
                params: { bookId: item._id },
              });
            }}
          >
            <ThemeText size={12} color={theme.primary}>
              Read Now
            </ThemeText>
          </TouchableOpacity>
          <View style={styles.footerRight}>
            <MaterialIcons name="calendar-today" size={14} color={theme.textSecondary} />
            <ThemeText size={12} color={theme.textSecondary}>
              {new Date(item.createdAt).toLocaleDateString()}
            </ThemeText>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.heartIcon} onPress={(e) => handleLike(item._id, e)}>
        <AntDesign name="heart" size={18} color={theme.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // if (loading && !refreshing) {
  //   return (
  //     <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
  //       <ActivityIndicator size="large" color={theme.primary} />
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <FevouriteHeader />

      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} tintColor={theme.primary} />
        }
        contentContainerStyle={books.length ? styles.list : styles.emptyList}
        ListEmptyComponent={
          <View style={styles.empty}>
            {/* <DontHaveAnyLikedBooks /> */}
            <Ionicons name="heart-outline" size={60} color={theme.gray} />
            <ThemeText size={18} color={theme.gray}>
              No liked books yet
            </ThemeText>
            <ThemeText size={14} color={theme.gray} align="center">
              Like some books to see them here
            </ThemeText>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 10,
    gap: 14,
  },
  emptyList: {
    // flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 130,
  },
  empty: {
    alignItems: 'center',
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 10,
  },
  cover: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cardFooter: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
});

export default LikedScreen;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl,
//   useColorScheme,
// } from 'react-native';
// import { AntDesign, MaterialIcons } from '@expo/vector-icons';
// import { Colors } from '@/constants/Colors';
// import ThemeText from '@/components/global/TheamText';
// import { useAuthStore } from '@/store/useAuthStore';
// import { Fonts } from '@/constants/Fonts';
// import * as Haptics from 'expo-haptics';
// import { Book } from '@/types/books';
// import { apiClient } from '@/api/axios.config';
// import DontHaveAnyLikedBooks from '@/components/likedPage/dontHaveAnyLikedBook';

// const LikedScreen = () => {
//   const theme = Colors[useColorScheme() ?? 'light'];
//   const { user } = useAuthStore();
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchLikedBooks = async () => {
//     try {
//       const { data } = await apiClient.get('/book');

//       if (data) {
//         // Filter books where user's ID is in likes array
//         const likedBooks = data.filter((book: Book) => book?.likes.includes(user?._id || ''));
//         setBooks(likedBooks);
//       }
//     } catch (error) {
//       console.error('Error fetching books:', error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   //   const handleLike = async (bookId: string) => {
//   //     try {
//   //       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

//   //       const response = await fetch(`https://your-api-endpoint/books/${bookId}/like`, {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //         },
//   //         body: JSON.stringify({ userId: user?._id }),
//   //       });

//   //       const result = await response.json();
//   //       if (result.success) {
//   //         fetchLikedBooks(); // Refresh the list
//   //       }
//   //     } catch (error) {
//   //       console.error('Error liking book:', error);
//   //     }
//   //   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchLikedBooks();
//   };

//   useEffect(() => {
//     fetchLikedBooks();
//   }, []);

//   if (loading && !refreshing) {
//     return (
//       <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
//         <ActivityIndicator size="large" color={theme.primary} />
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={[styles.container, { backgroundColor: theme.background }]}
//       contentContainerStyle={styles.scrollContent}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />
//       }
//     >
//       <ThemeText size={24} font={Fonts.PoppinsBold} style={styles.header}>
//         Your Liked Books
//       </ThemeText>

//       {books.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <MaterialIcons name="favorite-border" size={60} color={theme.textSecondary} />
//           <ThemeText size={18} color={theme.textSecondary} style={styles.emptyText}>
//             No liked books yet
//           </ThemeText>
//           <ThemeText size={14} color={theme.textSecondary} align="center">
//             Like some books and they'll appear here
//           </ThemeText>
//         </View>
//       ) : (
//         <View style={styles.grid}>
//           {books.map((book) => (
//             <View key={book._id} style={[styles.cardContainer, { backgroundColor: theme.surface }]}>
//               <View style={styles.imageContainer}>
//                 <Image
//                   source={{ uri: book?.coverImage?.url }}
//                   style={[styles.bookImage, { backgroundColor: theme.surface }]}
//                 />
//                 <TouchableOpacity
//                   style={[styles.likeButton, { backgroundColor: theme.background }]}
//                   //   onPress={() => handleLike(book._id)}
//                 >
//                   <AntDesign
//                     name="heart"
//                     size={22}
//                     color={theme.error} // Red heart for liked books
//                   />
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.textContainer}>
//                 <ThemeText
//                   size={16}
//                   font={Fonts.PoppinsSemiBold}
//                   style={styles.bookTitle}
//                   numberOfLines={1}
//                 >
//                   {book.name}
//                 </ThemeText>
//                 <ThemeText size={14} color={theme.textSecondary} style={styles.bookAuthor}>
//                   by {book.author}
//                 </ThemeText>
//                 <ThemeText
//                   size={13}
//                   color={theme.textSecondary}
//                   numberOfLines={2}
//                   style={styles.bookDescription}
//                 >
//                   {book.description}
//                 </ThemeText>

//                 <View style={styles.footer}>
//                   <TouchableOpacity
//                     style={[styles.actionButton, { backgroundColor: theme.primary }]}
//                     onPress={() => console.log('View book')}
//                   >
//                     <ThemeText size={12} color={theme.textPrimary}>
//                       Read Now
//                     </ThemeText>
//                   </TouchableOpacity>

//                   <View style={styles.dateContainer}>
//                     <MaterialIcons name="calendar-today" size={14} color={theme.textSecondary} />
//                     <ThemeText size={12} color={theme.textSecondary}>
//                       {new Date(book.createdAt).toLocaleDateString()}
//                     </ThemeText>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           ))}
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scrollContent: {
//     padding: 16,
//     paddingBottom: 32,
//   },
//   header: {
//     marginBottom: 24,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 40,
//     gap: 16,
//   },
//   emptyText: {
//     marginTop: 8,
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     gap: 16,
//   },
//   cardContainer: {
//     width: '100%',
//     borderRadius: 12,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   imageContainer: {
//     position: 'relative',
//   },
//   bookImage: {
//     width: '100%',
//     height: 180,
//   },
//   likeButton: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   textContainer: {
//     padding: 16,
//     gap: 8,
//   },
//   bookTitle: {
//     lineHeight: 22,
//   },
//   bookAuthor: {
//     lineHeight: 20,
//   },
//   bookDescription: {
//     lineHeight: 18,
//     marginTop: 4,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   actionButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
// });

// export default LikedScreen;

// import { View } from 'react-native';
// import React from 'react';
// import LikedScreen from '@/screens/LikedScreen';

// const LikedBooks = () => {
//   return (
//     <View style={{ flex: 1 }}>
//       <LikedScreen />
//     </View>
//   );
// };

// export default LikedBooks;
