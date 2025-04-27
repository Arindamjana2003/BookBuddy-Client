import { StyleSheet, View, useColorScheme, Image, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import ThemeText from '@/components/global/TheamText';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@/constants/Fonts';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';
import Animated from 'react-native-reanimated';

const Profile = () => {
  const theme = Colors[useColorScheme() ?? 'light'];
  const { top } = useSafeAreaInsets();

  const { user, logout } = useAuthStore();

  return (
    <ScrollView
      style={[GlobalStyle.container, { backgroundColor: theme.background, paddingTop: top + 15 }]}
    >
      <View style={styles.profileHeader}>
        <Animated.Image
          sharedTransitionTag="profile-photo"
          source={{ uri: user?.profile_pic?.url }}
          style={styles.avatar}
        />
        <ThemeText
          size={27}
          font={Fonts.PoppinsSemiBold}
          color={theme.primary}
          style={[styles.name]}
        >
          {user?.name}
        </ThemeText>
        <ThemeText size={15} font={Fonts.PoppinsRegular} align="center" style={styles.bio}>
          {user?.bio ?? 'A book is a gift you can open again and again'}
        </ThemeText>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.editProfileButton, { backgroundColor: theme.primaryVariant }]}
          >
            <ThemeText style={styles.editProfileText}>Edit Profile</ThemeText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: theme.error }]}
            onPress={logout}
          >
            <ThemeText style={styles.logoutText}>
              <Ionicons name="exit-outline" size={26} />
            </ThemeText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.yourUploads}>
        <View style={styles.uploadTitle}>
          <ThemeText size={20} font={Fonts.PoppinsBold}>
            {' '}
            Your uploads{' '}
          </ThemeText>
          <Pressable>
            <ThemeText
              size={15}
              font={Fonts.PoppinsRegular}
              color={theme.primaryVariant}
              style={{ textDecorationLine: 'underline' }}
            >
              See all
            </ThemeText>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 95,
    objectFit: 'cover',
    borderColor: '#c1c1c1',
    borderWidth: StyleSheet.hairlineWidth,
  },
  name: {
    marginTop: 10,
  },
  bio: {
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    gap: 10,
  },
  editProfileButton: {
    flex: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  editProfileText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'PoppinsBold',
  },
  logoutButton: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'PoppinsBold',
    textAlign: 'center',
  },

  yourUploads: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  uploadTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal : 20 ,
    gap: 25,
  },
});
