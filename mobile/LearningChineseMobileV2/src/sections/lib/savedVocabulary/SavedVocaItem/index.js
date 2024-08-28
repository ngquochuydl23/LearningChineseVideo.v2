import { Image, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import { readStorageUrl } from "../../../../utils/readStorageUrl";
import moment from 'moment';

const SavedVocaItem = ({ SavedCount, LastUpdated, Video }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("SavedDetail", {
                    videoId: Video?.Id,
                    title: Video?.Title
                })
            }}>
            <View style={styles.itemContainer}>
                <Image
                    style={styles.thumbnail}
                    src={readStorageUrl(Video?.Thumbnail)} />
                <View style={styles.videoInfoContainer}>
                    <Text
                        style={styles.title}
                        numberOfLines={1}>
                        {Video?.Title}
                    </Text>
                    <Text style={styles.published}>
                        Tải lên lúc: {moment(LastUpdated).format('L')}
                    </Text>
                    <Text style={styles.savedWords}>
                        Số từ vựng đã lưu: {SavedCount}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SavedVocaItem;