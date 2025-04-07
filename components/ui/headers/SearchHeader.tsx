import { StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import TabIcon from '../Tabs/TabIcon';
import ThemeText from '@/components/global/TheamText';
import { Fonts } from '@/constants/Fonts';

const SearchHeader = () => {
  const { top } = useSafeAreaInsets();
  const theme = Colors[useColorScheme() ?? 'light'];

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
          paddingTop: top + 15,
          paddingBottom: 32,
          alignItems: 'center',
        },
      ]}
    >
      <ThemeText size={14} font={Fonts.PoppinsLight}>
        Search your
      </ThemeText>
      <ThemeText size={28} font={Fonts.PoppinsSemiBold} style={{ top: -8 }}>
        "Books"
      </ThemeText>
      <View
        style={[
          {
            borderColor: theme.textSecondary,
            backgroundColor: theme.surface,
          },
          styles.searchContainer,
        ]}
      >
        <TabIcon name="search" color={theme.textPrimary} />
        <TextInput
          style={{
            flex: 1,
            height: '100%',
            fontSize: 18,
            zIndex: 10,
          }}
          placeholder="Search Books hare"
          placeholderTextColor={theme.gray}
          inputMode="search"
        />
      </View>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  searchContainer: {
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    gap: 15,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
