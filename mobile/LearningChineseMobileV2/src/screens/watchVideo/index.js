import { StatusBar, Text, ToastAndroid, View } from "react-native"
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
import { ActivityIndicator, IconButton, Snackbar } from "react-native-paper";
import { colors } from "../../theme/color";
import axios from "axios";
import webvtt from 'node-webvtt';
import { checkSaved, delSaved, save } from "../../api/savedVocabularyApi";
import { useToast } from 'react-native-paper-toast';
import log from "../../logger";

const WatchVideoScreen = ({ route, navigation }) => {
    const toaster = useToast();
    const refRBSheet = useRef();
    const videoRef = useRef(null);
    const scrollView = useRef(null);

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

    const [vocabulary, setVocabulary] = useState();
    const [wordSelect, setWordSelect] = useState(null);
    const [saved, setSaved] = useState(false);

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
        setSaved(null);


        getVocabularyByWord(word)
            .then(({ result }) => {
                setVocabulary(result);

                checkSaved(word, currentSubTime.from, currentSubTime.to, video._id)
                    .then((res) => {
                        setSaved(res);
                        console.log(res);
                    })
                    .catch((err) => {
                        setSaved(null);
                        console.log(err);
                    })

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
        videoRef.current.resume();
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

    const doSaveWord = (originWord) => {
        setSaved(true);
        save(video._id, originWord, currentSubTime.from, currentSubTime.to, currentTextSub)
            .then(({ result, msg }) => {
                log.info(msg);
                setSaved(true);
                ToastAndroid.show('Lưu từ thành công.', ToastAndroid.SHORT);
            })
            .catch((err) => {
                setSaved(false);
                if (err === `You've already saved this word`) {
                    ToastAndroid.show('Bạn đã lưu từ này từ trước.', ToastAndroid.SHORT);
                }
                console.log(err);
            })
    }

    const doRmSave = (originWord) => {
        setSaved(false);
        delSaved(video._id, originWord, currentSubTime.from, currentSubTime.to, currentTextSub)
            .then(({ msg }) => {
                log.info(msg);
                setSaved(false);
                ToastAndroid.show('Bỏ lưu từ thành công.', ToastAndroid.SHORT);
            })
            .catch((err) => {
                setSaved(true);
                if (err === `You've already saved this word`) {
                    ToastAndroid.show('Bạn chưa lưu từ vựng này.', ToastAndroid.SHORT);
                }
                console.log(err);
            })

    }

    useEffect(() => {
        setLoadingVoca(false);
        setWordSelect(null);
        setLoading(true);
        getVideoById(videoId)
            .then(({ result }) => {
                //videoRef.current.resume();
                setVideo(result);

                Promise.all(_.map(result.subtitles, subtitle => axios.get(readStorageUrl(subtitle.url))))
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


    if (loading) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }

    return (
        <ScreenContainer>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={"#000"} />
            <Video
                controls
                onProgress={handleProgress}
                poster={readStorageUrl(thumbnail)}
                ref={videoRef}
                style={styles.video}
                source={{
                    uri: readStorageUrl(video?.videoUrl),
                    headers: {
                        'range': 'bytes=0-'
                    }
                }}
            />
            <Text style={styles.clickableSub}>
                {currentTextSub && _.map(currentTextSub.split('-'), (word, index) => {
                    const sentence = transcripts.chinese.find(x => x.start === currentSubTime.from && x.end === currentSubTime.to)?.text;

                    return (
                        <Text
                            key={index}
                            onPress={() => {
                                videoRef.current.pause();
                                searchWord(word, sentence);
                                refRBSheet.current.open();
                            }}>
                            {word}
                        </Text>
                    )
                })}

            </Text>
            <View>

            </View>
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
                        {vocabulary &&
                            <IconButton
                                onPress={() => {
                                    if (!saved)
                                        doSaveWord(wordSelect)
                                    else {
                                        doRmSave(wordSelect);
                                    }
                                }}
                                containerColor="rgba(0, 0, 0, 0.05)"
                                background={colors.background}
                                mode="contained"
                                iconColor={Boolean(saved) ? colors.primaryColor : '#696969'}
                                icon={Boolean(saved) ? "bookmark" : "bookmark-outline"} />
                        }
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
                                    {vocabulary?.pinyin}
                                </Text>
                                <Text style={styles.pText}>
                                    Từ loại: {vocabulary?.wordType}
                                </Text>
                                <Text style={styles.pText}>
                                    Nghĩa: {vocabulary?.vietnameseMean}
                                </Text>
                                <HStack>
                                    <Text style={styles.pText}>
                                        Ví dụ:
                                    </Text>
                                    <VStack ml={15} fill>
                                        {_.split(vocabulary?.example, "。").map((example, index) => (
                                            <Text
                                                key={index}
                                                style={{ ...styles.pText, width: '100%' }}>
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