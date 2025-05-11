import React, { useState } from 'react';

import Pdf from 'react-native-pdf';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Dimensions, StyleSheet, useColorScheme, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import ThemeText from '@/components/global/TheamText';
import PdfViewHeader from '@/components/ui/headers/PdfViewHeader';

const PdfUrl = () => {
  const { pdfUrl }: any = useLocalSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    <>
      <PdfViewHeader />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {loading && (
          <ActivityIndicator
            size="large"
            color={theme.textPrimary}
            style={styles.loadingIndicator}
          />
        )}

        {error && <ThemeText style={styles.errorText}>{error}</ThemeText>}

        <Pdf
          trustAllCerts={false}
          source={source}
          onLoadComplete={handleLoadComplete}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={handleError}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={[styles.pdf, { backgroundColor: theme.background }]}
          enablePaging={false}
          spacing={5}
        />
      </View>
    </>
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
    position: 'absolute',
    top: '50%',
    textAlign: 'center',
    fontSize: 16,
  },
});
