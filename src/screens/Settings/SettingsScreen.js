import {
  View,
  ImageBackground,
  SafeAreaView,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { CommonActions } from "@react-navigation/native";
import commonStyles, { PH10 } from "../../utils/CommonStyles";
import { images } from "../../assets/images";
import { styles } from "./styles";
import sizeHelper from "../../assets/helpers/sizeHelper";
import CustomText from "../../components/CustomText";
import { colors } from "../../utils/colors";
import Button from "../../components/Button";
import { SFCompact } from "../../utils/Fonts";
import { CrossIcon } from "../../assets/SVG/svg";
import Loading from "../../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SettingsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
      await AsyncStorage.getAllKeys()
        .then((keys) => AsyncStorage.multiRemove(keys))
        .then(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  const openEmailApp = () => {
    const email = "info@assemble.fun";

    Linking.openURL(`mailto:${email}`)
      .then(() => console.log("Email app opened"))
      .catch((err) => console.error("Error opening email app:", err));
  };
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <CrossIcon
            onPress={handleGoBack}
            style={styles.icon}
            fill={colors.black}
          />
        </View>
        <View style={styles.textContainer}>
          <CustomText
            color={"transparent"}
            fontSize={16}
            alignSelf="center"
            textAlign="center"
            label="assemble"
          />
        </View>
        <View style={styles.transparent}>
          <CrossIcon style={styles.icon} fill="transparent" />
        </View>
      </View>
    );
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <SafeAreaView style={commonStyles.main}>
          <ImageBackground style={styles.main} source={images.background}>
            <Header />
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                top: sizeHelper.screenWidth > 450 ? "15%" : "20%",
              }}
            >
              <View style={{ margin: 20 }}>
                <CustomText
                  label="Settings"
                  color={colors.black}
                  fontSize={24}
                  fontWeight={"bold"}
                />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <>
                  <Button
                    text={"DELETE ACCOUNT"}
                    color={colors.black}
                    fontSize={17}
                    height={65}
                    width={"70%"}
                    backgroundColor={colors.white}
                    borderRadius={100}
                    margin={20}
                    fontFamily={SFCompact.semiBold}
                    // onPress={SubmitLogin}
                  />
                </>
                <>
                  <Button
                    text={"CONTACT"}
                    color={colors.black}
                    fontSize={17}
                    height={65}
                    width={"70%"}
                    backgroundColor={colors.white}
                    borderRadius={100}
                    margin={20}
                    fontFamily={SFCompact.semiBold}
                    onPress={openEmailApp}
                  />
                </>
                <>
                  <Button
                    text={"LOGOUT"}
                    color={colors.black}
                    fontSize={17}
                    height={65}
                    width={"70%"}
                    backgroundColor={colors.white}
                    borderRadius={100}
                    margin={20}
                    fontFamily={SFCompact.semiBold}
                    onPress={logout}
                  />
                </>
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      )}
    </>
  );
};

export default SettingsScreen;
