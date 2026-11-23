import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppSelector } from "../../src/redux/hooks";
import { COLORS } from "../../src/styles/tokens";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const favoriteCount = useAppSelector(
    (state) => state.diary.entries.filter((entry) => entry.liked).length
  );

  // Berikan padding bawah yang cukup agar tidak tertutup navigation bar Android (3 tombol) maupun gesture bar
  const bottomPadding = Math.max(insets.bottom, Platform.OS === "android" ? 20 : 12) + 8;
  const tabHeight = 60 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: [
          styles.tabBar,
          {
            height: tabHeight,
            paddingBottom: bottomPadding,
          },
        ],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconWrapper,
                focused && styles.iconWrapperActive,
              ]}
            >
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={22}
                color={focused ? COLORS.primary : COLORS.muted}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Tambah",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconWrapper,
                focused && styles.iconWrapperActive,
              ]}
            >
              <Ionicons
                name={focused ? "add-circle" : "add-circle-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.muted}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorite",
          tabBarBadge: favoriteCount > 0 ? favoriteCount : undefined,
          tabBarBadgeStyle: styles.badge,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconWrapper,
                focused && styles.iconWrapperActive,
              ]}
            >
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={22}
                color={focused ? COLORS.danger : COLORS.muted}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    elevation: 12,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  tabBarItem: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 2,
  },
  iconWrapper: {
    width: 48,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapperActive: {
    backgroundColor: COLORS.primaryLight,
  },
  badge: {
    backgroundColor: COLORS.danger,
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    lineHeight: 14,
    top: 4,
  },
});
