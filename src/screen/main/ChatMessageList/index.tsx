import React, { useState } from 'react'
import { FlatList, Image, ImageBackground, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import { images } from '../../../assets'
import CustomText from '../../../components/CustomText'
import { colors } from '../../../utils/colors'
import CustomInput from '../../../components/CustomInput'
import CustomInput2 from '../../../components/CustomInput2'
import { messageDataList } from '../../../utils/Data'
import { useRoute } from '@react-navigation/native'
type Props = {
    navigation?: any
}

const ChatMessageList = ({ navigation }: Props) => {
    const route = useRoute();
    const image = route?.params?.image;
    const title = route?.params?.title;
    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor={"transparent"}
                translucent={true}
                animated={true}
            />
            <View
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: colors.lightBlack,
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,
                        justifyContent: "center",
                        paddingTop: 30,
                        paddingBottom: 15,
                        paddingHorizontal: 15
                    }}
                >
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                    >
                        <Image
                            source={images.arrow}
                            style={{
                                height: 25,
                                width: 25,
                                resizeMode: "contain"
                            }}
                        />
                        <Image
                            source={image || images.profile}
                            style={{
                                height: 75,
                                width: 75,
                                resizeMode: "cover",
                                borderRadius: 9999
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            paddingHorizontal: 10,
                            gap: 5
                        }}
                    >
                        <CustomText
                            text={title || "Jonbobby"}
                            weight={700}
                            fontFam='Poppins'
                            size={18}
                        />
                        <CustomText
                            text={"Active"}
                            weight={700}
                            fontFam='Poppins'
                            size={12}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "flex-end",
                            gap: 15,
                            justifyContent: "center",
                            marginRight: 10
                        }}
                    >
                        <Image
                            source={images.call}
                            style={{
                                width: 30,
                                height: 30,
                                resizeMode: "contain"
                            }}
                        />
                        <Image
                            source={images.video}
                            style={{
                                width: 30,
                                height: 30,
                                resizeMode: "contain"
                            }}
                        />
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: "white"
                }}>
                    <FlatList
                        scrollEnabled
                        contentContainerStyle={{
                            gap: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 20
                        }}
                        data={messageDataList}
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <View
                                        style={{
                                            width: "100%",
                                            alignItems: item?.isSent ? "flex-end" : "flex-start"
                                        }}
                                    >
                                        {item?.isChat ?
                                            <View style={{
                                                height: "auto",
                                                width: "65%",
                                                backgroundColor: item?.isSent ? "#95F3A7" : "#E0E6E7",
                                                paddingHorizontal: 15,
                                                paddingVertical: 15,
                                                borderRadius: 20,
                                                borderBottomLeftRadius: item?.isSent ? 20 : 0,
                                                borderBottomRightRadius: item?.isSent ? 0 : 20
                                            }}>
                                                <CustomText
                                                    text={"Lorem Ipsum is simply dummy text of the printing indusrty has been wiped out by digital. We are a talented team of 5 with over 7 years combined excperience. "}
                                                    size={14}
                                                    color={"#424242"}
                                                    weight={300}
                                                    fontFam='Arial'
                                                />
                                            </View> :
                                            <View style={{
                                                height: 100,
                                                width: "32%",
                                                paddingHorizontal: 15,
                                                paddingVertical: 5,
                                                borderRadius: 20,
                                                borderBottomLeftRadius: 0,
                                                alignItems: "center",
                                                gap: 10
                                            }}>
                                                {
                                                    item?.isSent ?
                                                        <Image
                                                            source={images.call1}
                                                            style={{
                                                                width: 50,
                                                                height: 50,
                                                                resizeMode: "contain",
                                                                tintColor: "#00FB30",
                                                            }}
                                                        /> :
                                                        <Image
                                                            source={images.call1}
                                                            style={{
                                                                width: 50,
                                                                height: 50,
                                                                resizeMode: "contain",
                                                                tintColor: "#FF3E3E",
                                                            }}
                                                        />
                                                }
                                                <CustomText
                                                    text={"Outgoing Call"}
                                                    size={14}
                                                    color={"#424242"}
                                                    weight={300}
                                                    fontFam='Arial'
                                                />
                                            </View>
                                        }
                                        <View
                                            style={{
                                                height: "auto",
                                                width: "65%",
                                                alignItems: item?.isSent ? "flex-end" : "flex-start",
                                                paddingHorizontal: 15
                                            }}
                                        >
                                            <CustomText
                                                text={item?.time}
                                                size={14}
                                                color={"#424242"}
                                                weight={300}
                                                fontFam='Arial'
                                            />
                                        </View>
                                    </View>
                                </>
                            )
                        }}
                    />


                </View>
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: colors.white,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 15,
                        paddingHorizontal: 15,
                        gap: 10
                    }}
                >
                    <CustomInput
                        placeholder='Type a message'
                        bgColor={"#E0E6E7"}
                        borderRadius={22}
                        style={{
                            paddingLeft: 15
                        }}
                    />
                    <Image
                        source={images.file}
                        style={{
                            width: 30,
                            height: 30,
                            resizeMode: "contain",
                            position: "absolute",
                            bottom: 23,
                            right: 69
                        }}
                    />
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            backgroundColor: "#C9C9C9",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 999
                        }}
                    >
                        <Image
                            source={images.send}
                            style={{
                                width: 20,
                                height: 20,
                                resizeMode: "contain",
                            }}
                        />
                    </View>
                </View>
            </View>
        </>
    )
}

export default ChatMessageList
const styles = StyleSheet.create({


})