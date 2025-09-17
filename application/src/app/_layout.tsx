import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Cairo
    "Cairo-Black": require("../../assets/fonts/Cairo-Black.ttf"),
    "Cairo-Bold": require("../../assets/fonts/Cairo-Bold.ttf"),
    "Cairo-ExtraBold": require("../../assets/fonts/Cairo-ExtraBold.ttf"),
    "Cairo-ExtraLight": require("../../assets/fonts/Cairo-ExtraLight.ttf"),
    "Cairo-Light": require("../../assets/fonts/Cairo-Light.ttf"),
    "Cairo-Medium": require("../../assets/fonts/Cairo-Medium.ttf"),
    "Cairo-Regular": require("../../assets/fonts/Cairo-Regular.ttf"),
    "Cairo-SemiBold": require("../../assets/fonts/Cairo-SemiBold.ttf"),
    // Tajawal
    "Tajawal-Black": require("../../assets/fonts/Tajawal-Black.ttf"),
    "Tajawal-Bold": require("../../assets/fonts/Tajawal-Bold.ttf"),
    "Tajawal-ExtraBold": require("../../assets/fonts/Tajawal-ExtraBold.ttf"),
    "Tajawal-ExtraLight": require("../../assets/fonts/Tajawal-ExtraLight.ttf"),
    "Tajawal-Light": require("../../assets/fonts/Tajawal-Light.ttf"),
    "Tajawal-Medium": require("../../assets/fonts/Tajawal-Medium.ttf"),
    "Tajawal-Regular": require("../../assets/fonts/Tajawal-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="contact" options={{ headerShown: false }} />
    </Stack>
  );
}
