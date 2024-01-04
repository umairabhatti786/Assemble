import React, { useState } from 'react'
import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import ScreenLayout from '../../../components/ScreenLayout'
import { colors } from '../../../utils/colors'
import CustomText from '../../../components/CustomText'
import { font } from '../../../utils/font'
import { chatList, chatList2 } from '../../../utils/Data'
import CustomModal from '../../../components/CustomModal'
import CustomButton from '../../../components/CustomButton'
import { images } from '../../../assets'
import ShadowButton from '../../../components/ShadowButton'
import CustomView from '../../../components/CustomView'
type Props = {
    navigation?: any
}

const Chat = ({ navigation }: Props) => {
    const [isModalVisible, setModalVisible] = useState(false)
    return (
        <ScreenLayout
            style={{
                backgroundColor: "#1E1E1E"
            }}
        >
            <View style={styles.container}>
                <View
                    style={{
                        alignItems: "center",
                        marginTop: 10,
                        zIndex: 20,
                        flexDirection: "row",
                        width: "100%",

                    }}
                >
                    <ShadowButton>
                        <Image
                            source={images.backArrow}
                            style={{ width: 18, height: 18, resizeMode: "contain", tintColor: "white" }}
                        />
                    </ShadowButton>
                    <CustomText
                        text={"Chat"}
                        size={22}
                        fontFam='Poppins'
                        weight={700}
                        style={{ zIndex: 999, marginLeft: "32%" }}
                    />
                </View>
                <FlatList
                    data={chatList2}
                    contentContainerStyle={{
                        gap: 15,
                        marginVertical: "10%"
                    }}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => {
                        return (
                            <Pressable
                                onPress={() => {
                                }}
                                style={styles.chatList}
                            >
                                <CustomView
                                    innerButtonStyle={{
                                        flexDirection: "row",
                                        paddingLeft: 10,
                                        alignItems: "center"
                                    }}
                                    height={75}
                                >
                                    <Image
                                        style={styles.image}
                                        source={item?.image}
                                    />
                                    <View style={styles.chat}>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: "85%"
                                            }}
                                        >
                                            <CustomText
                                                text={item?.title}
                                                weight={700}
                                                fontFam='Arial'
                                                size={16}
                                            />
                                            {item?.count && <ImageBackground
                                                source={images.countBg}
                                                resizeMode={"contain"}
                                                style={{
                                                    width: 22,
                                                    height: 22.1,
                                                    backgroundColor: colors.primary,
                                                    borderRadius: 15,
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <CustomText
                                                    text={item?.count}
                                                    weight={700}
                                                />
                                            </ImageBackground>}
                                        </View>
                                        <View style={styles.description}>
                                            <CustomText
                                                text={item?.second}
                                                weight={700}
                                                size={12.5}
                                                fontFam='Arial'
                                            />
                                        </View>
                                    </View>
                                </CustomView>
                            </Pressable>
                        )
                    }}
                />
            </View>
            <CustomModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                height={180}
                width={"70%"}
            >
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    marginTop: 10
                }}>
                    <CustomText
                        text={"Would you like to login?"}
                        weight={700}
                        size={16}
                        fontFam={font.inter}
                    />
                    <CustomButton
                        text='Next'
                        height={38}
                        width={120}
                        borderRadius={32}
                        style={{ marginTop: 30 }}
                    />
                </View>
            </CustomModal>
        </ScreenLayout >
    )
}

export default Chat
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30,
        marginTop: "11%"
    },
    header: {
        justifyContent: "center",
        alignItems: "center"
    },
    chatList: {
        width: "100%",
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: '#040404',
        elevation: 30,
    },
    chat: {
        alignItems: "flex-start",
        gap: 2,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: "cover",
        borderRadius: 99,
        marginRight: 15,
        marginLeft: 5
    },
    description: {
        flexDirection: "row",
        gap: 5,
        width: 300,
        flexWrap: "wrap"
    }

})