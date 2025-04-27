
import React, { useState } from 'react';
import {View,TouchableOpacity,StyleSheet,ScrollView,useColorScheme,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import ThemeText from '@/components/global/TheamText';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';


const ForgotPasswordScreen = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const theme = Colors[useColorScheme() ?? 'light'];
  const { top } = useSafeAreaInsets();
// const router = useRouter();
  return (
    <ScrollView
      style={[ GlobalStyle.container, { paddingTop: top + 15, backgroundColor: theme.background },
      ]}
    >
      <View style={styles.forgotHeader}>
        <TouchableOpacity style={styles.backArrow}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <ThemeText font={Fonts.PoppinsSemiBold} size={30}style={[styles.title, { color: theme.primary }]} > Forgot Password</ThemeText>

        <ThemeText font={Fonts.PoppinsRegular}size={17}align="center" style={styles.subtitle}> Select an option to reset your password</ThemeText>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[ styles.optionButton,selectedOption === 'password' && {borderWidth: 2,
              borderColor: theme.primary, },
            ]}
            onPress={() => {
              setSelectedOption('password')
              // router.push('../screens/ResetViaPassword')
            }}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="lock-closed" size={24} color="#ff9900" />
            </View>
            <ThemeText font={Fonts.PoppinsMedium} size={16}>
              Password
            </ThemeText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[ styles.optionButton,selectedOption === 'mobile' && {borderWidth: 2,
                borderColor: theme.primary, },
            ]}
            onPress={() =>{
               setSelectedOption('mobile')
              //  router.push('../screens/ResetViaPassword')
            }}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="phone-portrait" size={24} color="#6688ff" />
            </View>
            <ThemeText font={Fonts.PoppinsMedium} size={16}>
              Mobile OTP
            </ThemeText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'gmail' && {borderWidth: 2,borderColor: theme.primary, },
            ]}
            onPress={() => {
              setSelectedOption('gmail')
              // router.push('../screens/ResetViaGmail')
            }}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="mail" size={24} color="#cc66cc" />
            </View>
            <ThemeText font={Fonts.PoppinsMedium} size={16}>
              Google Mail
            </ThemeText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.sendButton, { backgroundColor: theme.primaryVariant }]}>
          <ThemeText font={Fonts.PoppinsBold} style={styles.sendButtonText}>
            Send Password
          </ThemeText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  forgotHeader: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  backArrow: {
    marginBottom: 15,
  },
  title: {
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 25,
  },
  optionsContainer: {
    gap: 15,
    marginBottom: 30,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  sendButton: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});