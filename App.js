import "react-native-gesture-handler";
import { enableLatestRenderer } from "react-native-maps";
enableLatestRenderer();
import { LogBox } from "react-native";
import React from "react";
import { Provider } from "react-redux";

import store from "./src/redux/store";
import RootNavigator from "./src/routes";
import firebase from "@react-native-firebase/app";

LogBox.ignoreLogs(["VirtualizedLists", "Warning:..."]);
LogBox.ignoreAllLogs();
const firebaseConfig = {
  apiKey: "AIzaSyA4Cysdi0IQEd9HgYtByH_pcsz4Ywfs6JU",
  authDomain: "",
  projectId: "assemble-408917",
  storageBucket: "",
  messagingSenderId: "",
  appId: "1:153444834280:android:66c86f0de261842fa3625d",
  databaseURL: null,
};
firebase.initializeApp(firebaseConfig);
const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
