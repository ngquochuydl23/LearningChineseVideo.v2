import { Image, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import styles from "./video-item.style";
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';

const VideoItem = ({
    Id,
    Thumbnail,
    Title,
    Level,
    Topics
}) => {
    const navigation = useNavigation();
    
    return (
        <TouchableHighlight  onPress={() => { navigation.navigate('WatchVideo'); }} >
            <View style={styles.container}>
                <Image
                    alt={Id}
                    style={styles.thumbnail}
                    src="https://hayugo.edu.vn//storage/image/2762a990a26e55c9caa102422a66327c.jpg" />
                <Text
                    style={styles.title}
                    numberOfLines={2}>
                    {`Genshin Giới thiệu nhân vật - Navia: Bánh Lái Hoa Lệ`}
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