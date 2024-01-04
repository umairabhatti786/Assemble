import { Pressable, StyleSheet, Platform, Image, View } from 'react-native'
import { colors } from '../../utils/colors'
import CustomText from '../CustomText'
import React from 'react'
import { images } from '../../assets'
import LinearGradient from 'react-native-linear-gradient'

type Props = {
    style?: any,
    onPress?: any,
    text?: any,
    borderRadius?: any,
    height?: any
    width?: any
}

const ShadowButton2 = ({ text, style, onPress, borderRadius, height, width }: Props) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                width: width + 5 || `${100 + 10}%`,
                height: height || 45 + 4,
                backgroundColor: '#171616',
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                borderRadius: borderRadius || 7,
                ...style
            }}
        >
            <LinearGradient
                useAngle={true}
                angle={168}
                colors={["rgba(255, 255, 255, 0.02)", "rgba(255, 255, 255, 0.02)"]}
                style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: borderRadius || 7,
                    position: "absolute",
                }}
            />
            <View
                style={{
                    width: width || "100%",
                    height: height || 45,
                    borderRadius: borderRadius || 7,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: colors.primary,
                    ...styles?.innerButton
                }}
            >
                <CustomText
                    text={text}
                />
            </View>
        </Pressable >
    )
}
export default ShadowButton2
const styles = StyleSheet.create({
    button: {

    },
    innerButton: {
        ...Platform.select({
            ios: {
                shadowColor: '#ffffff',
                shadowOffset: { width: 1.5, height: 1.5 },
                shadowOpacity: 4,
                shadowRadius: 4,
            },
            android: {
                elevation: 25,
            },
        }),
    }
})