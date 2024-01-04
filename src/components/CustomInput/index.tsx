import React from 'react'
import { Pressable, Text, View, TextInput } from 'react-native'

type Props = {
    placeholder?: string
    onChangeText?: any
    height?: any
    bgColor?: any
    textColor?: string
    borderRadius?: number
    style?: any
    multiline?: any
    value?: any
}

const CustomInput = ({ onChangeText, placeholder, textColor, height, bgColor, borderRadius, style, multiline, value }: Props) => {
    return (
        <TextInput
            style={{ fontSize: 15, flex: 1, color: textColor, height: height || "100%", backgroundColor: bgColor, borderRadius: borderRadius, ...style }}
            placeholder={placeholder}
            placeholderTextColor={textColor}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={onChangeText}
            multiline={multiline}
            value={value}
        />
    )
}
export default CustomInput
