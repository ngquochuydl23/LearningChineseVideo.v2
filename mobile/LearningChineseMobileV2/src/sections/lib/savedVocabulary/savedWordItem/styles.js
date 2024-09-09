import { StyleSheet } from "react-native";
import { fonts } from "../../../../theme/fonts";
import { colors } from "../../../../theme/color";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: 'whitesmoke'
    },
    originWord: {
        fontFamily: fonts.Bold,
        fontSize: 20,
        color: colors.textPrimaryColor
    },
    sentence: {
        fontFamily: fonts.Regular,
        fontSize: 14,
        color: colors.textPrimaryColor
    },
    pinyinAndSino: {
        fontFamily: fonts.Regular,
        fontSize: 14,
        color: colors.textPrimaryColor
    },
    common: {
        fontFamily: fonts.Regular,
        fontSize: 14,
        color: colors.textPrimaryColor
    },
    example: {

        fontFamily: fonts.Regular,
        fontSize: 14,
        color: colors.textPrimaryColor
    }
});

export default styles;