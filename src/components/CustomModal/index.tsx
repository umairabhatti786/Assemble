import React from 'react';
import { ScrollView, Text, useWindowDimensions, SafeAreaView, View, StyleSheet, TouchableOpacity, Pressable, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { images } from '../../assets';

interface Props {
    isModalVisible?: boolean;
    setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
    height?: any;
    width?: any;
}

const CustomModal: React.FC<Props> = ({ isModalVisible, setModalVisible, children, height, width }) => {
    const windowWidth = useWindowDimensions().width;

    return (
        <Modal
            style={styles.modalContainer}
            animationIn='slideInUp'
            animationOut='slideOutDown'
            deviceWidth={windowWidth}
            isVisible={isModalVisible}
            onBackButtonPress={() => setModalVisible && setModalVisible(false)}
            onBackdropPress={() => setModalVisible && setModalVisible(false)}
            backdropColor='transparent'
            hasBackdrop={false}
        >
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <LinearGradient
                    useAngle={true}
                    angle={30}
                    colors={["#181825", "#18182595"]}
                    style={{
                        height: height,
                        width: width,
                        borderRadius: 15,
                    }}
                >

                    <Pressable
                        onPress={() => {
                            setModalVisible && setModalVisible(false)
                        }}
                        style={{
                            height: 34,
                            width: "100%",
                            borderRadius: 15,
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                            paddingRight: 20
                        }}>
                        <Image
                            source={images.backArrow}
                            style={{ width: 24, height: 24, resizeMode: "contain" }}
                        />
                    </Pressable>
                    {children}
                </LinearGradient>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        margin: 0,
    },
});

export default CustomModal;
