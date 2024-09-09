import { Image, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { readStorageUrl } from "../../../utils/readStorageUrl";
import styles from "./styles";

const VerticalVideoItem = ({
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
                <Image
                    alt={_id}
                    style={styles.thumbnail}
                    src={readStorageUrl(thumbnail)} />
                <Text
                    style={styles.title}
                    numberOfLines={2}>
                    {title}
                </Text>
                <Text
                    style={styles.subtitle}
                    numberOfLines={1}>
                    {`Chủ đề: `}
                </Text>
            </View>
        </TouchableHighlight>
    )
}

export default VerticalVideoItem;