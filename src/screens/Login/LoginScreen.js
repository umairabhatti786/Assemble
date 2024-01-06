import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import React from "react";
import commonStyles, { PH10 } from "../../utils/CommonStyles";
import { images } from "../../assets/images";
import CustomText from "../../components/CustomText";

import { IPhoneIcon } from "../../assets/SVG/svg";
import { styles } from "./styles";
import sizeHelper from "../../assets/helpers/sizeHelper";
import { SFCompact } from "../../utils/Fonts";
import { colors } from "../../utils/colors";

const LoginScreen = ({ navigation }) => {
  const onPressGoogle = () => {
    navigation.navigate("Home");
  };
  const onPressApple = () => {
    console.log("calling onPressApple", navigation);
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={commonStyles.main}>
      <ImageBackground style={styles.main} source={images.assembleLogin}>
        <ImageBackground
          style={styles.bgImage}
          imageStyle={{ borderRadius: sizeHelper.screenWidth > 450 ? 60 : 70 }}
          source={images.bigBox}
        >
          <ImageBackground style={styles.sBox} source={images.smallBox}>
            <View style={{ bottom: 5 }}>
              <CustomText
                color={colors.black}
                fontSize={12}
                alignSelf="center"
                textAlign="center"
                label="Login or signup"
                fontFamily={SFCompact.semiBold}
              />
            </View>
          </ImageBackground>
          <View style={styles.container}>
            {Platform.OS === "ios" ? null : (
              <TouchableOpacity style={styles.touches} onPress={onPressGoogle}>
                <View style={styles.innerView}>
                  <Image
                    source={images.GoogleLogo}
                    style={{ height: 50, width: 50 }}
                  />
                </View>
                <View>
                  <View>
                    <CustomText
                      color={"#B2B2B2"}
                      fontSize={12}
                      alignSelf="center"
                      textAlign="center"
                      label="Continue with Google"
                      fontFamily={SFCompact.regular}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.touches} onPress={onPressApple}>
              <View style={styles.innerView}>
                <IPhoneIcon style={{ height: 40, width: 40 }} />
              </View>
              <View>
                <View>
                  <CustomText
                    color={"#B2B2B2"}
                    fontSize={12}
                    alignSelf="center"
                    textAlign="center"
                    label="Continue with Apple"
                    fontFamily={SFCompact.regular}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;
