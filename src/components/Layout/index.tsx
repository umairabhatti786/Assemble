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
const Layout = ({ navigation, children, title, style, height, isProfileVisible, isLineVisible, linePosition, bgColor, ScrollRef }: Props) => {
    return (
        <>
            <ScrollView
            scrollEnabled={true}
              
            >
                <SafeAreaView style={{ minHeight: height - 60 || windowHeight - 60, backgroundColor: bgColor || colors.lightBlack }}>
                   
                </SafeAreaView >
            </ScrollView >

        </>
    )
}
export default Layout