import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import commonStyles, { PH10 } from "../../utils/CommonStyles";
import { images } from "../../assets/images";
import CustomText from "../../components/CustomText";
import {
  AppleButton,
  appleAuth,
} from "@invertase/react-native-apple-authentication";

import { IPhoneIcon } from "../../assets/SVG/svg";
import { styles } from "./styles";
import sizeHelper from "../../assets/helpers/sizeHelper";
import { SFCompact } from "../../utils/Fonts";
import { colors } from "../../utils/colors";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import ScreenLoader from "../../components/ScreenLoader";
import { SignUp_Request, User_Login } from "../../api/Requests";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const onPressGoogle = async () => {
    GoogleSignin.configure();
    (await GoogleSignin.isSignedIn()) && (await GoogleSignin.signOut());
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        setIsLoading(true)

        const data = {
          sso_token: userInfo?.user?.id,
          login_type: "google",
          name: userInfo?.user?.name,
          email: userInfo?.user?.email,
        };

        const response = await SignUp_Request(data);

        if (response?.sso_token) {
          setIsLoading(false)

          await AsyncStorage.setItem("@token", response.sso_token);
          navigation.navigate("Home")
        }
        else {
          console.log("error",response)

        }

        // respanseData(userInfo);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("user cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("operation (e.g. sign in) is in progress already");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("play services not available or outdated");
      } else {
        console.log("some other error happened", error);
      }
      // respanseData(null);
    }
    // navigation.navigate("Home");
  };


  const onPressApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    console.log({ credentialState }, appleAuth.State.AUTHORIZED, {
      appleAuthRequestResponse,
    });

    if (credentialState === appleAuth.State.AUTHORIZED) {
     
      const { email, fullName, user } = appleAuthRequestResponse;

      const data = {
        sso_token: user,
        login_type: "apple",
        name: fullName?.givenName,
        email: email,
      };


      const response = await SignUp_Request(data);
      if (response?.sso_token) {
        setIsLoading(false)

        await AsyncStorage.setItem("@token", response.sso_token);
        navigation.navigate("Home")
      }
      else {
        console.log("error",response)

      }
    }
  };

  useEffect(() => {
    const configureGoogleSignIn = async () => {
      GoogleSignin.configure({
        webClientId:
          "153444834280-be509i52m49jlt7l0ds0ic9ucbg5lh0l.apps.googleusercontent.com",
      });
      if (await GoogleSignin.isSignedIn()) {
        await GoogleSignin.signOut();
      }
    };
    configureGoogleSignIn();
  }, []);
  return (
    <>
      <View style={{flex:1,marginVertical: Platform.OS=="ios"? -50:0}}>
        <ImageBackground style={styles.main} source={images.assembleLogin}>
          <ImageBackground
            style={styles.bgImage}
            imageStyle={{
              borderRadius: sizeHelper.screenWidth > 450 ? 60 : 70,
            }}
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
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.touches}
                onPress={onPressGoogle}
              >
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
      </View>

      {isLoading && <ScreenLoader />}
    </>
  );
};

export default LoginScreen;
