import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useDiaryStore } from '@/store/useDiaryStore';
import { DiaryNote } from '@/types/diary';

const DiaryId = () => {
  const { diaryId } = useLocalSearchParams();

  const [diaryDetails, setDiaryDetails] = React.useState<DiaryNote | null>(null);
  const [loading, setLoading] = React.useState(true);

  const { fetchDiaryDetails } = useDiaryStore();

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        setLoading(true);
        const diaryDetails = await fetchDiaryDetails(diaryId as string);
        console.log('Diary Details:', diaryDetails);
        setDiaryDetails(diaryDetails);
      } catch (error) {
        console.error('Error fetching diary details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, [diaryId]);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : diaryDetails ? (
        <View>
          <Text>{diaryDetails?.title}</Text>
          <Text>{diaryDetails?.entry}</Text>
        </View>
      ) : (
        <Text>No diary details available</Text>
      )}
    </View>
  );
};

export default DiaryId;

const styles = StyleSheet.create({});
