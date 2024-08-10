import { Box, Grid, Stack, SvgIcon, Typography } from "@mui/material";
import moment from "moment";
import { ScrollPanel } from "primereact/scrollpanel";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import readMediaUrl from "src/utils/read-media-url";
import Divider from '@mui/material/Divider';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import _ from "lodash";
import axios from "axios";
import webvtt from 'node-webvtt';
import Word from "./word";

const TranscriptItem = ({
    orgin,
    pinyin,
    trans,
    startTime,
    selected,
    onSeek,
}) => {
    return (
        <Box
            onClick={() => {
                onSeek(startTime)
            }}
            sx={{
                ...(selected && {
                    backgroundColor: 'rgb(6, 174, 212, 0.2)',
                    borderRadius: '15px'
                }),
                '&:hover': {
                    backgroundColor: '#f5f5f5',
                    borderRadius: '15px'
                },
                "&.active": {
                    backgroundColor: '#f5f5f5',
                    borderRadius: '15px'
                },
            }}>
            <Stack
                spacing="20px"
                width="100%"
                paddingX="5px"
                paddingY="5px"
                paddingRight="10px"
                alignItems="center"
                direction="row">
                <Stack
                    direction="row"
                    sx={{
                        color: '#696969',
                        borderRadius: '20px',
                        px: '5px',
                        py: '2px',
                        backgroundColor: '#f5f5f5'
                    }}>
                    <SvgIcon fontSize="small">
                        <PlayArrowIcon />
                    </SvgIcon>
                    <Typography
                        ml="2px"
                        fontSize="14px"
                        variant="subtitle2">
                        {_.round(startTime, 2)}
                    </Typography>
                </Stack>
                <Box width="100%" mb="20px">
                    <Typography
                        fontWeight="600"
                        fontSize="16px"
                        variant="subtitle1">
                        {orgin}
                    </Typography>
                    <Typography
                        fontStyle='italic'
                        variant="subtitle2">
                        {pinyin}
                    </Typography>
                    <Typography variant="subtitle2">
                        {trans}
                    </Typography>
                </Box>
            </Stack >
            <Divider sx={{ ml: '110px' }} />
        </Box>
    )
}

const VideoPlayer = ({
    id,
    videoUrl,
    subtitles,
    thumbnail
}) => {

    const videoPlayerRef = useRef();
    const [currentTextSub, setCurrentTextSub] = useState();
    const [currentSubTime, setCurrentSubTime] = useState({
        from: 0,
        to: 0
    })
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [transcripts, setTranscripts] = useState({
        seg: [],
        chinese: [],
        pinyin: [],
        vietnamese: [],
        length: 0
    });

    const [playing, setPlaying] = useState(true);
    const onProgress = (state) => {
        const videoElement = document.querySelector("video");

        if (!videoElement)
            return;

        const currentTime = state.playedSeconds;
        setPlayedSeconds(currentTime);

        const cues = transcripts.seg;
        const currentCue = _.find(cues, x => (currentTime >= x.start && currentTime <= x.end))

        if (currentCue) {
            setCurrentSubTime({
                from: currentCue.start,
                to: currentCue.end
            })
            setCurrentTextSub(currentCue.text)
        }
    }

    const seekTo = (startTime) => {
        if (videoPlayerRef.current !== null) {
            videoPlayerRef.current?.seekTo(startTime, 'seconds');
        }

        var scrollPanel = document.getElementById('ScrollPanel');
        var topPos = scrollPanel.offsetTop;
    }


    const getTracks = (subtitles) => {
        const filterSubs = _.filter(subtitles, x => !x.isDefault);
        return _.map(filterSubs, subtitle => ({
            ...subtitle,
            src: readMediaUrl(subtitle.url),
            default: subtitle.srcLang === 'zh'
        }))
    }

    useEffect(() => {
        Promise.all(_.map(subtitles, subtitle => axios.get(readMediaUrl(subtitle.url))))
            .then(async ([seg, chinese, pinyin, vietnamese]) => {

                const segCues = webvtt.parse(seg.data, { strict: true }).cues;
                const chineseCues = webvtt.parse(chinese.data, { strict: true }).cues;
                const pinyinCues = webvtt.parse(pinyin.data, { strict: true }).cues;
                const vietnameseCues = webvtt.parse(vietnamese.data, { strict: true }).cues;


                let vttLengths = [segCues.length, chineseCues.length, pinyinCues.length, vietnameseCues.length];
                
                console.log(vietnameseCues);
                console.log(segCues.length + ' ' + chineseCues.length + ' ' + pinyinCues.length + ' ' + vietnameseCues.length);

                let maxVttLength = _.max(vttLengths)
                console.log(maxVttLength);


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
    }, [])

    return (
        <Stack
            display="flex"
            direction="row" >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 2,
                    width: '100%',
                }}>
                <ReactPlayer
                    ref={videoPlayerRef}
                    width="100%"
                    height="80vh"
                    style={{
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'black'
                    }}
                    onPlay={() => setPlaying(true)}
                    playing={playing}
                    onProgress={onProgress}
                    controls={true}
                    config={{
                        file: {
                            attributes: {
                                crossOrigin: "true",
                            },
                            tracks: getTracks(subtitles),
                        },
                    }}
                    light={thumbnail}
                    url={readMediaUrl(videoUrl)}
                />
                <Stack
                    justifyContent="center"
                    direction="row"
                    alignItems="center"
                    spacing="5px"
                    sx={{
                        minHeight: '20vh',
                        display: 'flex',
                    }}>
                    {currentTextSub && _.map(currentTextSub.split('-'), word => (
                        <Word
                            sentence={transcripts.chinese.find(x => x.start === currentSubTime.from && x.end === currentSubTime.to)?.text}
                            showedAt={currentSubTime}
                            videoId={id}
                            onClose={() => setPlaying(true)}
                            onClick={() => setPlaying(false)}
                            word={word} />
                    ))}
                </Stack>
            </Box>
            <ScrollPanel
                id="ScrollPanel"
                style={{
                    display: 'flex',
                    flex: 1,
                    overflow: 'hidden',
                    height: '80vh',
                    paddingLeft: '20px'
                }}>
                <Box>
                    <Typography
                        mb="20px"
                        fontSize="30px"
                        fontWeight="800"
                        variant="h5">
                        Phụ đề
                    </Typography>
                    <Stack
                        overflow="hidden"
                        spacing="10px"
                        direction="column">
                        {_.map(transcripts.chinese, (item, idx) => {
                            return (
                                <TranscriptItem
                                    selected={playedSeconds >= item.start && playedSeconds <= item.end}
                                    orgin={item.text}
                                    pinyin={transcripts.pinyin[idx].text}
                                    startTime={item.start}
                                    trans={transcripts.vietnamese[idx].text}
                                    onSeek={(startTime) => {
                                        seekTo(startTime)
                                    }}
                                    key={item.startTime}
                                />
                            );
                        })}
                    </Stack>
                </Box>
            </ScrollPanel>
        </Stack>

    )
}

export default VideoPlayer;