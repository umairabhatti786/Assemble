import React, { useEffect, useState } from 'react'
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import ScreenLayout from '../../../components/ScreenLayout'
import CustomMenu from '../../../components/CustomMenu'
import { colors } from '../../../utils/colors'
import CustomSearch from '../../../components/CustomSearch'
import CustomText from '../../../components/CustomText'
import { font } from '../../../utils/font'
import { images } from '../../../assets'
import { trendingBlog } from '../../../utils/Data'
import CustomView from '../../../components/CustomView'
import HomeModal from '../../../components/HomeModal'
import ProfileCard from './ProfileCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
type Props = {
    navigation?: any
}

const Home = ({ navigation }: Props) => {
    const  [isLogin,setisLogin]=useState<any>("")
    useEffect(()=>{
        getLogin()

    },[])

    const getLogin= async()=>{
      const res=  await AsyncStorage.getItem("isLogin")
      setisLogin(res)


    }
    console.log("isLoginData",isLogin)
    
    return (
        <ScreenLayout style={{}} >
            <View style={styles.container}>
               

<CustomMenu
                        isLiveChat={!isLogin=="disActive"?false:true}
                        onPressLiveChat={() => {
                            navigation.navigate("LiveChat")
                        }}
                        text='All Block'
                        navigation={navigation}
                    />
               
                <CustomSearch
                    style={{ marginTop: "5%" }}
                    onChangeText={(x: any) => {
                        console.log(x);
                    }}
                    onSearch={() => {
                        console.log("ONSEARCH");
                    }}
                />
                <CustomText
                    text={"Trending Blocks"}
                    fontFam={font.poppins}
                    weight={700}
                    size={20}
                    color={colors.primary}
                    style={{ marginTop: "8%", marginLeft: 10 }}
                />
                <FlatList
                    data={trendingBlog}
                    style={{
                        flex: 1,
                    }}
                    scrollEnabled={false}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        justifyContent: "center",
                        alignContent: "center",
                        gap: 10,
                        marginTop: 20
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <ProfileCard
                                item={item}
                                navigation={navigation}
                            />
                        )
                    }}
                />
            </View>
        </ScreenLayout >
    )
}

export default Home
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30
    },

})