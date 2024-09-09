import { Text, View } from "react-native"
import styles from "./styles";
import { HStack, VStack } from "@react-native-material/core";
import _ from 'lodash';

const SavedWordItem = ({ vocabulary, sentence, showedTo, showedFrom, videoId }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.originWord}>{vocabulary.originWord}</Text>
            <Text style={styles.sentence}>Câu {sentence}</Text>
            <HStack>
                <Text style={styles.pinyinAndSino}>{`[`}{vocabulary.pinyin}{`]`}</Text>
                {vocabulary.sinoVietnamese &&
                    <Text style={styles.pinyinAndSino}>{`【`}{vocabulary.sinoVietnamese}{`}`}</Text>
                }
            </HStack>
            <Text style={styles.common}>Cấp độ {vocabulary.level}</Text>
            <Text style={styles.common}>Nghĩa {vocabulary.vietnameseMean}</Text>
            <HStack>
                <Text style={styles.example}>Ví dụ: </Text>
                <VStack w={"100%"}>
                    {_.split(vocabulary.example, '。')
                        .map(ex => (<Text> - {ex.trim()}</Text>))
                    }
                </VStack>
            </HStack>
        </View>
    )
}

export default SavedWordItem;