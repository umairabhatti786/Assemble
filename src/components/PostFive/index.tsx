import { Pressable, StyleSheet, Platform, View, Linking } from 'react-native'
import CustomText from '../CustomText'
import React, { useState } from 'react'
import { images } from '../../assets'
import CustomActions from '../CustomActions'
import { colors } from '../../utils/colors'
import ShadowButton2 from '../ShadowButton2'
import CustomView from '../CustomView'
import { useCameraPermissions } from '../../utils/Permissions/useCameraPermission'
import { openSettings } from 'react-native-permissions'
import ImagePicker from "react-native-image-crop-picker";
type Props = {

}

const PostFive = ({ }: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    const { checkGalleryPermission } = useCameraPermissions();
    const chooseFile = async () => {
        console.log("ckdnkcndkcn");
        const galleryRes = await checkGalleryPermission();

        if (galleryRes == "granted" || galleryRes == "limited") {
            // setIsVideoLoading && setIsVideoLoading(true);
            console.log("CLICKED");
            let options = {
                mediaType: "mixed",
                quality: 0.5,
                base64: true,
                selectionLimit: 5,
                multiple: true,
            };

            ImagePicker.openPicker(options)
                .then((response) => {
                    console.log("responseData", response);
                    setIsVisible(false);
                })
                .catch((error: any) => {
                    console.log(error);
                    setIsVisible(false);
                });
        } else {
            if (galleryRes == "blocked") {
                if (Platform.OS == "ios") {
                    openSettings();
                } else {
                    Linking.openSettings();
                }
            }
        }
    };
    return (
        <View style={{
            backgroundColor: '#171616',
            width: "100%",
            marginVertical: "5%",
            borderRadius: 13,
            paddingHorizontal: 15,
            paddingVertical: 20
        }}>
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
                flexDirection: "row",
                paddingRight: 20
            }}>
                <CustomActions
                    image={images.add}
                    onPress={() => {
                        setIsVisible((prev) => !prev)
                    }}
                    imageStyle={{
                        tintColor: colors.primary
                    }}
                    style={{
                        marginLeft: 25
                    }}
                />
                <CustomActions
                    image={images.backArrow}
                    style={{
                        marginLeft: 25
                    }}
                />
                {isVisible &&
                    <CustomView
                        angles={130}
                        outerStyle={{
                            position: "absolute",
                            top: 18,
                            right: 75,
                            zIndex: 50,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        height={150}
                        width={120}
                        innerButtonStyle={{
                            paddingTop: 20,
                            paddingLeft: 10,
                            gap: 10
                        }}
                    >
                        <Pressable
                            onPress={() => {
                                chooseFile();
                            }}
                        >
                            <CustomText
                                text={"Add Image"}
                                size={16}
                            />
                        </Pressable>
                        <Pressable>
                            <CustomText
                                text={"Add Tags"}
                                size={16}
                            />
                        </Pressable>
                    </CustomView>
                }
            </View>
            <View
                style={{
                    marginTop: 15,
                    marginBottom: 10
                }}
            >
                <CustomText
                    text={"Title: Web3 is coming back!"}
                    weight={400}
                    size={17}
                    fontFam='Poppins'
                    style={{ marginTop: 5 }}
                />
            </View>
            <CustomText
                text={"We all heard about Web3 push into tech entering into 2021. Now after almost two years of silence, the space is picking back up. "}
                weight={400}
                size={16}
                fontFam='Poppins'
                style={{ marginTop: 5 }}
            />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center"
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        paddingTop: 15,
                        gap: 5
                    }}
                >
                    <ShadowButton2
                        borderRadius={32}
                        width={100}
                        height={40}
                        text={"+Block"}
                    />
                    <ShadowButton2
                        borderRadius={32}
                        width={100}
                        height={40}
                        text={"+Web3"}
                    />
                </View>
                <View
                    style={{
                        justifyContent: "center",
                        alignContent: "center",
                        marginTop: 15
                    }}
                >
                    <CustomText
                        text={"Send"}
                        size={17}
                        color={colors.primary}
                    />
                </View>
            </View>
        </View>
    )
}
export default PostFive
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