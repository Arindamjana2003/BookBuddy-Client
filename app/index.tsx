import { Image, useColorScheme, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import logo from '@/assets/images/logo.png';
import SplashStyle from '@/styles/SplashStyles';
import ThemeText from '@/components/global/TheamText';
import { useEffect } from 'react';
import { Redirect, router } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';

export default function Index() {
  const theme = useColorScheme() ?? 'light';

  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/(protected)/(tabs)');
        return;
      }
      router.replace('/auth/login');
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={[SplashStyle.container, { backgroundColor: Colors[theme].background }]}>
      <View style={[SplashStyle.logoContainer]}>
        <Image source={logo} style={[SplashStyle.logo]} />
      </View>

      <View style={[SplashStyle.sloganContainer]}>
        <ThemeText style={[SplashStyle.sloganText, { color: Colors[theme].textPrimary }]}>
          Your companion for every educational need
        </ThemeText>
      </View>
    </View>
  );
}
