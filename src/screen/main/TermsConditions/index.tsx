import React, { useState } from 'react'
import { Text, View } from 'react-native'
import ScreenLayout from '../../../components/ScreenLayout'
import { colors } from '../../../utils/colors'
import CustomText from '../../../components/CustomText'
import Checkbox from '../../../components/CheckBox'
import CustomButton from '../../../components/CustomButton'
import CustomMenu2 from '../../../components/CustomMenu2'

type Props = {
    navigation?: any
}

const TermsConditions = ({ navigation }: Props) => {
    const [isChecked, setIsChecked] = useState(true);
    const text = "At directoapp, we recognize that privacy is an important issue, so we design and operate our services with the protection of your privacy in mind. This Privacy Policy outlines the types of personal information we gather when you use directoapp, services, as well as the steps we take to protect it.The following principles apply to the personally identifying information we ask for and that you provide. “Personally identifying information” is information that individually identifies you, such as your name, physical address or email address. User Contentdirectoapp allows users to share and follow content under a safe environment, in its professional social structure, audio, chats, video, document sharing and all forms of our social Community. All users are responsible for their own behavior and interaction online. All content and "
    return (
        <ScreenLayout style={{}} >
            <View
                style={{
                    alignItems: "center",
                    flex: 1,
                    marginTop: "15%",
                    zIndex: 20,
                    marginHorizontal: 30
                }}
            >
                <View
                    style={{ width: "100%" }}
                >
                    <CustomMenu2
                        text='Nu Terms & Conditions'
                        navigation={navigation}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 40
                    }}
                >
                    <CustomText
                        text={text}
                        size={15}
                        fontFam='Raleway'
                        weight={400}
                        lineHeight={26.31}
                        style={{ textAlign: "center" }}
                    />
                </View>
            </View>
        </ScreenLayout>
    )
}

export default TermsConditions