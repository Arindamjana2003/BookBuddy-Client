import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Pressable, useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import ThemeText from '@/components/global/TheamText';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { Fonts } from '@/constants/Fonts';

const moodOptions = [
  { label: '😊 Happy', value: 'happy' },
  { label: '😢 Sad', value: 'sad' },
  { label: '😠 Angry', value: 'angry' },
  { label: '🧠 Productive', value: 'productive' },
  { label: '😌 Content', value: 'content' },
  { label: '🎯 Focused', value: 'focused' },
  { label: '💭 Reflective', value: 'reflective' },
  { label: '☮️ Peaceful', value: 'peaceful' },
];

const tagOptions = [
  'Work',
  'Personal',
  'Health',
  'Family',
  'Friends',
  'Exercise',
  'Food',
  'Travel',
];

export default function DiaryNote() {
  const theme = Colors[useColorScheme() ?? 'light'];
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { top } = useSafeAreaInsets();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSave = () => {
    // Implement save logic here
    console.log({
      title,
      entry,
      mood: selectedMood,
      tags: selectedTags,
      date,
    });
  };

  return (
    <View style={[GlobalStyle.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { paddingTop: top + 15 }]}>
        <ThemeText size={24} font={Fonts.PoppinsSemiBold}>
          Create new Diary
        </ThemeText>
        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [
            styles.saveButton,
            {
              backgroundColor: pressed ? theme.primaryVariant : theme.surface,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <MaterialIcons name="save" size={24} color={theme.primary} />
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title Input */}
        <TextInput
          style={[styles.titleInput, { color: theme.textPrimary }]}
          placeholder="Write your title here..."
          placeholderTextColor={theme.textSecondary}
          value={title}
          onChangeText={setTitle}
        />

        {/* Metadata Section */}
        <View style={styles.metadataContainer}>
          {/* Mood Picker */}
          <View style={styles.pickerContainer}>
            <MaterialIcons
              name="mood"
              size={20}
              color={theme.textSecondary}
              style={styles.pickerIcon}
            />
            <Picker
              selectedValue={selectedMood}
              onValueChange={setSelectedMood}
              style={[styles.picker, { color: theme.textPrimary }]}
              dropdownIconColor={theme.textSecondary}
              mode="dropdown"
            >
              <Picker.Item label="Select Mood..." value="" />
              {moodOptions.map((mood) => (
                <Picker.Item key={mood.value} label={mood.label} value={mood.value} />
              ))}
            </Picker>
          </View>

          {/* Date Picker */}
          <Pressable style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
            <AntDesign
              name="calendar"
              size={20}
              color={theme.textSecondary}
              style={styles.dateIcon}
            />
            <ThemeText style={{ color: theme.textPrimary }}>{date.toLocaleDateString()}</ThemeText>
          </Pressable>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}

        {/* Tags Section */}
        <View style={styles.tagsContainer}>
          <ThemeText style={[styles.sectionTitle, { color: theme.textPrimary }]}>Tags</ThemeText>
          <View style={styles.tagsList}>
            {tagOptions.map((tag) => (
              <Pressable
                key={tag}
                onPress={() => toggleTag(tag)}
                style={[
                  styles.tag,
                  {
                    backgroundColor: selectedTags.includes(tag) ? theme.primary : theme.surface,
                    borderColor: theme.gray,
                  },
                ]}
              >
                <ThemeText
                  style={[
                    styles.tagText,
                    {
                      color: selectedTags.includes(tag) ? theme.primary : theme.textPrimary,
                    },
                  ]}
                >
                  {tag}
                </ThemeText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Entry Input */}
        <View style={[styles.entryContainer, { backgroundColor: theme.background }]}>
          <TextInput
            style={[styles.entryInput, { color: theme.textPrimary }]}
            placeholder="Start writing here..."
            placeholderTextColor={theme.textSecondary}
            value={entry}
            onChangeText={setEntry}
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  saveButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  metadataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  pickerIcon: {
    marginRight: 8,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
  },
  dateIcon: {
    marginRight: 8,
  },
  tagsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
  },
  entryContainer: {
    flex: 1,
    minHeight: 200,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  entryInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
});
