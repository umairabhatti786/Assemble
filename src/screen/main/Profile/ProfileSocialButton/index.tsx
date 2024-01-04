import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../utils/colors'
import CustomText from '../CustomText'
import React from 'react'

type Props = {
    icon?: any
    onPress?: any
    style?: any
    bgColor?: any
    borderColor?: any
    imageStyle?: any
}

const ProfileSocialButton = ({ icon, onPress, bgColor, borderColor, style, imageStyle }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: 35,
                height: 30,
                borderWidth: 3,
                borderColor: borderColor,
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: bgColor,
                ...style
            }}>
            <Image
                source={icon}
                style={{
                    width: 14,
                    height: 14,
                    resizeMode: 'contain',
                    ...imageStyle
                }}
            />
        </TouchableOpacity>
    )
}
export default ProfileSocialButton
