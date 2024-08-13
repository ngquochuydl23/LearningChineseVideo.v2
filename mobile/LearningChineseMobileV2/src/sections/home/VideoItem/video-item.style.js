import { StyleSheet } from "react-native";
import { colors } from "../../../theme/color";
import { fonts } from "../../../theme/fonts";

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        overflow: 'hidden',
        width: 250,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.background,
        borderColor: '#d3d3d3',
        borderWidth: 0.5
    },
    thumbnail: {
        height: 150,
        width: '100%'
    },
    title: {
        marginHorizontal: 10,
        marginTop: 10,
        fontSize: 16,
        textAlign: 'left',
        color: colors.textPrimaryColor,
        fontFamily: fonts.SemiBold,
    },
    subtitle: {
        marginTop: 5,
        marginHorizontal: 10,
        marginBottom: 15,
        fontSize: 14,
        textAlign: 'left',
        color: colors.textSecondaryColor,
        fontFamily: fonts.Medium,
    }
});

export default styles;