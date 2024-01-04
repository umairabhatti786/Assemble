import { Image, Pressable, Text, View } from 'react-native'
import { colors } from '../../utils/colors'
import React, { useState } from 'react'
import { images } from '../../assets'
import CustomText from '../CustomText'

type Props = {
    text?: string,
    image?: any,
    style?: any,
    imageWidth?: any
    imageHeight?: any
    onPress?: any
    imageStyle?: any
}

const CustomActions = ({ text, image, style, imageWidth, imageHeight, onPress, imageStyle }: Props) => {
    const [isSelected, setIsSelected] = useState(true);
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                ...style
            }}
        >
            {image && <Pressable
                onPress={() => {
                    onPress && onPress();
                    setIsSelected((prev) => !prev)
                }}
            >
                <Image
                    source={image}
                    style={{
                        width: imageWidth || 20,
                        height: imageHeight || 20,
                        resizeMode: "contain",
                        tintColor: !isSelected ? "white" : null,
                        ...imageStyle
                    }}
                />
            </Pressable>}

            {text &&
                <CustomText
                    text={text}
                    weight={700}
                    size={13}
                    fontFam='Arial'
                    style={{ marginLeft: 10 }}
                />
            }
        </View>
    )
}
export default CustomActions
