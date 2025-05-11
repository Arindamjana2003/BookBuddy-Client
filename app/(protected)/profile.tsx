import {
  StyleSheet,
  View,
  ImageBackground,
  useWindowDimensions,
  Pressable,
  useColorScheme,
} from 'react-native';
import React from 'react';
import ThemeText from '@/components/global/TheamText';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Fonts } from '@/constants/Fonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';
import Animated, { FadeIn, FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';

const Profile = () => {
  const theme = Colors[useColorScheme() ?? 'light'];
  const { top, bottom } = useSafeAreaInsets();
  const { user, logout } = useAuthStore();

  const handleAction = (action: () => void) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    action();
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://c4.wallpaperflare.com/wallpaper/723/135/752/patterns-lines-pale-light-wallpaper-preview.jpg',
      }}
      style={[styles.container, { paddingTop: top }]}
      blurRadius={10}
      resizeMode="cover"
      imageStyle={{ opacity: 0.7 }}
    >
      <Animated.View
        style={[styles.overlay, { backgroundColor: theme.background + '90' }]}
        entering={FadeIn.duration(500)}
      />

      <View style={styles.scrollContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 + bottom }} // Space for fixed button
        >
          <Animated.View style={styles.profileHeader} entering={FadeInUp.delay(200).duration(800)}>
            <Animated.View
              style={[styles.avatarContainer, { shadowColor: theme.primary }]}
              sharedTransitionTag="profile-photo"
            >
              <Animated.Image
                source={{ uri: user?.profile_pic?.url || 'https://example.com/default-avatar.jpg' }}
                style={styles.avatar}
                sharedTransitionTag="profile-photo"
              />
              <Animated.View
                style={[styles.verifiedBadge, { backgroundColor: theme.primary }]}
                entering={FadeIn.delay(400)}
              >
                <Ionicons name="checkmark" size={16} color="white" />
              </Animated.View>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(300).duration(800)}>
              <ThemeText size={28} font={Fonts.PoppinsSemiBold} style={styles.name}>
                {user?.name}
              </ThemeText>
              <ThemeText
                size={16}
                font={Fonts.PoppinsRegular}
                style={[styles.bio, { color: theme.textSecondary }]}
              >
                {user?.bio || 'A book is a gift you can open again and again'}
              </ThemeText>
            </Animated.View>
          </Animated.View>

          <Animated.View style={styles.actions} entering={FadeInUp.delay(500).duration(800)}>
            <Animated.View style={{ flex: 1 }} entering={SlideInRight.delay(600).springify()}>
              <Pressable
                style={({ pressed }) => [
                  styles.actionButton,
                  {
                    backgroundColor: pressed ? theme.primary : theme.primaryVariant,
                    transform: [{ scale: pressed ? 0.95 : 1 }],
                  },
                ]}
                onPress={() => handleAction(() => router.push('/(protected)/edit-profile'))}
              >
                <Ionicons name="pencil-outline" size={20} color="white" />
                <ThemeText style={styles.actionButtonText}>Edit Profile</ThemeText>
              </Pressable>
            </Animated.View>

            <Animated.View style={{ flex: 1 }} entering={SlideInRight.delay(700).springify()}>
              <Pressable
                style={({ pressed }) => [
                  styles.actionButton,
                  {
                    backgroundColor: pressed ? theme.textSecondary : theme.textPrimary,
                    transform: [{ scale: pressed ? 0.95 : 1 }],
                  },
                ]}
                onPress={() => handleAction(() => router.push('/(protected)/book/upload'))}
              >
                <Ionicons name="cloud-upload-outline" size={20} color="white" />
                <ThemeText style={styles.actionButtonText}>Upload Book</ThemeText>
              </Pressable>
            </Animated.View>
          </Animated.View>

          <Animated.View
            style={[styles.section, { marginTop: 30 }]}
            entering={FadeInDown.delay(800).duration(800)}
          >
            <View style={styles.sectionHeader}>
              <ThemeText size={22} font={Fonts.PoppinsBold}>
                Your Uploads
              </ThemeText>
              <Pressable
                onPress={() => handleAction(() => router.push('/(protected)/book/uploads'))}
              >
                <ThemeText
                  size={16}
                  color={theme.primary}
                  style={{ textDecorationLine: 'underline' }}
                >
                  See all
                </ThemeText>
              </Pressable>
            </View>

            <View style={styles.uploadsGrid}>
              {[1, 2, 3, 4].map((item) => (
                <Animated.View
                  key={item}
                  style={[styles.bookItem, { backgroundColor: theme.surface }]}
                  entering={FadeIn.delay(900 + item * 100)}
                >
                  {/* Book cover placeholder */}
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        </ScrollView>

        {/* Fixed Logout Button */}
        <Animated.View
          style={[
            styles.fixedLogoutButton,
            {
              backgroundColor: theme.error,
              bottom: bottom + 20,
            },
          ]}
          entering={FadeInDown.delay(1200).duration(800)}
        >
          <Pressable
            style={({ pressed }) => [
              styles.logoutButton,
              {
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
            onPress={() => handleAction(logout)}
          >
            <Ionicons name="exit-outline" size={24} color="white" />
            <ThemeText style={styles.logoutText}>Logout</ThemeText>
          </Pressable>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 5,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 0,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: 'white',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {
    marginTop: 16,
    textAlign: 'center',
  },
  bio: {
    marginTop: 8,
    textAlign: 'center',
    maxWidth: '80%',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    gap: 16,
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: 'white',
    fontFamily: Fonts.PoppinsSemiBold,
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  bookItem: {
    width: '48%',
    aspectRatio: 0.7,
    borderRadius: 12,
    overflow: 'hidden',
  },
  fixedLogoutButton: {
    position: 'absolute',
    left: 24,
    right: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 12,
  },
  logoutText: {
    color: 'white',
    fontFamily: Fonts.PoppinsSemiBold,
    fontSize: 16,
  },
});

export default Profile;
