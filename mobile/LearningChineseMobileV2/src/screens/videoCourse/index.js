import { Image, StatusBar, Text, TouchableOpacity, View, ScrollView, ActivityIndicator } from "react-native";
import { IconButton } from "react-native-paper";
import { useEffect, useState } from "react";
import { readStorageUrl } from "../../utils/readStorageUrl";
import { colors } from "../../theme/color";
import { dateCrateComment } from "../../utils/formatDate";
import Avatar from '../../components/avatar';
import { useDispatch, useSelector } from "react-redux";
import { getLessonById, getCourseById } from "../../api/courseApi";
import styles from "./style";
import { formatTimeToMinute } from "../../utils/formatTimeToMinute";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from "react-native-video";
const TranscriptItem = ({ lesson, currentLessonId, onClick }) => {
    const isActive = lesson._id === currentLessonId;
    return (
        <TouchableOpacity onPress={onClick} style={{ paddingVertical: 5, paddingHorizontal: 5 }}>
            <View style={{
                padding: 5,
                borderRadius: 20,
                backgroundColor: isActive ? 'rgba(6, 174, 212, 0.2)' : '#f5f5f5',
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="play-arrow" size={20} color="#696969" />
                    <Text style={{ fontWeight: '600', fontSize: 16, marginLeft: 5 }}>
                        {lesson.position + 1}. {lesson?.title}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: '600', fontSize: 16, marginLeft: 15 }}>
                        {formatTimeToMinute(lesson?.duration)} | {dateCrateComment(lesson?.createdAt)}
                    </Text>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: '#d3d3d3', marginLeft: 20 }} />
        </TouchableOpacity>
    );
};

const VideoCourseScreen = ({ route, navigation }) => {
    const { user } = useSelector((state) => state.user);
    const { lessonId, idCourse } = route.params;
    const [loading, setLoading] = useState(false);
    const [lesson, setLesson] = useState();
    const [listLesson, setListLesson] = useState([]);
    const [currentLessonId, setCurrentLessonId] = useState(lessonId || null);
    const [nativeWatch, setNativeWatch] = useState(false)
    useEffect(() => {
        setLoading(true);
        getLessonById(lessonId)
            .then(({ result }) => {

                setLesson(result);

            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [lessonId]);
    useEffect(() => {
        if (lesson) {
            setLoading(true);
            getCourseById(idCourse)
                .then(({ result }) => {

                    setListLesson(result[0].lessons);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });

        }
    }, [lesson])
    const handleTranscriptItemClick = (lesson) => {
        setCurrentLessonId(lesson._id);
        setLesson(lesson);
        navigation.navigate('VideoCourse', { lessonId: lesson._id, idCourse: lesson.courseId });
    };

    return loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    ) : (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.thumbnailContainer}>
                <Image
                    style={styles.thumbnail}
                    src={readStorageUrl(lesson?.thumbnail)}
                />
                <View style={styles.overlapThumnail}>
                    {/* <View style={styles.toolbar}>
                        <IconButton
                            background={colors.background}
                            mode="contained"
                            icon="keyboard-backspace"
                            iconColor={'#000000'}
                            size={20}
                            onPress={() => navigation.goBack()}
                        />
                    </View> */}
                    <TouchableOpacity
                        onPress={() => setNativeWatch(true)}
                        style={styles.controllerVideo}>
                        <IconButton
                            background={colors.background}
                            mode="contained"
                            icon="play"
                            iconColor={'#000000'}
                            size={20}
                            onPress={() => setNativeWatch(true)}
                        />
                    </TouchableOpacity>
                </View>
                {nativeWatch && (
                    <Video
                        controls
                        poster={readStorageUrl(lesson?.thumbnail)}
                        style={styles.video}
                        source={{
                            uri: readStorageUrl(lesson?.videoUrl),
                            headers: {
                                'range': 'bytes=0-'
                            }
                        }}
                    />
                )}
            </View>
            <Text style={styles.title}>
                {lesson?.title}
            </Text>
            <View style={styles.description}>
                <Text style={styles.descriptionTitle}>Mô tả</Text>
                <Text style={styles.descriptionText} ellipsizeMode='tail'>
                    {lesson?.description}
                </Text>
            </View>
            <ScrollView style={{ flex: 1, paddingLeft: 20 }}>
                {listLesson?.map((lesson, index) => (
                    <TranscriptItem
                        key={index}
                        lesson={lesson}
                        currentLessonId={currentLessonId}
                        onClick={() => handleTranscriptItemClick(lesson)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default VideoCourseScreen;