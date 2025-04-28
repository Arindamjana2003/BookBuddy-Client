import React from 'react';
import { StyleSheet, View, Pressable, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';

import ThemeText from '@/components/global/TheamText';
import { Colors } from '@/constants/Colors';
import DiaryCard from '@/components/diary/DiaryCard';
import { GlobalStyle } from '@/styles/GlobalStyle';

const diaryEntries = [
  {
    id: '1',
    title: 'Morning Walk',
    description:
      'Walked 3km along the beach and saw a beautiful sunrise. The waves were calming and the air was fresh.',
    date: new Date('2023-06-15T07:30:00'),
    mood: 'happy',
    tags: ['exercise', 'nature'],
  },
  {
    id: '2',
    title: 'Work Meeting',
    description:
      'Productive team meeting about our upcoming sprint. We discussed the new features and assigned tasks.',
    date: new Date('2023-06-15T10:00:00'),
    mood: 'productive',
    tags: ['work', 'meeting'],
  },
  {
    id: '3',
    title: 'Lunch Break',
    description:
      'Had delicious pasta at the new Italian place downtown. The carbonara was amazing!',
    date: new Date('2023-06-15T13:15:00'),
    mood: 'content',
    tags: ['food', 'break'],
  },
  {
    id: '4',
    title: 'Coding Session',
    description:
      'Worked on my React Native project for 3 hours straight. Implemented the new animation library successfully.',
    date: new Date('2023-06-15T15:00:00'),
    mood: 'focused',
    tags: ['coding', 'project'],
  },
  {
    id: '5',
    title: 'Evening Thoughts',
    description:
      'Reflecting on the day while drinking chamomile tea. Feeling grateful for the small moments of joy.',
    date: new Date('2023-06-15T19:45:00'),
    mood: 'reflective',
    tags: ['thoughts', 'evening'],
  },
  {
    id: '6',
    title: 'Night Routine',
    description:
      'Wrote in my journal, did some light reading, and prepared for tomorrow. Ready for a good night sleep.',
    date: new Date('2023-06-15T22:00:00'),
    mood: 'peaceful',
    tags: ['routine', 'sleep'],
  },
];

export default function DiaryScreen() {
  const theme = Colors[useColorScheme() ?? 'light'];
  const router = useRouter();

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
          data={diaryEntries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DiaryCard entry={item} onPress={() => router.push(`/(protected)/diary/${item.id}`)} />
          )}
          estimatedItemSize={150}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
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
});
