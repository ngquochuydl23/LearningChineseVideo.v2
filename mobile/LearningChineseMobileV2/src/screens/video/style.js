import { StatusBar, StyleSheet } from "react-native";
import { colors } from "../../theme/color";
import { fonts } from "../../theme/fonts";


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        height: '100%',
    },
    scrollViewContainer: {
        width: '100%',
        height: '100%'
    },
    thumbnailContainer: {
        display: 'flex',
        position: 'relative',
        width: '100%',
    },
    thumbnail: {
        width: '100%',
        aspectRatio: 2.5 / 1.5,
        position: 'relative',
    },
    overlapThumnail: {
        paddingTop: StatusBar.currentHeight,
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        position: 'absolute',
        display: 'flex',
        width: '100%',
        height: '100%',
        flex: 1,
    },
    title: {
        paddingTop: 15,
        paddingHorizontal: 15,
        fontSize: 18,
        color: colors.textPrimaryColor,
        fontFamily: fonts.SemiBold
    },
    detailInfo: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 15,
    },
    levelAndTopic: {
        fontSize: 14,
        color: colors.textPrimaryColor,
        fontFamily: fonts.Medium
    },
    description: {
        backgroundColor: colors.backgroundSubColor,
        margin: 15,
        padding: 15,
        borderRadius: 15
    },
    descriptionTitle: {
        fontFamily: fonts.Medium,
        color: colors.primaryColor,
        fontSize: 16,
    },
    descriptionText: {
        fontFamily: fonts.Regular,
        color: colors.textSecondaryColor,
        fontSize: 13,
    },
    controllerVideo: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;
