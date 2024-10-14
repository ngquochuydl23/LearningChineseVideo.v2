import { FlatList, Text, View } from "react-native"
import ScreenContainer from "../../../../components/ScreenContainer";
import HomeHeader from "../../../../sections/home/HomeHeader";
import { Searchbar } from 'react-native-paper';
import styles from './styles';
import { useEffect, useState } from "react";
import VerticalVideoItem from "../../../../sections/search/verticalVideoItem";
import { searchVideo } from "../../../../api/videoApi";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { colors } from "../../../../theme/color";

const SearchTab = () => {
    const [search, setSearch] = useState('');
    const [videos, setVideos] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (search.length > 0) {
            setLoading(true);
            searchVideo(search)
                .then(({ result }) => {
                    setVideos(result);
                })
                .catch((err) => {
                    console.log(err);
                    setVideos(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setVideos(null);
        }
    }, [search])


    return (
        <ScreenContainer disableScroll>
            <HomeHeader title="Tìm kiếm" />
            <Searchbar
                placeholder="Tìm kiếm video"
                inputStyle={styles.inputStyle}
                style={styles.inputContainer}
                onChangeText={setSearch}
                value={search}
            />
            {(!loading && search.length > 0 && videos && videos.length > 0 && search.length > 0) &&
                <FlatList
                    style={styles.flatList}
                    nestedScrollEnabled
                    pagingEnabled
                    data={videos}
                    ItemSeparatorComponent={<View style={{ height: 15 }} />}
                    renderItem={({ item, index }) =>
                        <View key={index}>
                            <VerticalVideoItem
                                {...item} />
                        </View>
                    }
                    keyExtractor={item => item.Id}
                />
            }
            {(!loading && videos && videos.length == 0 && search.length > 0) &&
                <View style={styles.notFoundContainer}>
                    <Text style={styles.notFoundTitle}>Không tìm thấy video</Text>
                    <Text style={styles.notFoundSubtitle}>Tìm kiếm video, chủ đề và nhiều nội dung khác</Text>
                </View>
            }
            {loading &&
                <View style={styles.loadingIndicator}>
                    <ActivityIndicator
                        animating={true}
                        size={"large"}
                        color={colors.primaryColor} />
                </View>
            }
        </ScreenContainer>
    )
}

export default SearchTab;