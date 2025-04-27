import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
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

  const { blogId } = useLocalSearchParams();

  const data = booksData[0];

  const [isLiked, setIsLiked] = React.useState(false);

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
            onPress={() => setIsLiked(!isLiked)}
          >
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={22}
              color={isLiked ? theme.error : theme.textPrimary}
            />
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
          source={{
            uri: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*jIc6f7Au8VukVM7kKh-CAw.png',
          }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />

        <View
          style={[
            GlobalStyle.container,
            {
              backgroundColor: theme.background,
              paddingTop: 24,
            },
          ]}
        >
          <ThemeText>{blogId}</ThemeText>

          <View style={styles.titleRow}>
            <ThemeText size={24} font={Fonts.PoppinsSemiBold}>
              {data.bookName}
            </ThemeText>
          </View>

          <View style={{ marginTop: 20 }} />
          <Devider />

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
