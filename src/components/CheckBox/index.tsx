import { Image, Pressable, Text, View } from 'react-native'
import { images } from '../../assets'
import { colors } from '../../utils/colors'
import React from 'react'

type Props = {
    isChecked: any
    setIsChecked: any
}

const Checkbox = ({ isChecked, setIsChecked }: Props) => {
    return (
        <Pressable
            onPress={() => {
                setIsChecked(!isChecked)
            }}
        >
            <View style={{ width: 22, height: 22, borderWidth: 2, borderColor: colors.primary, borderRadius: 9999, justifyContent: "center", alignItems: "center", padding: 3 }}>
                {isChecked && <Image
                    source={images.tick}
                    style={{
                        width: 13,
                        height: 13,
                        resizeMode: "contain"
                    }}
                />}
            </View>
        </Pressable>
    )
}
export default Checkbox
