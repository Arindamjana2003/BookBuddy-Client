import React from 'react';
import { StyleSheet, View, ScrollView, Pressable, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

import ThemeText from '@/components/global/TheamText';
import { Colors } from '@/constants/Colors';
import { TimeDescriptor } from '@/utils/TimeDescriptor';

export default function DiaryScreen() {
  const theme = Colors[useColorScheme() ?? 'light'];
  const router = useRouter();

  const greeting = TimeDescriptor();

  const diaryEntries = [
    { title: 'Morning Walk', description: 'Walked 3km and saw a beautiful sunrise.' },
    { title: 'Work Meeting', description: 'Productive team meeting about next sprint.' },
    { title: 'Lunch Break', description: 'Had pasta and relaxed a bit.' },
    { title: 'Coding Time', description: 'Worked on my React Native project.' },
    { title: 'Evening Thoughts', description: 'Feeling good about the day.' },
    { title: 'Sleep Prep', description: 'Wrote my journal and read a book.' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <ThemeText style={[styles.greetingText, { color: theme.textPrimary }]}>
          {greeting}, Sumana
        </ThemeText>

        <Pressable
          onPress={() => {
            router.push('/dairynote');
          }}
        >
          <AntDesign name="pluscircle" size={50} color={theme.textPrimary} />
        </Pressable>
      </View>

      <ScrollView style={styles.entriesContainer}>
        {diaryEntries.map((entry, index) => (
          <View key={index} style={[styles.entryBox, { backgroundColor: theme.background }]}>
            <ThemeText style={[styles.entryTitle, { color: theme.textPrimary }]}>
              {entry.title}
            </ThemeText>
            <ThemeText style={[styles.entryDescription, { color: theme.textPrimary }]}>
              {entry.description}
            </ThemeText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '700',
  },
  entriesContainer: {
    flex: 1,
  },
  entryBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  entryTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  entryDescription: {
    fontSize: 14,
  },
});
