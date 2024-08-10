import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
    Avatar,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button
} from '@mui/material';
import { Layout as AdminLayout } from 'src/layouts/admin-layout/layout';
import UploadVideoFrame from 'src/sections/video/upload-video-frame';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UploadVideoThumbnail from 'src/sections/video/upload-thumbnail';
import UploadVttList from 'src/sections/video/upload-vtt-list';
import { MuiChipsInput } from 'mui-chips-input';
import { useRouter } from 'next/router';
import { addVideo } from 'src/services/api/video-api';
import { useSnackbar } from 'notistack';

const Page = () => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            topics: [],
            subtitles: [],
            videoUrl: '',
            thumbnail: '',
            duration: 0,
            mimetype: 'video/mp4',
            level: 0
        },
        validationSchema: Yup.object({
            title: Yup
                .string()
                .required('Vui lòng nhập tiêu đề'),
            description: Yup
                .string()
                .required('Vui lòng nhập mô tả video'),
            topics: Yup
                .array()
                .min(1, 'Nhập tối thiểu 1 chủ đề')
                .required('Vui lòng nhập chủ đề'),
            subtitles: Yup
                .array()
                .length(4, 'Phải đủ 4 bộ phụ đề')
                .required('Vui lòng tải phụ đề'),
            videoUrl: Yup
                .string()
                .required('Vui lòng tải lên video'),
            thumbnail: Yup
                .string()
                .required('Vui lòng tải lên hình nhỏ'),
            level: Yup
                .number()
                .required('Vui lòng chọn cấp độ')
        }),

        onSubmit: async (values, helpers) => {
            try {
                await addVideo(values);
                router.push('/admin/videos');
                enqueueSnackbar(`Tạo video thành công`, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right'
                    }
                });

            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);

                console.log(err);
                if (err === 'Video is already created') {
                    enqueueSnackbar(`Tiêu đề video đã bị trùng, vui lòng nhập tiêu đề khác`, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right'
                        }
                    });
                } else {
                    enqueueSnackbar(err, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right'
                        }
                    });
                }
            }
        }
    });

    return (
        <>
            <Head>
                <title>
                    Đăng tải video
                </title>
            </Head>
            <form onSubmit={formik.handleSubmit}>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, paddingBottom: '30px' }}>
                    <Container maxWidth="lg">
                        <Stack spacing={3}>
                            <Typography variant="h4">
                                Đăng tải video
                            </Typography>
                            <Stack direction="row" spacing="15px">
                                <Box sx={{ width: '100%' }}>
                                    <TextField
                                        error={!!(formik.touched.title && formik.errors.title)}
                                        fullWidth
                                        helperText={formik.touched.title && formik.errors.title}
                                        label="Tiêu đề"
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
                                    <UploadVideoThumbnail
                                        onReceiveThumbnail={(thumbnail) =>
                                            formik.setFieldValue('thumbnail', thumbnail)} />
                                    <UploadVttList
                                        onUploadedVtts={(vtts) => {
                                            formik.setFieldValue('subtitles', [
                                                vtts.mainVtt,
                                                vtts.chineseVtt,
                                                vtts.pinyinVtt,
                                                vtts.vietnameseVtt
                                            ])
                                        }} />
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
                                                    <MenuItem value={1}>HSK 1</MenuItem>
                                                    <MenuItem value={2}>HSK 2</MenuItem>
                                                    <MenuItem value={3}>HSK 3</MenuItem>
                                                    <MenuItem value={4}>HSK 4</MenuItem>
                                                    <MenuItem value={5}>HSK 5</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Box>
                                </Box>
                                <div>
                                    <UploadVideoFrame onUploadedVideo={(data) => {
                                        console.log(data);
                                        formik.setFieldValue('videoUrl', data.videoUrl);
                                        formik.setFieldValue('duration', data.duration);
                                        formik.setFieldValue('mimetype', data.mimetype);
                                    }} />
                                </div>
                            </Stack>
                        </Stack>
                        <Button
                            type="submit"
                            sx={{ height: '50px' }}
                            fullWidth
                            variant='contained'>
                            Tạo video
                        </Button>
                    </Container>
                </Box>
            </form>
        </>
    )
}
Page.getLayout = (page) => (
    <AdminLayout>
        {page}
    </AdminLayout>
);

export default Page;