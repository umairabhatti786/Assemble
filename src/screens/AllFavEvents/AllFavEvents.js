import React, { useRef, useState } from "react";
import {
  View,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./styles";

import CustomText from "../../components/CustomText";
import { colors } from "../../utils/colors";

import { useFocusEffect } from "@react-navigation/native";
import Card from "../../components/Card";
import { SFCompact } from "../../utils/Fonts";
import Loading from "../../components/Loading";
import { Get_All_Events } from "../../api/Requests";
import { CrossIcon, CustomHeartIcon } from "../../assets/SVG/svg";
import Toast from "react-native-root-toast";
const AllFavEvents = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

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
        const modifiedEvents = response.events
          .filter((event) => event.favEvent.isFav === true)
          .map((event) => {
            event.event_title = truncateText(event.event_title, 2);
            event.event_location.neighborhood = truncateText(
              event.event_location.neighborhood,
              2
            );
            // You can perform additional modifications if needed
            return event;
          });

        modifiedEvents.sort(
          (a, b) => new Date(b.event_date) - new Date(a.event_date)
        );

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

  const renderSectionHeader = ({ section }) => (
    <View style={{ padding: 10 }}>
      <CustomText label={section.title} color={colors.black} fontSize={16} />
    </View>
  );
  const renderItem = ({ section, item }) => (
    <Card item={item} navigation={navigation} onAddFav={onAddFav} />
  );
  const onHandlePress = () => {
    navigation.goBack();
  };
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onHandlePress} style={styles.iconContainer}>
          <CrossIcon
            fill={colors.black}
            onPress={onHandlePress}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <CustomText
            color={colors.black}
            fontSize={16}
            alignSelf="center"
            textAlign="center"
            label="Your Events"
            fontFamily={SFCompact.semiBold}
          />
        </View>
        <View style={styles.iconContainer}>
          <CustomHeartIcon fill={"transparent"} style={styles.icon} />
        </View>
      </View>
    );
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <Header />
            <View style={{ flex: 1, backgroundColor: "white" }}>
              {events.length > 0 ? (
                <SectionList
                  sections={events}
                  keyExtractor={(item, index) => `${item?._id}_${index}`}
                  renderItem={renderItem}
                  renderSectionHeader={renderSectionHeader}
                />
              ) : (
                <View
                  style={{
                    backgroundColor: colors.white,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CustomText
                      label={"No Favorites Events found"}
                      color={colors.black}
                      fontSize={16}
                    />
                  </View>
                </View>
              )}
            </View>
          </SafeAreaView>
        </>
      )}
    </>
  );
};

export default AllFavEvents;
