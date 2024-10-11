import { StyleSheet } from "react-native";
import { colors } from "../../../theme/color";
import { fonts } from "../../../theme/fonts";


const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.background,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1
    },
    thumbnail: {
        height: 190,
        width: '100%'
    },
    title: {
        marginHorizontal: 10,
        marginTop: 10,
        fontSize: 16,
        textAlign: 'left',
        color: colors.textPrimaryColor,
        fontFamily: fonts.Medium,
    },
    subtitle: {
        marginTop: 2,
        marginHorizontal: 10,
        marginBottom: 15,
        fontSize: 14,
        textAlign: 'left',
        color: colors.textSecondaryColor,
        fontFamily: fonts.Regular,
    }
});

export default styles;