import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import ScreenLayout from '../../../components/ScreenLayout'
import { colors } from '../../../utils/colors'
import CustomText from '../../../components/CustomText'
import Checkbox from '../../../components/CheckBox'
import CustomButton from '../../../components/CustomButton'
import CustomView from '../../../components/CustomView'
import CustomInput from '../../../components/CustomInput'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { font } from '../../../utils/font'
import CustomInput2 from '../../../components/CustomInput2'
type Props = {
    navigation?: any
}

const ProfileComplete = ({ navigation }: Props) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: 4 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    return (
        <ScreenLayout style={{ paddingHorizontal: 40, paddingVertical: "10%" }} >
            <View style={{
                minHeight: "100%",
            }}>
                <View
                    style={{
                        alignItems: "center",
                        marginTop: 20,
                        zIndex: 20,
                    }}
                >
                    <CustomText
                        text={"Profile"}
                        size={22}
                        fontFam='Poppins'
                        weight={700}
                        style={{ zIndex: 999 }}
                    />
                </View>
                <View style={{
                    marginBottom: 30,
                }}>
                    <CustomInput2
                        placeholder='Username'
                        onChangeText={(x: any) => {
                            console.log(x, "x");

                        }}
                    />
                    <CustomInput2
                        placeholder='Email'
                        onChangeText={(x: any) => {
                            console.log(x, "x");

                        }}
                    />
                    <CustomInput2
                        placeholder='Website (Optional)'
                        onChangeText={(x: any) => {
                            console.log(x, "x");

                        }}
                    />
                    <CustomInput2
                        style={{ textAlignVertical: "top", paddingHorizontal: 5, paddinVertical: 15 }}
                        height={150}
                        placeholder='Bio'
                        onChangeText={(x: any) => {
                            console.log(x, "x");

                        }}
                    />
                    <CustomInput2
                        placeholder='Pin'
                        onChangeText={(x: any) => {
                            console.log(x, "x");

                        }}
                    />
                    <CustomInput2
                        placeholder='Confirm Pin'
                        onChangeText={(x: any) => {

                        }}
                    />
                </View>
                <View style={{
                    width: '100%',
                    marginTop: 40,
                }}>
                    <CustomButton
                        width={"90%"}
                        text='Continue'
                        borderRadius={39}
                        style={{
                            alignSelf: "center"
                        }}
                        onPress={() => {
                            navigation.navigate("Terms")
                        }}
                    />
                </View>
            </View>
        </ScreenLayout >
    )
}

export default ProfileComplete
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