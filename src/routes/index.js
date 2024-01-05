import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";
import AppStack from "./AppStack/AppStack";
const RootNavigator = () => {
  const Stack = createStackNavigator();
  const isLogin = true;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"AppStack"}
      >
        <>
          <Stack.Screen name="AppStack" component={AppStack} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
