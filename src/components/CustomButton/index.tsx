import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../utils/colors'
import CustomText from '../CustomText'
import React from 'react'

type Props = {
    text?: string
    onPress?: any
    width?: any
    height?: number
    size?: number
    fontFam?: any
    elevation?: number
    borderRadius?: number
    style?: any
    bgColor?: any
    textColor?: any
    borderColor?: any
}

const CustomButton = ({ text, onPress, width, height, size, fontFam, elevation, borderRadius, style, bgColor, textColor, borderColor }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.5}
        >
            <View
                style={{ ...style, width: width || "100%", height: height || 47, backgroundColor: bgColor || colors.primary, justifyContent: "center", alignItems: "center", borderRadius: borderRadius || 12, elevation: elevation, borderWidth: 2, borderColor: borderColor || colors.primary }}
            >
                <CustomText
                    text={text}
                    color={textColor || colors.white}
                    size={size || 17}
                    weight={700}
                />
            </View>
        </TouchableOpacity>
    )
}
export default CustomButton
