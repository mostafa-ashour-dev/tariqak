import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import AuthProvider, { useAuth } from "context/auth/AuthContext";

SplashScreen.preventAutoHideAsync();

function AppContent() {
    const { loading, nextStep } = useAuth();

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const authSteps = ["DRIVER_ONBOARDING", "VERIFY", "LOGIN", "REGISTER"];
    if (authSteps.includes(nextStep as string)) {
        return (
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>
        );
    } else if (nextStep === "HOME") {
        return (
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        );
    } else {
        return (
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        );
    }
}

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        "Cairo-Black": require("../../assets/fonts/Cairo-Black.ttf"),
        "Cairo-Bold": require("../../assets/fonts/Cairo-Bold.ttf"),
        "Cairo-ExtraBold": require("../../assets/fonts/Cairo-ExtraBold.ttf"),
        "Cairo-ExtraLight": require("../../assets/fonts/Cairo-ExtraLight.ttf"),
        "Cairo-Light": require("../../assets/fonts/Cairo-Light.ttf"),
        "Cairo-Medium": require("../../assets/fonts/Cairo-Medium.ttf"),
        "Cairo-Regular": require("../../assets/fonts/Cairo-Regular.ttf"),
        "Cairo-SemiBold": require("../../assets/fonts/Cairo-SemiBold.ttf"),
        "Tajawal-Black": require("../../assets/fonts/Tajawal-Black.ttf"),
        "Tajawal-Bold": require("../../assets/fonts/Tajawal-Bold.ttf"),
        "Tajawal-ExtraBold": require("../../assets/fonts/Tajawal-ExtraBold.ttf"),
        "Tajawal-ExtraLight": require("../../assets/fonts/Tajawal-ExtraLight.ttf"),
        "Tajawal-Light": require("../../assets/fonts/Tajawal-Light.ttf"),
        "Tajawal-Medium": require("../../assets/fonts/Tajawal-Medium.ttf"),
        "Tajawal-Regular": require("../../assets/fonts/Tajawal-Regular.ttf"),
    });

    useEffect(() => {
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded]);
    if (!fontsLoaded) {
        return null;
    }

    return (
        <>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </>
    );
}
