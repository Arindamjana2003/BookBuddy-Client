import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import TabIcon from '../Tabs/TabIcon';
import ThemeText from '@/components/global/TheamText';
import { Fonts } from '@/constants/Fonts';
import { useRouter } from 'expo-router'; // Import router for navigation

const FevouriteHeader = () => {
  const { top } = useSafeAreaInsets();
  const theme = Colors[useColorScheme() ?? 'light'];
  const router = useRouter(); // Initialize router

  const handleCreateBlog = () => {
    console.log('Navigating to search screen');
    router.push('/search');
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
        Fevourites
      </ThemeText>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: theme.surface }]}
          onPress={handleCreateBlog}
        >
          <TabIcon name="search" size={20} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FevouriteHeader;

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
