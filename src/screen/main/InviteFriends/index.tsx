import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import ScreenLayout from '../../../components/ScreenLayout'
import { colors } from '../../../utils/colors'
import CustomText from '../../../components/CustomText'
import Checkbox from '../../../components/CheckBox'
import CustomButton from '../../../components/CustomButton'
import CustomView from '../../../components/CustomView'
import { font } from '../../../utils/font'
import CustomInput2 from '../../../components/CustomInput2'
import CustomMenu2 from '../../../components/CustomMenu2'
import ShadowButton from '../../../components/ShadowButton'
import { images } from '../../../assets'
type Props = {
    navigation?: any
}

const InviteFriends = ({ navigation }: Props) => {

    return (
        <ScreenLayout style={{ paddingHorizontal: 40, paddingVertical: "15%" }} >
            <View style={{
                height: "100%"
            }}>
                <CustomMenu2
                    text='Invite Friends'
                    navigation={navigation}
                />
                <View style={{
                    flex: 1,
                    marginTop: "40%"
                }}>
                    <CustomView
                        innerButtonStyle={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                            paddingHorizontal: 15
                        }}
                    >
                        <CustomText
                            text={"Copy to get code link"}
                            size={14}
                        />
                        <ShadowButton
                            onPress={() => {

                            }}
                        >
                            <Image
                                source={images.burgerMenu}
                                style={{ width: 22, height: 22 }}
                            />
                        </ShadowButton>
                    </CustomView>
                    <View
                        style={{
                            marginTop: "10%",
                            marginLeft: 10
                        }}
                    >
                        <CustomText
                            text={"1. Invite a friends via your referral code"}
                            size={17}
                        />
                        <CustomText
                            text={"2. Ask your friends to sign up"}
                            size={17}
                            style={{ marginTop: 10 }}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        </ScreenLayout >
    )
}

export default InviteFriends
const styles = StyleSheet.create({
    root: { justifyContent: "center", gap: 44 },
    codeFieldRoot: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 12,
        height: 100,
        borderColor: "#092F7459",
    },
    cell: {
        fontSize: 24,
        fontFamily: font.poppins,
        color: colors.primary
    },
    focusCell: {
        borderColor: "#092F7459",
    },
})