import { router, useNavigation } from 'expo-router';
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  Linking,
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

  const data = booksData[0]; // Assuming first book for now

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
  });

  const openPDF = () => {
    const pdfUrl = encodeURIComponent(data?.pdfLink);
    router.push(`/(protected)/${pdfUrl}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Animated Transparent Header */}
      <Animated.View
        style={[styles.header, { backgroundColor: theme.background }, headerAnimatedStyle]}
      />

      {/* Absolute Buttons on Image */}
      <View style={styles.absoluteHeaderButtons}>
        <TouchableOpacity
          style={[GlobalStyle.roundButton, { backgroundColor: theme.background }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.textPrimary} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity
            style={[GlobalStyle.roundButton, { backgroundColor: theme.background }]}
            onPress={() => alert('Share clicked')}
          >
            <Ionicons name="share-outline" size={22} color={theme.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[GlobalStyle.roundButton, { backgroundColor: theme.background }]}
            onPress={() => alert('Liked')}
          >
            <Ionicons name="heart-outline" size={22} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
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

          <View style={styles.titleRow}>
            <ThemeText size={24} font={Fonts.PoppinsSemiBold}>
              {data.bookName}
            </ThemeText>
            <View style={styles.ratingRow}>
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

          <ThemeText font={Fonts.PoppinsRegular} size={16} style={styles.description}>
            {data.description}
            {data.description}
            {data.description}
            {data.description}
            {data.description}
            {data.description}
            {data.description}
            {data.description}
            {data.description}
            {data.description}
            {data.description}
          </ThemeText>
        </View>
      </Animated.ScrollView>

      {/* Footer Button */}
      <Animated.View style={[GlobalStyle.footer, { backgroundColor: theme.background }]}>
        <TouchableOpacity style={styles.readButton} onPress={openPDF}>
          <ThemeText size={18} color={Colors.dark.textPrimary} font={Fonts.PoppinsMedium}>
            Read Book
          </ThemeText>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default DetailsPage;

// --------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  header: {
    position: 'absolute',
    width: '100%',
    height: 100,
    zIndex: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  absoluteHeaderButtons: {
    position: 'absolute',
    top: 50,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 20,
  },
  titleRow: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
  },
  description: {
    marginTop: 10,
  },
  readButton: {
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: Colors.dark.primaryVariant,
    width: '100%',
    height: 55,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
});
