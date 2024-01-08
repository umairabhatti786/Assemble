import React, { useRef, useState } from "react";
import { View, SectionList, SafeAreaView } from "react-native";

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
        const modifiedEvents = response.events.map((event) => {
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
    <Card item={item} navigation={navigation} />
  );
  const onHandlePress = () => {
    navigation.goBack();
  };
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <CrossIcon
            fill={colors.black}
            onPress={onHandlePress}
            style={styles.icon}
          />
        </View>
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
  console.log(events);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <View style={{ flex: 1 }}>
              <SectionList
                sections={events}
                keyExtractor={(item, index) => item?._id.toString()}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
              />
            </View>
          </SafeAreaView>
        </>
      )}
    </>
  );
};

export default AllFavEvents;
