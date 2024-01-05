import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { images } from "../assets/images";

const MapComponent = ({ latitude, longitude, address }) => {
  const mapRef = useRef(null);
  const GOOGLE_MAPS_APIKEY = "AIzaSyDeYRRtmStCSHXQBJxZa4t9uB_WXNO55H0";

  const handleMapPress = () => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${latitude},${longitude}`;
    const label = address;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };
  const CustomMarkerComponent = ({ event, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red",
        // height: 100,
        // width: 100,
        zIndex: 99999999999,
        // position: "absolute",
      }}
    >
      <Image
        source={images.goldenLocation}
        style={{ height: 80, width: 80 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={[styles.map, { height: "100%", width: "100%" }]}
          initialRegion={{
            latitude: 32.7157,
            longitude: -117.1611,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          // onRegionChangeComplete={(region) => setRegion(region)}
        >
          <Marker coordinate={{ latitude: latitude, longitude: longitude }}>
            {/* You can customize the Marker by providing a custom component */}
            <CustomMarkerComponent />
          </Marker>
        </MapView>

        {/* <MapView
          style={styles.map}
          showsUserLocation={true}
          followUserLocation
          loadingEnabled
          // provider={PROVIDER_GOOGLE}
          // initialRegion={{
          //   latitude,
          //   longitude,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
        >
          <Marker coordinate={{ latitude, longitude }} />
        </MapView> */}
      </View>
      <TouchableOpacity style={styles.overlay} onPress={handleMapPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    overflow: "hidden", // Clip the border radius
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
});

export default MapComponent;
