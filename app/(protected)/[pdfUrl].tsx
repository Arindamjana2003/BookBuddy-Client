import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const PdfUrl = () => {
  const { pdfUrl } = useLocalSearchParams();
  return (
    <View>
      <Text>PdfUrl : {pdfUrl}</Text>
    </View>
  );
};

export default PdfUrl;

const styles = StyleSheet.create({});
