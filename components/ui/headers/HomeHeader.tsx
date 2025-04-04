import { Image, Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemeText from '@/components/global/TheamText';
import { Fonts } from '@/constants/Fonts';
import TabIcon from '../Tabs/TabIcon';
import RollingBar from 'react-native-rolling-bar';
import { router } from 'expo-router';

const HomeHeader = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { backgroundColor: theme.background, paddingTop: top + 15 }]}>
      <View style={styles.topSection}>
        <View>
          <ThemeText size={26} font={Fonts.PoppinsSemiBold} color={theme.primaryVariant}>
            Hello, Pritam
          </ThemeText>
          <ThemeText size={16} font={Fonts.PoppinsRegular} style={{ marginTop: -10 }}>
            Good Morning
          </ThemeText>
        </View>
        <Pressable onPress={() => router.push('/profile')}>
          <Image
            source={{
              uri: 'https://test-hcc.unitedlayer.com/wp-content/uploads/2020/01/dummy-profile.jpg',
            }}
            style={[styles.profileImage]}
          />
        </Pressable>
      </View>
      <Pressable
        style={[styles.searchSection, { backgroundColor: theme.surface }]}
        onPress={() => router.push('/search')}
      >
        <TabIcon name="search" color={theme.textPrimary} />
        <RollingBar interval={3000} customStyle={styles.rollingStyle}>
          <ThemeText size={15}>Search for "Computer"</ThemeText>
          <ThemeText size={15}>Search for "Geography"</ThemeText>
          <ThemeText size={15}>Search for "History"</ThemeText>
          <ThemeText size={15}>Search for "Phycology"</ThemeText>
          <ThemeText size={15}>Search for "Story Books"</ThemeText>
          <ThemeText size={15}>And many more...</ThemeText>
        </RollingBar>
      </Pressable>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    height: 48,
    width: 48,
    borderRadius: 40,
    objectFit: 'cover',
  },
  searchSection: {
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    gap: 15,
  },
  rollingStyle: {
    borderWidth: 0,
  },
});
