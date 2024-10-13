import { StatusBar, StyleSheet } from "react-native";
import { colors } from "../../theme/color";
import { fonts } from "../../theme/fonts";


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        height: "100%",
        padding: 15,
      },
      title: {
        fontSize: 18,
        color: colors.textPrimaryColor,
        fontFamily: fonts.SemiBold,
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 14,
        color: colors.textSecondaryColor,
        fontFamily: fonts.Medium,
        marginBottom: 10,
      },
      info: {
        fontSize: 14,
        color: colors.textPrimaryColor,
        fontFamily: fonts.Regular,
        marginBottom: 10,
      },
      sectionTitle: {
        fontSize: 16,
        color: colors.primaryColor,
        fontFamily: fonts.Medium,
        marginTop: 15,
        marginBottom: 10,
      },
      targetItem: {
        fontSize: 14,
        color: colors.textSecondaryColor,
        fontFamily: fonts.Regular,
        marginBottom: 5,
      },
      lessonItem: {
        fontSize: 14,
        color: colors.textPrimaryColor,
        fontFamily: fonts.Regular,
        marginBottom: 5,
      },
      separator: {
        height: 1,
        backgroundColor: colors.separatorColor,
        marginVertical: 10,
      },
});

export default styles;
