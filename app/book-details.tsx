import { useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { booksData } from '@/data/bookData';
import ThemeText from '@/components/global/TheamText';
import Devider from '@/components/global/Devider';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const DetailsPage = () => {
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const theme = Colors[useColorScheme() ?? 'light'];

  const data = booksData[0];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,

      headerBackground: () => (
        <Animated.View
          style={[headerAnimatedStyle, styles.header, { backgroundColor: theme.background }]}
        ></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity
            style={[GlobalStyle.roundButton, { backgroundColor: theme.background }]}
            onPress={() => Alert.alert('Clicked')}
          >
            <Ionicons name="share-outline" size={22} color={theme.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[GlobalStyle.roundButton, { backgroundColor: theme.background }]}
            onPress={() => Alert.alert('Clicked')}
          >
            <Ionicons name="heart-outline" size={22} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={[GlobalStyle.roundButton, { backgroundColor: theme.background }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.textPrimary} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{ uri: data.coverPhoto }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />

        <View
          style={[GlobalStyle.container, { backgroundColor: theme.background, paddingTop: 24 }]}
        >
          <ThemeText>{data.category}</ThemeText>

          <View
            style={{
              flexDirection: 'row',
              gap: 4,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <ThemeText size={24} font={Fonts.PoppinsSemiBold}>
              {data.bookName}
            </ThemeText>
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <Ionicons name="star" size={18} color={theme.accent} />
              <ThemeText size={14} style={{ lineHeight: 20 }}>
                {data.rating}/5
              </ThemeText>
            </View>
          </View>

          <View style={{ marginTop: 20 }} />
          <Devider />
          <View style={styles.hostView}>
            <Image source={{ uri: data.coverPhoto }} height={120} width={80} resizeMode="contain" />
            <View>
              <ThemeText size={20} font={Fonts.PoppinsMedium}>
                Author: {data.author}
              </ThemeText>
              <ThemeText size={14} font={Fonts.PoppinsMedium}>
                Publisher : {data.publisher}
              </ThemeText>
              <ThemeText size={14}>Edition : {data.edition}</ThemeText>
              <ThemeText size={14}>Publishion Year : {data.publishedYear}</ThemeText>
            </View>
          </View>
          <Devider />
          <View style={{ marginBottom: 20 }} />

          <ThemeText font={Fonts.PoppinsRegular} size={16} style={[styles.description]}>
            {data.description}
          </ThemeText>
        </View>
      </Animated.ScrollView>

      {/* footer  */}
      <Animated.View style={[GlobalStyle.footer, { backgroundColor: theme.background }]}>
        <TouchableOpacity
          style={[
            {
              paddingRight: 20,
              paddingLeft: 20,
              backgroundColor: theme.primaryVariant,
              width: '100%',
              height: 55,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 2,
            },
          ]}
          onPress={() => Alert.alert('Clicked')}
        >
          <ThemeText size={18} color={Colors.dark.textPrimary} font={Fonts.PoppinsMedium}>
            Read Book
          </ThemeText>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  description: {
    marginTop: 10,
  },
});

export default DetailsPage;
