import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const appStyles = StyleSheet.create({
    coontainerStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
    },
    rootContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
})