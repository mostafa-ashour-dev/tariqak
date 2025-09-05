import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightTheme } from "styles/styles";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "react-native";
import { useAuth } from "context/auth/AuthContext";

export default function TabsLayout() {
    const { nextStep } = useAuth();
    const router = useRouter();
    useEffect(() => {
        NavigationBar.setBackgroundColorAsync(
            lightTheme.colors.background.light
        );
        NavigationBar.setButtonStyleAsync("dark");
    }, []);
    if (nextStep === "WELCOME") {
        router.replace("welcome");
    }
    console.log(`tabs group mounted, ${nextStep}`);
    return (
        <SafeAreaView
            edges={["bottom", "top"]}
            style={{
                flex: 1,
                backgroundColor: lightTheme.colors.background.nav,
            }}
        >
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor="transparent"
                hidden={false}
            />
            <Tabs
                initialRouteName="index"
                screenOptions={{ headerShown: false }}
            >
                <Tabs.Screen name="index" options={{ title: "Homepage" }} />
                <Tabs.Screen
                    name="workshops"
                    options={{ title: "Workshops" }}
                />
                <Tabs.Screen name="profile" options={{ title: "Profile" }} />
            </Tabs>
        </SafeAreaView>
    );
}
