import { FlatList, View } from "react-native";
import ScreenContainer from "../../components/ScreenContainer"
import styles from "./styles";
import SavedWordItem from "../../sections/lib/savedVocabulary/savedWordItem";
import { getSavedByByVideoId } from "../../api/savedVocabularyApi";
import { useEffect, useState } from "react";

const SavedDetailScreen = ({ route, navigation }) => {
    const { videoId } = route.params;
    const [loading, setLoading] = useState(false);
    const [words, setWords] = useState([]);

    useEffect(() => {
        setLoading(true);
        getSavedByByVideoId(videoId)
            .then(({ result }) => {
                setWords(result);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);


    return (
        <ScreenContainer disableScroll>
            <FlatList
                style={styles.flatList}
                nestedScrollEnabled
                pagingEnabled
                data={words}
                ItemSeparatorComponent={<View style={{ height: 15 }} />}
                renderItem={({ item, index }) =>
                    <View key={index}>
                        <SavedWordItem {...item} />
                    </View>
                }
                keyExtractor={item => item._id}
            />
        </ScreenContainer>
    )
}

export default SavedDetailScreen;