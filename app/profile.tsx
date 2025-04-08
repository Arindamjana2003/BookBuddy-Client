import { StyleSheet, Text, View ,useColorScheme,Image, TouchableOpacity, Pressable} from "react-native";
import React from "react";
import ThemeText from "@/components/global/TheamText";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fonts } from "@/constants/Fonts";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { Colors } from "@/constants/Colors";

const Profile = () => {

    const theme = Colors[useColorScheme()??"light"]
    return (
       <ScrollView style={[GlobalStyle.container,{backgroundColor:theme.background}]}>   
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/women/68.jpg' }}
                    style={styles.avatar}
                />
                <ThemeText style={styles.name}>Srilekha Mondal</ThemeText>
                <ThemeText style={styles.bio}>A book is a gift you can open again and again</ThemeText>

                <View style={styles.actions}>

                    <TouchableOpacity style={styles.editProfileButton}>
                      <ThemeText style={styles.editProfileText}>Edit  Profile</ThemeText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton}>
                      <ThemeText style={styles.logoutText}>Logout</ThemeText>
                    </TouchableOpacity>
                    
                </View>
            </View>


            <View style={styles.yourUploads}> 

              <View style={styles.uploadTitle}>
                <ThemeText size={20} font={Fonts.PoppinsBold}> Your uploads </ThemeText>
                <Pressable>
                  <ThemeText size={15} font={Fonts.PoppinsRegular} color="black">See all</ThemeText>
                </Pressable>
              </View>


            </View>
       </ScrollView>
    );
};

export default Profile;



const styles = StyleSheet.create({
     
    profileHeader: {
      alignItems: 'center',
      padding: 20,
    },
    avatar: {
      height: 90,
      width: 90,
      borderRadius: 45,
    },
    name: {
      fontSize: 25,
      fontFamily: "PoppinsBold",
      marginTop: 10,
      color : '#379d7e'
      
    },
    bio: {
      fontSize: 15,
      textAlign: 'center',
      marginTop: 4,
      color: 'black',
      paddingHorizontal: 10,
      fontFamily: "PoppinsRegular",

    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,
      //paddingHorizontal: 20,
      gap: 30, 
     
     
    },
    editProfileButton: {
      backgroundColor: 'black',
      // paddingVertical: 15,
      // paddingHorizontal: 40,
      borderRadius: 8,
      flexGrow: 1, 
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8, 
      height:40,
      width:'55%',
    },
    editProfileText: {
      fontSize: 16,
      color: 'white',
      fontFamily: 'PoppinsBold',
      textAlign: 'center',
    },
    logoutButton: {
      backgroundColor: 'red',
      // paddingVertical: 15,
      // paddingHorizontal: 30,
      borderRadius:8,
      flexGrow: 1, 
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8, 
      height:40,
      width:'20%',
    },
    logoutText: {
      fontSize: 16,
      color: 'white',
      fontFamily: 'PoppinsBold',
      textAlign: 'center',
    },
   
    yourUploads: {
      paddingHorizontal: 16,
      paddingBottom: 30,
    },
    uploadTitle: {
      flex:1,
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      // marginHorizontal : 20 ,
       gap:25,
    },
    
});