import React from 'react';
import { StyleSheet, View, Pressable, useColorScheme } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import ThemeText from '@/components/global/TheamText';
import { Colors } from '@/constants/Colors';
import { format } from 'date-fns';
import { Fonts } from '@/constants/Fonts';

interface DiaryCardProps {
  entry: {
    _id: string;
    title: string;
    message: string;
    date: Date;
    mood?: string;
    tags?: string[];
  };
  onPress: () => void;
}

const moodIcons: any = {
  happy: 'smileo',
  sad: 'frowno',
  angry: 'frowno',
  productive: 'checkcircleo',
  content: 'meho',
  focused: 'eyeo',
  reflective: 'bulb1',
  peaceful: 'cloud',
};

const DiaryCard: React.FC<DiaryCardProps> = ({ entry, onPress }) => {
  const theme = Colors[useColorScheme() ?? 'light'];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.background,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          opacity: pressed ? 0.9 : 1,
          borderColor: theme.gray,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <ThemeText
          font={Fonts.PoppinsSemiBold}
          size={18}
          style={[styles.title, { color: theme.textPrimary }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {entry.title}
        </ThemeText>
        {entry.mood && (
          <AntDesign
            name={moodIcons[entry.mood] || 'questioncircleo'}
            size={20}
            color={theme.primary}
          />
        )}
      </View>

      <ThemeText style={[styles.description, { color: theme.textPrimary }]} numberOfLines={3}>
        {entry.message}
      </ThemeText>

      <View style={styles.footer}>
        <ThemeText style={[styles.date, { color: theme.primary }]}>
          {format(entry.date, 'h:mm a')} - {format(entry.date, 'dd/MM/yyyy')}
        </ThemeText>

        {entry.tags && entry.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {entry.tags.map((tag, index) => (
              <View key={index} style={[styles.tag, { backgroundColor: theme.surface }]}>
                <ThemeText
                  style={[styles.tagText, { color: theme.primary, textTransform: 'capitalize' }]}
                >
                  {tag}
                </ThemeText>
              </View>
            ))}
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  tag: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default DiaryCard;
