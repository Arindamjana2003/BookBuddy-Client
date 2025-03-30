import {
    LayoutChangeEvent,
    StyleSheet,
    useColorScheme,
    View,
} from "react-native";
// import { useLinkBuilder } from "@react-navigation/native";
// import { Text, PlatformPressable } from "@react-navigation/elements";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Colors } from "@/constants/Colors";
import { dvw } from "@/constants/Dimension";
import TabBarButton from "./TabBarButton";
import { useEffect, useState } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

export default function TabBar({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];

    // const { buildHref } = useLinkBuilder();

    const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

    const buttonWidth = dimensions.width / state.routes.length;

    const onTabbarLayout = (e: LayoutChangeEvent) => {
        setDimensions({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width,
        });
    };

    const tabPositionX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tabPositionX.value }],
        };
    });

    return (
        <View
            onLayout={onTabbarLayout}
            style={[
                styles.tabbar,
                {
                    backgroundColor: theme.background,
                    marginHorizontal: dvw * 0.19,
                    borderColor: theme.surface,
                },
            ]}
        >
            <Animated.View
                style={[
                    {
                        position: "absolute",
                        borderRadius: 50,
                        backgroundColor: theme.primary,
                        height: dimensions.height - 10,
                        width: buttonWidth - 20,
                        marginHorizontal: 10,
                    },
                    animatedStyle,
                ]}
            />
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    tabPositionX.value = withSpring(buttonWidth * index, {
                        duration: 1500,
                    });
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routeName={route.name}
                        label={label}
                    />
                    // <PlatformPressable
                    //     href={buildHref(route.name, route.params)}
                    //     accessibilityState={isFocused ? { selected: true } : {}}
                    //     accessibilityLabel={options.tabBarAccessibilityLabel}
                    //     testID={options.tabBarButtonTestID}
                    //     onPress={onPress}
                    //     onLongPress={onLongPress}
                    //     style={[styles.tabBarItem]}
                    //     key={route.name}
                    // >
                    //     {icons[route.name]({
                    //         color: isFocused
                    //             ? theme.primaryVariant
                    //             : theme.gray,
                    //     })}
                    //     <Text
                    //         style={{
                    //             color: isFocused
                    //                 ? theme.primaryVariant
                    //                 : theme.gray,
                    //         }}
                    //     >
                    //         {label}
                    //     </Text>
                    // </PlatformPressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabbar: {
        position: "absolute",
        bottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 80,
        paddingVertical: 10,
        borderRadius: 35,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 2,
        borderWidth: 1,
    },
    tabBarItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
});
