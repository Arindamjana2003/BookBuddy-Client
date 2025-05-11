import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { apiClient } from '@/api/axios.config';
import { useAuthStore } from '@/store/useAuthStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemeText from '@/components/global/TheamText';
import { Fonts } from '@/constants/Fonts';
import { router } from 'expo-router';

const EditProfile = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { top } = useSafeAreaInsets();
  const { user, setUser } = useAuthStore();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePic, setProfilePic] = useState(user?.profile_pic?.url || null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      uploadProfilePic(result.assets[0].uri);
    }
  };

  const uploadProfilePic = async (uri: string) => {
    setImageLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        name: 'profile.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await apiClient.post('/user/profile-pic-change', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response?.success) {
        setProfilePic(response?.data?.profile_pic.url);
        setUser({ ...user!, profile_pic: response?.data?.profile_pic });
        Alert.alert('Success', 'Profile picture updated successfully');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      Alert.alert('Error', 'Failed to update profile picture');
    } finally {
      setImageLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.patch('/user', {
        name,
        email,
      });

      if (response?.success) {
        setUser(response?.data);
        Alert.alert('Success', 'Profile updated successfully');
        router.back();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: top + 15 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.textPrimary} />
        </TouchableOpacity>
        <ThemeText size={20} font={Fonts.PoppinsSemiBold}>
          Edit Profile
        </ThemeText>
        <TouchableOpacity onPress={handleUpdateProfile} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color={theme.primary} />
          ) : (
            <Text style={[styles.saveButton, { color: theme.primary }]}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Picture */}
        <View style={styles.profilePicContainer}>
          <View style={[styles.profilePicWrapper, { borderColor: theme.primary }]}>
            {profilePic ? (
              <Image source={{ uri: profilePic }} style={styles.profilePic} />
            ) : (
              <View style={[styles.profilePicPlaceholder, { backgroundColor: theme.surface }]}>
                <AntDesign name="user" size={48} color={theme.textSecondary} />
              </View>
            )}
            {imageLoading && (
              <View style={styles.profilePicOverlay}>
                <ActivityIndicator size="small" color="#fff" />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={[styles.changePhotoButton, { backgroundColor: theme.primary }]}
            onPress={pickImage}
            disabled={imageLoading}
          >
            <Text style={[styles.changePhotoText, { color: theme.textPrimary }]}>
              {imageLoading ? 'Uploading...' : 'Change Photo'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Full Name</Text>
            <TextInput
              style={[styles.input, { color: theme.textPrimary, backgroundColor: theme.surface }]}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Email Address</Text>
            <TextInput
              style={[
                styles.input,
                { color: theme.gray, backgroundColor: theme.surface, opacity: 0.5 },
              ]}
              value={email}
              editable={false}
              placeholderTextColor={theme.textSecondary}
            />
            <Text style={[styles.note, { color: theme.textSecondary }]}>
              Email cannot be changed
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  profilePicPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '500',
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: Fonts.PoppinsMedium,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: Fonts.PoppinsRegular,
  },
  note: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: Fonts.PoppinsLight,
  },
});

export default EditProfile;
