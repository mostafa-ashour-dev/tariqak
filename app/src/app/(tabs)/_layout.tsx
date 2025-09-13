import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightTheme } from "styles/styles";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "react-native";
import { useAuth } from "context/auth/AuthContext";
import TabBarButton from "components/ui/TabBarButton";

export default function TabsLayout() {
    const { nextStep } = useAuth();
  
    console.log(`tabs mounted, ${nextStep}`);

      useEffect(() => {
        NavigationBar.setBackgroundColorAsync("transparent");
        NavigationBar.setButtonStyleAsync("dark");
        StatusBar.setBarStyle("dark-content");
        StatusBar.setHidden(false);
        StatusBar.setBackgroundColor("transparent");
      }, []);
    return (
      <SafeAreaView
        edges={["bottom"]}
        style={{
          flex: 1,
          backgroundColor: lightTheme.colors.background.nav,
          paddingTop: 30,
        }}
      >
        <Tabs
          initialRouteName="index"
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: lightTheme.colors.primary,
            tabBarInactiveTintColor: lightTheme.colors.text.light,
            tabBarStyle: {
              backgroundColor: lightTheme.colors.background.nav,
              borderTopColor: lightTheme.colors.border.gray,
              borderTopWidth: 1,
              elevation: 0,
              shadowOpacity: 0,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 0,
              height: 60,
              flexDirection: "row",
              paddingTop: 20,
              alignItems: "center",
              justifyContent: "space-around",
              position: "absolute",
              zIndex: 1,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, ...props }) => {
                return <TabBarButton icon="home" active={focused} {...props} />;
              },
            }}
          />
          <Tabs.Screen
            name="maps"
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, ...props }) => {
                return <TabBarButton icon="map" active={focused} {...props} />;
              },
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, ...props }) => {
                return <TabBarButton icon="user" active={focused} {...props} />;
              },
            }}
          />
          <Tabs.Screen
            name="workshops"
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, ...props }) => {
                return (
                  <TabBarButton icon="toolbox" active={focused} {...props} />
                );
              },
            }}
          />
          <Tabs.Screen
            name="gas-stations"
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, ...props }) => {
                return (
                  <TabBarButton icon="gas-pump" active={focused} {...props} />
                );
              },
            }}
          />{" "}
        </Tabs>
        
      </SafeAreaView>
    );
}
