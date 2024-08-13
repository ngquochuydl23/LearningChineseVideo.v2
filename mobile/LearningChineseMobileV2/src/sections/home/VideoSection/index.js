import { FlatList, Text, View } from "react-native";
import styles from "./video-section.style";
import _ from 'lodash';
import VideoItem from "../VideoItem";


const VideoSection = ({ videos, title }) => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.title}>{`HSK 1`}</Text>
            <FlatList
                nestedScrollEnabled
                pagingEnabled
                horizontal
                data={videos}
                ItemSeparatorComponent={<View style={styles.separator} />}
                renderItem={(item) => <VideoItem {...item} />}
                keyExtractor={item => item.Id}
            />
        </View>
    )
}

export default VideoSection;