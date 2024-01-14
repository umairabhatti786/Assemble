import { View, Text, Platform, Linking } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { colors } from "../utils/colors";
import { CalanderIcon, ForwardIcon, LocationIcon } from "../assets/SVG/svg";
import CustomText from "./CustomText";
import { SFCompact } from "../utils/Fonts";

const LocationCard = ({ item }) => {
  const handleMapPress = () => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${item.event_location?.latitude},${item.event_location?.longitude}`;
    const label = `${item.event_location?.address}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  return (
    <TouchableOpacity
    activeOpacity={0.6}
      onPress={handleMapPress}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: 10,
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <View>
          <LocationIcon style={{ height: 22, width: 22 }} />
        </View>
        <View style={{ marginHorizontal: 10,width:"85%", }}>
          <CustomText
            label={
              item.event_location?.venue_name
                ? item.event_location.venue_name
                : ""
            }
            color={"#120D26"}
            fontFamily={SFCompact.light}
            fontSize={17}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{marginLeft:5}}>
              <CustomText
                label={item.event_location?.neighborhood}
                color={"#1C1916"}
                fontFamily={SFCompact.light}
                fontSize={13}
              />
            </View>
            <View
              style={{
                height: 5,
                width: 5,
                borderRadius: 100,
                backgroundColor: "#f5f5f5",
                justifyContent: "center",
                // marginHorizontal: 10,
              }}
            />
            <View style={{width:"70%"}}>
              <CustomText
              numberOfLines={2}
          
                label={
                  item.event_location?.address
                    ? item.event_location.address
                    : ""
                }
                color={"#1C1916"}
                fontFamily={SFCompact.light}
                fontSize={13}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ForwardIcon style={{ height: 20, width: 20 }} />
      </View>
    </TouchableOpacity>
  );
};

export default LocationCard;
