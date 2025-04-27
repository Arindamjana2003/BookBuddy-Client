import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: true }} />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="book-details"
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="blog"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
