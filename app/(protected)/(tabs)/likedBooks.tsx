import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyle } from "@/styles/GlobalStyle";
import LikedScreen from "@/screens/LikedScreen";

const LikedBooks = () => {
    return (
        <View style={{ flex: 1 }}>
            <LikedScreen />
        </View>
    );
};

export default LikedBooks;

const styles = StyleSheet.create({});
