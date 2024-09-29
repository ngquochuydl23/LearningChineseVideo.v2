import { Image, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import { readStorageUrl } from "../../../../utils/readStorageUrl";
import moment from 'moment';

const VideoLikedItem = ({ savedCount, lastUpdated, video }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Video', { videoId: video._id });
            }} >
            <View style={styles.itemContainer}>
                <Image
                    style={styles.thumbnail}
                    src={readStorageUrl(video?.thumbnail)} />
                <View style={styles.videoInfoContainer}>
                    <Text
                        style={styles.title}
                        numberOfLines={1}>
                        {video?.title}
                    </Text>
                    <Text style={styles.published}>
                        Tải lên lúc: {moment(lastUpdated).format('L')}
                    </Text>
                    <Text style={styles.savedWords}>
                        Số từ vựng đã lưu: {savedCount}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default VideoLikedItem;