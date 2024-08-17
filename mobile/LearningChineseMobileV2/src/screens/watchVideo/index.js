import { StatusBar, View } from "react-native"
import Video from 'react-native-video';
import { useRef } from "react";
import ScreenContainer from "../../components/ScreenContainer";
import styles from "./style";

const WatchVideoScreen = () => {
    const videoRef = useRef(null);
    return (
        <ScreenContainer>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={"#000"} />
            <Video
                ref={videoRef}
                style={styles.video}
                source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
            />
        </ScreenContainer>
    )
}

export default WatchVideoScreen;