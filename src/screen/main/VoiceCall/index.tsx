import React, { useState } from 'react'
import { FlatList, Image, ImageBackground, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import { images } from '../../../assets'
import CustomText from '../../../components/CustomText'
import { colors } from '../../../utils/colors'
import { useRoute } from '@react-navigation/native'
type Props = {
    navigation?: any
}

const VoiceCall = ({ navigation }: Props) => {
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
            <ImageBackground
                source={image || images.profile4}
                style={{
                    flex: 1,
                    paddingVertical: "18%"
                }}
                blurRadius={20}
            >
                <View
                    style={{
                        flex: 1,
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
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Image
                            style={{
                                width: 200,
                                height: 200,
                                borderRadius: 999
                            }}
                            source={image || images.profile4}
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
            </ImageBackground>
        </>
    )
}

export default VoiceCall
const styles = StyleSheet.create({


})