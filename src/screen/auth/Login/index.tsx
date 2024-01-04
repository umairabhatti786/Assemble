import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
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
type Props = {
    navigation?: any
}

const Login = ({ navigation }: Props) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: 4 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    return (
        <ScreenLayout style={{ paddingHorizontal: 40, paddingVertical: "20%" }} >
            <View style={{
                height: "100%"
            }}>
                <View
                    style={{
                        alignItems: "center",
                        marginTop: 20,
                        zIndex: 20,
                    }}
                >
                    <CustomText
                        text={"Login"}
                        size={22}
                        fontFam='Poppins'
                        weight={700}
                        style={{ zIndex: 999 }}
                    />
                </View>
                <View style={{
                    rowGap: 10,
                    marginTop: 100,
                }}>
                    <CustomText
                        text={"Enter Email"}
                        size={18}
                        fontFam='Poppins'
                        weight={700}
                        style={{ zIndex: 999, marginLeft: 10 }}
                    />
                    <CustomView
                        outerStyle={{
                            marginTop: 10
                        }}
                        height={45}
                        angles={173}
                        width={"100%"}
                    >
                        <CustomInput
                            textColor='white'
                            style={{ paddingLeft: 20, width: "100%" }}
                        />
                    </CustomView>
                    <CustomText
                        text={"Set Pin"}
                        size={18}
                        fontFam='Poppins'
                        weight={700}
                        style={{ zIndex: 999, marginLeft: 5, marginTop: 40, marginBottom: 15 }}
                    />
                    <CodeField
                        ref={ref}
                        caretHidden={true}
                        value={value}
                        onChangeText={setValue}
                        cellCount={4}
                        rootStyle={styles.root}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <CustomView
                                width={50}
                                angles={140}
                                height={50}
                                innerButtonStyle={{
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                                key={index}>
                                <Text style={styles.cell}>
                                    {symbol}
                                </Text>
                            </CustomView>
                        )}
                    />
                    <View
                        style={{
                            marginHorizontal: 30,
                            marginTop: 10
                        }}
                    >
                        <CustomText
                            text={"Please do not lose your pin. If you lose your pin you will not have access to your Nu account."}
                            size={16}
                            fontFam='Poppins'
                            weight={400}
                            style={{ zIndex: 999, marginLeft: 5, marginTop: "10%" }}
                        />
                    </View>
                </View>
                <View style={{
                    width: '100%',
                    marginTop: 50
                }}>
                    <CustomButton
                        width={"90%"}
                        text='Continue'
                        borderRadius={39}
                        style={{
                            alignSelf: "center"
                        }}
                        onPress={() => {
                            navigation.navigate("ProfileComplete")
                        }}
                    />
                </View>
            </View>
        </ScreenLayout >
    )
}

export default Login
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