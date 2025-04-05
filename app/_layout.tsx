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

ExpoSplashScreen.hideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts(fonts);

  useEffect(() => {
    ExpoSplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(Colors[colorScheme || 'light'].background);
    NavigationBar.setButtonStyleAsync(colorScheme === 'light' ? 'dark' : 'light');
  }, [colorScheme]);

  if (!loaded) {
    return <SplashScreen />;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="search" options={{ headerShown: true }} />
          <Stack.Screen name="profile" options={{ headerShown: true }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/register" options={{ headerShown: false }} />
          <Stack.Screen
            name="book-details"
            options={{
              headerTitle: '',
              headerTransparent: true,
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
