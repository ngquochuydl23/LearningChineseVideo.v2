import { Image, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';

const SavedVocaItem = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
          //  onPress={() => { navigation.navigate("Saved") }}
            >
            <View style={styles.itemContainer}>
                <Image
                    style={styles.thumbnail}
                    src={`https://hayugo.edu.vn//storage/image/f9b110fd628e5cd51ab0e858bc3590ee.jpg`} />
                <View style={styles.videoInfoContainer}>
                    <Text style={styles.title}>
                        {`Đàn Gảy Tai Trâu`}
                    </Text>
                    <Text style={styles.published}>
                        Tải lên lúc: {`18/03/2024`}
                    </Text>
                    <Text style={styles.savedWords}>
                        Số từ vựng đã lưu: {1}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SavedVocaItem;