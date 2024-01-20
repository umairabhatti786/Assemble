import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { LocateIcon, OptionsIcon } from "../assets/SVG/svg";
import sizeHelper from "../assets/helpers/sizeHelper";
import { colors } from "../utils/colors";

const BottomEvents = ({
  modalizeRef,
  setHideModelize,
  flatListRef,
  eventss,
  renderItemBottom,
  onScroll,
  selectedEventIndex,
  getItemLayout,
  requestLocationPermission,
}) => {
  return (
    <View style={styles.bottomView}>
      <View style={styles.bottomContnet}>
        <TouchableOpacity
        activeOpacity={0.6}
         style={styles.iconsContainer}>
          <OptionsIcon
            onPress={() => {
              modalizeRef.current?.open();
              setHideModelize(false);
            }}
            style={styles.bottomIcon}
            fill={"transparent"}
          />
        </TouchableOpacity>
        <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          modalizeRef.current?.open();
          setHideModelize(false);
        }}
          style={{
            backgroundColor: "#f5f0f0",
            padding: 5,
            borderRadius: 80,
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            width: 50,
          }}
        >
          <LocateIcon
            onPress={() => {
              requestLocationPermission();
            }}
            style={styles.bottomIcon}
          />
        </View>
      </View>
      <View style={styles.bottomContnet}>
        <View style={styles.iconsContainer}>
          <OptionsIcon
            onPress={() => {
              modalizeRef.current?.open();
              setHideModelize(false);
            }}
            style={styles.bottomIcon}
            fill={"transparent"}
          />
        </View>
        <View
          style={{
            backgroundColor: "#f5f0f0",
            padding: 5,
            borderRadius: 80,
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            width: 50,
          }}
        >
          <OptionsIcon
            onPress={() => {
              modalizeRef.current?.open();
              setHideModelize(false);
            }}
            style={styles.bottomIcon}
            fill={colors.black}
          />
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          ref={flatListRef}
          data={eventss}
          keyExtractor={(item, index) => item?._id.toString()}
          renderItem={renderItemBottom}
          horizontal={true}
          onScroll={onScroll}
          getItemLayout={getItemLayout}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomView: { flex: 1, justifyContent: "flex-end" },
  bottomContnet: {
    flexDirection: "row",
    marginHorizontal: 10,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  iconsContainer: {
    backgroundColor: "transparent",
    padding: sizeHelper.screenWidth > 450 ? 5 : 5,
  },

  bottomIcon: {
    height: 30,
    width: 30,
  },
});
export default BottomEvents;
