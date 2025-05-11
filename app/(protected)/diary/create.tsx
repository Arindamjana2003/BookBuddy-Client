import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  useColorScheme,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import ThemeText from '@/components/global/TheamText';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { Fonts } from '@/constants/Fonts';
import { useDiaryStore } from '@/store/useDiaryStore';
import { router } from 'expo-router';
import TabIcon from '@/components/ui/Tabs/TabIcon';

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
  'work',
  'personal',
  'health',
  'family',
  'friends',
  'exercise',
  'food',
  'travel',
];

export default function DiaryNote() {
  const theme = Colors[useColorScheme() ?? 'light'];
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [entryError, setEntryError] = useState('');
  const [moodError, setMoodError] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const { top } = useSafeAreaInsets();
  const { createDiary, loading } = useDiaryStore();

  // Calculate word count whenever entry changes
  useEffect(() => {
    const words = entry.trim() ? entry.trim().split(/\s+/).length : 0;
    setWordCount(words);
  }, [entry]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const validateForm = () => {
    let isValid = true;

    // Title validation
    if (!title.trim()) {
      setTitleError('Title is required');
      isValid = false;
    } else if (title.length < 3) {
      setTitleError('Title must be at least 3 characters');
      isValid = false;
    } else if (title.length > 200) {
      setTitleError('Title cannot exceed 200 characters');
      isValid = false;
    } else {
      setTitleError('');
    }

    // Entry validation
    if (!entry.trim()) {
      setEntryError('Diary entry is required');
      isValid = false;
    } else if (entry.length < 10) {
      setEntryError('Entry must be at least 10 characters');
      isValid = false;
    } else if (entry.length > 100000) {
      setEntryError('Entry cannot exceed 100,000 characters');
      isValid = false;
    } else {
      setEntryError('');
    }

    // Mood validation
    if (!selectedMood) {
      setMoodError('Please select a mood');
      isValid = false;
    } else {
      setMoodError('');
    }

    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await createDiary({
        title,
        message: entry,
        mood: selectedMood,
        tags: selectedTags,
        date,
      });
      router.back();
      Alert.alert('Success', 'Diary entry saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save diary entry. Please try again.');
    }
  };

  return (
    <View style={[GlobalStyle.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { paddingTop: top + 15 }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
          <Ionicons name="chevron-back" size={24} color={theme.textPrimary} />
        </TouchableOpacity>

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
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size={'small'} color={theme.primary} />
          ) : (
            <Ionicons name="checkmark" size={24} color={theme.textPrimary} />
          )}
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title Input */}
        <View>
          <TextInput
            style={[
              styles.titleInput,
              {
                color: theme.textPrimary,
                borderBottomColor: titleError ? theme.error : theme.gray,
              },
            ]}
            placeholder="Write your title here..."
            placeholderTextColor={theme.gray}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (text.length > 200) {
                setTitle(text.substring(0, 200));
              }
            }}
            maxLength={200}
          />
          <View style={styles.counterContainer}>
            {titleError ? (
              <Text style={[styles.errorText, { color: theme.error }]}>{titleError}</Text>
            ) : (
              <Text style={[styles.counterText, { color: theme.textSecondary }]}>
                {title.length}/200
              </Text>
            )}
          </View>
        </View>

        {/* Metadata Section */}
        <View style={styles.metadataContainer}>
          {/* Mood Picker */}
          <View style={styles.pickerContainer}>
            <TabIcon name="smile" size={20} color={theme.textSecondary} style={styles.pickerIcon} />
            <Picker
              selectedValue={selectedMood}
              onValueChange={(value) => {
                setSelectedMood(value);
                setMoodError('');
              }}
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
          {moodError && <Text style={[styles.errorText, { color: theme.error }]}>{moodError}</Text>}

          {/* Date Picker */}
          <Pressable style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
            <TabIcon
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
            style={{ backgroundColor: theme.background }}
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
                    backgroundColor: selectedTags.includes(tag) ? theme.textPrimary : theme.surface,
                    borderColor: theme.gray,
                    borderWidth: StyleSheet.hairlineWidth,
                  },
                ]}
              >
                <ThemeText
                  style={[
                    styles.tagText,
                    {
                      color: selectedTags.includes(tag) ? theme.surface : theme.textPrimary,
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
        <View
          style={[
            styles.entryContainer,
            {
              backgroundColor: theme.background,
              borderColor: entryError ? theme.error : theme.gray,
            },
          ]}
        >
          <TextInput
            style={[styles.entryInput, { color: theme.textPrimary }]}
            placeholder="Start writing here..."
            placeholderTextColor={theme.gray}
            value={entry}
            onChangeText={(text) => {
              if (text.length <= 100000) {
                setEntry(text);
              }
            }}
            multiline
            textAlignVertical="top"
          />
          <View style={styles.entryFooter}>
            {entryError ? (
              <Text style={[styles.errorText, { color: theme.error }]}>{entryError}</Text>
            ) : (
              <Text style={[styles.counterText, { color: theme.textSecondary }]}>
                {wordCount} words • {entry.length}/100,000 characters
              </Text>
            )}
          </View>
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
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    // paddingHorizontal: 16,
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
    marginBottom: 4,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    textTransform: 'capitalize',
  },
  entryContainer: {
    flex: 1,
    minHeight: 300,
    borderRadius: 12,
    padding: 16,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: StyleSheet.hairlineWidth,
  },
  entryInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
    minHeight: 250,
  },
  entryFooter: {
    marginTop: 8,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  counterText: {
    fontSize: 12,
  },
});
