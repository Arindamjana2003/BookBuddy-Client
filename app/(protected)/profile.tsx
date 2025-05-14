import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Pressable,
  useColorScheme,
  RefreshControl,
  FlatList,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';
import Animated, { FadeIn, FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import useBookStore from '@/store/useBookStore';
import { apiClient } from '@/api/axios.config';
import ThemeText from '@/components/global/TheamText';
import ProfileHeader from '@/components/ui/headers/ProfileHeader';
import BookCard from '@/components/book/BookCard';
import { Fonts } from '@/constants/Fonts';

const Profile = () => {
  const theme = Colors[useColorScheme() ?? 'light'];
  const { top, bottom } = useSafeAreaInsets();
  const { user, logout } = useAuthStore();
  const { myUploadedBooks, fetchAllBooks } = useBookStore();
  const [loading, setLoading] = useState(false);

  const handleAction = (action: () => void) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    action();
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleDelete = async (bookId: string, e: any) => {
    e.stopPropagation();
    try {
      setLoading(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await apiClient.delete(`/book/${bookId}`);
      await fetchAllBooks();
    } catch (err) {
      console.error('Failed to delete book:', err);
    } finally {
      setLoading(false);
    }
  };

  const ActionButton = ({
    icon,
    text,
    onPress,
    color,
  }: {
    icon: string;
    text: string;
    onPress: () => void;
    color: string;
  }) => (
    <Pressable
      style={({ pressed }) => [
        styles.actionButton,
        {
          backgroundColor: pressed ? theme.primary : theme.primaryVariant,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon as any} size={20} color={color} />
      <ThemeText style={[styles.actionButtonText, { color }]}>{text}</ThemeText>
    </Pressable>
  );

  return (
    <ImageBackground
      source={{
        uri: 'https://c4.wallpaperflare.com/wallpaper/723/135/752/patterns-lines-pale-light-wallpaper-preview.jpg',
      }}
      style={[styles.container, { paddingTop: top }]}
      blurRadius={10}
      resizeMode="cover"
      imageStyle={{ opacity: 0.7 }}
    >
      <Animated.View
        style={[styles.overlay, { backgroundColor: theme.background + '90' }]}
        entering={FadeIn.duration(500)}
      />

      <View style={styles.scrollContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 + bottom }}
        >
          <ProfileHeader user={user} theme={theme} />

          <Animated.View style={styles.actions} entering={FadeInUp.delay(500).duration(800)}>
            <Animated.View style={{ flex: 1 }} entering={SlideInRight.delay(600).springify()}>
              <ActionButton
                icon="pencil-outline"
                text="Edit Profile"
                onPress={() => handleAction(() => router.push('/(protected)/edit-profile'))}
                color="white"
              />
            </Animated.View>

            <Animated.View style={{ flex: 1 }} entering={SlideInRight.delay(700).springify()}>
              <ActionButton
                icon="cloud-upload-outline"
                text="Upload Book"
                onPress={() => handleAction(() => router.push('/(protected)/book/upload'))}
                color={theme.background}
              />
            </Animated.View>
          </Animated.View>

          <Animated.View
            style={[styles.section, { marginTop: 30 }]}
            entering={FadeInDown.delay(800).duration(800)}
          >
            <View style={styles.sectionHeader}>
              <ThemeText size={22} font={Fonts.PoppinsSemiBold}>
                Your Uploads
              </ThemeText>
              <Pressable
                onPress={() => handleAction(() => router.push('/(protected)/book/myUploades'))}
              >
                <ThemeText
                  size={16}
                  color={theme.primary}
                  style={{ textDecorationLine: 'underline' }}
                >
                  See all
                </ThemeText>
              </Pressable>
            </View>

            <FlatList
              data={myUploadedBooks.slice(0, 2)}
              renderItem={({ item }) => (
                <BookCard item={item} theme={theme} onDelete={handleDelete} />
              )}
              keyExtractor={(item) => item._id}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={fetchAllBooks}
                  tintColor={theme.primary}
                />
              }
              contentContainerStyle={myUploadedBooks.length ? styles.list : styles.emptyList}
              ListEmptyComponent={
                <View style={styles.empty}>
                  <Ionicons name="cloud-upload-outline" size={60} color={theme.gray} />
                  <ThemeText size={18} color={theme.gray}>
                    No uploaded books yet
                  </ThemeText>
                  <ThemeText size={14} color={theme.gray} align="center">
                    Upload a book first
                  </ThemeText>
                </View>
              }
              scrollEnabled={false}
            />
          </Animated.View>
        </ScrollView>

        <Animated.View
          style={[
            styles.fixedLogoutButton,
            {
              backgroundColor: theme.error,
              bottom: bottom + 20,
            },
          ]}
          entering={FadeInDown.delay(1200).duration(800)}
        >
          <Pressable
            style={({ pressed }) => [
              styles.logoutButton,
              {
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
            onPress={() => handleAction(logout)}
          >
            <Ionicons name="exit-outline" size={24} color="white" />
            <ThemeText style={styles.logoutText}>Logout</ThemeText>
          </Pressable>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    gap: 16,
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fixedLogoutButton: {
    position: 'absolute',
    left: 24,
    right: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 12,
  },
  logoutText: {
    color: 'white',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
    paddingTop: 10,
    gap: 14,
  },
  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 130,
  },
  empty: {
    alignItems: 'center',
    gap: 12,
  },
});

export default Profile;

// import {
//   StyleSheet,
//   View,
//   ImageBackground,
//   Pressable,
//   useColorScheme,
//   TouchableOpacity,
//   Image,
//   RefreshControl,
//   FlatList,
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import ThemeText from '@/components/global/TheamText';
// import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
// import { Fonts } from '@/constants/Fonts';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useAuthStore } from '@/store/useAuthStore';
// import Animated, { FadeIn, FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated';
// import { router } from 'expo-router';
// import * as Haptics from 'expo-haptics';
// import { Colors } from '@/constants/Colors';
// import useBookStore from '@/store/useBookStore';
// import { Book } from '@/types/books';
// import { apiClient } from '@/api/axios.config';

// const Profile = () => {
//   const theme = Colors[useColorScheme() ?? 'light'];
//   const { top, bottom } = useSafeAreaInsets();
//   const { user, logout } = useAuthStore();
//   const { myUploadedBooks, fetchAllBooks } = useBookStore();

//   const [loading, setLoading] = useState(false);

//   const handleAction = (action: () => void) => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     action();
//   };

//   useEffect(() => {
//     fetchAllBooks();
//   }, []);

//   const handleDelete = async (bookId: string, e: any) => {
//     e.stopPropagation();
//     try {
//       setLoading(true);
//       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//       await apiClient.delete(`/book/${bookId}`);
//       fetchAllBooks();
//     } catch (err) {
//       console.error('Failed to like book:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }: { item: Book }) => (
//     <View style={[styles.card, { backgroundColor: theme.surface }]}>
//       <Image
//         source={{ uri: item?.coverImage?.url || 'https://via.placeholder.com/150' }}
//         style={styles.cover}
//       />
//       <View style={styles.cardContent}>
//         <ThemeText font={Fonts.PoppinsMedium} size={15} numberOfLines={1}>
//           {item.name}
//         </ThemeText>
//         <ThemeText size={13} color={theme.textSecondary} numberOfLines={1}>
//           by {item.author}
//         </ThemeText>
//         <ThemeText size={12} color={theme.textSecondary} numberOfLines={2}>
//           {item.description}
//         </ThemeText>
//       </View>

//       <TouchableOpacity style={styles.heartIcon} onPress={(e) => handleDelete(item._id, e)}>
//         <Ionicons name="trash-bin-outline" size={18} color={theme.error} />
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <ImageBackground
//       source={{
//         uri: 'https://c4.wallpaperflare.com/wallpaper/723/135/752/patterns-lines-pale-light-wallpaper-preview.jpg',
//       }}
//       style={[styles.container, { paddingTop: top }]}
//       blurRadius={10}
//       resizeMode="cover"
//       imageStyle={{ opacity: 0.7 }}
//     >
//       <Animated.View
//         style={[styles.overlay, { backgroundColor: theme.background + '90' }]}
//         entering={FadeIn.duration(500)}
//       />

//       <View style={styles.scrollContainer}>
//         <View
//         // showsVerticalScrollIndicator={false}
//         // contentContainerStyle={{ paddingBottom: 80 + bottom }} // Space for fixed button
//         >
//           <Animated.View style={styles.profileHeader} entering={FadeInUp.delay(200).duration(800)}>
//             <Animated.View
//               style={[styles.avatarContainer, { shadowColor: theme.primary }]}
//               sharedTransitionTag="profile-photo"
//             >
//               <Animated.Image
//                 source={{ uri: user?.profile_pic?.url || 'https://example.com/default-avatar.jpg' }}
//                 style={styles.avatar}
//                 sharedTransitionTag="profile-photo"
//               />
//               <Animated.View
//                 style={[styles.verifiedBadge, { backgroundColor: theme.primary }]}
//                 entering={FadeIn.delay(400)}
//               >
//                 <Ionicons name="checkmark" size={16} color="white" />
//               </Animated.View>
//             </Animated.View>

//             <Animated.View entering={FadeInUp.delay(300).duration(800)}>
//               <ThemeText size={28} font={Fonts.PoppinsSemiBold} style={styles.name}>
//                 {user?.name}
//               </ThemeText>
//               <ThemeText
//                 size={16}
//                 font={Fonts.PoppinsRegular}
//                 style={[styles.bio, { color: theme.textSecondary }]}
//               >
//                 {user?.bio || 'A book is a gift you can open again and again'}
//               </ThemeText>
//             </Animated.View>
//           </Animated.View>

//           <Animated.View style={styles.actions} entering={FadeInUp.delay(500).duration(800)}>
//             <Animated.View style={{ flex: 1 }} entering={SlideInRight.delay(600).springify()}>
//               <Pressable
//                 style={({ pressed }) => [
//                   styles.actionButton,
//                   {
//                     backgroundColor: pressed ? theme.primary : theme.primaryVariant,
//                     transform: [{ scale: pressed ? 0.95 : 1 }],
//                   },
//                 ]}
//                 onPress={() => handleAction(() => router.push('/(protected)/edit-profile'))}
//               >
//                 <Ionicons name="pencil-outline" size={20} color="white" />
//                 <ThemeText style={styles.actionButtonText}>Edit Profile</ThemeText>
//               </Pressable>
//             </Animated.View>

//             <Animated.View style={{ flex: 1 }} entering={SlideInRight.delay(700).springify()}>
//               <Pressable
//                 style={({ pressed }) => [
//                   styles.actionButton,
//                   {
//                     backgroundColor: pressed ? theme.primary : theme.primaryVariant,
//                     transform: [{ scale: pressed ? 0.95 : 1 }],
//                   },
//                 ]}
//                 onPress={() => handleAction(() => router.push('/(protected)/book/upload'))}
//               >
//                 <Ionicons name="cloud-upload-outline" size={20} color={theme.background} />
//                 <ThemeText style={[styles.actionButtonText]} color={theme.textPrimary}>
//                   Upload Book
//                 </ThemeText>
//               </Pressable>
//             </Animated.View>
//           </Animated.View>

//           <Animated.View
//             style={[styles.section, { marginTop: 30 }]}
//             entering={FadeInDown.delay(800).duration(800)}
//           >
//             <View style={styles.sectionHeader}>
//               <ThemeText size={22} font={Fonts.PoppinsBold}>
//                 Your Uploads
//               </ThemeText>
//               <Pressable
//                 onPress={() => handleAction(() => router.push('/(protected)/book/myUploades'))}
//               >
//                 <ThemeText
//                   size={16}
//                   color={theme.primary}
//                   style={{ textDecorationLine: 'underline' }}
//                 >
//                   See all
//                 </ThemeText>
//               </Pressable>
//             </View>

//             {/* <View style={styles.uploadsGrid}> */}
//             <FlatList
//               data={myUploadedBooks.splice(0, 2)}
//               renderItem={renderItem}
//               keyExtractor={(item) => item._id}
//               refreshControl={
//                 <RefreshControl
//                   refreshing={loading}
//                   onRefresh={fetchAllBooks}
//                   tintColor={theme.primary}
//                 />
//               }
//               contentContainerStyle={myUploadedBooks.length ? styles.list : styles.emptyList}
//               ListEmptyComponent={
//                 <View style={styles.empty}>
//                   {/* <DontHaveAnyLikedBooks /> */}
//                   <Ionicons name="heart-outline" size={60} color={theme.gray} />
//                   <ThemeText size={18} color={theme.gray}>
//                     No upload books yet
//                   </ThemeText>
//                   <ThemeText size={14} color={theme.gray} align="center">
//                     Upload a book first
//                   </ThemeText>
//                 </View>
//               }
//               showsVerticalScrollIndicator={false}
//             />
//             {/* </View> */}
//           </Animated.View>
//         </View>

//         {/* Fixed Logout Button */}
//         <Animated.View
//           style={[
//             styles.fixedLogoutButton,
//             {
//               backgroundColor: theme.error,
//               bottom: bottom + 20,
//             },
//           ]}
//           entering={FadeInDown.delay(1200).duration(800)}
//         >
//           <Pressable
//             style={({ pressed }) => [
//               styles.logoutButton,
//               {
//                 transform: [{ scale: pressed ? 0.98 : 1 }],
//               },
//             ]}
//             onPress={() => handleAction(logout)}
//           >
//             <Ionicons name="exit-outline" size={24} color="white" />
//             <ThemeText style={styles.logoutText}>Logout</ThemeText>
//           </Pressable>
//         </Animated.View>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flex: 1,
//     position: 'relative',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   profileHeader: {
//     alignItems: 'center',
//     padding: 24,
//     paddingBottom: 5,
//   },
//   avatarContainer: {
//     position: 'relative',
//     marginBottom: 0,
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.2,
//     shadowRadius: 20,
//     elevation: 10,
//   },
//   avatar: {
//     height: 150,
//     width: 150,
//     borderRadius: 75,
//     borderWidth: 4,
//     borderColor: 'white',
//   },
//   verifiedBadge: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   name: {
//     marginTop: 16,
//     textAlign: 'center',
//   },
//   bio: {
//     marginTop: 8,
//     textAlign: 'center',
//     maxWidth: '80%',
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 24,
//     gap: 16,
//     marginTop: 16,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderRadius: 12,
//     gap: 8,
//   },
//   actionButtonText: {
//     fontFamily: Fonts.PoppinsSemiBold,
//     fontSize: 16,
//   },
//   section: {
//     paddingHorizontal: 24,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     // marginBottom: 16,
//   },
//   uploadsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     gap: 12,
//   },
//   bookItem: {
//     width: '48%',
//     aspectRatio: 0.7,
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   fixedLogoutButton: {
//     position: 'absolute',
//     left: 24,
//     right: 24,
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//     gap: 12,
//   },
//   logoutText: {
//     color: 'white',
//     fontFamily: Fonts.PoppinsSemiBold,
//     fontSize: 16,
//   },
//   card: {
//     flex: 1,
//     flexDirection: 'row',
//     borderRadius: 12,
//     overflow: 'hidden',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     padding: 10,
//     marginBottom: 10,
//   },
//   cover: {
//     width: 80,
//     height: 110,
//     borderRadius: 8,
//     backgroundColor: '#eee',
//   },
//   cardContent: {
//     flex: 1,
//     marginLeft: 12,
//     justifyContent: 'space-between',
//   },
//   cardFooter: {
//     marginTop: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   readButton: {
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   footerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
//   heartIcon: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 6,
//     elevation: 3,
//   },
//   list: {
//     // paddingHorizontal: 16,
//     paddingBottom: 20,
//     paddingTop: 10,
//     gap: 14,
//   },
//   emptyList: {
//     // flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 32,
//     marginTop: 130,
//   },
//   empty: {
//     alignItems: 'center',
//     gap: 12,
//   },
// });

// export default Profile;
