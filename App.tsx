import React, { useEffect } from "react";
import { Alert, LogBox, StyleSheet, View, Text } from "react-native";
import RouteNavigator from "./src/routes/RouteNavigator";



export const App = () => {
  LogBox.ignoreAllLogs();

  return (
      <RouteNavigator />
  );
};

export default  App
