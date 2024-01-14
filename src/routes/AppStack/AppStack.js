import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/Login/LoginScreen";
import HomeScreen from "../../screens/Home/HomeScreen";
import SettingsScreen from "../../screens/Settings/SettingsScreen";
import DetailsScreen from "../../screens/Details/DetailsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AllFavEvents from "../../screens/AllFavEvents/AllFavEvents";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "../../redux/reducers/authReducer";

const AppStack = () => {
  const Stack = createStackNavigator();
  // const [userToken, setUserToken] = useState("");
  const [isLoading,setIsLoading]=useState(true)
const dispatch=useDispatch()
const userToken=useSelector(state=>state.auth).userToken
console.log("userTokenuserToken",userToken)

  useEffect(() => {
    getUserToken();
  }, []);

  const getUserToken = async () => {
    let token = await AsyncStorage.getItem("@token");
    dispatch(setUserToken(token))
    // setUserToken(token);
    setIsLoading(false)
    // console.log("UserToken",ressss)
  };
  if(isLoading){
    return(<Loading/>)
  }

  return  (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userToken ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="AllFavEvents" component={AllFavEvents} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
