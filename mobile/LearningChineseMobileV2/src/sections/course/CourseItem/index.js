import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight, View, Image, Text } from "react-native";
import styles from "./styles";
import { readStorageUrl } from "../../../utils/readStorageUrl";
import { HStack } from "@react-native-material/core";
import { formatToVnd } from "../../../utils/formatCurrency";
import { Rating, AirbnbRating } from 'react-native-ratings';


const CourseItem = ({
    _id,
    title,
    subtitle,
    rating,
    rateCount,
    studentCount,
    authorId,
    lessonCount,
    totalDuration,
    price,
    level,
    createdAt,
    author,
    firstLesson
}) => {
    const navigation = useNavigation();

    return (
        <TouchableHighlight
            onPress={() => {
                navigation.navigate('CourseDetail', { courseId: _id });
            }} >
            <View style={styles.container}>
                <View style={{ display: 'flex', position: 'relative' }}>
                    <Image
                        alt={_id}
                        style={{ ...styles.thumbnail, display: 'flex', position: 'relative' }}
                        src={readStorageUrl(firstLesson.thumbnail)} />
                    <Text
                        style={{
                            ...styles.title,
                            position: 'absolute',
                            right: 10,
                            display: 'flex',
                            bottom: 10,
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            margin: 10,
                            backgroundColor: 'whitesmoke',
                            borderRadius: 30
                        }}
                        numberOfLines={1}>
                        {formatToVnd(price)}
                    </Text>
                </View>
                <Text
                    style={styles.title}
                    numberOfLines={2}>
                    {title}
                </Text>
                <Text
                    style={styles.subtitle}
                    numberOfLines={2}>
                    {subtitle}
                </Text>
                <Text
                    style={styles.subtitle}
                    numberOfLines={2}>
                    Giảng viên: {author.fullName}
                </Text>
                <Text
                    style={styles.subtitle}
                    numberOfLines={1}>
                    {lessonCount} Bài giảng • Cấp độ {level} • {studentCount} học viên
                </Text>
                <HStack>
                    <Rating
                        style={{ width: 100, marginLeft: 10 }}
                        isDisabled
                        type='star'
                        ratingCount={5}
                        imageSize={20}
                        readonly
                        startingValue={0}
                        showRating={false}
                    />
                    <Text
                        style={styles.subtitle}
                        numberOfLines={1}>
                        {rateCount} Đánh giá
                    </Text>
                </HStack>
            </View>
        </TouchableHighlight>
    )
}

export default CourseItem;