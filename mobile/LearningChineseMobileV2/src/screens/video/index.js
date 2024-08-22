import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { IconButton } from "react-native-paper";
import { useEffect, useState } from "react";
import { getVideoById } from "../../api/videoApi";
import { readStorageUrl } from "../../utils/readStorageUrl";
import _ from 'lodash';
import { colors } from "../../theme/color";

const VideoScreen = ({ route, navigation }) => {

    const { videoId } = route.params;

    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState();

    const nativateToWatch = () => {
        navigation.navigate('WatchVideo', {
            videoId: videoId,
            thumbnail: video?.Thumbnail
        });
    }

    useEffect(() => {
        setLoading(true);
        getVideoById(videoId)
            .then(({ result }) => {
                setVideo(result);
                console.log(_.map(result.TopicVideos, ({ Topic }) => Topic.Title));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])

    return loading ? (
        <View>
            <Text>
                Loading
            </Text>
        </View>
    ) : (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.thumbnailContainer}>

                <Image
                    style={styles.thumbnail}
                    src={readStorageUrl(video?.Thumbnail)} />
                <View style={styles.overlapThumnail}>
                    <View style={styles.toolbar}>
                        <IconButton
                            background={colors.background}
                            mode="contained"
                            icon="keyboard-backspace"
                            iconColor={'#000000'}
                            size={20}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={nativateToWatch}
                        style={styles.controllerVideo}>
                        <IconButton
                            background={colors.background}
                            mode="contained"
                            icon="play"
                            iconColor={'#000000'}
                            size={20}
                            onPress={nativateToWatch}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.title}>
                {video?.Title}
            </Text>
            <View style={styles.detailInfo}>
                <View>
                    <Text style={styles.levelAndTopic}>
                        {`Cấp độ: HSK ` + video?.Level}
                    </Text>
                    <Text style={styles.levelAndTopic}>
                        {`Chủ đề: `}
                    </Text>
                </View>
                <IconButton
                    background={colors.background}
                    mode="contained"
                    iconColor={true ? colors.primaryColor : colors.iconColor}
                    icon="bookmark">

                </IconButton>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionTitle}>Mô tả</Text>
                <Text style={styles.descriptionText} ellipsizeMode='tail'>
                    {video?.Description}
                </Text>
            </View>
            <View style={styles.commentLayout}>
                <Text style={styles.commentTitle}>Bình luận</Text>
                <Text style={styles.descriptionText} ellipsizeMode='tail'>
                    Chưa có bình luận nào
                </Text>
            </View>
        </View>
    )
}

export default VideoScreen;