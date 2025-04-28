import { useEffect } from 'react';

import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import fonts from '@/assets/fonts';
import { Colors } from '@/constants/Colors';
import SplashScreen from '@/components/SplashScreen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useAuthStore } from '@/store/useAuthStore';

ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts(fonts);

  const { isAuthenticated } = useAuthStore();

  console.log(isAuthenticated);

  useEffect(() => {
    if (loaded) {
      ExpoSplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(Colors[colorScheme || 'light'].background);
    NavigationBar.setButtonStyleAsync(colorScheme === 'light' ? 'dark' : 'light');
  }, [colorScheme]);

  if (!loaded) {
    return <SplashScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />

          {isAuthenticated ? (
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          )}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
