import { Tabs } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightTheme } from "styles/styles";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "react-native";

export default function TabsLayout() {
    useEffect(() => {
        NavigationBar.setBackgroundColorAsync(
            lightTheme.colors.background.light
        );
        NavigationBar.setButtonStyleAsync("dark");
    }, []);
    console.log("tabs mounted");
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
        <Tabs initialRouteName="index" screenOptions={{ headerShown: false }}>
          <Tabs.Screen name="index" options={{ title: "Homepage" }} />
          <Tabs.Screen name="workshops" options={{ title: "Workshops" }} />
          <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        </Tabs>
      </SafeAreaView>
    );
}
