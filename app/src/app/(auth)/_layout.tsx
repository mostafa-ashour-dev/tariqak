import { Stack, usePathname, useRouter } from "expo-router";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightTheme } from "styles/styles";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { useAuth } from "context/auth/AuthContext";

export default function AuthLayout() {
  const { loading, nextStep } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && nextStep) {
      const target = `/${nextStep.toLowerCase()}`;

      if (target === "/home") {
        router.replace("/(tabs)/");
        return;
      }

      if (target === "/welcome") {
        return;
      }

      if (pathname === "/reset" || nextStep === null) return;
      if (pathname !== target) {
        router.replace(target);
      }
    }
  }, [loading, nextStep, pathname]);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(lightTheme.colors.background.light);
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="register" options={{ title: "Register" }} />
        <Stack.Screen name="driver_onboarding" options={{ title: "Driver" }} />
        <Stack.Screen name="verify" options={{ title: "Verify" }} />
        <Stack.Screen name="reset" options={{ title: "Reset" }} />
      </Stack>
    </SafeAreaView>
  );
}
