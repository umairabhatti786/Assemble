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

const Payment = ({ navigation }) => {
  return (
    <ScreenLayout style={{}}>
      <View style={styles.container}></View>
    </ScreenLayout>
  );
};

export default Payment;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginBottom: 20,
  },
});
