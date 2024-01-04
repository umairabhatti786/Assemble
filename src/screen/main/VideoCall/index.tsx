import React, { useState } from 'react'
import { FlatList, Image, ImageBackground, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import { images } from '../../../assets'
import CustomText from '../../../components/CustomText'
import { colors } from '../../../utils/colors'
import { useRoute } from '@react-navigation/native'
type Props = {
    navigation?: any
}

const VideoCall = ({ navigation }: Props) => {
    const route = useRoute();
    const image = route?.params?.image;
    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor={"transparent"}
                translucent={true}
                animated={true}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                }}
            />
            <View
                style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "red",
                    position: "absolute",
                    top: 0
                }}
            >
                <Image
                    style={{
                        width: "100%",
                        height: "50%",
                        resizeMode: "cover"
                    }}
                    source={images.profile2}
                    blurRadius={2}
                />
                <Image
                    style={{
                        width: "100%",
                        height: "50%",
                        resizeMode: "cover"
                    }}
                    source={image || images.profile4}
                    blurRadius={1}
                />
            </View>
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center"
                }}
            >
                <View
                    style={{
                        width: "100%",
                        height: "85%",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: "5%",
                            alignItems: "center"
                        }}
                    >
                        <CustomText
                            text={"Anniesharon"}
                            size={22}
                            weight={700}
                        />
                        <CustomText
                            text={"00:10"}
                            size={18}
                            weight={500}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 15
                        }}
                    >
                        <View
                            style={{
                                width: 58,
                                height: 54,
                                borderWidth: 3,
                                borderRadius: 999,
                                borderColor: colors.primary,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Image
                                source={images.speaker}
                                style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: "contain"
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: 58,
                                height: 54,
                                borderWidth: 3,
                                borderRadius: 999,
                                borderColor: "#00FB30",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Image
                                source={images.mute}
                                style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: "contain"
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: 58,
                                height: 54,
                                borderWidth: 3,
                                borderRadius: 999,
                                borderColor: "#DB0A0D",
                                backgroundColor: "#DB0A0D",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Image
                                source={images.call}
                                style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: "contain"
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View >
        </>
    )
}

export default VideoCall
const styles = StyleSheet.create({


})