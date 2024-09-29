import { StyleSheet } from "react-native";
import { fonts } from "../../../../theme/fonts";
import { colors } from "../../../../theme/color";

const styles = StyleSheet.create({
    itemContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    thumbnail: {
        borderRadius: 10,
        height: 80,
        aspectRatio: 2.5 / 1.5
    },
    videoInfoContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginLeft: 15
    },
    title: {
        fontFamily: fonts.Medium,
        fontSize: 16,
        color: colors.textPrimaryColor
    },
    published: {
        fontFamily: fonts.Regular,
        fontSize: 13,
        margin: 0,
        includeFontPadding: false,
        color: colors.textSecondaryColor,
        padding: 0
    },
    savedWords: {
        fontFamily: fonts.Regular,
        fontSize: 13,
        margin: 0,
        color: colors.textSecondaryColor,
        padding: 0
    }
});

export default styles;