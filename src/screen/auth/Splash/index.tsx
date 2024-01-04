import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { images } from '../../../assets'
import CustomText from '../../../components/CustomText'
import { colors } from '../../../utils/colors'

type Props = {}

const Splash = (props: Props) => {
    
    return (
        <View style={styles.container}>
            <Image
                source={images.logo}
                style={{
                    resizeMode: "contain",
                    width: 275,
                    height: 275,
                }}
                resizeMode="contain"
            />
            <View>
                <CustomText
                    text={"The Social"}
                    size={20}
                    fontFam='Arial'
                    weight={700}
                    color={colors.primary}
                />
                <CustomText
                    text={"Blockchain Consortium"}
                    size={20}
                    fontFam='Arial'
                    weight={700}
                    color={colors.primary}
                />
            </View>
        </View >
    )
}

export default Splash
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.xlightblack,
        justifyContent: "center",
        alignItems: "center"
    }
})