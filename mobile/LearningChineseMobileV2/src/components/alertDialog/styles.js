import { StyleSheet } from "react-native";
import { colors } from "../../theme/color";
import { fonts } from "../../theme/fonts";

const styles = StyleSheet.create({
    dialog: {
        backgroundColor: colors.background,
        borderRadius: 15
    },
    title: {
        fontFamily: fonts.SemiBold,
        fontSize: 18,
        color: colors.textPrimaryColor
    },
    content: {
        fontFamily: fonts.Regular,
        fontSize: 14,
        color: colors.textSecondaryColor
    },
    submitBtn: {
        fontFamily: fonts.Medium,
        color: colors.primaryColor
    }
});

export default styles;
