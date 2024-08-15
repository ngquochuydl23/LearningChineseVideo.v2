import { StyleSheet } from "react-native";
import { colors } from "../../../../theme/color";
import { fonts } from "../../../../theme/fonts";

const styles = StyleSheet.create({
    userInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 15
    },
    userFullNameAndEmail: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        marginLeft: 15,
        flexDirection: 'column'
    },
    fullName: {
        fontSize: 16,
        padding: 0,
        includeFontPadding: false,
        color: colors.textPrimaryColor,
        fontFamily: fonts.SemiBold
    },
    email: {
        fontSize: 14,
        includeFontPadding: false,
        color: colors.textSecondaryColor,
        fontFamily: fonts.Regular
    },
    menuRoute: {
        marginTop: 15,
        marginHorizontal: 15
    },
    menuRouteItem: {
        paddingVertical: 10,
    },
    menulabelRouteItem: {
        fontSize: 16,
        color: colors.textPrimaryColor,
        fontFamily: fonts.Medium
    },
    subtitleRouteItem: {
        fontSize: 14,
        color: colors.textSecondaryColor,
        fontFamily: fonts.Regular
    }
});

export default styles;
