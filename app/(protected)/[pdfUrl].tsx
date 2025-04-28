import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Pdf from 'react-native-pdf';
import { Colors } from '@/constants/Colors';

const PdfUrl = () => {
  const { pdfUrl }: any = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(true); // state for loading indicator
  const [error, setError] = useState<string | null>(null); // state to manage errors

  const theme = Colors[useColorScheme() ?? 'light'];

  const source = {
    uri: pdfUrl,
    cache: true,
  };

  const handleLoadComplete = (numberOfPages: any, filePath: any) => {
    console.log(`Number of pages: ${numberOfPages}`);
    setLoading(false); // Hide loading indicator once PDF is loaded
  };

  const handleError = (error: any) => {
    console.log(error);
    setLoading(false);
    setError('Failed to load PDF. Please try again later.');
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color={theme.primary} style={styles.loadingIndicator} />
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Pdf
        source={source}
        onLoadComplete={handleLoadComplete}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={handleError}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

export default PdfUrl;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  errorText: {
    color: 'red',
    position: 'absolute',
    top: '50%',
    textAlign: 'center',
    fontSize: 16,
  },
});
