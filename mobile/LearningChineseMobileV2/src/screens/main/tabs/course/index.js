import { useEffect, useState } from "react";
import ScreenContainer from "../../../../components/ScreenContainer"
import HomeHeader from "../../../../sections/home/homeHeader";
import { getCourses } from "../../../../api/courseApi";
import { FlatList, View } from "react-native";
import CourseItem from "../../../../sections/course/CourseItem";
import styles from "./styles";

const CourseScreen = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses()
            .then(({ result }) => {
                setCourses(result);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <ScreenContainer>
            <HomeHeader title="Khóa học" />
            <FlatList
                style={styles.flatList}
                nestedScrollEnabled
                pagingEnabled
                data={courses}
                ItemSeparatorComponent={<View style={{ height: 15 }} />}
                renderItem={({ item, index }) =>
                    <View key={index}>
                        <CourseItem
                            {...item} />
                    </View>
                }
                keyExtractor={item => item._id}
            />
        </ScreenContainer>
    )
}

export default CourseScreen;