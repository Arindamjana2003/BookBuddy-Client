import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import TabIcon from '../Tabs/TabIcon';
import ThemeText from '@/components/global/TheamText';
import { Fonts } from '@/constants/Fonts';
import { useRouter } from 'expo-router'; // Import router for navigation

const BlogHeader = () => {
  const { top } = useSafeAreaInsets();
  const theme = Colors[useColorScheme() ?? 'light'];
  const router = useRouter(); // Initialize router

  const handleCreateBlog = () => {
    console.log('Navigating to Create Blog Screen');
    router.push('/blog/create');
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top + 15,
          backgroundColor: theme.background,
        },
      ]}
    >
      <ThemeText size={26} font={Fonts.PoppinsSemiBold} color={theme.textPrimary}>
        Blogs
      </ThemeText>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: theme.surface }]}
          onPress={handleCreateBlog}
        >
          <TabIcon name="plus" size={20} color={theme.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: theme.surface }]}
          onPress={() => {
            console.log('Notification Button Pressed');
            // You can open notification modal here
          }}
        >
          <TabIcon name="bell" size={20} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlogHeader;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
