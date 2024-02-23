import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
  hideModelize,
  setSelectedEventIndex,
}) => {
  return (
    <View style={[styles.bottomView]}>
      <View style={styles.bottomContnet}>
        <View pointerEvents="none" style={styles.iconsContainer}>
          <OptionsIcon style={styles.bottomIcon} fill={"transparent"} />
        </View>
        <TouchableOpacity
          onPress={() => {
            requestLocationPermission();
          }}
          style={{
            backgroundColor: "#f5f0f0",
            padding: 5,
            borderRadius: 80,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
            width: 40,
          }}
        >
          <LocateIcon style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContnet}>
        <View pointerEvents="none" style={styles.iconsContainer}>
          <OptionsIcon style={styles.bottomIcon} fill={"transparent"} />
        </View>
        <TouchableOpacity
          onPress={() => {
            modalizeRef.current?.open();
            setHideModelize(false);
            setSelectedEventIndex(0);
          }}
          style={{
            backgroundColor: "#f5f0f0",
            padding: 5,
            borderRadius: 80,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
            width: 40,
          }}
        >
          <OptionsIcon style={styles.bottomIcon} fill={colors.black} />
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
  bottomView: {
    justifyContent: "flex-end",
  },
  bottomContnet: {
    flexDirection: "row",
    marginHorizontal: 10,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  iconsContainer: {
    backgroundColor: "transparent",
    padding: 5,
  },

  bottomIcon: {
    height: 25,
    width: 25,
  },
});
export default BottomEvents;
