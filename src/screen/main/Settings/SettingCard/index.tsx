import { Image, Pressable, StyleSheet, Platform, View, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import CustomView from '../../../../components/CustomView'
import CustomText from '../../../../components/CustomText'
import { colors } from '../../../../utils/colors'
import { images } from '../../../../assets'

type Props = {
    text?: string
}

const SettingCard = ({ text }: Props) => {
    const [isOn, setIsOn] = useState(false);
    return (
        <CustomView
            innerButtonStyle={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 15
            }}
        >
            <CustomText
                text={text}
                size={16}
                weight={700}
            />
            <Pressable
                onPress={() => {
                    setIsOn((prev) => !prev)
                }}
                style={{
                    width: 45,
                    height: 50,
                    borderRadius: 30,
                }}
            >
                <ImageBackground
                    source={isOn ? images.bgImage : images.bgImage2}
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    resizeMode='contain'
                >
                    <CustomText
                        text={isOn ? "On" : "Off"}
                    />
                </ImageBackground>
            </Pressable>
        </CustomView>
    )
}
export default SettingCard
const styles = StyleSheet.create({
    header: {
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 50,
        marginBottom: 25,
        flexDirection: "row",
    },
    menuButton: {
        width: 24,
        height: 24,
        resizeMode: "contain"
    }
})