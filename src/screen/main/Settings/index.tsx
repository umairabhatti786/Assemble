import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import ScreenLayout from '../../../components/ScreenLayout'
import CustomMenu2 from '../../../components/CustomMenu2'
import SettingCard from './SettingCard'
import CustomButton from '../../../components/CustomButton'

type Props = {
    navigation?: any
}

const Settings = ({ navigation }: Props) => {
    const [isChecked, setIsChecked] = useState(true);
    const text = "At directoapp, we recognize that privacy is an important issue, so we design and operate our services with the protection of your privacy in mind. This Privacy Policy outlines the types of personal information we gather when you use directoapp, services, as well as the steps we take to protect it.The following principles apply to the personally identifying information we ask for and that you provide. “Personally identifying information” is information that individually identifies you, such as your name, physical address or email address. User Contentdirectoapp allows users to share and follow content under a safe environment, in its professional social structure, audio, chats, video, document sharing and all forms of our social Community. All users are responsible for their own behavior and interaction online. All content and "
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
                        text='Settings'
                        navigation={navigation}
                    />
                </View>
                <View
                    style={{
                        gap: 40,
                        marginTop: 50
                    }}
                >
                    <SettingCard
                        text='Chat'
                    />
                    <SettingCard
                        text='Calls'
                    />
                    <SettingCard
                        text='Tags'
                    />
                    <SettingCard
                        text='Profile Sharing'
                    />
                    <SettingCard
                        text='Chat'
                    />
                    <SettingCard
                        text='Join Admins'
                    />
                    <SettingCard
                        text='Chat'
                    />
                </View>
                <View style={{
                    width: '100%',
                    marginTop: 45,
                }}>
                    <CustomButton
                        width={"90%"}
                        text='Update'
                        borderRadius={39}
                        style={{
                            alignSelf: "center"
                        }}
                        onPress={() => {
                            navigation && navigation.goBack();
                        }}
                    />
                </View>
            </View>
        </ScreenLayout>
    )
}

export default Settings