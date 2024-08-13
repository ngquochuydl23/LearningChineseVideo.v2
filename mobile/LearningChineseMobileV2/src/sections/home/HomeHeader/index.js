import { Text, View } from "react-native"
import styles from "./styles";

const HomeHeader = ({ title, headerActionComponent }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{title}</Text>
            {headerActionComponent &&
                <View style={styles.actionContainer}>
                    {headerActionComponent}
                </View>
            }
        </View>
    )
}

export default HomeHeader;