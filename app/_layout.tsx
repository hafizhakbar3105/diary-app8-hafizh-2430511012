import { useEffect } from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { store } from "../src/redux/store";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...Ionicons.font,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="detail/[id]"
            options={{
              title: "Detail Diary",
            }}
          />

          <Stack.Screen
            name="edit/[id]"
            options={{
              title: "Edit Diary",
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}
