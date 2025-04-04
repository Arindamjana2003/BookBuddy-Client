import React, { useRef, useState } from 'react';

import * as Haptics from 'expo-haptics';
import { ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';

import { Fonts } from '@/constants/Fonts';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { categoriesData } from '@/constants/Categories';

import ThemeText from '../global/TheamText';
// import TabIcon from './Tabs/TabIcon';

// const categories = ['Computer', 'History', 'Geography', 'English', 'Sanskrit'];

interface CategoriesOptionProps {
  setActiveCategory: (category: string) => void;
}

const CategoriesOption: React.FC<CategoriesOptionProps> = ({ setActiveCategory }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const itemRef = useRef<Array<View | null>>([]);
  const scrollRef = useRef<ScrollView | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemRef.current[index];

    setActiveIndex(index);

    selected?.measure((x: any) => {
      scrollRef.current?.scrollTo({ x: x, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setActiveCategory(categoriesData[index].category);
  };

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={[styles.container]}
      >
        {categoriesData.map((item, index) => {
          return (
            <View key={index} ref={(elm) => (itemRef.current[index] = elm)}>
              <TouchableOpacity
                //   key={index}
                style={
                  activeIndex === index
                    ? [styles.button, styles.activeButton, { borderBottomColor: theme.textPrimary }]
                    : [styles.button]
                }
                //   ref={(elm) => (itemRef.current[index] = elm)}
                onPress={() => selectCategory(index)}
              >
                <Ionicons
                  name={activeIndex === index ? item.icon : `${item.icon}-outline`}
                  size={24}
                  color={activeIndex === index ? theme.textPrimary : theme.gray}
                />
                {/* <TabIcon
                  name={item.icon}
                  size={24}
                  color={activeIndex === index ? theme.textPrimary : theme.gray}
                /> */}
                <ThemeText
                  size={14}
                  font={Fonts.PoppinsLight}
                  color={activeIndex === index ? theme.textPrimary : theme.gray}
                >
                  {item.category}
                </ThemeText>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoriesOption;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 5,
  },
  button: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButtonText: {
    fontFamily: Fonts.PoppinsRegular,
  },
  activeButton: {
    borderBottomWidth: 2,
  },
});
