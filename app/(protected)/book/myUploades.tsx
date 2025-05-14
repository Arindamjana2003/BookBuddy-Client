import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import ThemeText from '@/components/global/TheamText';
import useBookStore from '@/store/useBookStore';
import { Book } from '@/types/books';
import { apiClient } from '@/api/axios.config';
import { Fonts } from '@/constants/Fonts';

const MyUploads = () => {
  const theme = Colors[useColorScheme() ?? 'light'];
  const { top, bottom } = useSafeAreaInsets();
  const { myUploadedBooks, fetchAllBooks } = useBookStore();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setRefreshing(true);
      await fetchAllBooks();
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async (bookId: string) => {
    try {
      setDeletingId(bookId);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await apiClient.delete(`/book/${bookId}`);
      await fetchAllBooks();
    } catch (err) {
      console.error('Failed to delete book:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const renderItem = ({ item, index }: { item: Book; index: number }) => (
    <Animated.View
      entering={FadeIn.delay(index * 100)}
      style={[styles.bookCard, { backgroundColor: theme.surface }]}
    >
      <Pressable
        onPress={() => router.push(`/(protected)/book/book-details?bookId=${item._id}`)}
        style={styles.bookContent}
      >
        <Image
          source={{ uri: item?.coverImage?.url || 'https://via.placeholder.com/150' }}
          style={styles.coverImage}
        />
        <View style={styles.bookInfo}>
          <ThemeText font={Fonts.PoppinsSemiBold} size={16} numberOfLines={1}>
            {item.name}
          </ThemeText>
          <ThemeText size={14} color={theme.textSecondary} numberOfLines={1}>
            by {item.author}
          </ThemeText>
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <MaterialIcons name="calendar-today" size={14} color={theme.textSecondary} />
              <ThemeText size={12} color={theme.textSecondary} style={styles.metaText}>
                {new Date(item.createdAt).toLocaleDateString()}
              </ThemeText>
            </View>
            {/* <View style={styles.metaItem}>
              <Ionicons name="eye-outline" size={14} color={theme.textSecondary} />
              <ThemeText size={12} color={theme.textSecondary} style={styles.metaText}>
                {item?.views || 0} views
              </ThemeText>
            </View> */}
          </View>
        </View>
      </Pressable>

      <Pressable
        onPress={() => handleDelete(item._id)}
        style={styles.deleteButton}
        disabled={deletingId === item._id}
      >
        {deletingId === item._id ? (
          <ActivityIndicator size="small" color={theme.error} />
        ) : (
          <Ionicons name="trash-outline" size={20} color={theme.error} />
        )}
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { paddingTop: top, backgroundColor: theme.background }]}>
      <Animated.View entering={SlideInRight.duration(500)} style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.textPrimary} />
        </Pressable>
        <ThemeText font={Fonts.PoppinsBold} size={24}>
          My Uploads
        </ThemeText>
        <View style={styles.headerRight} />
      </Animated.View>

      <FlatList
        data={myUploadedBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={[styles.listContent, { paddingBottom: bottom + 20 }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadBooks} tintColor={theme.primary} />
        }
        ListEmptyComponent={
          <Animated.View entering={FadeInDown.duration(500)} style={styles.emptyContainer}>
            <Ionicons name="cloud-upload-outline" size={60} color={theme.textSecondary} />
            <ThemeText size={18} color={theme.textSecondary} style={styles.emptyText}>
              No books uploaded yet
            </ThemeText>
            <ThemeText size={14} color={theme.textSecondary} align="center">
              Upload your first book to get started
            </ThemeText>
          </Animated.View>
        }
        showsVerticalScrollIndicator={false}
      />

      <Animated.View
        entering={FadeIn.delay(500)}
        style={[styles.fab, { backgroundColor: theme.primary, bottom: bottom + 20 }]}
      >
        <Pressable onPress={() => router.push('/(protected)/book/upload')} style={styles.fabButton}>
          <Ionicons name="add" size={28} color="white" />
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerRight: {
    width: 40,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bookContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  bookInfo: {
    flex: 1,
    marginLeft: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 4,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 100,
  },
  emptyText: {
    marginTop: 16,
    marginBottom: 8,
  },
  fab: {
    position: 'absolute',
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyUploads;
