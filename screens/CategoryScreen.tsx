import { StyleSheet, Text, View,Image, useColorScheme, TouchableOpacity  } from "react-native";
import React from "react";
import { GlobalStyle } from "../styles/GlobalStyle";
import ThemeText from "@/components/global/TheamText";
import { useEffect } from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native";





export default function CategoryScreen() {

    const theme = useColorScheme()??'light';
   



    return (
        <ScrollView  
        style={styles.contentContainer} >

            <View style={[styles.gridContainer]}>            

                    <View style={styles.imageContainer}>
                            <Image source={require("../assets/images/computer.jpg")} style={styles.image} />
                            <ThemeText style={styles.label}>Computer</ThemeText>
                    </View>

                    <View style={styles.imageContainer}>
                            <Image source={require("../assets/images/math.jpg")} style={styles.image} />
                            <ThemeText style={styles.label}>Mathematics</ThemeText>
                    </View>

                    <View style={styles.imageContainer}>
                            <Image source={require("../assets/images/science.png")} style={styles.image} />
                            <ThemeText style={styles.label}>Science</ThemeText>
                    </View>

                    <View style={styles.imageContainer}>
                            <Image source={require("../assets/images/geography.jpg")} style={styles.image} />
                            <ThemeText style={styles.label}>Geography</ThemeText>
                    </View>

                    <View style={styles.imageContainer}>
                            <Image source={require("../assets/images/history.jpg")} style={styles.image} />
                            <ThemeText style={styles.label}>History</ThemeText>
                    </View>

                    <View style={styles.imageContainer}>
                            <Image source={require("../assets/images/nutrition.jpg")} style={styles.image} />
                            <ThemeText style={styles.label}>Nutrition</ThemeText>
                    </View>

                    <View style={styles.imageContainer}>
                            <Image source={require("../assets/images/agriculture.jpg")} style={styles.image} />
                            <ThemeText style={styles.label}>Agriculture</ThemeText>
                    </View>

                    <View style={styles.imageContainer}>
                            <Image source={require("../assets/images/story.jpg")} style={styles.image} />
                            <ThemeText style={styles.label}>Story</ThemeText>
                    </View>

                </View>

    </ScrollView>

    
    );
}




const styles = StyleSheet.create({

    contentContainer: {
      // padding: 5,
       flexGrow: 1,               
    },
    gridContainer: {

        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent: "space-between",
        padding: 5,
        gap:5,
        minHeight: 600,
    },
    imageContainer: {
        
        width: "48%",                      
        backgroundColor: "#e8f5f2",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,  
        marginTop: 5,

    },
    image: {
        width: 70,
        height: 70,
        marginBottom: 5,
       
       
    },
    label: {
        marginTop: 15,
        fontSize: 16,
        color: "#1e2d2f",
        fontWeight:"bold",
    }
});