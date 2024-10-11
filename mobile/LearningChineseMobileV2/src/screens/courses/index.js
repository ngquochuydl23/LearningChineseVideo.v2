import { Image, StatusBar, Text, TouchableOpacity, View, TextInput, Button, ToastAndroid } from "react-native";
import styles from "./style";
import { IconButton } from "react-native-paper";
import { useEffect, useState } from "react";
import { getVideoById } from "../../api/videoApi";
import { readStorageUrl } from "../../utils/readStorageUrl";
import _ from 'lodash';
import { colors } from "../../theme/color";
import { addComment, getCommentsOfVideo } from "../../api/commentApi";
import { addLike, check, delLike } from "../../api/likeApi";
import { dateCrateComment } from "../../utils/formatDate";
import Avatar from '../../components/avatar';
import { useDispatch, useSelector } from "react-redux";


const CourseDetailScreen = ({ route, navigation }) => {
    const { user } = useSelector((state) => state.user);
    const { courseId } = route.params;
    const [like, setLike] = useState(false);
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState();
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");


    useEffect(() => {
        setLoading(true);
        

    }, [])

    useEffect(() => {
 
    }, [courseId]);


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
                    src={readStorageUrl(video?.thumbnail)} />
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
                        style={styles.controllerVideo}>
                        <IconButton
                            background={colors.background}
                            mode="contained"
                            icon="play"
                            iconColor={'#000000'}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.title}>
                {video?.title}
            </Text>
            <View style={styles.detailInfo}>
                <View>
                    <Text style={styles.levelAndTopic}>
                        {`Cấp độ: HSK ` + video?.level}
                    </Text>
                    <Text style={styles.levelAndTopic}>
                        {`Chủ đề: `}
                    </Text>
                </View>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionTitle}>Mô tả</Text>
                <Text style={styles.descriptionText} ellipsizeMode='tail'>
                    {video?.description}
                </Text>
            </View>

          
        </View>
    )
}

export default CourseDetailScreen;