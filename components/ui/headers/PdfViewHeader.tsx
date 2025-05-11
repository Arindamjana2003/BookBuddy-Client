import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import ThemeText from '@/components/global/TheamText';
import { Fonts } from '@/constants/Fonts';
import { useRouter } from 'expo-router'; // Import router for navigation
import { Ionicons } from '@expo/vector-icons';

const PdfViewHeader = () => {
  const { top } = useSafeAreaInsets();
  const theme = Colors[useColorScheme() ?? 'light'];
  const router = useRouter(); // Initialize router

  const handleCreateBlog = () => {
    router.back();
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
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.iconButton]} onPress={handleCreateBlog}>
          <Ionicons name="chevron-back" size={24} color={theme.textPrimary} />
        </TouchableOpacity>
      </View>
      <ThemeText size={26} font={Fonts.PoppinsSemiBold} color={theme.textPrimary}>
        Read Book
      </ThemeText>
    </View>
  );
};

export default PdfViewHeader;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 15,
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
