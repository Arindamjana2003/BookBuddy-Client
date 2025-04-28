import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Alert,
  ActivityIndicator,
} from 'react-native';
import CustomInput from '@/components/ui/CustomInput';
import { Colors } from '@/constants/Colors';
import ThemeText from './global/TheamText';
import { Fonts } from '@/constants/Fonts';
import { dvw } from '@/constants/Dimension';
import { useAuthStore } from '@/store/useAuthStore';
import { apiClient } from '@/api/axios.config';
import { router } from 'expo-router';

const RegisterForm = () => {
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? 'light'];

  const { login } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    setError('');

    setLoading(true);
    try {
      const response = await apiClient.post('/user/create', {
        name,
        email,
        password,
      });

      if (response.success) {
        Alert.alert('Success', 'Registered successfully!');
        login(response.data?.user, response.data?.token);
        router.replace('/(protected)/(tabs)');
      } else {
        Alert.alert('Registration failed', response.message || 'Unknown error');
      }

      console.log(response);
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred while Registering. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 70, marginBottom: 10 }}>
      <CustomInput
        label="Name"
        placeholder="Enter your name"
        keyboardType="default"
        value={name}
        onChangeText={setName}
        error={error ? 'Name is required' : ''}
        cursorColor={themeColor.primary}
      />
      <CustomInput
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        error={error ? 'Email is required' : ''}
        cursorColor={themeColor.primary}
      />
      <CustomInput
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        error={error ? 'Password is required' : ''}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColor.primary }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={'#fff'} />
        ) : (
          <ThemeText font={Fonts.Jua} size={dvw * 0.06}>
            Register
          </ThemeText>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
  },
});

export default RegisterForm;
