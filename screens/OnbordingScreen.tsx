import React, { useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import ThemeText from '@/components/global/TheamText';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }: { navigation: any }) {
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? 'light'];
  const scrollRef = useRef<Animated.ScrollView>(null);
  const [activePage, setActivePage] = useState(0);

  const onboardingPages = [
    {
      image: require('@/assets/images/logo.jpg'),
      title: 'Welcome',
      description: 'A reader lives a thousand lives before he dies.',
      animation: SlideInLeft,
    },
    {
      image: require('@/assets/images/logo.png'),
      title: 'Stay Connected',
      description: 'Connect with people easily.',
      animation: SlideInLeft,
    },
    {
      image: require('@/assets/images/favicon.png'),
      title: 'Time to Explore',
      description: 'Discover the world around you.',
      animation: SlideInLeft,
    },
    {
      image: require('@/assets/images/noLikedBooks.jpg'),
      title: 'Get Started',
      description: 'Begin your journey today.',
      animation: SlideInLeft,
    },
  ];

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentPage = Math.round(offsetX / width);
    setActivePage(currentPage);
  };

  const handleSkip = () => {
    if (scrollRef.current) {
      const lastPageOffset = (onboardingPages.length - 1) * width;
      scrollRef.current.scrollTo({ x: lastPageOffset, animated: true });
    }
  };

  const handleNext = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: (index + 1) * width, animated: true });
    }
  };

  const handlePrevious = (index: number) => {
    if (scrollRef.current && index > 0) {
      scrollRef.current.scrollTo({ x: (index - 1) * width, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        style={styles.onboardingScreen}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {onboardingPages.map((page, index) => (
          <Animated.View
            key={index}
            entering={page.animation}
            style={styles.pageContainer}
          >
            
            {index === 0 && (
              <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <ThemeText style={styles.skipText}>
                  Skip <AntDesign name="right" size={20} color={themeColor.primaryVariant} />
                </ThemeText>
              </TouchableOpacity>
            )}

          
            <Image source={page.image} style={styles.image} />
            <View style={styles.contentContainer}>
              <ThemeText style={styles.title}>{page.title}</ThemeText>
              <ThemeText style={styles.description}>{page.description}</ThemeText>
            </View>
          </Animated.View>
        ))}
      </Animated.ScrollView>

    
      {activePage > 0 && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => handlePrevious(activePage)}
        >
          <AntDesign name="left" size={30} color={themeColor.primaryVariant} />
        </TouchableOpacity>
      )}


      {activePage < onboardingPages.length - 1 ? (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => handleNext(activePage)}
        >
          <AntDesign name="rightcircle" size={60} color={themeColor.primaryVariant}/>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: themeColor.textPrimary }]}
          onPress={() => Alert.alert('Get Started Clicked!')}
        >
          <ThemeText style={[styles.startButtonText, { color: themeColor.background }]}>
            Get Started
          </ThemeText>
        </TouchableOpacity>
      )}

    
      <View style={styles.dotsContainer}>
        {onboardingPages.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              activePage === idx ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  onboardingScreen: {
    flex: 1,
  },
  pageContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    color: 'gray',
  },
  nextButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  startButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'gray',
  },
  inactiveDot: {
    backgroundColor: 'lightgray',
  },
});