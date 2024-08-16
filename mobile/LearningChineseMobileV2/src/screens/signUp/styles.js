import { StyleSheet } from "react-native";
import { colors } from "../../theme/color";
import { fonts } from "../../theme/fonts";

const styles = StyleSheet.create({
    logoContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 20
    },
    logo: {
        left: 0,
        right: 0,
        borderRadius: 20,
        backgroundColor: 'white',
        height: 200,
        aspectRatio: 1
    },
    loginTitle: {
        marginHorizontal: 20,
        marginTop: 15,
        fontSize: 24,
        padding: 0,
        includeFontPadding: true,
        marginBottom: 0,
        fontFamily: fonts.SemiBold,
        color: colors.textPrimaryColor
    },
    loginSubtitle: {
        marginTop: 0,
        padding: 0,
        fontFamily: fonts.Regular,
    },
    loginField: {
        marginHorizontal: 15,
        borderRadius: 15,
        height: 50
    },
    loginFieldLabel: {
        paddingLeft: 15,
        marginLeft: 20,
        fontFamily: fonts.Regular
    },
    loginButton: {
        marginHorizontal: 20,
        marginVertical: 30,
        height: 50,
        borderRadius: 30
    },
    loginButtonContent: {
        fontFamily: fonts.SemiBold
    }
});

export default styles;