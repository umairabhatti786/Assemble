import React, { useState } from 'react'
import { Text, View } from 'react-native'
import ScreenLayout from '../../../components/ScreenLayout'
import { colors } from '../../../utils/colors'
import CustomText from '../../../components/CustomText'
import Checkbox from '../../../components/CheckBox'
import CustomButton from '../../../components/CustomButton'
import Layout from '../../../components/Layout'

type Props = {
    navigation?: any
}

const Terms = ({ navigation }: Props) => {
    const [isChecked, setIsChecked] = useState(true);
    const text = "At directoapp, we recognize that privacy is an important issue, so we design and operate our services with the protection of your privacy in mind. This Privacy Policy outlines the types of personal information we gather when you use directoapp, services, as well as the steps we take to protect it.The following principles apply to the personally identifying information we ask for and that you provide. “Personally identifying information” is information that individually identifies you, such as your name, physical address or email address. User Contentdirectoapp allows users to share and follow content under a safe environment, in its professional social structure, audio, chats, video, document sharing and all forms of our social Community. All users are responsible for their own behavior and interaction online. All content and "
    return (
        <ScreenLayout style={{}} >
            <View
                style={{
                    alignItems: "center",
                    flex: 1,
                    marginTop: "15%",
                    zIndex: 20
                }}
            >
                <CustomText
                    text={"Nu Terms & Conditions"}
                    size={22}
                    fontFam='Poppins'
                    weight={700}
                    style={{ zIndex: 999 }}
                />
                <View
                    style={{
                        paddingHorizontal: 30,
                        marginTop: "7%"
                    }}
                >
                    <CustomText
                        text={text}
                        size={16}
                        fontFam='Raleway'
                        weight={400}
                        lineHeight={26.31}
                    />
                </View>
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    marginTop: "10%",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Checkbox
                        setIsChecked={setIsChecked}
                        isChecked={isChecked}
                    />
                    <CustomText
                        text={"I agree to the terms and conditions"}
                        size={18}
                        fontFam='Poppins'
                        weight={400}
                        style={{ zIndex: 999 }}
                    />
                </View>
                <View style={{
                    width: '80%',
                    marginTop: "10%",
                }}>
                    <CustomButton
                        text='Continue'
                        borderRadius={39}
                        onPress={() => {
                            navigation.navigate("BottomNavigator")
                        }}
                    />

                </View>
            </View>
        </ScreenLayout>
    )
}

export default Terms