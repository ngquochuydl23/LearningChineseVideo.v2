import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScrollView, Text, View } from "react-native";
import styles from './styles';
import ScreenContainer from "../../../../components/ScreenContainer";
import { useEffect, useState } from "react";
import { getVideos } from "../../../../api/videoApi";
import VideoSection from "../../../../sections/home/VideoSection";
import HomeHeader from "../../../../sections/home/HomeHeader";



const HomeTab = () => {

    const [data, setData] = useState({
        hsk1: null,
        hsk2: null,
        hsk3: null,
        hsk4: null,
        hsk5: null
    });

    useEffect(() => {
        Promise.all([
            getVideos(1, 0, 10),
            getVideos(2, 0, 10),
            getVideos(3, 0, 10),
            getVideos(4, 0, 10),
            getVideos(5, 0, 10)
        ])
            .then(([hsk1, hsk2, hsk3, hsk4, hsk5]) => {
                setData({
                    hsk1: hsk1.result,
                    hsk2: hsk2.result,
                    hsk3: hsk3.result,
                    hsk4: hsk4.result,
                    hsk5: hsk5.result
                })
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <ScreenContainer>
            <HomeHeader title="Trang chủ" />
            <VideoSection
                title={'Hsk 1'}
                videos={(data.hsk1)} />
            <VideoSection
                title={'Hsk 2'}
                videos={data.hsk2} />
            <VideoSection
                title={'Hsk 3'}
                videos={data.hsk3} />
            <VideoSection
                title={'Hsk 4'}
                videos={data.hsk4} />
            <VideoSection
                title={'Hsk 4'}
                videos={data.hsk5} />
        </ScreenContainer>
    )
}

export default HomeTab;