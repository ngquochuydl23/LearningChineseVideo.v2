import { StyleSheet } from "react-native";
import { colors } from "../../../../theme/color";
import { fonts } from "../../../../theme/fonts";

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: colors.fieldInputColor,
        marginHorizontal: 15
    },
    inputStyle: {
        fontFamily: fonts.Regular
    },
    flatList: {
        paddingVertical: 20
    },
    loadingIndicator: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        width: '100%'
    },
    notFoundContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        width: '100%'
    },
    notFoundTitle: {
        fontSize: 16,
        color: colors.textPrimaryColor,
        fontFamily: fonts.SemiBold
    },
    notFoundSubtitle: {
        fontSize: 14,
        color: colors.textSecondaryColor,
        fontFamily: fonts.Regular
    }
});

export default styles;