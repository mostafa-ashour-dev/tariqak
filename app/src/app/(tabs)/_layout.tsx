import { Tabs } from "expo-router";

export default function TabsLayout() {
    console.log("Tabs Layout mounted");

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" options={{ title: "Homepage" }} />
            <Tabs.Screen name="workshops" options={{ title: "Workshops" }} />
            <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        </Tabs>
    );
}
