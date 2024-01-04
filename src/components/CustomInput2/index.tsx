import React from 'react'
import CustomView from '../CustomView'
import CustomInput from '../CustomInput'

type Props = {
    placeholder?: string
    onChangeText?: any
    height?: any
    bgColor?: any
    textColor?: string
    borderRadius?: number
    style?: any
    multiline?: any
}

const CustomInput2 = ({ onChangeText, placeholder, textColor, height, style, multiline }: Props) => {
    return (
        <CustomView
            outerStyle={{
                marginTop: 40
            }}
            height={height || 54}
            angles={175}
            width={"100%"}
        >
            <CustomInput
                textColor={textColor || 'white'}
                style={{ paddingLeft: 20, width: "100%", ...style }}
                placeholder={placeholder}
                onChangeText={onChangeText}
                multiline={multiline}
            />
        </CustomView>
    )
}
export default CustomInput2
