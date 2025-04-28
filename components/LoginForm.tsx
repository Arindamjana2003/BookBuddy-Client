import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import CustomInput from '@/components/ui/CustomInput';
import { Colors } from '@/constants/Colors';
import ThemeText from './global/TheamText';
import { Fonts } from '@/constants/Fonts';
import { dvw } from '@/constants/Dimension';
import { apiClient } from '@/api/axios.config';
import { useAuthStore } from '@/store/useAuthStore';
import { router } from 'expo-router';

const LoginForm = () => {
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? 'light'];

  const { login } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    let hasError = false;
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else {
      setPasswordError('');
    }
    if (hasError) return;

    setLoading(true);
    try {
      const response = await apiClient.post('/user/login', { email, password });

      if (response.success) {
        Alert.alert('Success', 'Logged in successfully!');
        login(response.data?.user, response.data?.token);
        router.replace('/(protected)/(tabs)');
      } else {
        Alert.alert('Login failed', response.message || 'Unknown error');
      }
    } catch (error: any) {
      Alert.alert('Login failed', error?.message || 'Please try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      // style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <CustomInput
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            error={emailError}
            cursorColor={themeColor.primary}
          />
          <CustomInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={passwordError}
          />
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: themeColor.primary, opacity: loading ? 0.6 : 1 },
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemeText font={Fonts.Jua} size={dvw * 0.06}>
                Login
              </ThemeText>
            )}
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default LoginForm;
