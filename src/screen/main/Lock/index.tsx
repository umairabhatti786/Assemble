import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import ScreenLayout from '../../../components/ScreenLayout'
import CustomMenu2 from '../../../components/CustomMenu2'
import CustomButton from '../../../components/CustomButton'
import { images } from '../../../assets'
import CustomText from '../../../components/CustomText'

type Props = {
    navigation?: any
}

const Lock = ({ navigation }: Props) => {
    const [isChecked, setIsChecked] = useState(true);
    return (
        <ScreenLayout style={{}} >
            <View
                style={{
                    alignItems: "center",
                    flex: 1,
                    marginTop: "10%",
                    zIndex: 20,
                    marginHorizontal: 40
                }}
            >
                <View
                    style={{ width: "100%" }}
                >
                    <CustomMenu2
                        text='Lock'
                        navigation={navigation}
                    />
                </View>
                <View
                    style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 100,
                    }}
                >
                    <Image
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 99
                        }}
                        source={images.profile2}
                    />
                    <CustomText
                        text={"Showblock"}
                        size={20}
                        weight={700}
                        style={{
                            marginTop: 20,
                        }}
                    />
                    <CustomText
                        text={"+ 2,713"}
                        size={16}
                        weight={500}
                    />
                </View>
                <View
                    style={{
                        width: "80%",
                        marginTop: 50
                    }}
                >
                    <CustomText
                        text={"Are you sure you would like to log out?"}
                        size={20}
                        weight={700}
                        style={{
                            marginTop: 20,
                        }}
                    />
                </View>
                <View style={{
                    width: '100%',
                    marginTop: 45,
                }}>
                    <CustomButton
                        width={"90%"}
                        text='Lock'
                        borderRadius={39}
                        style={{
                            alignSelf: "center"
                        }}
                        onPress={() => {
                            navigation.popToTop();
                        }}
                    />
                </View>
            </View>
        </ScreenLayout>
    )
}

export default Lock