import {
  View,
  ImageBackground,
  SafeAreaView,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
  Linking,
  Platform,
} from "react-native";
import RNCalendarEvents from "react-native-calendar-events";
import React, { useEffect, useRef, useState } from "react";
import commonStyles, { PH10 } from "../../utils/CommonStyles";
import { images } from "../../assets/images";
import { styles } from "./styles";
import sizeHelper from "../../assets/helpers/sizeHelper";
import CustomText from "../../components/CustomText";
import { colors } from "../../utils/colors";
import Button from "../../components/Button";
import { SFCompact } from "../../utils/Fonts";
import {
  BackIcon,
  CalanderIcon,
  CrossIcon,
  FillHeartIcon,
  ForwardIcon,
  HeartIcon,
  UnFillHeartIcon,
  UploadIcon,
} from "../../assets/SVG/svg";
import DateCard from "../../components/DateCard";
import LocationCard from "../../components/LocationCard";
import MapComponent from "../../components/MapComponent";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../components/Loading";
import { Get_Single_Event } from "../../api/Requests";
const DetailsScreen = ({ navigation, route }) => {
  const eventID = route.params?.eventId;
  console.log(eventID);
  const [eventDetail, setEventDetails] = useState({});

  const [loading, setLoading] = useState(false);
  const handleGoBack = () => {
    navigation.goBack();
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const openExternalLink = async () => {
    const url = eventDetail.ticket_link;
    await Linking.openURL(url);
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchEventsDetails(eventID);
    }, [route.params?.eventId])
  );
  const fetchEventsDetails = async (eventID) => {
    setLoading(true);
    try {
      let response = await Get_Single_Event(eventID);
      if (response.event !== undefined) {
        response.event.event_title = truncateText(
          response.event.event_title,
          3
        );

        response.event.event_location.neighborhood = truncateText(
          response.event.event_location.neighborhood,
          3
        );
        response.event.event_image =
          response.event.event_image === null ||
          response.event.event_image === undefined
            ? images.details
            : response.event.event_image;

        // Check if event title length > 10

        setTimeout(() => {
          setEventDetails(response.event);
          setLoading(false);
          console.log("running stop");
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
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
  const addEventToCalendar = async () => {
    try {
      const hasPermission = await requestCalendarPermission();

      if (hasPermission) {
        const eventId = await RNCalendarEvents.saveEvent("New Event", {
          startDate: "2024-01-05T09:00:00.000Z",
          recurrenceRule: {
            frequency: "weekly",
            occurrence: 52,
            interval: 2,
            endDate: "2024-01-08T09:00:00.000Z",
          },
        });
        Alert.alert(
          "Event Added",
          "The event has been added to your calendar. To view the event, open your calendar app.",
          [
            {
              text: "OK",
              onPress: () => {
                const calendarAppUrl =
                  Platform.OS === "ios"
                    ? "calshow:"
                    : "content://com.android.calendar/time/";

                Linking.openURL(calendarAppUrl);
              },
            },
          ],
          { cancelable: false }
        );

        console.log("Event added successfully. Event ID:", eventId);
      } else {
        console.log("Calendar permission not granted");
      }
    } catch (error) {
      console.error("Error adding event to calendar:", error);
    }
  };
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleGoBack}
          style={[styles.iconContainer, { marginHorizontal: 8 }]}
        >
          <BackIcon
            // onPress={handleGoBack}
            style={styles.icon}
            fill={colors.black}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <CustomText
            color={"transparent"}
            fontSize={16}
            alignSelf="center"
            textAlign="center"
            label="assemble"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={styles.iconContainer}>
            {eventDetail?.favEvent?.isFav === true ? (
              <FillHeartIcon style={styles.icon} />
            ) : (
              <UnFillHeartIcon style={styles.icon} fill={colors.black} />
            )}
          </View>
          <View style={[styles.iconContainer, { marginHorizontal: 10 }]}>
            <UploadIcon onPress={onShare} style={styles.icon} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={commonStyles.main}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.scroll}>
          <View style={styles.scollInner}>
            <View style={styles.scrollContainer}>
              <ImageBackground
                style={styles.flex}
                source={eventDetail.event_image}
                imageStyle={{ borderRadius: 20, height: 300, width: "100%" }}
                resizeMode="cover"
              >
                {!loading && <Header />}

                <View
                  style={{
                    top: 150,
                    left: 10,
                    right: 0,
                  }}
                >
                  <View style={styles.tagsContainer}>
                    {Array.isArray(eventDetail.event_tags) &&
                      eventDetail.event_tags.length > 0 &&
                      eventDetail.event_tags[0].split(",").map((tag) => (
                        <ImageBackground
                          key={tag} // Add a unique key for each tag
                          style={styles.tagBody}
                          source={images.smallBox}
                          imageStyle={{ borderRadius: 50 }}
                        >
                          <View style={{ padding: 5 }}>
                            <Text style={styles.tagName}>{tag}</Text>
                          </View>
                        </ImageBackground>
                      ))}
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.eventHeader}>
              <CustomText
                label={eventDetail.event_title}
                fontSize={16}
                color={colors.black}
                fontFamily={SFCompact.regular}
              />
            </View>
            <View style={styles.cardsContainer}>
              <DateCard item={eventDetail} />
              <View style={styles.divider} />
              <LocationCard item={eventDetail} />
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <CustomText
              label="Event Detail"
              fontFamily={SFCompact.semiBold}
              fontSize={15}
            />
            <View>
              <CustomText
                label={eventDetail.event_description}
                fontFamily={SFCompact.light}
                fontSize={15}
              />
            </View>
            <View style={styles.mapContainer}>
              <View style={styles.innerMapContainer}>
                <MapComponent
                  latitude={eventDetail?.event_location?.latitude}
                  longitude={eventDetail?.event_location?.longitude}
                  address={eventDetail?.event_location?.address}
                />
              </View>

              <CustomText
                label={
                  eventDetail?.event_location?.address
                    ? eventDetail?.event_location?.address
                    : ""
                }
                color="#1C1916"
                fontFamily={SFCompact.light}
                fontSize={13}
                textAlign="center"
                alignSelf="center"
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Button
                text={"GET TICKETS"}
                color={colors.white}
                fontSize={17}
                height={65}
                width={"100%"}
                backgroundColor={"#080808"}
                borderRadius={100}
                margin={20}
                fontFamily={SFCompact.semiBold}
                onPress={openExternalLink}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default DetailsScreen;
