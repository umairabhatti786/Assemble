import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LiveChat from "../../screen/main/LiveChat";
import Profile from "../../screen/main/Profile";
import Home from "../../screen/main/Home";
export const navigationContainerRef = React.createRef();
const HomeStack = () => {

  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        // initialRouteName='Login'
      >
                <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="LiveChat" component={LiveChat} />
        <Stack.Screen name="Profile" component={Profile} />
      
      </Stack.Navigator>
  );
};

export default HomeStack;
