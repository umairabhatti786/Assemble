import { StatusBar } from "react-native";

import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/Login/LoginScreen";
import HomeScreen from "../../screens/Home/HomeScreen";
import SettingsScreen from "../../screens/Settings/SettingsScreen";
import DetailsScreen from "../../screens/Details/DetailsScreen";

const AppStack = ({ navigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="settings" component={SettingsScreen} />
      <Stack.Screen name="details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
