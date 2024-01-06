import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { OptionsIcon } from "../assets/SVG/svg";
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
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: selectedEventIndex,
        animated: false,
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [selectedEventIndex]);
  const getItemLayout = (data, index) => ({
    length: 100, // Assuming item height is 100, adjust accordingly
    offset: 100 * index,
    index,
  });
  return (
    <View style={styles.bottomView}>
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
            borderRadius: 100,
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
        </View>
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
    height: sizeHelper.screenWidth > 450 ? 50 : 40,
    width: sizeHelper.screenWidth > 450 ? 50 : 40,
    borderRadius: 100,
  },
});
export default BottomEvents;
