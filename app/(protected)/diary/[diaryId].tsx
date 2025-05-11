import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { Alert } from 'react-native';
import { useColorScheme } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { DiaryNote } from '@/types/diary';
import { Fonts } from '@/constants/Fonts';
import { Colors } from '@/constants/Colors';
import { useDiaryStore } from '@/store/useDiaryStore';
import ThemeText from '@/components/global/TheamText';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const DiaryId = () => {
  const { diaryId } = useLocalSearchParams();
  const [diaryDetails, setDiaryDetails] = useState<DiaryNote | null>(null);
  const [loading, setLoading] = useState(true);
  const { fetchDiaryDetails, deleteDiary } = useDiaryStore();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        setLoading(true);
        const result = await fetchDiaryDetails(diaryId as string);
        setDiaryDetails(result);
      } catch (error) {
        console.error('Error fetching diary details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, [diaryId]);

  const handleDelete = () => {
    Alert.alert('Delete Diary', 'Are you sure you want to delete this diary entry?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDiary(diaryId as string);
            router.back();
          } catch (error) {
            console.error('Error deleting diary:', error);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Loading diary...</Text>
      </View>
    );
  }

  if (!diaryDetails) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.error }]}>No diary found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Modern Header */}
      <View
        style={[
          styles.headerContainer,
          { paddingTop: top + 15, backgroundColor: theme.background },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={24} color={theme.textPrimary} />
        </TouchableOpacity>

        <ThemeText size={20} font={Fonts.PoppinsSemiBold} color={theme.textPrimary}>
          Diary Details
        </ThemeText>

        <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
          <Ionicons name="trash-bin-outline" size={22} color={theme.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={[styles.contentContainer, { backgroundColor: theme.background }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: theme.textPrimary }]}>{diaryDetails.title}</Text>
        <View style={styles.dateMoodContainer}>
          <View style={styles.dateContainer}>
            <AntDesign name="calendar" size={16} color={theme.textSecondary} />
            <Text style={[styles.date, { color: theme.textSecondary }]}>
              {format(new Date(diaryDetails.date), 'MMMM do, yyyy')}
            </Text>
          </View>
          <View style={[styles.moodContainer, { backgroundColor: theme.surface }]}>
            <AntDesign name="smileo" size={16} color={theme.primary} />
            <Text style={[styles.mood, { color: theme.primary }]}>{diaryDetails.mood}</Text>
          </View>
        </View>

        <View style={[styles.messageContainer, { backgroundColor: theme.surface }]}>
          <Text style={[styles.message, { color: theme.textPrimary }]}>
            {diaryDetails?.message}
          </Text>
        </View>

        {diaryDetails.tags?.length > 0 && (
          <View style={styles.tagsContainer}>
            <Text style={[styles.tagsTitle, { color: theme.textSecondary }]}>Tags:</Text>
            <View style={styles.tagsList}>
              {diaryDetails.tags.map((tag, index) => (
                <View key={index} style={[styles.tag, { backgroundColor: theme.surface }]}>
                  <Text style={[styles.tagText, { color: theme.primary }]}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DiaryId;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  iconButton: {
    padding: 8,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: Fonts.PoppinsBold,
  },
  dateMoodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  date: {
    fontSize: 14,
    fontFamily: Fonts.PoppinsRegular,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  mood: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Fonts.PoppinsMedium,
  },
  messageContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.PoppinsRegular,
  },
  tagsContainer: {
    marginBottom: 16,
  },
  tagsTitle: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: Fonts.PoppinsRegular,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Fonts.PoppinsMedium,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: Fonts.PoppinsRegular,
  },
  errorText: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsMedium,
  },
});
