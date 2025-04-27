import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import ThemeText from '@/components/global/TheamText';
import { GlobalStyle } from '@/styles/GlobalStyle';

const OtpVerification = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <ScrollView contentContainerStyle={[GlobalStyle.container, styles.innerContainer, { backgroundColor: theme.background }]}>
      <ThemeText style={[styles.title, { color: theme.primary }]}>
        Verify your email
      </ThemeText>

      <View style={styles.otpContainer}>
        {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            style={[styles.otpBox, { borderColor: theme.primary }]}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>

      <ThemeText style={[styles.resendText]}>
        Can't get any OTP yet?{' '}
        <ThemeText style={[styles.resendLink, { color: theme.primaryVariant }]}>
          Resend OTP
        </ThemeText>
      </ThemeText>

      <TouchableOpacity style={[styles.verifyButton, { backgroundColor: theme.primaryVariant }]}>
        <ThemeText style={styles.verifyText}>Verify</ThemeText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  innerContainer: {
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.PoppinsBold,
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  otpBox: {
    height: 50,
    width: 50,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: Fonts.PoppinsSemiBold,
    backgroundColor: '#F2FDF8',
  },
  resendText: {
    fontSize: 14,
    fontFamily: Fonts.PoppinsRegular,
    marginBottom: 30,
    color: '#666', // fallback
  },
  resendLink: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  verifyButton: {
    width: '100%',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  verifyText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: Fonts.PoppinsBold,
  },
});


