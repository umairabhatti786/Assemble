import { Pressable, StyleSheet, Platform, Image, View } from 'react-native'
import { colors } from '../../utils/colors'
import CustomText from '../CustomText'
import React from 'react'
import { images } from '../../assets'
import LinearGradient from 'react-native-linear-gradient'

type Props = {
    style?: any,
    onPress?: any,
    children?: any,
}

const ShadowButton = ({ children, style, onPress }: Props) => {
    return (
        <Pressable
            onPress={onPress}
            style={{ ...styles.button, ...style }}
        >
            <LinearGradient
                useAngle={true}
                angle={168}
                colors={["black","rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.15)"]}
                style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 7,
                    position: "absolute",
                }}
            />
            <View
                style={{
                    width: "99%",
                    height: "96%",
                    borderRadius: 7,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: '#171616',
                    ...styles?.innerButton
                }}
            >
                {children}
            </View>
        </Pressable >
    )
}
export default ShadowButton
const styles = StyleSheet.create({
    button: {
        width: 32,
        height: 32,
        // backgroundColor: 'yellow',
        backgroundColor: '#171616',
        borderRadius: 7,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        position: "relative"
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