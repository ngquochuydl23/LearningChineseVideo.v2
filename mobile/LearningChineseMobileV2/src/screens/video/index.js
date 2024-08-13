import { Image, StatusBar, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import HomeHeader from "../../sections/home/HomeHeader";
import styles from "./style";
import { IconButton, MD3Colors } from "react-native-paper";
import { useEffect, useState } from "react";


const VideoScreen = () => {
    const [video, setVideo] = useState();

    useEffect(() => {
      
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.thumbnailContainer}>
                <Image
                    style={styles.thumbnail}
                    src="https://hayugo.edu.vn//storage/image/2762a990a26e55c9caa102422a66327c.jpg" />
                <View style={styles.overlapThumnail}>
                    <Text>Alo</Text>
                    <TouchableOpacity style={styles.controllerVideo}>
                        
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.title}>
                {`《Genshin》Giới thiệu nhân vật -「Navia:Bánh Lái Hoa Lệ」`}
            </Text>
            <View style={styles.detailInfo}>
                <View>
                    <Text style={styles.levelAndTopic}>
                        {`Cấp độ: HSK1`}
                    </Text>
                    <Text style={styles.levelAndTopic}>
                        {`Chủ đề: Hoạt hình`}
                    </Text>
                </View>
                <IconButton icon="bookmark">

                </IconButton>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionTitle}>Mô tả</Text>
                <Text style={styles.descriptionText}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
            </View>
        </View>
    )
}

export default VideoScreen;