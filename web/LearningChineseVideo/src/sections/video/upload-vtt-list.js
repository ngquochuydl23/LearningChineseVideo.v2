const { Box, Typography, Stack, Card, Button } = require("@mui/material")
import AssignmentIcon from '@mui/icons-material/Assignment';
import LinearProgress from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { uploadFile } from 'src/services/api/upload-api';

const UploadVttList = ({
    onUploadedVtts,
    error
}) => {

    const [mainVtt, setMainVtt] = useState({
        loading: true,
        uploadedPercent: 0,
        total: 0,
        vtt: null
    });
    const [chineseVtt, setChineseVtt] = useState({
        loading: true,
        uploadedPercent: 0,
        total: 0,
        vtt: null
    });
    const [pinyinVtt, setPinyinVtt] = useState({
        loading: true,
        uploadedPercent: 0,
        total: 0,
        vtt: null
    });
    const [vietnameseVtt, setVietnameseVtt] = useState({
        loading: true,
        uploadedPercent: 0,
        total: 0,
        vtt: null
    });

    const VttItem = ({
        filename,
        isRunningSub,
        loading = false,
        onRemoveItem
    }) => {
        return (
            <Card
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
                        <AssignmentIcon />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Typography
                            mb="5px"
                            fontSize="14px"
                            variant="subtitle2">
                            {filename}
                        </Typography>
                        {loading
                            ? <LinearProgress color="success" />
                            : <Typography
                                mb="5px"
                                fontSize="12px"
                                color='green'
                                variant="subtitle2">
                                Đã tải lên
                            </Typography>
                        }
                    </Box>

                    <Button
                        onClick={onRemoveItem}
                        sx={{ color: '#696969', paddingX: '0px' }}>
                        <CloseIcon />
                    </Button>
                </Stack>
            </Card>
        )
    }

    const onPickMainVtt = (event) => {
        var file = event.target.files[0];
        uploadFile(file, (uploaded, total) => {
            setMainVtt({
                vtt: {
                    fileName: file.name
                },
                uploadedPercent: uploaded,
                total: total,
                loading: true
            })
        })
            .then(({ medias }) => {
                const media = medias[0];
                setMainVtt({
                    ...mainVtt,
                    vtt: {
                        fileName: file.name,
                        url: media.url,
                        srcLang: 'zh',
                        isDefault: true
                    },
                    loading: false
                })
            })
            .catch((err) => console.log(err));
    }

    const onPickChineseVtt = (event) => {
        var file = event.target.files[0];
        uploadFile(file, (uploaded, total) => {
            setChineseVtt({
                vtt: {
                    fileName: file.name
                },
                uploadedPercent: uploaded,
                total: total,
                loading: true
            })
        })
            .then(({ medias }) => {
                const media = medias[0];
                setChineseVtt({
                    ...chineseVtt,
                    vtt: {
                        fileName: file.name,
                        url: media.url,
                        srcLang: 'zh',
                        isDefault: false
                    },
                    loading: false
                })
            })
            .catch((err) => console.log(err));
    }

    const onPickPinyinVtt = (event) => {
        var file = event.target.files[0];
        uploadFile(file, (uploaded, total) => {
            setPinyinVtt({
                vtt: {
                    fileName: file.name
                },
                uploadedPercent: uploaded,
                total: total,
                loading: true
            })
        })
            .then(({ medias }) => {
                const media = medias[0];
                setPinyinVtt({
                    ...pinyinVtt,
                    vtt: {
                        fileName: file.name,
                        url: media.url,
                        srcLang: 'pinyin',
                        isDefault: false
                    },
                    loading: false
                })
            })
            .catch((err) => console.log(err));
    }
    const onPickVietnameseVtt = (event) => {
        var file = event.target.files[0];
        uploadFile(file, (uploaded, total) => {
            setVietnameseVtt({
                vtt: {
                    fileName: file.name
                },
                uploadedPercent: uploaded,
                total: total,
                loading: true
            })
        })
            .then(({ medias }) => {
                const media = medias[0];
                setVietnameseVtt({
                    ...vietnameseVtt,
                    vtt: {
                        fileName: file.name,
                        url: media.url,
                        srcLang: 'vn',
                        isDefault: false
                    },
                    loading: false
                })
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        if (mainVtt.vtt?.url && chineseVtt.vtt?.url && pinyinVtt.vtt?.url && vietnameseVtt.vtt?.url) {
            onUploadedVtts({
                mainVtt: mainVtt.vtt,
                chineseVtt: chineseVtt.vtt,
                pinyinVtt: pinyinVtt.vtt,
                vietnameseVtt: vietnameseVtt.vtt
            })
        }
    }, [mainVtt.vtt?.url, chineseVtt.vtt?.url, pinyinVtt.vtt?.url, vietnameseVtt.vtt?.url])

    return (
        <Box mt="20px">
            <Stack direction="row" justifyContent="space-between">
                <Box>
                    <Typography variant="subtitle1">Tải danh sách phụ đè</Typography>
                    <Typography variant="caption">
                        Tải danh sách phụ đề bao gồm tiếng Trung, phiên âm và tiếng Việt.
                    </Typography>
                </Box>
                <input
                    onChange={onPickMainVtt}
                    style={{ display: "none" }}
                    type="file"
                    multiple
                    accept="text/vtt"
                    id="pick-main-vtt"
                />
                <input
                    onChange={onPickChineseVtt}
                    style={{ display: "none" }}
                    type="file"
                    multiple
                    accept="text/vtt"
                    id="pick-chinese-vtt"
                />
                <input
                    onChange={onPickPinyinVtt}
                    style={{ display: "none" }}
                    type="file"
                    multiple
                    accept="text/vtt"
                    id="pick-pinyin-vtt"
                />
                <input
                    onChange={onPickVietnameseVtt}
                    style={{ display: "none" }}
                    type="file"
                    multiple
                    accept="text/vtt"
                    id="pick-vietnamese-vtt"
                />
            </Stack>
            <Stack
                my="10px"
                direction="column"
                spacing="15px">
                {mainVtt.vtt
                    ? <VttItem
                        onRemoveItem={() => {
                            setMainVtt({
                                loading: false,
                                uploadedPercent: 0,
                                total: 0,
                                vtt: null
                            })
                        }}
                        uploading={mainVtt.loading}
                        filename={mainVtt.vtt.fileName}
                    />
                    : (<Button
                        onClick={() => document?.getElementById("pick-main-vtt").click()}
                        sx={{
                            borderRadius: '4px',
                            height: '30px',
                            fontSize: '14px',
                            color: '#696969',
                            border: '1px solid #d3d3d3',
                            width: '250px'
                        }}
                        fullWidth={false}
                        variant='outlined'>
                        Thêm phụ đề chính
                    </Button>)
                }
                {chineseVtt.vtt
                    ? <VttItem
                        onRemoveItem={() => {
                            setChineseVtt({
                                loading: false,
                                uploadedPercent: 0,
                                total: 0,
                                vtt: null
                            })
                        }}
                        uploading={chineseVtt.loading}
                        filename={chineseVtt.vtt.fileName}
                    />
                    : (<Button
                        onClick={() => document?.getElementById("pick-chinese-vtt").click()}
                        sx={{
                            borderRadius: '4px',
                            height: '30px',
                            fontSize: '14px',
                            color: '#696969',
                            border: '1px solid #d3d3d3',
                            width: '250px'
                        }}
                        fullWidth={false}
                        variant='outlined'>
                        Thêm phụ đề tiếng Trung
                    </Button>)
                }
                {pinyinVtt.vtt
                    ? <VttItem
                        onRemoveItem={() => {
                            setPinyinVtt({
                                loading: false,
                                uploadedPercent: 0,
                                total: 0,
                                vtt: null
                            })
                        }}
                        uploading={pinyinVtt.loading}
                        filename={pinyinVtt.vtt.fileName}
                    />
                    : (<Button
                        onClick={() => document?.getElementById("pick-pinyin-vtt").click()}
                        sx={{
                            borderRadius: '4px',
                            height: '30px',
                            fontSize: '14px',
                            color: '#696969',
                            border: '1px solid #d3d3d3',
                            width: '250px'
                        }}
                        fullWidth={false}
                        variant='outlined'>
                        Thêm phụ đề Pinyin
                    </Button>)
                }
                {vietnameseVtt.vtt
                    ? <VttItem
                        onRemoveItem={() => {
                            setVietnameseVtt({
                                loading: false,
                                uploadedPercent: 0,
                                total: 0,
                                vtt: null
                            })
                        }}
                        uploading={vietnameseVtt.loading}
                        filename={vietnameseVtt.vtt.fileName}
                    />
                    : (<Button
                        onClick={() => document?.getElementById("pick-vietnamese-vtt").click()}
                        sx={{
                            borderRadius: '4px',
                            height: '30px',
                            fontSize: '14px',
                            color: '#696969',
                            border: '1px solid #d3d3d3',
                            width: '250px'
                        }}
                        fullWidth={false}
                        variant='outlined'>
                        Thêm phụ đề tiếng Việt
                    </Button>)
                }
                {/* {(!mainVtt.vtt.url || !chineseVtt.vtt.url || piny)

                } */}
            </Stack>
        </Box>
    )
}

export default UploadVttList;