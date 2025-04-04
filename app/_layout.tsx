import { Slot, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Platform, useColorScheme } from 'react-native';

import fonts from '@/assets/fonts';
import SplashScreen from '@/components/SplashScreen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { Colors } from '@/constants/Colors';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
        <Slot />
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

{
  /* <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="profile" options={{ headerShown: false }} />
                <Stack.Screen
                    name="auth/login"
                    options={{ headerShown: false }}
                />
            </Stack> */
}

// import { Slot } from "expo-router";
// import { useFonts } from "expo-font";
// import { StatusBar } from "expo-status-bar";
// import { useColorScheme } from "react-native";
// import {
//     DarkTheme,
//     DefaultTheme,
//     ThemeProvider,
// } from "@react-navigation/native";
// import { useEffect } from "react";
// import * as NavigationBar from "expo-navigation-bar";
// import { Colors } from "@/constants/Colors";
// import SplashScreen from "@/components/SplashScreen";
// import fonts from "@/assets/fonts";

// // 🔹 Separate component to handle loading state
// function RootWrapper() {
//     const colorScheme = useColorScheme() || "light";

//     useEffect(() => {
//         NavigationBar.setBackgroundColorAsync(Colors[colorScheme].surface);
//     }, [colorScheme]);

//     return (
//         <ThemeProvider
//             value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
//         >
//             <Slot />
//             <StatusBar style="auto" />
//         </ThemeProvider>
//     );
// }

// export default function RootLayout() {
//     const [fontsLoaded] = useFonts(fonts);

//     // 🔥 FIX: Don't change hook order on re-renders
//     if (!fontsLoaded) {
//         return <SplashScreen />;
//     }

//     return <RootWrapper />;
// }
