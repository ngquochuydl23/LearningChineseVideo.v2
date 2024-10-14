import { FlatList, Text, View } from "react-native";
import styles from "./video-section.style";
import _ from 'lodash';
import VideoItem from "../VideoItem";


const VideoSection = ({ videos, title }) => {

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                nestedScrollEnabled
                pagingEnabled
                scrollEnabled
                horizontal
                data={videos}
                ItemSeparatorComponent={<View style={styles.separator} />}
                renderItem={({ item }) => {
                    return <VideoItem {...item} />
                }}
                keyExtractor={item => item.Id}
            />
        </View>
    )
}

export default VideoSection;