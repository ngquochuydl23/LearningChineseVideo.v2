import { View } from "react-native"
import VideoPlayer from 'react-native-video-controls';

const WatchVideoScreen = () => {
    return (
        <View>



            <VideoPlayer
                source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
                //navigator={this.props.navigator}
            />
        </View>
    )
}

export default WatchVideoScreen;