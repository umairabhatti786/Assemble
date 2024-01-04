import { Image, Pressable, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../../../../components/CustomText'
import { colors } from '../../../../utils/colors'

type Props = {
    item?: any
    navigation?: any
}

const ProfileCard = ({ item, navigation }: Props) => {
    const [isFollowing, setIsFollowing] = useState(item?.isFollowing);
    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 2,
                marginHorizontal: 12
            }}
        >
            <Pressable
                onPress={() => {
                    navigation.navigate("Profile", { item: item })
                }}
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Image
                    source={item?.image}
                    style={{
                        width: 94,
                        height: 94,
                        resizeMode: "cover",
                        borderRadius: 60
                    }}
                />
                <CustomText
                    text={item.title}
                    weight={800}
                    size={12}
                    fontFam='Arial'
                    style={{ marginTop: 20, marginBottom: 10 }}
                    color={colors.white}
                />
            </Pressable>
            <Pressable
                onPress={() => setIsFollowing((prev: any) => !prev)}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                }}
            >
                <CustomText
                    text={isFollowing ? "-" : "+"}
                    weight={800}
                    size={30}
                    fontFam='Arial'
                    color={colors.primary}
                    lineHeight={30}
                />
            </Pressable>
        </View>
    )
}
export default ProfileCard
