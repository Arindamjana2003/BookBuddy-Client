import { ActivityIndicator, Image, useColorScheme, View } from "react-native";

import { Colors } from "@/constants/Colors";
import logo from "@/assets/images/logo.png";
import SplashStyle from "@/styles/SplashStyles";
import ThemeText from "@/components/global/TheamText";
import { useEffect } from "react";
import { router } from "expo-router";

export default function SplashScreen() {
    const theme = useColorScheme() ?? "light";

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.replace("/(tabs)/(toptabs)");
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <View
            style={[
                SplashStyle.container,
                { backgroundColor: Colors[theme].background },
            ]}
        >
            <View style={[SplashStyle.logoContainer]}>
                <Image source={logo} style={[SplashStyle.logo]} />
            </View>

            <View style={[SplashStyle.sloganContainer]}>
                <ActivityIndicator
                    size={"large"}
                    color={Colors[theme].primary}
                />
                <ThemeText
                    style={[
                        SplashStyle.sloganText,
                        { color: Colors[theme].textPrimary },
                    ]}
                >
                    Your companion for every educational need
                </ThemeText>
            </View>
        </View>
    );
}
