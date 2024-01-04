import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import { colors } from "../../../utils/colors";
import CustomText from "../../../components/CustomText";
import { font } from "../../../utils/font";
import { chatList } from "../../../utils/Data";
import CustomModal from "../../../components/CustomModal";
import CustomButton from "../../../components/CustomButton";

const LiveChat = ({ navigation }: any) => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <ScreenLayout style={{}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <CustomText
            text={"Live Chat"}
            size={22}
            weight={700}
            fontFam="Poppins"
          />
        </View>
        <FlatList
          data={chatList}
          contentContainerStyle={{
            gap: 20,
            marginTop: "20%",
          }}
          scrollEnabled={false}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => {
                  setModalVisible(true);
                }}
                style={styles.chatList}
              >
                <Image style={styles.image} source={item?.image} />
                <View style={styles.chat}>
                  {item?.title && (
                    <CustomText
                      text={item?.title}
                      weight={700}
                      fontFam="Arial"
                    />
                  )}
                  <View style={styles.description}>
                    <CustomText
                      text={item?.first}
                      weight={700}
                      size={16}
                      fontFam="Arial"
                      color={colors.primary}
                    />
                    <CustomText
                      text={item?.second}
                      weight={700}
                      size={16}
                      fontFam="Arial"
                    />
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
      <CustomModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        height={180}
        width={"70%"}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <CustomText
            text={"Would you like to login?"}
            weight={700}
            size={16}
            fontFam={font.inter}
          />
          <CustomButton
            text="Next"
            height={38}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate("Register");
            }}
            width={120}
            borderRadius={32}
            style={{ marginTop: 30 }}
          />
        </View>
      </CustomModal>
    </ScreenLayout>
  );
};

export default LiveChat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: "11%",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  chatList: {
    width: "100%",
    height: 67,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#040404",
    elevation: 30,
  },
  chat: {
    alignItems: "flex-start",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 99,
    marginRight: 15,
    marginLeft: 5,
  },
  description: {
    flexDirection: "row",
    gap: 5,
    width: 300,
    flexWrap: "wrap",
  },
});
