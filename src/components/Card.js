import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import { colors } from "../utils/colors";
import { images } from "../assets/images";
import {
  CustomHeartIcon,
  FillHeartIcon,
  UnFillHeartIcon,
} from "../assets/SVG/svg";
import CustomText from "./CustomText";
import { SFCompact } from "../utils/Fonts";
import FastImage from "react-native-fast-image";
const Card = React.memo(({ item, navigation, onAddFav }) => {
  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };
  function truncateText(text, maxWords) {
    const words = text.split(" ");

    if (words.length > maxWords) {
      const truncatedText = words.slice(0, maxWords).join(" ") + "...";

      return truncatedText;
    } else {
      return text;
    }
  }
  console.log("item", item.event_image);
  return (
    <TouchableOpacity
      key={item._id}
      onPress={() => {
        navigation.navigate("Details", { eventId: item._id });
      }}
      style={styles.cardMain}
    >
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          {item.event_image !== null ? (
            <FastImage
              style={styles.img}
              source={{ uri: item.event_image }}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <Image
              source={images.card}
              resizeMode="contain"
              style={styles.img}
            />
          )}
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.name}>{item.event_title}</Text>

          <View style={styles.eventContainer}>
            <Text style={styles.eventName}>
              {truncateText(item.event_location?.neighborhood, 3)}
            </Text>
            <View style={styles.div} />

            <Text style={styles.date}>{formatDate(item.event_date)}</Text>
          </View>
          <View style={styles.tagsContainer}>
            {Array.isArray(item.event_tags) &&
              item.event_tags.length > 0 &&
              item.event_tags[0].split(",").map((tag) => (
                <ImageBackground
                  key={tag} // Add a unique key for each tag
                  style={styles.tagBody}
                  source={images.smallBox}
                  imageStyle={{ borderRadius: 50 }}
                >
                  <View style={{ padding: 5 }}>
                    <Text style={styles.tagName}>{tag}</Text>
                  </View>
                </ImageBackground>
              ))}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onAddFav(item)}
          style={styles.heartContainer}
        >
          {item.favEvent.isFav === true ? (
            <FillHeartIcon style={{ height: 20, width: 20 }} />
          ) : (
            <UnFillHeartIcon style={styles.fillIcon} fill={"#cfb34e"} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});
const styles = StyleSheet.create({
  cardMain: { marginHorizontal: 10 },
  cardContainer: {
    backgroundColor: "#f5f0f0",
    // width: "100%",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    borderRadius: 10,
    marginVertical: 5,
  },
  imageContainer: { width: "20%" },
  img: { height: 100, width: 80 },
  centerContainer: { width: "70%" },
  name: {
    fontSize: 16,
    //   fontWeight: '700',
    color: colors.black,
    marginHorizontal: 5,
    // textShadowColor: 'rgba(0, 0, 0, 0.65)',
    // textShadowOffset: {width: 2, height: 2},
    // textShadowRadius: 3,
    fontFamily: SFCompact.bold,
  },
  eventContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventName: {
    fontSize: 14,

    color: colors.black,
    marginHorizontal: 5,
    fontFamily: SFCompact.regular,
  },
  div: {
    height: 5,
    width: 5,
    borderRadius: 100,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  date: {
    fontSize: 14,

    color: colors.black,
    marginHorizontal: 5,
    fontFamily: SFCompact.regular,
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    marginHorizontal: 5,
  },
  tagBody: {
    marginHorizontal: 10,
    height: 35,
    width: 55,
    justifyContent: "center",
    alignItems: "center",
    // elevation: 5,
  },
  tagName: {
    fontSize: 12,

    color: colors.black,
    fontFamily: SFCompact.regular,
  },
  heartContainer: {
    width: "8%",
    justifyContent: "center",
    alignItems: "center",
  },
  fillIcon: { height: 24, width: 24 },
});
export default Card;
