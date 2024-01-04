import React from 'react'
import { ScrollView, StatusBar, View, SafeAreaView, Dimensions, KeyboardAvoidingView, Platform, Image } from 'react-native'
import { colors } from '../../utils/colors';
import { images } from '../../assets';

type Props = {
    navigation?: any,
    children?: any,
    title?: string,
    style?: any,
    height?: any,
    isProfileVisible?: boolean
    isLineVisible?: boolean
    linePosition?: any
    bgColor?: any
    ScrollRef?: any
}
const windowHeight = Dimensions.get('window').height;
const ScreenLayout = ({ navigation, children, title, style, height, isProfileVisible, isLineVisible, linePosition, bgColor, ScrollRef }: Props) => {
    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                }}
                style={{
                    backgroundColor: bgColor || colors.lightBlack,
                }}
                scrollEnabled={true}
                ref={ScrollRef}
            >
                <SafeAreaView style={{ minHeight: height - 60 || windowHeight - 60, backgroundColor: bgColor || colors.lightBlack }}>
                    <KeyboardAvoidingView
                        style={{
                        }}
                        contentContainerStyle={{
                            minHeight: height ? height - 60 : windowHeight - 60
                        }}
                    >
                        <StatusBar
                            barStyle="light-content"
                            backgroundColor={"transparent"}
                            translucent={true}
                            animated={true}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                            }}
                        />

                        <View
                            style={{
                                flex: 1,
                                backgroundColor: colors.lightBlack,
                                paddingVertical: 10,
                                zIndex: 49,
                                paddingBottom: 62,
                                ...style,
                            }}
                        >
                            <Image
                                source={images.circles}
                                style={{
                                    position: "absolute",
                                    width: 250,
                                    height: 250,
                                    resizeMode: "contain",
                                    top: -50,
                                    left: -30,
                                }}
                            />
                            <Image
                                source={images.circles2}
                                style={{
                                    position: "absolute",
                                    width: 350,
                                    height: 250,
                                    resizeMode: "cover",
                                    // bottom: 170,
                                    right: 0,
                                }}
                            />

                            {children}
                        </View>
                        <Image
                            source={images.circles3}
                            style={{
                                position: "absolute",
                                width: 350,
                                height: 250,
                                resizeMode: "cover",
                                bottom: 0,
                                opacity: 0.5
                            }}
                        />
                    </KeyboardAvoidingView>
                </SafeAreaView >
            </ScrollView >

        </>
    )
}
export default ScreenLayout