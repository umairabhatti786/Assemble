import { Pressable, Text, View } from 'react-native'
import { colors } from '../../utils/colors'
import React from 'react'
import CustomText from '../CustomText'
import { font } from '../../utils/font'
import ShadowButton from '../ShadowButton'

type Props = {
    data?: any,
    selectedTab?: any,
    setSelectedTab?: any,
}

const TabSelection = ({ data, selectedTab, setSelectedTab }: Props) => {
    return (
        <View
            style={{
                flexDirection: "row",
                marginTop: "8%",
                gap: 10
            }}
        >
            {data?.map((item: any, _index: any) => {
                return (
                    selectedTab === item ?
                        <ShadowButton
                            style={{
                                width: "32.3%",
                                height: 46,
                                borderRadius: 16
                            }}
                        >
                            <CustomText
                                text={item}
                                size={14}
                                weight={500}
                                fontFam={font.inter}
                                color={colors.primary}
                            />
                        </ShadowButton>
                        :
                        <Pressable
                            onPress={() => {
                                setSelectedTab(item)
                            }}
                            style={{
                                width: "32.3%",
                                height: 46,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <CustomText
                                text={item}
                                size={14}
                                weight={500}
                                fontFam={font.inter}
                                color={colors.grey}
                            />
                        </Pressable>
                )
            })}
        </View>
    )
}
export default TabSelection
