import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import ScreenLayout from '../../../components/ScreenLayout'
import { colors } from '../../../utils/colors'
import CustomText from '../../../components/CustomText'
import Checkbox from '../../../components/CheckBox'
import CustomButton from '../../../components/CustomButton'
import CustomView from '../../../components/CustomView'
import { font } from '../../../utils/font'
import CustomInput2 from '../../../components/CustomInput2'
import CustomMenu2 from '../../../components/CustomMenu2'
import CustomInput from '../../../components/CustomInput'
import { images } from '../../../assets'
type Props = {
    navigation?: any
}

const Admins = ({ navigation }: Props) => {
    const [values, setValues] = useState([]);
    const [inputValue, setInputValue] = useState("")
    return (
        <ScreenLayout style={{ paddingHorizontal: 40, paddingVertical: "15%" }} >
            <View style={{
                height: "100%"
            }}>
                <CustomMenu2
                    text='Admins'
                    navigation={navigation}
                />
                <View style={{
                    flex: 1
                }}>
                    <CustomInput2
                        placeholder='Showblock (Owner)'
                        onChangeText={(x: any) => {
                            console.log(x);
                        }}
                    />
                    <CustomView
                        outerStyle={{
                            marginTop: 40
                        }}
                        height={45}
                        angles={175}
                        width={"100%"}
                        innerButtonStyle={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row"
                            }}
                        >
                            {
                                values.map((x) => {
                                    return (
                                        <TouchableOpacity
                                            key={x}
                                            style={{
                                                paddingHorizontal: 10,
                                                paddingVertical: 4,
                                                backgroundColor: colors.primary,
                                                borderRadius: 12,
                                                marginHorizontal: 5
                                            }}
                                        >
                                            <CustomText
                                                text={x}
                                                size={15}
                                            />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        {values.length < 3 && <CustomInput
                            textColor={'white'}
                            style={{ paddingLeft: 20, width: "100%" }}
                            placeholder={"Add Controllers"}
                            onChangeText={(x: string) => {
                                setInputValue(x);
                            }}
                            value={inputValue}

                        />}
                        <TouchableOpacity
                            style={{
                                height: "100%",
                                width: "10%",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => {
                                if (inputValue) {
                                    setInputValue("");
                                    setValues([...values, inputValue])
                                }
                            }}
                        >
                            <Image
                                source={images.add}
                                style={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: "contain",
                                    tintColor: colors.primary
                                }}
                            />
                        </TouchableOpacity>
                    </CustomView>
                    <CustomInput2
                        placeholder='Website (Optional)'
                        onChangeText={(x: any) => {
                            console.log(x);
                        }}
                    />
                    <CustomInput2
                        placeholder='Block Name'
                        onChangeText={(x: any) => {
                            console.log(x);
                        }}
                    />
                    <CustomInput2
                        style={{ textAlignVertical: "top", paddingHorizontal: 5, paddinVertical: 15 }}
                        height={150}
                        placeholder='Add Bio'
                        onChangeText={(x: any) => {
                            console.log(x, "x");

                        }}
                        multiline={true}
                    />
                </View>
                <View style={{
                    width: '100%',
                    marginTop: 100,
                }}>
                    <CustomButton
                        width={"90%"}
                        text='Continue'
                        borderRadius={39}
                        style={{
                            alignSelf: "center"
                        }}
                    />
                </View>
            </View>
        </ScreenLayout >
    )
}

export default Admins
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