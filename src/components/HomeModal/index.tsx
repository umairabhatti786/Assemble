import React, { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CustomText from "../CustomText";
import CustomView from "../CustomView";
import { colors } from "../../utils/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  isVisible?: boolean;
  navigation?: any;
  setIsVisible?: any;
};

const HomeModal = ({ isVisible, navigation, setIsVisible }: Props) => {
  const [isLogin, setIsLogin] = useState<any>("");

  useEffect(() => {
    getIslogin();
  });
  console.log("isLogin", isLogin);

  const getIslogin = async () => {
    const res = await AsyncStorage.getItem("isLogin");
    setIsLogin(res);
  };

  const goTo = (x: any) => {
    setIsVisible(false);
    navigation.navigate(x);
  };
  return (
    isVisible && (
      <CustomView
        angles={130}
        outerStyle={{
          position: "absolute",
          top: 50,
          left: -25,
          zIndex: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        height={550}
        width={250}
        innerButtonStyle={{
          paddingTop: 30,
          paddingLeft: 25,
          gap: 15,
        }}
      >
        {isLogin == "disActive" ? (
          <>
            <Pressable>
              <CustomText
                text={"Guide"}
                size={22}
                weight={700}
                color={colors.primary}
                style={{ marginBottom: 30 }}
              />
            </Pressable>

            <TouchableOpacity
              style={styles.textContainer}
              activeOpacity={0.6}
              onPress={async () => {
                await AsyncStorage.removeItem("isLogin");

                goTo("Register");
              }}
            >
              <CustomText
                text={"Login"}
                size={16}
                weight={700}
                fontFam="Arial"
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Pressable>
              <CustomText
                text={"Guide"}
                size={22}
                weight={700}
                color={colors.primary}
                style={{ marginBottom: 30 }}
              />
            </Pressable>
            <TouchableOpacity
            activeOpacity={0.6}
              onPress={() => {
                goTo("Profile");
              }}
            >
              <CustomText
                text={"Profile"}
                size={16}
                weight={700}
                fontFam="Arial"
              />
            </TouchableOpacity>
            <Pressable onPress={() => goTo("Admins")}>
              <CustomText
                text={"Admins"}
                size={16}
                weight={700}
                fontFam="Arial"
              />
            </Pressable>
            <TouchableOpacity 
            activeOpacity={0.6}
            onPress={() => goTo("InviteFriends")}>
              <CustomText
                text={"Invite Friends"}
                size={16}
                weight={700}
                fontFam="Arial"
              />
            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.6}
             onPress={() => goTo("TermsConditions")}>
              <CustomText
                text={"Privacy Policy"}
                size={16}
                weight={700}
                fontFam="Arial"
              />
            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.6}
             onPress={() => goTo("Home")}>
              <CustomText
                text={"All Blocks"}
                size={16}
                weight={700}
                fontFam="Arial"
              />
            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.6}
             onPress={() => goTo("Settings")}>
              <CustomText
                text={"Settings"}
                size={16}
                weight={700}
                fontFam="Arial"
              />
            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.6}
             onPress={() => goTo("Lock")}>
              <CustomText
                text={"Lock"}
                size={16}
                weight={700}
                fontFam="Arial"
              />
            </TouchableOpacity>
          </>
        )}
      </CustomView>
    )
  );
};
export default HomeModal;

const styles = StyleSheet.create({
  textContainer: {
    width: 100,
    height: 20,
    justifyContent: "center",
  },
});
