import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import ThemeText from '@/components/global/TheamText';
import { Fonts } from '@/constants/Fonts';

const ProfileHeader = ({ user, theme }: { user: any; theme: any }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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
});

export default ProfileHeader;
