import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getExcerciseByLessonId } from "../../api/excercise-api";
import { getLessonById } from "../../api/courseApi";
import { formatMilisecond } from "../../utils/formatMilisecond";
import { formatMoney } from "../../utils/formatMoney";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ExcerciseFillIn from "../../sections/excercise/FillInItem";
import ExcerciseSymnonym from "../../sections/excercise/SymnonymItem";
import ExcerciseGramma from "../../sections/excercise/Gramma";
import ExcerciseSentence from "../../sections/excercise/SentenceItem";
import ExcerciseImage from "../../sections/excercise/ImageQItem";
import ExcerciseAudio from "../../sections/excercise/AudioItemQ";
const ExcerciseDetailScreen = ({ route, navigation }) => {
    const { lessonId } = route.params;
    const [lesson, setLesson] = useState();
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [excercises, setExcercises] = useState([]);
    const handleNextExercise = () => {
        if (currentIndex < excercises.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Navigate to another page when the progress bar is full
            setTimeout(() => {
                navigation.navigate('CourseDetail', { courseId: lesson.courseId });
            }, 3000);
            Alert.alert('Success', 'Đã hoàn thành bài tập');
        }
    };
    useEffect(() => {
        setLoading(true)


        getLessonById(lessonId)
            .then(({ result }) => {


                setLesson(result);
            })
            .catch((err) => {
                console.log(err);

            })
            .finally(() => setLoading(false));
    }, []);
    useEffect(() => {
        if (lesson) {
            getExcerciseByLessonId(lesson._id)
                .then(({ result }) => {


                    setExcercises(result);
                });
        }
    }, [lesson]);
    const currentExercise = excercises[currentIndex];
    const progressValue = ((currentIndex + 1) / excercises.length) * 100;
    return loading ? (
        <View>
            <Text>Loading</Text>
        </View>
    ) : (
        <ScrollView style={{
            overflow: 'hidden',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            // backgroundColor: colors.background,
            borderColor: '#d3d3d3',
            borderBottomWidth: 1
        }}>
            <Text style={{
                arginHorizontal: 10,
                marginTop: 10,
                fontSize: 16,
                textAlign: 'left',
                color: "black",
                fontFamily: "bold",
            }}>Bài tập phần :{lesson?.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                {/* Close Icon */}
                <TouchableOpacity onPress={() => navigation.navigate('CourseDetail', { courseId: lesson.courseId })}>
                    <Icon name="close" size={24} color="grey" />
                </TouchableOpacity>

                {/* Progress Bar */}
                <View style={{ flexGrow: 1, padding: 5 }}>
                    {/* <View
                        style={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: '#e0e0e0',
                            overflow: 'hidden',
                        }}
                    >
                       
                    </View> */}
                    <View style={{ flexGrow: 1, padding: 5 }}>
                        <View style={{ height: 10, borderRadius: 5, backgroundColor: '#e0e0e0', overflow: 'hidden' }}>
                            <View style={{ width: `${progressValue}%`, height: '100%', backgroundColor: '#4caf50' }} />
                        </View>
                    </View>
                </View>

            </View>
            {currentExercise?.type === "fill-in-blank" ? (
                <ExcerciseFillIn key={currentIndex} {...currentExercise} onNext={handleNextExercise} />
            ) : currentExercise?.type === "synonym-antonym-question" ? (
                <ExcerciseSymnonym key={currentIndex} {...currentExercise} onNext={handleNextExercise} />
            ) : currentExercise?.type === "image-question" ? (
                <ExcerciseImage key={currentIndex} {...currentExercise} onNext={handleNextExercise} />
            ) : currentExercise?.type === "audio-question" ? (
                <ExcerciseAudio key={currentIndex} {...currentExercise} onNext={handleNextExercise} />
            ) : currentExercise?.type === "gramma-question" ? (
                <ExcerciseGramma key={currentIndex} {...currentExercise} onNext={handleNextExercise} />
            ) : (
                <ExcerciseSentence key={currentIndex} {...currentExercise} onNext={handleNextExercise} />
            )}
            {/* 
      <FlatList
        data={lessons}
        ListEmptyComponent={() => (
          <View>
            <Text>Không có bài học nào</Text>
          </View>
        )}
        renderItem={({ item, index }) => {
          return (
            <LessonItem index={index} {...item} />
          );
        }}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      /> */}
        </ScrollView>
    );
};

export default ExcerciseDetailScreen;
