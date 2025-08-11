import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppInit from "./AppInit";

export default function RootLayout() {
  return (
    <AppInit>
      <SafeAreaProvider>
        <StatusBar barStyle={"dark-content"} />
        <Stack screenOptions={{ headerShown: false}}>
          <Stack.Screen name="index.tsx" />
        </Stack>
      </SafeAreaProvider>
    </AppInit>
  );
}
