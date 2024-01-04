import { Pressable, StyleSheet, Platform, Image, View } from 'react-native'
import { colors } from '../../utils/colors'
import CustomText from '../CustomText'
import React from 'react'
import { images } from '../../assets'
import ShadowButton from '../ShadowButton'
import CustomActions from '../CustomActions'

type Props = {

}

const PostFour = ({ }: Props) => {
    return (
        <View style={{
            backgroundColor: '#171616',
            width: "100%",
            borderRadius: 13,
            paddingHorizontal: 15,
            paddingVertical: 20,
            marginTop: 20
        }}>
            <View style={{ flexDirection: "row" }}>
                <Image
                    source={images.profile4}
                    style={{
                        width: 55,
                        height: 55,
                        borderRadius: 99
                    }}
                />
                <View style={{ flex: 1, paddingLeft: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <CustomText
                        text={"Showblack"}
                        weight={700}
                        size={13}
                        fontFam='Arial'
                        style={{ marginTop: 5 }}
                    />
                    <ShadowButton
                        onPress={() => { }}
                    >
                        <Image
                            source={images.share}
                            style={styles.menuButton}
                        />
                    </ShadowButton>
                </View>
            </View>
            <View style={styles.description}>
                <CustomText
                    text={"Navigating Social Connectivity in the Gen Z and Millennial Digital Realm"}
                    weight={700}
                    size={13}
                    fontFam='Arial'
                    style={{ marginTop: 5 }}
                />
            </View>
            <View style={styles.description}>
                <CustomText
                    text={"At the heart of this digital revolution is a commitment to social causes and activism. Both generations leverage the power of their online networks to amplify voices and champion societal change. The ease with which information spreads through these platforms has transformed them into catalysts for awareness, rallying support for a spectrum of issues, from environmental concerns to social justice causes. As the torchbearers of the digital age, Gen Z and Millennials integrate their smartphones into every facet of life. These devices aren't just communication tools; they are portals to a world where connection knows no bounds. The digital realm has not only redefined how relationships are formed and maintained but has also become a powerful vehicle for social impact, uniting generations in their shared pursuit of connectivity and change."}
                    weight={400}
                    size={13}
                    fontFam='Arial'
                    style={{ marginTop: 5 }}
                />
            </View>
            <View style={styles.description}>
                <CustomText
                    text={"At the heart of this digital revolution is a commitment to social causes and activism. Both generations leverage the power of their online networks to amplify voices and champion societal change. The ease with which information spreads through these platforms has transformed them into catalysts for awareness, rallying support for a spectrum of issues, from environmental concerns to social justice causes. As the torchbearers of the digital age, Gen Z and Millennials integrate their smartphones into every facet of life. These devices aren't just communication tools; they are portals to a world where connection knows no bounds."}
                    weight={400}
                    size={13}
                    fontFam='Arial'
                    style={{ marginTop: 5 }}
                />
            </View>
            <View style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "row"
            }}>
                <CustomActions
                    text="Like"
                    image={images.heart}
                />
                <CustomActions
                    text="Repost"
                    image={images.rePost}
                    style={{
                        marginLeft: 25
                    }}
                    imageHeight={25}
                    imageWidth={25}
                />
                <CustomActions
                    text="Nov 15 - 23"
                    style={{
                        marginLeft: 25
                    }}
                    imageHeight={25}
                    imageWidth={25}
                />
                <CustomActions
                    image={images.backArrow}
                    style={{
                        marginLeft: 25
                    }}
                />
            </View>
        </View>
    )
}
export default PostFour
const styles = StyleSheet.create({
    description: {
        width: '100%', // Set a specific width or adjust as needed
        flexDirection: 'row', // Ensure items are in a row
        flexWrap: 'wrap', // Allow text to wrap to the next line
        marginVertical: 10,
    },
    menuButton: {
        width: 22,
        height: 22,
        resizeMode: "contain"
    }
})