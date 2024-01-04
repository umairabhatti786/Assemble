import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomMenu from "../../../components/CustomMenu";
import { colors } from "../../../utils/colors";
import CustomSearch from "../../../components/CustomSearch";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { images } from "../../../assets";
import { trendingBlog } from "../../../utils/Data";
import ShadowButton from "../../../components/ShadowButton";
import CustomActions from "../../../components/CustomActions";
import TabSelection from "../../../components/TabSelection";
import PostOne from "../../../components/PostOne";
import PostTwo from "../../../components/PostTwo";
import PostThree from "../../../components/PostThree";
import PostFour from "../../../components/PostFour";
import CustomView from "../../../components/CustomView";
import PostFive from "../../../components/PostFive";
import { useRoute } from "@react-navigation/native";
import ProfileSocialButton from "./ProfileSocialButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
type Props = {
  navigation?: any;
  items?: any;
};

const Profile = ({ navigation }: Props) => {
  const route = useRoute();
  const item = route?.params?.item;
  const image = route?.params?.item?.image;
  const title = route?.params?.item?.title;
  console.log(image, title);
  const [isLogin, setIslogin] = useState("");

  const [isFolowing, setIsFolowing] = useState("+");
  const [selectedTab, setSelectedTab] = useState<any>("Profile");
  useEffect(() => {
    getIslogin();
  });
  const getIslogin = async () => {
    const res = await AsyncStorage.getItem("isLogin");
    setIslogin(res);
  };
  return (
    <ScreenLayout style={{}}>
      <View style={styles.container}>
        <CustomMenu
          navigation={navigation}
          text="Profile"
          isAddButton
          onPressLiveChat={() => {
            navigation.navigate("LiveChat");
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: "40%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={image || images.profile2}
              style={{
                width: 120,
                height: 120,
                resizeMode: "cover",
                borderRadius: 99,
              }}
            />
            <CustomText
              text={title || "Showblock"}
              size={18}
              weight={700}
              fontFam="Arial"
              style={{ marginTop: 15 }}
            />
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <View>
              <Pressable
                onPress={() => {
                  setIsFolowing((prev) => (prev === "+" ? "-" : "+"));
                }}
                style={{ flex: 2 }}
              >
                <CustomText
                  text={isFolowing}
                  weight={500}
                  size={50}
                  fontFam="Arial"
                  color={colors.primary}
                  style={{ marginTop: "7%", marginLeft: 12 }}
                />
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "center",
              }}
            >
              <ProfileSocialButton
                borderColor={colors.primary}
                icon={images.chat}
                bgColor={colors.white}
                onPress={() => {
                  navigation.navigate("ChatMessageList", {
                    image: image,
                    title: title,
                  });
                }}
              />
              <ProfileSocialButton
                borderColor={colors.primary}
                icon={images.call1}
                bgColor={colors.primary}
                onPress={() => {
                  navigation.navigate("VoiceCall", { image: image });
                }}
              />
              <ProfileSocialButton
                borderColor={colors.primary}
                icon={images.video}
                bgColor={colors.white}
                imageStyle={{
                  tintColor: colors.primary,
                }}
                onPress={() => {
                  navigation.navigate("VideoCall", { image: image });
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15,
            paddingLeft: 35,
          }}
        >
          <CustomText
            text={"+250,456"}
            size={18}
            weight={500}
            fontFam={font.inter}
          />
          <ShadowButton style={{ width: "60%", height: 40 }}>
            <CustomText
              text={"Blockchaingo.io"}
              size={18}
              weight={500}
              fontFam={font.inter}
            />
          </ShadowButton>
        </View>
        <View style={styles.description}>
          <CustomText
            text={"+Blockchain "}
            weight={500}
            size={16}
            fontFam="Arial"
            color={colors.primary}
          />
          <CustomText
            text={" is a Web3 platform for the Block"}
            weight={700}
            size={16}
            fontFam="Arial"
          />
          <CustomText
            text={"helps companies get from A - Z."}
            weight={700}
            size={16}
            fontFam="Arial"
            style={{ marginTop: 5 }}
          />
        </View>
        <TabSelection
          data={["Profile", "Forums", "Blocks"]}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {selectedTab === "Profile" ? (
          <>
            <PostOne />
            <PostTwo />
          </>
        ) : selectedTab === "Forums" ? (
          <>
            <PostThree />
            <PostFour />
          </>
        ) : (
          <>
            <PostOne />
            <PostFive />
          </>
        )}
      </View>
    </ScreenLayout>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginBottom: 20,
  },
  description: {
    width: "100%", // Set a specific width or adjust as needed
    flexDirection: "row", // Ensure items are in a row
    flexWrap: "wrap", // Allow text to wrap to the next line
    marginTop: 15,
  },
  menuButton: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
});
