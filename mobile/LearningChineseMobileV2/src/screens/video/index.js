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
import {dateCrateComment} from "../../utils/formatDate";
import Avatar from '../../components/avatar';
import { useDispatch, useSelector } from "react-redux";
const VideoScreen = ({ route, navigation }) => {
    const { user } = useSelector((state) => state.user);
    const { videoId } = route.params;
    const [like, setLike] = useState(false);
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState();
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const nativateToWatch = () => {
        navigation.navigate('WatchVideo', {
            videoId: videoId,
            thumbnail: video?.Thumbnail
        });
    }
    const handleLike = () => {
        if (like === false) {
            addLike(videoId)
              .then((res) => {
                setLike(true);
                ToastAndroid.show('Like video thành công.', ToastAndroid.SHORT);
              })
              .catch((err) => {
                ToastAndroid.show('Like video không thành công.', ToastAndroid.SHORT);
              });
          } else {
            delLike(videoId)
              .then((res) => {
                setLike(false);
                ToastAndroid.show('Hủy like video thành công.', ToastAndroid.SHORT);
              })
              .catch((err) => {
                ToastAndroid.show('Hủy like video không thành công.', ToastAndroid.SHORT);
              });
          }
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
    useEffect(() => {
        check(videoId)
          .then((res) => {
            setLike(true);
          })
          .catch((err) => {
            setLike(false);
          });
        getCommentsOfVideo(videoId)
          .then(({result}) => {
            setComments(result);
            
            
      });
      }, [videoId]);
      const CustomAvatar = ({ fullname, src }) => (
        <Avatar
        
                    size={50}
                    name={fullname}
                    src={src} />
        
      );
        // Chức năng bình luận
  const createComment = () => {
    const data = {
      content: content,
      videoId: videoId,
    };

    addComment(data)
      .then((res) => {
        setContent("");
        getCommentsOfVideo(videoId)
          .then(({result}) => {
            setComments(result);
            console.log(comments);
          })
          .catch((err) => {
           ToastAndroid.show('Xem tất cả bình luận không thành công.', ToastAndroid.SHORT);
          });
          ToastAndroid.show('Bình luận video thành công.', ToastAndroid.SHORT);
      })
      .catch((err) => {
        ToastAndroid.show('Bình luận video không thành công.', ToastAndroid.SHORT);
      });
  };
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
                <IconButton
                    background={colors.background}
                    mode="contained"
                    iconColor={like === true ? colors.primaryColor : colors.iconColor}
                    icon="thumb-up"
                    onPress={handleLike}>

                </IconButton>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionTitle}>Mô tả</Text>
                <Text style={styles.descriptionText} ellipsizeMode='tail'>
                    {video?.description}
                </Text>
            </View>
              
            <View style={styles.commentLayout}>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <CustomAvatar
                        fullname={user?.fullName}
                        src={user?.avatar}
                    />
                    <TextInput
                        value={content}
                        onChangeText={setContent}
                        placeholder="Viết bình luận..."
                        style={{ flex: 1, height: 50, borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 10, marginLeft: 10 }}
                        />
                </View> 
                <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'flex-end' }}>
                <Button
                    title="Bình luận"
                      onPress={createComment}
                    color="#6200EE" // Màu sắc của nút, bạn có thể thay đổi theo ý muốn
                />
                </View>
                <Text style={styles.commentTitle}>Bình luận ({comments.length})</Text>
                    
                <View style={{ display: 'flex', direction:'column', paddingTop: '5px', paddingBottom: '10px' }}>
                { comments.length > 0 ? 
                comments.map((comment, index) => (
                    <View key={index} style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <CustomAvatar
                        fullname={comment.creator?.fullName}
                        src={comment.creator?.avatar}
                        />
                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ fontWeight: '500', fontSize: 14 }}>
                            {comment.creator?.fullName}
                            </Text>
                            <Text style={{ fontSize: 14, marginLeft: 15 }}>
                            {dateCrateComment(comment.createdAt)}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 13 }}>
                            {comment.content}
                        </Text>
                        </View>
                    </View>
                ))
                : 
                (
                    <Text style={styles.descriptionText} ellipsizeMode='tail'>
                        Chưa có bình luận nào
                    </Text>
                )
            }
                </View>
                
            </View>
        </View>
    )
}

export default VideoScreen;