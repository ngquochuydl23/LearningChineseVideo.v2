import { StyleSheet } from "react-native";
import { fonts } from "../../../theme/fonts";
import { colors } from "../../../theme/color";

const styles = StyleSheet.create({
    headerContainer: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row'
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: fonts.SemiBold,
        color: colors.textPrimaryColor
    },
    actionContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
});

export default styles;