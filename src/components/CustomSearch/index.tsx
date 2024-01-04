import React from 'react'
import { Pressable, Text, View, TextInput, Image } from 'react-native'
import CustomInput from '../CustomInput'
import { images } from '../../assets'
import LinearGradient from 'react-native-linear-gradient'

type Props = {
    onChangeText?: any
    onSearch?: any
    style?: any
}

const CustomSearch = ({ onChangeText, onSearch, style }: Props) => {
    return (
        <LinearGradient
            useAngle={true}
            angle={30}
            colors={["#18182599", "#18182580"]}
            style={{
                height: 48,
                width: '100%',
                borderRadius: 15,
                ...style
            }}
        >
            <View style={{
                flex: 1,
                borderRadius: 15,
                justifyContent: "center",
                alignContent: "center",
                paddingLeft: 14,
                flexDirection: "row",
            }}>
                <Pressable onPress={onSearch}>
                    <Image
                        source={images?.search}
                        style={{ width: 38, height: 38, resizeMode: "cover", marginTop: 5 }}
                    />
                </Pressable>
                <CustomInput
                    textColor='#ffff'
                    placeholder='Search'
                    style={{ marginLeft: 5, opacity: 0.6 }}
                    onChangeText={onChangeText}
                />
            </View>
        </LinearGradient>
    )
}
export default CustomSearch
