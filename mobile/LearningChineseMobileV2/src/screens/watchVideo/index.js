import { StatusBar, Text, View } from "react-native"
import Video from 'react-native-video';
import { useEffect, useRef, useState } from "react";
import ScreenContainer from "../../components/ScreenContainer";
import styles from "./style";
import { getVideoById } from "../../api/videoApi";
import { readStorageUrl } from "../../utils/readStorageUrl";
import _ from 'lodash';
import { getVocabularyByWord } from "../../api/vocabularyApi";
import RBSheet from 'react-native-raw-bottom-sheet';
import { HStack, VStack } from "@react-native-material/core";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { colors } from "../../theme/color";
import axios from "axios";
import webvtt from 'node-webvtt';

const WatchVideoScreen = ({ route, navigation }) => {
    const refRBSheet = useRef();
    const videoRef = useRef(null);
    const { videoId, thumbnail } = route.params;

    const [currentTextSub, setCurrentTextSub] = useState();
    const [currentSubTime, setCurrentSubTime] = useState({
        from: 0,
        to: 0
    })

    const [currentPosition, setCurrentPosition] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingVoca, setLoadingVoca] = useState(false);
    const [video, setVideo] = useState();
    const [playing, setPlaying] = useState(false);
    const [vocabulary, setVocabulary] = useState();
    const [wordSelect, setWordSelect] = useState(null);

    const [transcripts, setTranscripts] = useState({
        seg: [],
        chinese: [],
        pinyin: [],
        vietnamese: [],
        length: 0
    });

    const searchWord = (word, sentence) => {
        setWordSelect(word);
        setLoadingVoca(true);
        getVocabularyByWord(word)
            .then(({ result }) => {
                setVocabulary(result);
                console.log(result);
            })
            .catch((err) => {
                setVocabulary(null);
                console.log(err);
            })
            .finally(() => {
                setLoadingVoca(false);
            });
    }

    const onCloseBottomSheet = () => {
        setPlaying(true);
        setWordSelect(null);
        setLoadingVoca(false);
    }

    const handleProgress = (data) => {
        const currentTime = data.currentTime;
        setCurrentPosition(data.currentTime);


        const cues = transcripts.seg;
        const currentCue = _.find(cues, x => (currentTime >= x.start && currentTime <= x.end))

        if (currentCue) {
            setCurrentSubTime({
                from: currentCue.start,
                to: currentCue.end
            })
            setCurrentTextSub(currentCue.text)
        }
    };

    useEffect(() => {
        setLoadingVoca(false);
        setWordSelect(null);
        setLoading(true);
        getVideoById(videoId)
            .then(({ result }) => {
                setPlaying(true);
                setVideo(result);


                Promise.all(_.map(result.VideoSubtitles, subtitle => axios.get(readStorageUrl(subtitle.Url))))
                    .then(async ([seg, chinese, pinyin, vietnamese]) => {

                        const segCues = webvtt.parse(seg.data, { strict: true }).cues;
                        const chineseCues = webvtt.parse(chinese.data, { strict: true }).cues;
                        const pinyinCues = webvtt.parse(pinyin.data, { strict: true }).cues;
                        const vietnameseCues = webvtt.parse(vietnamese.data, { strict: true }).cues;

                        let vttLengths = [segCues.length, chineseCues.length, pinyinCues.length, vietnameseCues.length];
                        let maxVttLength = _.max(vttLengths)

                        if (_.every(vttLengths, x => x === maxVttLength)) {
                            setTranscripts({
                                seg: segCues,
                                chinese: chineseCues,
                                pinyin: pinyinCues,
                                vietnamese: vietnameseCues,
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])

    return (
        <ScreenContainer>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={"#000"} />
            <Video
                controls
                paused={!playing}
                onProgress={handleProgress}
                poster={readStorageUrl(thumbnail)}
                ref={videoRef}
                style={styles.video}
                source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
            />
            <Text style={styles.clickableSub}>
                {currentTextSub && _.map(currentTextSub.split('-'), (word, index) => {
                    const sentence = transcripts.chinese.find(x => x.start === currentSubTime.from && x.end === currentSubTime.to)?.text;

                    return (
                        <Text
                            key={index}
                            onPress={() => {
                                setPlaying(false);
                                searchWord(word, sentence);
                                refRBSheet.current.open();
                            }}>
                            {word}
                        </Text>
                    )
                })}

            </Text>
            <RBSheet
                ref={refRBSheet}
                useNativeDriver={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    },
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                    container: {
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30
                    }
                }}
                onClose={onCloseBottomSheet}
                height={400}
                customModalProps={{
                    animationType: 'slide',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                    enabled: false,
                }}>
                <View style={styles.insideBottomSheet}>
                    <HStack>
                        <Text style={styles.originWord}>
                            {wordSelect}
                        </Text>
                        <IconButton
                            containerColor="rgba(0, 0, 0, 0.05)"
                            background={colors.background}
                            mode="contained"
                            iconColor={false ? colors.primaryColor : '#696969'}
                            icon={false ? "bookmark" : "bookmark-outline"} />
                    </HStack>
                    {loadingVoca
                        ? <View>
                            <ActivityIndicator
                                style={styles.activityIndicator}
                                animating={true}
                                size={"large"}
                                color={colors.primaryColor} />
                        </View>
                        : vocabulary
                            ? <View>
                                <Text style={styles.pText}>
                                    {vocabulary?.Pinyin}
                                </Text>
                                <Text style={styles.pText}>
                                    Từ loại: {vocabulary?.WordType}
                                </Text>
                                <Text style={styles.pText}>
                                    Nghĩa: {vocabulary?.VietnameseMean}
                                </Text>
                                <HStack>
                                    <Text style={styles.pText}>
                                        Ví dụ:
                                    </Text>
                                    <VStack ml={15} fill>
                                        {_.split(vocabulary?.Example, "。").map(example => (
                                            <Text style={{ ...styles.pText, width: '100%' }}>
                                                {example.trim()}
                                            </Text>
                                        ))}
                                    </VStack>
                                </HStack>
                            </View>
                            : <View>
                                <Text style={styles.pText}>
                                    Không tìm thấy
                                </Text>
                            </View>
                    }
                </View>
            </RBSheet>
        </ScreenContainer >
    )
}

export default WatchVideoScreen;