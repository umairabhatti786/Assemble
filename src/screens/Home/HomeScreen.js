import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  ImageBackground,
  SectionList,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
  Image,
  Animated,
  SafeAreaView,
  PanResponder,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axios from "axios";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { images } from "../../assets/images";
import { styles } from "./styles";
import sizeHelper from "../../assets/helpers/sizeHelper";
import { FillHeartIcon, ProfileIcon } from "../../assets/SVG/svg";
import CustomText from "../../components/CustomText";
import { colors } from "../../utils/colors";
import { Modalize } from "react-native-modalize";
import { useFocusEffect } from "@react-navigation/native";
import Card from "../../components/Card";
import { SFCompact } from "../../utils/Fonts";
import Loading from "../../components/Loading";
import { Get_All_Events } from "../../api/Requests";
import Button from "../../components/Button";
import BottomCard from "../../components/BottomCard";
import BottomEvents from "../../components/BottomEvents";
import Toast from "react-native-root-toast";
const HomeScreen = ({ navigation }) => {
  const [pan] = useState(new Animated.ValueXY());
  const [modalHeight, setModalHeight] = useState(500); // Initial height, adjust as needed

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        // Check the gesture direction and adjust modal height accordingly
        if (gestureState.dy < 0) {
          // User is dragging up
          setModalHeight((prevHeight) =>
            Math.max(prevHeight + gestureState.dy, 50)
          );
        } else {
          // User is dragging down
          setModalHeight((prevHeight) => prevHeight + gestureState.dy);
        }

        // Reset pan position
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const mapRef = useRef(null);
  const modalizeRef = useRef(null);
  const flatListRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventss, setEventss] = useState([]);
  const [hideModelize, setHideModelize] = useState(false);
  const [placeId, setPlaceId] = useState(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const [userScroll, setUserScroll] = useState(true);
  const [userlocation, setUserLocation] = useState({});
  const [locationDetails, setLocationDetails] = useState(null);
  const [isAlwaysShow, setIsAlwaysShow] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      fetchAllEvents();
      requestLocationPermission();
      handleGetLocation();
    }, [])
  );

  const openModalize = () => {
    if (modalizeRef?.current) {
      modalizeRef?.current?.open();
    }
  };

  // Open the modalize when the component mounts
  useEffect(() => {
    openModalize();
  }, []);
  let lastPosition = 0;

  const handlePositionChange = async (position) => {
    const currentPosition = position;

    // Get the height of the modalize
    const modalHeight = await modalizeRef.current?.measureHeight();

    if (currentPosition < lastPosition) {
      console.log("User is dragging up");
      // Your logic for dragging up

      // Check if height is less than 50, close the modalize
      if (modalHeight < 50) {
        modalizeRef.current?.close();
      }
    } else if (currentPosition > lastPosition) {
      console.log("User is dragging down");
      // Your logic for dragging down
    }

    lastPosition = currentPosition;
  };
  const handleGetLocation = async () => {
    const apiKey = "AIzaSyDXoHO79vxypTv8xL4V10cf5kFpIYDO9Rk";
    const result = await request(
      Platform.OS === "android"
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.ACCESS_FINE_LOCATION
    );
    let response = await getLocationPermissions();

    if (response === true || response === "granted") {
      try {
        Geolocation.getCurrentPosition(
          (position) => {
            const latitude = position?.coords?.latitude;
            const longitude = position?.coords?.longitude;
            const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

            axios
              .get(geocodingApiUrl)
              .then((response) => {
                const results = response.data.results;
                if (results && results.length > 0) {
                  const firstResult = results[0];
                  const resultPlaceId = firstResult.place_id;
                  setPlaceId(resultPlaceId);
                  const placesApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${resultPlaceId}&key=${apiKey}`;

                  axios
                    .get(placesApiUrl)
                    .then((placesResponse) => {
                      const result = placesResponse.data.result;
                      if (result) {
                        // Extracting specific components from the formatted address
                        const addressComponents = result.address_components;
                        const city =
                          addressComponents.find(
                            (component) =>
                              component.types.includes("locality") ||
                              component.types.includes(
                                "administrative_area_level_2"
                              )
                          )?.long_name || "";

                        const state =
                          addressComponents.find((component) =>
                            component.types.includes(
                              "administrative_area_level_1"
                            )
                          )?.long_name || "";

                        const country =
                          addressComponents.find((component) =>
                            component.types.includes("country")
                          )?.long_name || "";

                        const formattedAddress = `${city}, ${state}, ${country}`;
                        setLocationDetails(formattedAddress);
                      }
                    })
                    .catch((placesError) => {
                      console.error(
                        "Error fetching place details:",
                        placesError
                      );
                    });
                }
              })
              .catch((error) => {
                console.error("Error fetching location details:", error);
              });
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (error) {
        console.log("Location error:", error);
      }
    } else {
      // If permission is not granted, request permission again
      Alert.alert(
        "Permission Denied",
        "Please grant location permission to use this feature.",
        [
          {
            text: "OK",
            onPress: async () => {
              try {
                const permissionResult = await request(
                  Platform.OS === "android"
                    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                    : PERMISSIONS.IOS.ACCESS_FINE_LOCATION
                );

                if (permissionResult === RESULTS.GRANTED) {
                  // Permission granted after the second attempt
                  handleGetLocation();
                } else {
                  // Handle case where permission is still not granted
                  console.log("Permission still not granted.");
                }
              } catch (permissionError) {
                console.error(
                  "Error requesting location permission:",
                  permissionError
                );
              }
            },
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]
      );
    }
  };
  async function getLocationPermissions() {
    const granted = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      })
    );

    return granted === RESULTS.GRANTED;
  }
  const requestLocationPermission = async () => {
    try {
      let response = await getLocationPermissions();

      if (response === true || response === "granted") {
        Geolocation.getCurrentPosition(
          (position) => {
            try {
              const latitude = position.coords?.latitude;
              const longitude = position.coords?.longitude;
              mapRef?.current?.animateToRegion(
                {
                  latitude,
                  longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                },
                3000
              );
              setUserLocation(position.coords);
            } catch (error) {
              console.log(error);
            }
          },
          (error) => {
            console.error("Error getting location:", error);
          }
          // { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
        );
      } else {
        console.log("errrroorrr");
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };
  const onAddFav = async (item) => {
    try {
      const token = await AsyncStorage.getItem("@token");
      const eventID = item._id;
      const body = {
        sso_token: token,
      };
      if (item.favEvent.isFav === false) {
        try {
          const url = `https://assemble-backend.onrender.com/api/events/addfavorite/${eventID}`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              // "Content-Type": "application/json",
              // Add any additional headers if needed
            },
            body: JSON.stringify(body),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else {
            if (response.ok) {
              const updatedEvents = eventss.map((event) => {
                if (event._id === eventID) {
                  event.favEvent.isFav = true;
                }
                return event;
              });

              if (Array.isArray(updatedEvents) && updatedEvents.length > 0) {
                const modifiedEvents = updatedEvents.map((event) => {
                  event.event_title = truncateText(event.event_title, 3);
                  event.event_location.neighborhood = truncateText(
                    event.event_location.neighborhood,
                    3
                  );
                  return event;
                });
                modifiedEvents.sort(
                  (a, b) => new Date(b.event_date) - new Date(a.event_date)
                );

                setEventss(modifiedEvents);

                const currentDate = new Date();
                const eventSections = [];

                modifiedEvents.forEach((event) => {
                  const eventDate = new Date(event.event_date);
                  const isToday =
                    eventDate.toDateString() === currentDate.toDateString();

                  const sectionTitle = isToday
                    ? "Upcoming Events"
                    : `${eventDate.toDateString()}`;

                  let section = eventSections.find(
                    (sec) => sec.title === sectionTitle
                  );
                  if (!section) {
                    section = { title: sectionTitle, data: [] };
                    eventSections.push(section);
                  }

                  section.data.push(event);
                });

                setEvents(eventSections);
              }
              Toast.show("Events Added in Favorites");
            }
          }
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const url = `https://assemble-backend.onrender.com/api/events/removefavorite/${eventID}`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              // "Content-Type": "application/json",
              // Add any additional headers if needed
            },
            body: JSON.stringify(body),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else {
            if (response.ok) {
              const updatedEvents = eventss.map((event) => {
                if (event._id === eventID) {
                  event.favEvent.isFav = false;
                }
                return event;
              });

              if (Array.isArray(updatedEvents) && updatedEvents.length > 0) {
                const modifiedEvents = updatedEvents.map((event) => {
                  event.event_title = truncateText(event.event_title, 3);
                  event.event_location.neighborhood = truncateText(
                    event.event_location.neighborhood,
                    3
                  );
                  return event;
                });
                modifiedEvents.sort(
                  (a, b) => new Date(b.event_date) - new Date(a.event_date)
                );
                setEventss(modifiedEvents);
                const currentDate = new Date();
                const eventSections = [];
                modifiedEvents.forEach((event) => {
                  const eventDate = new Date(event.event_date);
                  const isToday =
                    eventDate.toDateString() === currentDate.toDateString();
                  const sectionTitle = isToday
                    ? "Upcoming Events"
                    : `${eventDate.toDateString()}`;

                  let section = eventSections.find(
                    (sec) => sec.title === sectionTitle
                  );
                  if (!section) {
                    section = { title: sectionTitle, data: [] };
                    eventSections.push(section);
                  }
                  section.data.push(event);
                });
                setEvents(eventSections);
              }
              Toast.show("Events Removed From Favorites");
            }
          }
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getItemLayout = (data, index) => ({
    length: 100, // Assuming item height is 100, adjust accordingly
    offset: 100 * index,
    index,
  });
  const onHandlePress = () => {
    navigation.navigate("Settings");
  };

  const onNavigateToFav = () => {
    navigation.navigate("AllFavEvents");
  };

  const fetchAllEvents = async () => {
    setLoading(true);
    try {
      let response = await Get_All_Events();

      if (Array.isArray(response.events) && response.events.length > 0) {
        const modifiedEvents = response.events.map((event) => {
          event.event_title = truncateText(event.event_title, 3);
          event.event_location.neighborhood = truncateText(
            event.event_location.neighborhood,
            3
          );
          return event;
        });

        // Sort events by date, with the newest events first
        modifiedEvents.sort(
          (a, b) => new Date(b.event_date) - new Date(a.event_date)
        );

        setEventss(modifiedEvents);

        const currentDate = new Date();
        const eventSections = [];

        modifiedEvents.forEach((event) => {
          const eventDate = new Date(event.event_date);
          const isToday =
            eventDate.toDateString() === currentDate.toDateString();

          const sectionTitle = isToday
            ? "Upcoming Events"
            : `${eventDate.toDateString()}`;

          // Create the section if it doesn't exist
          let section = eventSections.find((sec) => sec.title === sectionTitle);
          if (!section) {
            section = { title: sectionTitle, data: [] };
            eventSections.push(section);
          }

          section.data.push(event);
        });

        setEvents(eventSections);
      } else {
        setEvents(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
  const openExternalLink = async () => {
    const url = "https://w3dv4qeze3p.typeform.com/to/BCoUhmwU";
    await Linking.openURL(url);
  };
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity 
        activeOpacity={0.6}
        onPress={onHandlePress}
        style={styles.iconContainer}>
          <ProfileIcon  style={styles.profileIcon} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <CustomText
            color={colors.black}
            fontSize={16}
            alignSelf="center"
            textAlign="center"
            label="assemble"
            fontFamily={SFCompact.bold}
          />
        </View>
        <TouchableOpacity 
        onPress={onNavigateToFav}
        style={styles.iconContainer}>
          <FillHeartIcon  style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };
  const renderSectionHeader =({section})=>{
    console.log("SectionDataTitle",section)

    return(
      <View style={{ padding: 10 }}>
      <CustomText label={section.title} color={colors.black} fontSize={16} />
    </View>
    )
  }

  // const renderSectionHeader = ({ section }) => ({
  //   return(

  //   <View style={{ padding: 10 }}>
  //     <CustomText label={section.title} color={colors.black} fontSize={16} />
  //   </View>


  //   )
  // })
  const renderItem = ({ section, item }) => (
    <Card item={item} navigation={navigation} onAddFav={onAddFav} />
  );
  const renderItemBottom = ({ section, item }) => (
    <BottomCard item={item} navigation={navigation} onAddFav={onAddFav} />
  );
  const footerComponent = () => {
    return (
      <ImageBackground
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        source={images.background}
      >
        <View
          style={{
            backgroundColor: colors.white,
            height: 300,
            width: 370,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginVertical: 20,
          }}
        >
          <View style={{ marginVertical: 10 }}>
            <CustomText
              label={"Don't see the event you're \nlooking for? "}
              color={colors.black}
              fontSize={17}
              alignSelf="center"
              textAlign="center"
              fontFamily={SFCompact.regular}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <CustomText
              label={"Send it our way and we will \nadd to  the list"}
              color={colors.black}
              fontSize={13}
              alignSelf="center"
              textAlign="center"
              fontFamily={SFCompact.light}
            />
          </View>
          <>
            <Button
              text={"SUBMIT EVENT"}
              color={colors.white}
              fontSize={14}
              height={65}
              width={"50%"}
              backgroundColor={colors.black}
              borderRadius={100}
              margin={20}
              fontFamily={SFCompact.regular}
              onPress={openExternalLink}
            />
          </>
        </View>
      </ImageBackground>
    );
  };

  const CustomMarkerComponent = React.memo(({ event, index }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 100,
        zIndex: 999999,
      }}
    >
      {index === selectedEventIndex ? (
        <FastImage
          source={images.blackLocation} // Use the black location image
          style={{ height: 60, width: 60 }}
          resizeMode="contain"
        />
      ) : (
        <FastImage
          source={images.goldenLocation} // Use the golden location image
          style={{ height: 60, width: 60 }}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  ));

  const updateMapCenter = (index) => {
    // Update the map center based on the latitude and longitude of the selected event

    try {
      const selectedEvent = eventss[index];
      if (selectedEvent && selectedEvent.event_location) {
        const { latitude, longitude } = selectedEvent.event_location;
        mapRef.current.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },

          2000
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onScroll = (event) => {
    if (hideModelize && userScroll) {
      let width = sizeHelper.screenWidth > 450 ? 550 : 380;
      const xPos =
        event.nativeEvent?.contentOffset?.x < 0
          ? 0
          : event.nativeEvent?.contentOffset?.x;
      const current = Math.floor(xPos / width);
      updateMapCenter(current);
      setSelectedEventIndex(current);
    }
  };

  const onPressMarker = (event, index) => {
    try {
      setHideModelize(true);
      setTimeout(() => {
        scrollToIndex(index);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToIndex = (index) => {
    setUserScroll(false);
    flatListRef.current?.scrollToIndex({
      index,
      animated: false,
    });
    updateMapCenter(index);
    setSelectedEventIndex(index);
    setTimeout(() => {
      setUserScroll(true);
    }, 5000);
    // Set back to true after scrolling
  };
  console.log(userlocation);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <Header />
          <View style={styles.container}>
            <MapView
              // provider={PROVIDER_GOOGLE}
              ref={mapRef}
              style={[
                styles.map,
                {
                  height: "100%",
                  width: "100%",
                },
              ]}
              initialRegion={{
                latitude: userlocation.latitude
                  ? userlocation.latitude
                  : 32.7157,
                longitude: userlocation.longitude
                  ? userlocation.longitude
                  : 117.1611,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: userlocation.latitude,
                  longitude: userlocation.longitude,
                }}
              />

              {!loading &&
                eventss.length > 0 &&
                eventss.map(
                  (event, index) =>
                    (event.latitude && event.latitude !== null) ||
                    (event.latitude && event.latitude !== undefined && (
                      <Marker
                        onPress={() => onPressMarker(event, index)}
                        key={event._id}
                        coordinate={{
                          latitude: event.event_location.latitude,
                          longitude: event.event_location.longitude,
                        }}
                      >
                        <CustomMarkerComponent event={event} index={index} />
                      </Marker>
                    ))
                )}
            </MapView>
            {!hideModelize && (
              // <Animated.View
              //   style={{
              //     flex: 1,
              //     justifyContent: "center",
              //     alignItems: "center",
              //     transform: [{ translateY: pan.y }],
              //   }}
              //   {...panResponder.panHandlers}
              // >
              //   <View
              //     style={{
              //       backgroundColor: "white",
              //       padding: 16,
              //       borderRadius: 8,
              //       width: "100%",
              //       height: modalHeight,
              //     }}
              //   >
              <Modalize
                onClose={() => {
                  setHideModelize(true);

                  modalizeRef?.current?.close();
                }}
                modalStyle={{
                  backgroundColor: "#FFFFFF",
                  flex: 1,
                  width: "100%",
                }}
                ref={modalizeRef}
                alwaysOpen={
                  !hideModelize && sizeHelper.screenWidth > 450 ? 550 : 490
                }
                useNativeDriver
                modalHeight={sizeHelper.screentHeight - 135}
                handlePosition="inside"
                panGestureComponentProps={{ enabled: true }}
              >
                <View style={styles.content}>
                  <CustomText
                    label={
                      locationDetails
                        ? "Events in \n" + locationDetails
                        : "Events in San Diego"
                    }
                    color={colors.black}
                    fontSize={16}
                    alignSelf="center"
                    textAlign="center"
                    fontFamily={SFCompact.semiBold}
                  />
                </View>

                {eventss.length > 0 ? (
                  <SectionList
                    sections={events}
                    keyExtractor={(item, index) => `${item?._id}_${index}`}
                    renderItem={renderItem}
                    renderSectionHeader={renderSectionHeader}
                    ListFooterComponent={loading ? null : footerComponent}
                  />
                ) : (
                  <>
                    <View
                      style={{
                        backgroundColor: colors.white,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 10,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CustomText
                          label={"No Events found"}
                          color={colors.black}
                          fontSize={16}
                        />
                      </View>
                    </View>
                    <ImageBackground
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      source={images.background}
                    >
                      <View
                        style={{
                          backgroundColor: colors.white,
                          height: 300,
                          width: 370,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 10,
                          marginVertical: 20,
                        }}
                      >
                        <View style={{ marginVertical: 10 }}>
                          <CustomText
                            label={"Don't see the event you're \nlooking for? "}
                            color={colors.black}
                            fontSize={17}
                            alignSelf="center"
                            textAlign="center"
                            fontFamily={SFCompact.regular}
                          />
                        </View>
                        <View style={{ marginVertical: 10 }}>
                          <CustomText
                            label={
                              "Send it our way and we will \nadd to  the list"
                            }
                            color={colors.black}
                            fontSize={13}
                            alignSelf="center"
                            textAlign="center"
                            fontFamily={SFCompact.light}
                          />
                        </View>
                        <>
                          <Button
                            text={"SUBMIT EVENT"}
                            color={colors.white}
                            fontSize={14}
                            height={65}
                            width={"50%"}
                            backgroundColor={colors.black}
                            borderRadius={100}
                            margin={20}
                            fontFamily={SFCompact.regular}
                            onPress={openExternalLink}
                          />
                        </>
                      </View>
                    </ImageBackground>
                  </>
                )}
              </Modalize>
              //   </View>
              // </Animated.View>
            )}

            {hideModelize && (
              <BottomEvents
                modalizeRef={modalizeRef}
                setHideModelize={setHideModelize}
                flatListRef={flatListRef}
                eventss={eventss}
                renderItemBottom={renderItemBottom}
                onScroll={onScroll}
                selectedEventIndex={selectedEventIndex}
                getItemLayout={getItemLayout}
                requestLocationPermission={requestLocationPermission}
              />
            )}
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default HomeScreen;
