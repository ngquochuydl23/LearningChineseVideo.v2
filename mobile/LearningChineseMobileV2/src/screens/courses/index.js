import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getCourseById } from "../../api/courseApi";
import styles from "./style";
import { formatMilisecond } from "../../utils/formatMilisecond";
import { formatMoney } from "../../utils/formatMoney";
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can choose any icon set
import LessonItem from "../../sections/excercise/LessonItem";
import ScreenContainer from "../../components/ScreenContainer";
import { fonts } from "../../theme/fonts";
import { readStorageUrl } from "../../utils/readStorageUrl";



const CourseDetailScreen = ({ route, navigation }) => {
  const { courseId } = route.params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCourseById(courseId)
      .then(({ result }) => {
        setCourse(result[0]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [courseId]);

  if (!course) {
    return <Text>Course not found</Text>;
  }

  const {
    title,
    subtitle,
    author,
    lessonCount,
    totalDuration,
    price,
    targets,
    lessons
  } = course;

  console.log(lessons);

  return loading ? (
    <View>
      <Text>Loading</Text>
    </View>
  ) : (
    <ScreenContainer>
      <Image
        style={{
          width: '100%',
          paddingHorizontal: 15,
          aspectRatio: 2.5 / 1.5,
          position: 'relative',
          objectFit: 'contain'
        }}
        src={readStorageUrl(lessons[0].thumbnail)} />
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.info}>
          Created By: {author.fullName}
        </Text>
        <Text style={styles.info}>
          Số bài học: {lessonCount}
        </Text>
        <Text style={styles.info}>
          Thời gian học: {formatMilisecond(totalDuration)}
        </Text>
        <Text style={styles.info}>
          Giá: {price > 0 ? `${formatMoney(price)} VND` : "Miễn phí"}
        </Text>

        <Text style={styles.sectionTitle}>
          Mục tiêu khóa học:
        </Text>
        {targets.map((target, index) => (
          <Text key={index} style={styles.targetItem}>
            <Icon name="check" size={15} color="#4caf50" /> {target}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Bài học:</Text>


        <FlatList

          data={lessons}
          ListEmptyComponent={() => (
            <View>
              <Text style={{ fontFamily: fonts.Regular }}>Không có bài học nào</Text>
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
        />
      </View>
    </ScreenContainer>
  );
};

export default CourseDetailScreen;
