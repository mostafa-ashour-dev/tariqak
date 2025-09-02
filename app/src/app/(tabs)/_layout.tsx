import { Tabs } from "expo-router";

export default function TabsLayout() {

    return (
      <Tabs initialRouteName="index" screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="index" options={{ title: "Homepage" }} />
        <Tabs.Screen name="workshops" options={{ title: "Workshops" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    );
}
