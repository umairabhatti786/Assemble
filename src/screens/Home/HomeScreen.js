import React, { useRef, useState } from "react";
import {
  View,
  ImageBackground,
  SectionList,
  TouchableOpacity,
  Linking,
} from "react-native";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

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
import {
  Get_All_Events,
  Like_Single_Event,
  UnLike_Single_Event,
} from "../../api/Requests";
import Button from "../../components/Button";
import BottomCard from "../../components/BottomCard";
import BottomEvents from "../../components/BottomEvents";
import Toast from "react-native-root-toast";
const HomeScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const modalizeRef = useRef(null);
  const flatListRef = useRef(null);

  const [addFavorites, setAddFavorites] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventss, setEventss] = useState([]);
  const [hideModelize, setHideModelize] = useState(false);
  const [prsseLocation, setPrsseLocation] = useState(true);
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const [userScroll, setUserScroll] = useState(true);
  // const lastContentOffset = useSharedValue(0);
  // const isScrolling = useSharedValue(false);

  // const scrollHandler = useAnimatedScrollHandler({
  //   onScroll: (event) => {
  //     // Your logic during scrolling
  //     if (lastContentOffset.value > event.contentOffset.x) {
  //       // Scrolling to the right
  //     } else if (lastContentOffset.value < event.contentOffset.x) {
  //       // Scrolling to the left
  //     }
  //     lastContentOffset.value = event.contentOffset.x;
  //   },
  //   onBeginDrag: () => {
  //     isScrolling.value = true;
  //   },
  //   onEndDrag: (event) => {
  //     isScrolling.value = false;
  //     const itemCount = eventss.length; // total number of items in your list
  //     const itemWidth = sizeHelper.screenWidth > 450 ? 550 : 380;
  //     // Calculate the current index based on the scroll position
  //     const currentIndex = Math.floor(event.contentOffset.x / itemWidth);

  //     // Make sure the currentIndex is within bounds
  //     const clampedIndex = Math.max(0, Math.min(currentIndex, itemCount - 1));

  //     // Pass the clampedIndex to your update functions
  //     updateMapCenter(clampedIndex);
  //     setSelectedEventIndex(clampedIndex);
  //   },
  // });
  // const onAddFav = async (item) => {
  //   setLoading(true);
  //   let ressss = await AsyncStorage.getItem("@token");
  //   const eventID = item._id;
  //   let body = {
  //     sso_token: ressss,
  //   };
  //   try {
  //     if (item.favEvent.isFav === false) {
  //       const response = await Like_Single_Event(eventID, body);

  //       if (response) {
  //         setTimeout(() => {
  //           Toast.show("Events Added in Favorites");
  //           fetchAllEvents();
  //           setLoading(false);
  //         }, 1000);
  //       } else {
  //         setLoading(false);
  //       }
  //     } else {
  //       const response = await UnLike_Single_Event(eventID, body);

  //       if (response) {
  //         setTimeout(() => {
  //           Toast.show("Events Remove From Favorites");
  //           fetchAllEvents();
  //           setLoading(false);
  //         }, 1000);
  //       } else {
  //         setLoading(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

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
              setTimeout(() => {
                Toast.show("Events Added in Favorites");
                fetchAllEvents();
                setLoading(false);
              }, 1000);
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
              setTimeout(() => {
                Toast.show("Events Removed From Favorites");
                fetchAllEvents();
                setLoading(false);
              }, 1000);
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
  useFocusEffect(
    React.useCallback(() => {
      fetchAllEvents();
    }, [])
  );

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
        <View style={styles.iconContainer}>
          <ProfileIcon onPress={onHandlePress} style={styles.icon} />
        </View>
        <View style={styles.textContainer}>
          <CustomText
            color={colors.black}
            fontSize={16}
            alignSelf="center"
            textAlign="center"
            label="assemble"
            fontFamily={SFCompact.semiBold}
          />
        </View>
        <View style={styles.iconContainer}>
          <FillHeartIcon onPress={onNavigateToFav} style={styles.icon} />
        </View>
      </View>
    );
  };

  const renderSectionHeader = ({ section }) => (
    <View style={{ padding: 10 }}>
      <CustomText label={section.title} color={colors.black} fontSize={16} />
    </View>
  );
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

          3000
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <View style={styles.container}>
            <MapView
              // provider={PROVIDER_GOOGLE}
              ref={mapRef}
              style={[
                styles.map,
                { height: !hideModelize ? "50%" : "100%", width: "100%" },
              ]}
              initialRegion={{
                latitude: 31.5204,
                longitude: 74.3587,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {!loading &&
                eventss.length > 0 &&
                eventss.map((event, index) => (
                  <Marker
                    onPress={() => onPressMarker(event, index)}
                    key={event._id}
                    coordinate={{
                      latitude: event.event_location.latitude,
                      longitude: event.event_location.longitude,
                    }}
                    title={eventss.event_title}
                    description={eventss.event_description}
                  >
                    <CustomMarkerComponent event={event} index={index} />
                  </Marker>
                ))}
            </MapView>
            {hideModelize === false && (
              <Modalize
                modalStyle={{
                  backgroundColor: "#FFFFFF",
                  flex: 1,
                  // position: "absolute",
                  width: "100%",
                }}
                ref={modalizeRef}
                alwaysOpen={sizeHelper.screenWidth > 450 ? 550 : 490}
                useNativeDriver
                modalHeight={700}
                handlePosition="inside"
                panGestureComponentProps={{ enabled: true }}
              >
                <View style={styles.content}>
                  <CustomText
                    label={"Events in San Diego"}
                    color={colors.black}
                    fontSize={16}
                    alignSelf="center"
                    textAlign="center"
                    fontFamily={SFCompact.semiBold}
                  />
                </View>
                <SectionList
                  sections={events}
                  keyExtractor={(item, index) => item?._id.toString()}
                  renderItem={renderItem}
                  renderSectionHeader={renderSectionHeader}
                  ListFooterComponent={loading ? null : footerComponent}
                />
              </Modalize>
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
              />
              // <View style={styles.bottomView}>
              //   <View style={styles.bottomContnet}>
              //     <View style={styles.iconsContainer}>
              //       <OptionsIcon
              //         onPress={() => {
              //           modalizeRef.current?.open();
              //           setHideModelize(false);
              //         }}
              //         style={styles.bottomIcon}
              //         fill={"transparent"}
              //       />
              //     </View>
              //     <View
              //       style={{
              //         backgroundColor: "#f5f0f0",
              //         padding: 5,
              //         borderRadius: 100,
              //       }}
              //     >
              //       <OptionsIcon
              //         onPress={() => {
              //           modalizeRef.current?.open();
              //           setHideModelize(false);
              //         }}
              //         style={styles.bottomIcon}
              //         fill={colors.black}
              //       />
              //     </View>
              //   </View>

              //   <View>
              //     <FlatList
              //       ref={flatListRef}
              //       data={eventss}
              //       keyExtractor={(item, index) => item?._id.toString()}
              //       renderItem={renderItemBottom}
              //       horizontal={true}
              //       onScroll={onScroll}
              //       getItemLayout={getItemLayout}
              //       viewabilityConfig={{
              //         itemVisiblePercentThreshold: 50,
              //       }}
              //     />
              //   </View>
              // </View>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default HomeScreen;
