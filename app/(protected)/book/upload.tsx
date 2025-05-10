import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
  RefreshControl,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import ThemeText from '@/components/global/TheamText';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { apiClient } from '@/api/axios.config';
import { set } from 'date-fns';

interface Category {
  _id: string;
  name: string;
}

const Upload = () => {
  const theme = Colors[useColorScheme() ?? 'light'];
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [categoryLoding, setCategoryLoding] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: null as string | null,
    pdfFile: null as string | null,
  });

  useEffect(() => {
    //   Fetch the categories from the server
    const fetchCategories = async () => {
      try {
        setCategoryLoding(true);
        const { data } = await apiClient.get('/categories');
        if (data) {
          setCategories(data);
          setSelectedCategory(data[0]?._id || '');
        }
      } catch {
        Alert.alert('Error', 'Failed to load categories');
      } finally {
        setCategoryLoding(false);
      }
    };
    fetchCategories();
  }, []);

  const pickCoverImage = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setBookData({ ...bookData, coverImage: result.assets[0].uri });
    }
  };

  const pickPDFFile = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
      setBookData({ ...bookData, pdfFile: result.assets[0].uri });
    }
  };

  const handleUpload = async () => {
    if (!bookData.title || !bookData.pdfFile || !selectedCategory) {
      Alert.alert('Missing Fields', 'Title, PDF, and Category are required.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      //   formData.append('userId', user?._id || '');
      formData.append('category', selectedCategory);
      formData.append('name', bookData.title);
      formData.append('author', bookData.author);
      formData.append('description', bookData.description);

      if (bookData.coverImage) {
        formData.append('coverImage', {
          uri: bookData.coverImage,
          name: 'cover.jpg',
          type: 'image/jpeg',
        } as any);
      }

      formData.append('pdfFile', {
        uri: bookData.pdfFile,
        name: 'book.pdf',
        type: 'application/pdf',
      } as any);

      const response = await apiClient.post('/book', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      } as any);

      console.log(response?.data);

      if (response?.success === true) {
        Alert.alert('Success', 'Book uploaded!');
        setBookData({ title: '', author: '', description: '', coverImage: null, pdfFile: null });
        router.back();
      } else {
        throw new Error(response?.message || 'Failed');
      }
    } catch (err: any) {
      Alert.alert('Upload Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Fixed Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <Pressable onPress={router.back} hitSlop={10}>
          <Ionicons name="arrow-back" size={24} color={theme.textPrimary} />
        </Pressable>
        <ThemeText font={Fonts.PoppinsSemiBold} size={20} style={{ marginLeft: 10 }}>
          Upload Book
        </ThemeText>
      </View>
      {categoryLoding ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.textPrimary} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            onPress={pickCoverImage}
            style={[styles.imageBox, { borderColor: theme.gray }]}
          >
            {bookData.coverImage ? (
              <Image source={{ uri: bookData.coverImage }} style={styles.coverImage} />
            ) : (
              <View style={styles.coverPlaceholder}>
                <MaterialIcons name="add-photo-alternate" size={40} color={theme.textSecondary} />
                <ThemeText color={theme.textSecondary}>Add Cover</ThemeText>
              </View>
            )}
          </Pressable>

          <TextInput
            placeholder="Title *"
            placeholderTextColor={theme.gray}
            value={bookData.title}
            onChangeText={(text) => setBookData({ ...bookData, title: text })}
            style={[
              styles.input,
              {
                backgroundColor: theme.background,
                color: theme.textPrimary,
                borderColor: theme.gray,
              },
            ]}
          />

          <TextInput
            placeholder="Author"
            placeholderTextColor={theme.gray}
            value={bookData.author}
            onChangeText={(text) => setBookData({ ...bookData, author: text })}
            style={[
              styles.input,
              {
                backgroundColor: theme.background,
                color: theme.textPrimary,
                borderColor: theme.gray,
              },
            ]}
          />

          <TextInput
            placeholder="Description"
            placeholderTextColor={theme.gray}
            value={bookData.description}
            onChangeText={(text) => setBookData({ ...bookData, description: text })}
            multiline
            numberOfLines={4}
            style={[
              styles.textArea,
              {
                backgroundColor: theme.background,
                color: theme.textPrimary,
                borderColor: theme.gray,
              },
            ]}
          />

          {/* Category Picker */}
          <View style={[styles.pickerContainer, { borderColor: theme.gray }]}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              style={{ color: theme.textPrimary }}
              dropdownIconColor={theme.textPrimary}
            >
              {categories.map((c) => (
                <Picker.Item key={c._id} label={c.name} value={c._id} />
              ))}
            </Picker>
          </View>

          {/* PDF Upload */}
          <Pressable onPress={pickPDFFile} style={[styles.pdfButton, { borderColor: theme.gray }]}>
            <Ionicons name="document-attach-outline" size={20} color={theme.primary} />
            <ThemeText color={theme.primary} style={{ marginLeft: 6 }}>
              {bookData.pdfFile ? 'PDF Selected' : 'Upload PDF *'}
            </ThemeText>
          </Pressable>

          {/* Submit */}
          <Pressable
            onPress={handleUpload}
            disabled={loading}
            style={[
              styles.uploadButton,
              { backgroundColor: loading ? theme.primaryVariant + '99' : theme.primaryVariant },
            ]}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="cloud-upload-outline" size={20} color="white" />
                <ThemeText style={styles.uploadText}>Upload</ThemeText>
              </>
            )}
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
};

export default Upload;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 12,
    zIndex: 10,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
    gap: 16,
  },
  imageBox: {
    height: 220,
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  coverPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  pdfButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadButton: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#2196f3',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  uploadText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.PoppinsSemiBold,
  },
});
