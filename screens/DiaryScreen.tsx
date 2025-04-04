import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import React from 'react';
import { GlobalStyle } from '@/styles/GlobalStyle';
import ThemeText from '@/components/global/TheamText';
import { FlatList, Pressable } from 'react-native-gesture-handler';
import { dvw } from '@/constants/Dimension';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

export default function DiaryScreen() {
  const theme = Colors[useColorScheme() ?? 'light'];
  const diaryContents = [
    {
      id: '1',
      name: 'Feb Books',
      content: 'Content of Diary lorem dhashdkad hdkashdkasydh hkhdkasdhahd  hkahdk',
      createdAt: '',
      UpdatedAt: '',
    },
    {
      id: '2',
      name: 'Feb Books',
      content: 'Content of Diary',
      createdAt: '',
      UpdatedAt: '',
    },
    {
      id: '3',
      name: 'Feb Books',
      content: 'Content of Diary',
      createdAt: '',
      UpdatedAt: '',
    },
    {
      id: '4',
      name: 'Feb Books',
      content: 'Content of Diary',
      createdAt: '',
      UpdatedAt: '',
    },
    {
      id: '5',
      name: 'Feb Books',
      content: 'Content of Diary',
      createdAt: '',
      UpdatedAt: '',
    },
  ];
  return (
    <View style={[{ gap: 5 }]}>
      <ThemeText size={20} font={Fonts.PoppinsMedium}>
        Fevourite Diaries
      </ThemeText>
      <FlatList
        style={{ gap: 15 }}
        data={diaryContents}
        renderItem={({ item }) => (
          <View
            style={[styles.diary, { backgroundColor: theme.surface, borderColor: theme.primary }]}
          >
            <ThemeText size={20} font={Fonts.PoppinsMedium}>
              {item.name}
            </ThemeText>
            <ThemeText size={12} numberOfLines={2}>
              {item.content}
            </ThemeText>
          </View>
        )}
        keyExtractor={(data) => data.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <ThemeText size={18} font={Fonts.PoppinsMedium}>
          All Diaries
        </ThemeText>
        <Pressable>
          <ThemeText>Create</ThemeText>
        </Pressable>
      </View>
      <FlatList
        data={diaryContents}
        renderItem={({ item, index }) => (
          <View key={index}>
            <ThemeText>{item.name}</ThemeText>
          </View>
        )}
        numColumns={2}
        keyExtractor={(data) => data.id}
        contentContainerStyle={{
          flex: 1,
          width: '100%',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          gap: 15,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  diary: {
    width: dvw * 0.5,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    marginRight: 10,
    padding: 15,
    elevation: 1,
  },
});
