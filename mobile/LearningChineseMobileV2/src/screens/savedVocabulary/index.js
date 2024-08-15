import { FlatList, Text, View } from "react-native"
import ScreenContainer from "../../components/ScreenContainer";
import SavedVocaItem from "../../sections/lib/savedVocabulary/SavedVocaItem";
import styles from "./styles";

const SavedVocabularyScreen = () => {
    return (
        <ScreenContainer>

            <FlatList
                style={styles.flatList}
                nestedScrollEnabled
                pagingEnabled
                data={[{}, {}, {}]}
                ItemSeparatorComponent={<View style={{ height: 15 }} />}
                renderItem={(item) => <SavedVocaItem />}
                keyExtractor={item => item.Id}
            />
        </ScreenContainer>
    )
}

export default SavedVocabularyScreen;