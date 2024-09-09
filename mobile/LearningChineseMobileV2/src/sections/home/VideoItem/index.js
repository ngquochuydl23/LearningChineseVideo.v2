import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import styles from "./video-item.style";
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { readStorageUrl } from "../../../utils/readStorageUrl";
import FastImage from 'react-native-fast-image'

const VideoItem = ({
    _id,
    thumbnail,
    title,
    level,
    topics
}) => {
    const navigation = useNavigation();

    return (
        <TouchableHighlight
            onPress={() => {
                navigation.navigate('Video', { videoId: _id });
            }} >
            <View style={styles.container}>
                <FastImage
                    alt={_id}
                    source={{
                        uri: readStorageUrl(thumbnail),
                        priority: FastImage.priority.normal,
                    }}
                    style={styles.thumbnail} />
                <Text
                    style={styles.title}
                    numberOfLines={2}>
                    {title}
                </Text>
                <Text
                    style={styles.subtitle}
                    numberOfLines={1}>
                    {`Chủ đề: hoạt hình`}
                </Text>
            </View>
        </TouchableHighlight>
    )
}

export default VideoItem;