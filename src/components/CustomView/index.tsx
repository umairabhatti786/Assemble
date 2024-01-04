import { Pressable, StyleSheet, Platform, Image, View } from 'react-native'
import { colors } from '../../utils/colors'
import CustomText from '../CustomText'
import React from 'react'
import { images } from '../../assets'
import LinearGradient from 'react-native-linear-gradient'

type Props = {
    outerStyle?: any,
    innerButtonStyle?: any,
    children?: any,
    height?: any,
    width?: any,
    angles?: number,
}

const CustomView = ({ children, outerStyle, innerButtonStyle, height, width, angles }: Props) => {
    return (
        <View
            style={{
                width: width || "100%",
                height: height || 45,
                backgroundColor: '#171616',
                borderRadius: 12,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                position: "relative",
                ...outerStyle
            }}
        >
            <LinearGradient
                useAngle={true}
                angle={angles || 172}
                colors={["black", "black", "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.1)"]}
                style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 12,
                    position: "absolute",
                }}
            />
            <View
                style={{
                    width: width - 2 || "99.5%",
                    height: height - 2 || 45,
                    borderRadius: 12,
                    backgroundColor: '#171616',
                    ...innerButtonStyle
                }}
            >
                {children}
            </View>
        </View >
    )
}
export default CustomView
const styles = StyleSheet.create({

})