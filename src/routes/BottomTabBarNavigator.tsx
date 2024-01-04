import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Platform, Text, View } from "react-native";
import { images } from "../assets";
import { colors } from "../utils/colors";
import Home from "../screen/main/Home";
import React from "react";
import Profile from "../screen/main/Profile";
import LiveChat from "../screen/main/LiveChat";
import CustomText from "../components/CustomText";
import Chat from "../screen/main/Chat";
import HomeStack from "./HomeStack";
import Payment from "../screen/main/Payment";
// ... (other imports)

const BottomNavigator = ({ navigation }: any) => {
  const Bottom = createBottomTabNavigator();

  return (
    <Bottom.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.primary,
        tabBarIconStyle: {
          borderRadius: 13,
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#121111",
          height: Platform.OS === "ios" ? 70 : 60,
          borderRadius: 13,
          position: "absolute",
          paddingHorizontal: "10%",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          borderTopColor: "#121111",
        },
      }}
    >
      <Bottom.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  width: "70%",
                  height: "100%",
                  backgroundColor: "rgba(	242, 138, 238,0.2)",
                  borderTopColor: colors.primary,
                  borderTopWidth: 3.5,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Image
                  source={focused ? images.home : images.home2}
                  style={{ height: 18, width: 18, resizeMode: "contain" }}
                />
                <CustomText
                  text={"Block"}
                  color={colors.primary}
                  weight={700}
                />
              </View>
            ) : (
              <Image
                source={focused ? images.home : images.home2}
                style={{ height: 25, width: 25, resizeMode: "contain" }}
              />
            ),
        }}
      />
      <Bottom.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  width: "70%",
                  height: "100%",
                  backgroundColor: "rgba(	242, 138, 238,0.2)",
                  borderTopColor: colors.primary,
                  borderTopWidth: 3.5,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Image
                  source={focused ? images.graph : images.graph2}
                  style={{ height: 20, width: 20, resizeMode: "contain" }}
                />
                <CustomText text={"Chat"} color={colors.primary} weight={700} />
              </View>
            ) : (
              <Image
                source={focused ? images.graph : images.graph2}
                style={{ height: 27, width: 27, resizeMode: "contain" }}
              />
            ),
        }}
      />
      <Bottom.Screen
        name="Payments"
        component={Payment}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  width: "70%",
                  height: "100%",
                  backgroundColor: "rgba(	242, 138, 238,0.2)",
                  borderTopColor: colors.primary,
                  borderTopWidth: 3.5,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Image
                  source={focused ? images.user : images.user2}
                  style={{ height: 20, width: 20, resizeMode: "contain" }}
                />
                <CustomText
                  text={"Payments"}
                  color={colors.primary}
                  weight={700}
                />
              </View>
            ) : (
              <Image
                source={focused ? images.user : images.user2}
                style={{ height: 27, width: 27, resizeMode: "contain" }}
              />
            ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;
