import { Text, Pressable, useColorScheme, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import TabIcon from './TabIcon';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface TabBarButtonProps {
  onPress: () => void;
  onLongPress: () => void;
  routeName: string;
  isFocused: boolean;
  label: string;
}

const icons: Record<string, (props: any) => JSX.Element> = {
  index: (props) => <TabIcon name="home" size={20} {...props} />,
  diary: (props) => <TabIcon name="file-text" size={20} {...props} />,
  likedBooks: (props) => <TabIcon name="heart" size={20} {...props} />,
  blog: (props) => <TabIcon name="tv" size={20} {...props} />,
};

export default function TabBarButton({
  onPress,
  onLongPress,
  routeName,
  isFocused,
  label,
}: TabBarButtonProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {
      duration: 350,
    });
  }, [isFocused, scale]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return { opacity };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.35]);
    const top = interpolate(scale.value, [0, 1], [0, 10]);

    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      top,
    };
  });

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={[styles.tabBarItem]}>
      <Animated.View style={animatedIconStyle}>
        {icons[routeName]({
          color: isFocused ? theme.background : theme.gray,
        })}
      </Animated.View>
      <Animated.Text
        style={[
          {
            color: isFocused ? theme.primaryVariant : theme.gray,
            fontSize: 12,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});
