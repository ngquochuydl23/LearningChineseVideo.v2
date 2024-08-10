import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { Box, Card, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { MuiChipsInput } from 'mui-chips-input';
import { editVideo } from 'src/services/api/video-api';
import { uploadFile } from 'src/services/api/upload-api';
import AssignmentIcon from '@mui/icons-material/Assignment';

const UpdateVttFile = ({
    vttId, title, inputDomId, onUploaded, onRemove
}) => {
    const [vtt, setVtt] = useState(null);
    const onPickVttFile = (event) => {
        var file = event.target.files[0];
        uploadFile(file)
            .then(({ medias }) => {
                const media = medias[0];
                const data = {
                    id: vttId,
                    url: media.url,
                    filename: media.filename
                };
                setVtt(data);
                onUploaded(data);
            })
            .catch((err) => console.log(err));
    }

    return (
        <Box>
            <input
                onChange={onPickVttFile}
                style={{ display: "none" }}
                type="file"
                multiple
                accept="text/vtt"
                id={inputDomId}
            />
            {Boolean(vtt)
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
                            <AssignmentIcon />
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Typography
                                mb="5px"
                                fontSize="14px"
                                variant="subtitle2">
                                {vtt.filename}
                            </Typography>
                            <Typography
                                mb="5px"
                                fontSize="12px"
                                color='green'
                                variant="subtitle2">
                                Đã tải lên
                            </Typography>
                        </Box>
                        <Button
                            onClick={() => {
                                setVtt(null);
                                onRemove(vttId);
                            }}
                            sx={{ color: '#696969', paddingX: '0px' }}>
                            <CloseIcon />
                        </Button>
                    </Stack>
                </Card>
                : <Button
                    onClick={() => document.getElementById(inputDomId)?.click()}
                    variant='outlined' sx={{ width: '250px' }}>
                    {title}
                </Button>
            }

        </Box>
    )
}


export default function UpdateVideoDialog({
    open, handleClose, video, onUpdated
}) {
    const { enqueueSnackbar } = useSnackbar();
    const resetForm = () => {
        formik.setValues({
            title: '',
            description: '',
            topics: [],
            subtitles: [],
            level: 0
        })
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            topics: [],
            subtitles: [],
            level: 0
        },

        onSubmit: (values, helpers) => {
            //console.log(values)
            editVideo(video.id, values)
                .then((res) => {
                    console.log(res);
                    onUpdated();
                    handleClose();
                    enqueueSnackbar("Cập nhật thành công", {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right'
                        }
                    });

                })
                .catch((err) => {
                    console.log(err);
                    if (err === "Topics must not be empty") {
                        enqueueSnackbar(`Chủ đề không được để trống`, {
                            variant: 'error',
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right'
                            }
                        });
                        return;
                    }

                    enqueueSnackbar(err, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right'
                        }
                    });
                })
        }
    });

    useEffect(() => {
        if (video) {
            console.log(video);
            formik.setValues({
                title: video.title,
                description: video.description,
                topics: video.topics,
                subtitles: [],
                level: video.level
            });
        } else resetForm();
    }, [video])

    const updateElementOfSubtitle = (data) => {
        var items = formik.values.subtitles;
        if (items.length < 0) {
            return;
        }

        var index = items.findIndex(x => x.id == data.id);
        if (index === -1) {
            formik.setFieldValue('subtitles', [...items, data])
        } else {
            items[index] = data;
            formik.setFieldValue('subtitles', items)
        }
    }


    const removeVttFile = (vttId) => {
        var items = formik.values.subtitles;
        console.log(items);
        if (items.length < 0) {
            return;
        }
        var index = items.findIndex(x => x.id == vttId);
        if (index >= 0) {
            formik.setFieldValue('subtitles', items.filter(x => x.id !== vttId))
        }
    }

    if (!video) {
        return null;
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xl"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle id="alert-dialog-title">
                    Thêm từ vựng
                </DialogTitle>
                <DialogContent sx={{ minWidth: '800px' }}>
                    <Stack>
                        <TextField
                            sx={{ marginTop: "10px" }}
                            error={!!(formik.touched.title && formik.errors.title)}
                            fullWidth
                            helperText={formik.touched.title && formik.errors.title}
                            label="Tiêu đề video"
                            id="title"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.title}
                        />
                        <TextField
                            sx={{ marginTop: "20px" }}
                            required
                            fullWidth
                            multiline
                            minRows={5}
                            id="description"
                            label="Mô tả"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        />
                        <Box mt="20px">
                            <Typography variant="subtitle1">Chủ đề*</Typography>
                            <Typography variant="caption">
                                Chọn chủ đề cho video để người dùng có thể tìm kiếm nhanh chóng và dễ dàng hơn.
                            </Typography>
                            <MuiChipsInput
                                id="topics"
                                onBlur={formik.handleBlur}
                                value={formik.values.topics}
                                error={formik.errors.topics && formik.touched.topics}
                                helperText={formik.errors.topics}
                                onChange={(options) => {
                                    formik.setFieldValue('topics', options)
                                }}
                                placeholder="Nhập chủ đề"
                                sx={{
                                    minHeight: '40px',
                                    mt: '10px',
                                    width: '100%'
                                }}
                            />
                        </Box>
                        <Box mt="20px">
                            <Typography variant='subtitle1'>Chọn cấp độ*</Typography>
                            <Typography variant='caption'>Chọn cấp độ cho video để người dùng có thể tìm video phù hợp với trình độ</Typography>
                            <Box marginY={'20px'}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Chọn cấp độ</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="level"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue('level', e.target.value)
                                        }}
                                        value={formik.values.level}
                                        error={formik.errors.level && formik.touched.level}
                                        helperText={formik.errors.level}
                                        isSearchable
                                        label='Chọn cấp độ'>
                                        <MenuItem value={-1}>Tự động</MenuItem>
                                        <MenuItem value={1}>HSK 1</MenuItem>
                                        <MenuItem value={2}>HSK 2</MenuItem>
                                        <MenuItem value={3}>HSK 3</MenuItem>
                                        <MenuItem value={4}>HSK 4</MenuItem>
                                        <MenuItem value={5}>HSK 5</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Stack
                            spacing="10px"
                            mt="20px">
                            <UpdateVttFile
                                title={`Cập nhật VTT cách từ`}
                                vttId={video.subtitles[0].id}
                                onRemove={removeVttFile}
                                onUploaded={updateElementOfSubtitle}
                                inputDomId="vtt-cach-tu" />
                            <UpdateVttFile
                                title={`Cập nhật VTT tiếng Trung`}
                                onRemove={removeVttFile}
                                vttId={video.subtitles[1].id}
                                onUploaded={updateElementOfSubtitle}
                                inputDomId="vtt-tieng-trung" />
                            <UpdateVttFile
                                title={`Cập nhật VTT phiên âm`}
                                onUploaded={updateElementOfSubtitle}
                                onRemove={removeVttFile}
                                vttId={video.subtitles[2].id}
                                inputDomId="vtt-phien-am" />
                            <UpdateVttFile
                                title={`Cập nhật VTT tiếng Việt`}
                                onUploaded={updateElementOfSubtitle}
                                onRemove={removeVttFile}
                                vttId={video.subtitles[3].id}
                                inputDomId="vtt-tieng-viet" />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ color: 'gray' }}
                        onClick={() => {
                            resetForm();
                            handleClose();
                        }}>
                        Hủy
                    </Button>
                    <Button
                        type='submit' autoFocus>
                        Sửa
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}