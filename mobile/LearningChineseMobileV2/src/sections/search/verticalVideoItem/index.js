import { Image, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { readStorageUrl } from "../../../utils/readStorageUrl";
import styles from "./styles";

const VerticalVideoItem = ({
    Id,
    Thumbnail,
    Title,
    Level,
    Topics
}) => {
    const navigation = useNavigation();

    return (
        <TouchableHighlight
            onPress={() => {
                navigation.navigate('Video', { videoId: Id });
            }} >
            <View style={styles.container}>
                <Image
                    alt={Id}
                    style={styles.thumbnail}
                    src={readStorageUrl(Thumbnail)} />
                <Text
                    style={styles.title}
                    numberOfLines={2}>
                    {Title}
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

export default VerticalVideoItem;