import { Pressable, StyleSheet, Platform, Image, View } from 'react-native'
import { colors } from '../../utils/colors'
import CustomText from '../CustomText'
import React from 'react'
import { images } from '../../assets'
import ShadowButton from '../ShadowButton'
import CustomActions from '../CustomActions'

type Props = {

}

const PostOne = ({  }: Props) => {
    return (
        <View style={{
            backgroundColor: '#171616',
            height: 332,
            width: "100%",
            marginVertical: "5%",
            borderRadius: 13,
            paddingHorizontal: 15,
            paddingTop: 20
        }}>
            <View style={{ flexDirection: "row" }}>
                <Image
                    source={images.profile2}
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
            <View style={{ ...styles.description, justifyContent: "center" }}>
                <CustomText
                    text={"We are happy to announce our"}
                    weight={700}
                    size={13}
                    fontFam='Arial'
                />
                <CustomText
                    text={" +Nu"}
                    weight={700}
                    size={14}
                    fontFam='Arial'
                    color={colors.primary}
                />
                <CustomText
                    text={" partnerships"}
                    weight={700}
                    size={13}
                    fontFam='Arial'
                />
            </View>
            <Image
                source={images.post1}
                style={{
                    width: "100%",
                    height: 157,
                    resizeMode: "contain",
                    marginTop: 10,
                    borderRadius: 12
                }}
            />
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
export default PostOne
const styles = StyleSheet.create({
    description: {
        width: '100%', // Set a specific width or adjust as needed
        flexDirection: 'row', // Ensure items are in a row
        flexWrap: 'wrap', // Allow text to wrap to the next line
        marginTop: 15,
    },
    menuButton: {
        width: 22,
        height: 22,
        resizeMode: "contain"
    }
})