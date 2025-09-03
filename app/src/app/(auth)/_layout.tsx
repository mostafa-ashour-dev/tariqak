import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightTheme } from "styles/styles";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

export default function AuthLayout() {
    useEffect(() => {
        NavigationBar.setBackgroundColorAsync(
            lightTheme.colors.background.light
        );
        NavigationBar.setButtonStyleAsync("dark");
    }, []);
    return (
        <SafeAreaView
            edges={["bottom", "top"]}
            style={{
                flex: 1,
                backgroundColor: lightTheme.colors.background.light,
            }}
        >
            <StatusBar barStyle={"dark-content"} />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" options={{ title: "Login" }} />
                <Stack.Screen name="register" options={{ title: "Register" }} />
            </Stack>
        </SafeAreaView>
    );
}
