import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { ScrollView, StatusBar, View } from "react-native";
import { colors } from "../../theme/color";

const ScreenContainer = ({ children, sx }) => {
    return (
        <SafeAreaView style={{ ...styles.background, ...sx }}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={colors.background} />
            <ScrollView style={styles.scrollViewContainer}>
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ScreenContainer;