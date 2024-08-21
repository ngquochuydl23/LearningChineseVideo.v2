import { FlatList, Text, View } from "react-native"
import ScreenContainer from "../../components/ScreenContainer";
import SavedVocaItem from "../../sections/lib/savedVocabulary/SavedVocaItem";
import styles from "./styles";
import { useEffect, useState } from "react";
import { getSavedByVideo } from "../../api/savedVocabularyApi";


const SavedScreen = () => {
    const [loading, setLoading] = useState(false);
    const [savedGroups, setSavedGroups] = useState([]);

    useEffect(() => {
        setLoading(true);
        getSavedByVideo()
            .then(({ result }) => {
                setSavedGroups(result);
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
                data={savedGroups}
                ItemSeparatorComponent={<View style={{ height: 15 }} />}
                renderItem={({ item, index }) =>
                    <View key={index}>
                        <SavedVocaItem
                            {...item} />
                    </View>
                }
                keyExtractor={item => item.Video.Id}
            />
        </ScreenContainer>
    )
}

export default SavedScreen;