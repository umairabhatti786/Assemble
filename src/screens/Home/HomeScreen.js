import {
  View,
  ImageBackground,
  SafeAreaView,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  Dimensions,
} from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useEffect, useRef, useState, useCallback } from "react";
import commonStyles, { PH10 } from "../../utils/CommonStyles";
import { images } from "../../assets/images";
import { styles } from "./styles";
import sizeHelper from "../../assets/helpers/sizeHelper";
import {
  FillHeartIcon,
  HeartIcon,
  ImageIcon,
  LocationGoldenIcon,
  OptionsIcon,
  ProfileIcon,
  UnFillHeartIcon,
} from "../../assets/SVG/svg";
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
const HomeScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const modalizeRef = useRef(null);
  const flatListRef = useRef(null);
  const carouselRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const [addFavorites, setAddFavorites] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventss, setEventss] = useState([]);
  const [hideModelize, setHideModelize] = useState(false);
  const [prsseLocation, setPrsseLocation] = useState(true);
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);

  const onHandlePress = () => {
    navigation.navigate("settings");
  };
  const openModal = () => {
    modalizeRef.current?.open();
    setHideModelize(false);
  };

  const closeModal = () => {
    modalizeRef.current?.close();
    setHideModelize(true);
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

        setEventss(modifiedEvents);

        const currentDate = new Date();
        const upcomingEvents = [];
        const todayEvents = [];

        modifiedEvents.forEach((event) => {
          const eventDate = new Date(event.event_date);
          if (eventDate.toDateString() === currentDate.toDateString()) {
            todayEvents.push(event);
          } else {
            upcomingEvents.push(event);
          }
        });

        const sections = [];
        if (todayEvents.length > 0) {
          sections.push({ title: "Today", data: todayEvents });
        }
        if (upcomingEvents.length > 0) {
          sections.push({ title: "Upcoming Events", data: upcomingEvents });
        }

        setEvents(sections);
      }

      // if (Array.isArray(response.events) && response.events.length > 0) {
      //   setEventss(response.events);

      //   const currentDate = new Date();
      //   const upcomingEvents = [];
      //   const todayEvents = [];

      //   response.events.forEach((event) => {
      //     const eventDate = new Date(event.event_date);
      //     if (eventDate.toDateString() === currentDate.toDateString()) {
      //       todayEvents.push(event);
      //     } else {
      //       upcomingEvents.push(event);
      //     }
      //   });

      //   const sections = [];
      //   if (todayEvents.length > 0) {
      //     sections.push({ title: "Today", data: todayEvents });
      //   }
      //   if (upcomingEvents.length > 0) {
      //     sections.push({ title: "Upcoming Events", data: upcomingEvents });
      //   }

      //   setEvents(sections);
      // }
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
          <HeartIcon onPress={closeModal} style={styles.icon} />
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
    <Card item={item} navigation={navigation} />
  );
  const renderItemBottom = ({ section, item }) => (
    <BottomCard item={item} navigation={navigation} />
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
              label={"Send it our way and we will \n add to  the list"}
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

  const CustomMarkerComponent = ({ event }) => (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999999999,
      }}
    >
      {hideModelize ? (
        <>
          <Image
            source={images.goldenLocation}
            style={{ height: 80, width: 80 }}
            resizeMode="contain"
          />
        </>
      ) : (
        <Image
          source={images.goldenLocation}
          style={{ height: 80, width: 80 }}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );

  const updateMapCenter = (index) => {
    // Update the map center based on the latitude and longitude of the selected event
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
  };
  const onScroll = (x) => {
    const xPos =
      x.nativeEvent?.contentOffset?.x < 0 ? 0 : x.nativeEvent?.contentOffset?.x;
    const current = Math.floor(xPos / 260);
    updateMapCenter(current);
    setSelectedEventIndex(current);
  };
  const onPressMarker = () => {
    setHideModelize(true);
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
              onMarkerPress={() => onPressMarker()}
              // provider={PROVIDER_GOOGLE}
              ref={mapRef}
              style={[
                styles.map,
                { height: !hideModelize ? "50%" : "100%", width: "100%" },
              ]}
              initialRegion={{
                latitude: 32.7157,
                longitude: -117.1611,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              // onRegionChangeComplete={(region) => setRegion(region)}
            >
              {!loading &&
                eventss.length > 0 &&
                eventss.map((event) => (
                  <Marker
                    key={event._id}
                    coordinate={{
                      latitude: event.event_location.latitude,
                      longitude: event.event_location.longitude,
                    }}
                    title={eventss.event_title}
                    description={eventss.event_description}
                  >
                    {/* You can customize the Marker by providing a custom component */}
                    <CustomMarkerComponent event={event} />
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
                useNativeDriver={true}
                modalHeight={700}
                handlePosition="inside"
                panGestureComponentProps={{ enabled: true }}
              >
                <View style={styles.content}>
                  <CustomText
                    label="Events in San Diego"
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
                    viewabilityConfig={{
                      itemVisiblePercentThreshold: 50,
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default HomeScreen;
