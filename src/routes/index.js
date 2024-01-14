import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";

import AppStack from "./AppStack/AppStack";
import Loading from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RootNavigator = () => {
  const [user, setUser] = useState(null); // Set user to null initially
  const Stack = createStackNavigator();
  const [isLoading,setisLoading]=useState(true)
  





  return  (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        // initialRouteName={user ? "Home" : "AppStack"} // Change "Login" to the actual login screen name
      >
        <Stack.Screen name="AppStack" component={AppStack} />
        {/* Add your Login screen here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
