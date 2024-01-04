import {
  Image,
  Pressable,
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../utils/colors";
import React, { useState } from "react";
import { images } from "../../assets";
import CustomText from "../CustomText";
import ShadowButton from "../ShadowButton";
import HomeModal from "../HomeModal";

type Props = {
  onPressMenu?: any;
  onPressLiveChat?: any;
  onPressAdd?: any;
  isLiveChat?: boolean;
  isAddButton?: boolean;
  text?: string;
  navigation?: any;
};

const CustomMenu = ({
  onPressMenu,
  onPressLiveChat,
  isLiveChat,
  isAddButton,
  onPressAdd,
  text,
  navigation,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={styles.header}>
      <ShadowButton
        onPress={() => {
          setIsVisible((prev) => !prev);
          onPressMenu && onPressMenu();
        }}
      >
        <Image
          source={images.burgerMenu}
          style={{
            tintColor: isVisible ? colors.primary : null,
            ...styles.menuButton,
          }}
        />
      </ShadowButton>
      {text && (
        <CustomText text={text} fontFam="Arial" size={14} weight={700} />
      )}

      <TouchableOpacity
        activeOpacity={0.6}
        disabled={!isLiveChat}
        onPress={onPressLiveChat}
      >
        {isLiveChat ? (
          <CustomText
            text={"Live Chat"}
            fontFam="Arial"
            weight={700}
            size={14}
          />
        ) : isAddButton ? (
          <ShadowButton onPress={onPressAdd}>
            <Image source={images.add} style={styles.menuButton} />
          </ShadowButton>
        ) : (
          <></>
        )}
      </TouchableOpacity>

      {/* {isAddButton && (
        <ShadowButton onPress={onPressAdd}>
          <Image source={images.add} style={styles.menuButton} />
        </ShadowButton>
      )} */}
      <HomeModal
        isVisible={isVisible}
        navigation={navigation}
        setIsVisible={setIsVisible}
      />
    </View>
  );
};
export default CustomMenu;
const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 25,
    flexDirection: "row",
  },
  menuButton: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
