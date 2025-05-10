import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  useColorScheme,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import ThemeText from '@/components/global/TheamText';
import { Fonts } from '@/constants/Fonts';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { apiClient } from '@/api/axios.config';
import { useBlogStore } from '@/store/useBlogStore';
import { Ionicons } from '@expo/vector-icons';

const CreateBlog = () => {
  const themeMode = useColorScheme();
  const theme = Colors[themeMode ?? 'light'];
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  const handleCreateBlog = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Missing Fields', 'Please fill all the fields');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('description', description);

      if (image) {
        const fileName = image.split('/').pop() || `image_${Date.now()}.jpg`;
        const fileType = fileName.split('.').pop();

        formData.append('file', {
          uri: image,
          name: fileName,
          type: `image/${fileType}`,
        } as any); // `as any` to satisfy TypeScript
      }

      const response = await apiClient.post('/blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response?.success) {
        Alert.alert('Success', 'Blog Created Successfully!');
        useBlogStore.getState().fetchBlogs();
        router.back();
      } else {
        Alert.alert('Error', 'Failed to create blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background, paddingTop: top + 15 }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          gap: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            padding: 10,
          }}
        >
          <ThemeText size={24} font={Fonts.PoppinsSemiBold} color={theme.textPrimary}>
            <Ionicons name="chevron-back" size={24} color={theme.textPrimary} />
          </ThemeText>
        </TouchableOpacity>
        <ThemeText
          size={26}
          font={Fonts.PoppinsSemiBold}
          color={theme.textPrimary}
          style={styles.heading}
        >
          Create a New Blog
        </ThemeText>
      </View>

      {/* Title Input */}
      <View style={[styles.inputContainer, { backgroundColor: theme.surface }]}>
        <TextInput
          placeholder="Blog Title"
          value={title}
          onChangeText={setTitle}
          style={[styles.input, { color: theme.textPrimary }]}
          placeholderTextColor={theme.gray}
        />
      </View>

      {/* Description Input */}
      <View style={[styles.inputContainer, { backgroundColor: theme.surface, minHeight: 120 }]}>
        <TextInput
          placeholder="Write something amazing..."
          value={description}
          onChangeText={setDescription}
          multiline
          style={[styles.textarea, { color: theme.textPrimary }]}
          placeholderTextColor={theme.gray}
        />
      </View>

      {/* Image Picker */}
      <TouchableOpacity
        style={[styles.imagePicker, { backgroundColor: theme.surface, borderColor: theme.primary }]}
        onPress={pickImage}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <ThemeText size={16} font={Fonts.PoppinsMedium} color={theme.primary}>
            📷{`\n`} Tap to Pick an Image
          </ThemeText>
        )}
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: loading ? theme.gray : theme.primary }]}
        onPress={handleCreateBlog}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemeText size={18} font={Fonts.PoppinsSemiBold} color="#fff">
            🚀 Post Blog
          </ThemeText>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateBlog;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 40,
  },
  heading: {
    textAlign: 'center',
    // marginBottom: 25,
  },
  inputContainer: {
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginBottom: 20,
    elevation: 2,
  },
  input: {
    fontSize: 17,
    fontFamily: Fonts.PoppinsMedium,
  },
  textarea: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsMedium,
    textAlignVertical: 'top',
  },
  imagePicker: {
    height: 200,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
});
