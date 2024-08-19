import { StyleSheet } from "react-native";
import { fonts } from "../../theme/fonts";


const styles = StyleSheet.create({
    avatar: {
        height: 100,
        width: 100,
        position: 'relative'
    },
    avatarContainer: {
        height: 100,
        width: 100,
        marginTop: 50,
        position: 'relative',
        display: 'flex',
        position: 'relative',
        alignSelf: 'center'
    },
    uploadImgButton: {
        position: 'absolute',
        zIndex: 1
    },
    textField: {
        marginHorizontal: 30,
        borderRadius: 10,
        height: 40,
        fontFamily: fonts.Regular
    },
    textFieldLabel: {
        paddingLeft: 10,
        marginLeft: 20,
        fontFamily: fonts.Regular
    },
    textFieldContent: {
        paddingLeft: 15,
        fontSize: 15,
        fontFamily: fonts.Regular
    },
    updateButton: {
        marginHorizontal: 20,
        marginVertical: 30,
        height: 50,
        borderRadius: 30
    },
    updateButtonContent: {
        fontFamily: fonts.SemiBold,
        bottom: 0
    }
});

export default styles;