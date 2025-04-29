import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable, useColorScheme, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';

import ThemeText from '@/components/global/TheamText';
import { Colors } from '@/constants/Colors';
import DiaryCard from '@/components/diary/DiaryCard';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { useDiaryStore } from '@/store/useDiaryStore';
import { RefreshControl } from 'react-native-gesture-handler';

export default function DiaryScreen() {
  const theme = Colors[useColorScheme() ?? 'light'];
  const router = useRouter();

  const { loading, diaries } = useDiaryStore();

  useEffect(() => {
    const fetchDiaries = async () => {
      await useDiaryStore.getState().fetchDiaries();
    };
    fetchDiaries();
  }, []);

  return (
    <View style={[GlobalStyle.container, { backgroundColor: theme.background }]}>
      {/* Filter/Sort Controls */}
      <View style={styles.controlsContainer}>
        <Pressable style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={20} color={theme.textSecondary} />
          <ThemeText style={[styles.filterText, { color: theme.textSecondary }]}>Filter</ThemeText>
        </Pressable>

        <Pressable style={styles.sortButton}>
          <AntDesign name="calendar" size={20} color={theme.textSecondary} />
          <ThemeText style={[styles.sortText, { color: theme.textSecondary }]}>Latest</ThemeText>
        </Pressable>
      </View>

      {/* Diary Entries List */}
      <View style={styles.listContainer}>
        <FlashList
          data={diaries}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <DiaryCard entry={item} onPress={() => router.push(`/(protected)/diary/${item._id}`)} />
          )}
          estimatedItemSize={150}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={{ color: theme.textPrimary }}>
                {loading ? 'Loading...' : 'No blogs available'}
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={!!loading}
              onRefresh={() => useDiaryStore.getState().fetchDiaries()}
              tintColor={theme.textPrimary}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  filterText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  sortText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
});
