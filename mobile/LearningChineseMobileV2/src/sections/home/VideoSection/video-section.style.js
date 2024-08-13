import { StyleSheet } from "react-native";
import { colors } from "../../../theme/color";
import { fonts } from "../../../theme/fonts";

const styles = StyleSheet.create({
    sectionContainer: {
        paddingTop: 10,
        width: '100%', 
        paddingLeft: 15
    },
    title: {
        color: colors.textPrimaryColor,
        fontFamily: fonts.Medium,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '600'
    },
    separator: {
        width: 10,
    },
});

export default styles;
