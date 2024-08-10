import { Box, Button, Card, LinearProgress, Stack, Typography } from "@mui/material";
import { uploadFile } from "src/services/api/upload-api";
import { useRef, useState } from "react";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import ReactPlayer from "react-player";
import readMediaUrl from "src/utils/read-media-url";

const UploadVideoFrame = ({ onUploadedVideo }) => {
    const videoPlayerRef = useRef();
    const [remoteVideo, setRemoteVideo] = useState(null);
    const [raw, setRaw] = useState({
        hasLocalVideo: false,
        filename: null,
        progress: 0,
        total: 0,
        uploading: false,
        done: false
    });

    const uploadVideo = (event) => {
        var file = event.target.files[0];

        if (!file)
            return;

        uploadFile(file, (progress, total) => {


            setRaw({
                filename: file.name,
                hasLocalVideo: true,
                progress: progress,
                total: total,
                uploading: progress !== total,
                done: progress === total,
            });
        })
            .then(({ medias }) => {
                const media = medias[0];
                setRemoteVideo({
                    videoUrl: media.url,
                    mimetype: media.mimetype,
                    duration: 0
                });
            })
            .catch((err) => {
                console.log(err);
                setRaw({
                    hasLocalVideo: false,
                    filename: null,
                    progress: 0,
                    total: 0,
                    uploading: false,
                    done: false,
                    remoteVideo: null
                });
            })
    }

    const handleDuration = (duration) => {
        if (remoteVideo) {
            const data = {
                ...remoteVideo,
                duration: duration * 1000
            };

            setRemoteVideo(data);
            onUploadedVideo(data);
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                height: '250px',
                aspectRatio: '16/9',
                backgroundColor: '#f5f5f5',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid #d3d3d3'
            }}>
            {raw.hasLocalVideo
                ? ((raw.uploading && !remoteVideo)
                    ? <Card
                        sx={{
                            width: '400px',
                            backgroundColor: '#f5f5f5',
                            textDecoration: 'none',
                            borderRadius: '10px',
                            overflow: 'hidden'
                        }}>
                        <Stack
                            spacing="15px"
                            sx={{
                                paddingX: '10px',
                                paddingY: '5px',
                            }}
                            direction="row">
                            <Box
                                sx={{
                                    bgcolor: 'rgba(3, 172, 19, 0.3)',
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    aspectRatio: 1,
                                    borderRadius: '10px',
                                    color: '#03ac13'
                                }}>
                                <SmartDisplayIcon />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Typography
                                    mb="5px"
                                    fontSize="14px"
                                    variant="subtitle2">
                                    {raw.filename}
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={(raw.progress / raw.total) * 100}
                                    color="success" />
                            </Box>
                        </Stack>
                    </Card>
                    : <ReactPlayer
                        ref={videoPlayerRef}
                        width="100%"
                        height="100%"
                        onDuration={handleDuration}
                        style={{
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: 'black'
                        }}
                        controls={true}
                        url={readMediaUrl(remoteVideo?.videoUrl)}
                    />)
                : <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Typography
                        fontSize="22px"
                        fontWeight="600"
                        variant="subtitle2">
                        Tải video
                    </Typography>
                    <Typography
                        fontSize="14px"
                        variant="subtitle2">
                        Bấm vào đây để tải video từ máy của bạn
                    </Typography>
                    <Button
                        onClick={() => document?.getElementById("pick-video")?.click()}
                        sx={{ height: '35px', marginTop: '20px' }}
                        variant="contained">
                        Chọn từ máy tính
                    </Button>
                    <input
                        onChange={uploadVideo}
                        style={{ display: "none" }}
                        type="file"
                        accept="video/*"
                        id="pick-video"
                    />
                </div>
            }
        </Box>
    )
}

export default UploadVideoFrame;