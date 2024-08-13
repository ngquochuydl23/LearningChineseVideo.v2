import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScrollView, Text, View } from "react-native";
import VideoSection from "../../../../sections/home/VideoSection";
import data from './data.json';
import styles from './styles';
import HomeHeader from "../../../../sections/home/HomeHeader";
import ScreenContainer from "../../../../components/ScreenContainer";

const HomeTab = () => {
    return (
        <ScreenContainer>
            <HomeHeader title="Trang chủ" />
            <VideoSection
                videos={data.result} />
            <VideoSection
                videos={data.result} />
            <VideoSection
                videos={data.result} />
            <VideoSection
                videos={data.result} />
            <VideoSection
                videos={data.result} />
        </ScreenContainer>
    )
}

export default HomeTab;