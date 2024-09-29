import { Image, Text, TouchableHighlight, TouchableOpacity, View, FlatList } from "react-native"
import ScreenContainer from "../../components/ScreenContainer";
import { useNavigation } from '@react-navigation/native';
import { readStorageUrl } from "../../utils/readStorageUrl";
import VideoLikedItem from "../../sections/lib/likedVideo/videoLikedItem";
import styles from "./styles";
import { useEffect, useState } from "react";
import moment from 'moment';
import { getVideoLiked } from "../../api/likeApi";
const VideoLikedScreen = () => {
    const [loading, setLoading] = useState(false);
    const [likedGroups, setLikedGroups] = useState([]);
    useEffect(() => {
        setLoading(true);
        getVideoLiked()
            .then(({ result }) => {
                setLikedGroups(result);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);
    return(
        <ScreenContainer disableScroll>
           <FlatList
                style={styles.flatList}
                nestedScrollEnabled
                pagingEnabled
                data={likedGroups}
                ItemSeparatorComponent={<View style={{ height: 15 }} />}
                renderItem={({ item, index }) =>
                    <View key={index}>
                        <VideoLikedItem
                            {...item} />
                    </View>
                }
                keyExtractor={item => item.video._id}
            />
        </ScreenContainer>
    )
}
export default VideoLikedScreen