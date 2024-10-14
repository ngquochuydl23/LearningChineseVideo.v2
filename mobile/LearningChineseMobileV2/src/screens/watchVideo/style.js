import { StyleSheet } from "react-native";
import { fonts } from "../../theme/fonts";
import { colors } from "../../theme/color";

const styles = StyleSheet.create({
    video: {
        aspectRatio: 16 / 9,
        width: '100%',
        backgroundColor: 'black'
    },
    clickableSub: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 30,
        textAlign: 'center',
        fontFamily: fonts.Bold,
        color: colors.primaryColor,
        letterSpacing: 5,
        backgroundColor: colors.backgroundSubColor
    },
    video: {
        aspectRatio: 16 / 9,
        width: '100%',
        backgroundColor: 'black'
    },
    insideBottomSheet: {
        paddingTop: 30,
        paddingHorizontal: 20
    },
    originWord: {
        display: 'flex',
        flex: 1,
        fontSize: 30,
        fontFamily: fonts.Bold,
        color: colors.textPrimaryColor
    },
    pText: {
        color: colors.textPrimaryColor,
        fontFamily: fonts.Regular,
        marginTop: 10,
        fontSize: 16
    },
    activityIndicator: {
        marginTop: 30
    }
});

export default styles;