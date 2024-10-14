import {
  Box,
  Button,
  Container,
  FormControl,
  Unstable_Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { MuiChipsInput } from "mui-chips-input";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from 'notistack';
import { useEffect, useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/teacher-layout/layout";
import AddLesson from "src/sections/course/add-lesson";
import UploadVideoThumbnail from "src/sections/video/upload-thumbnail";
import UploadVideoFrame from "src/sections/video/upload-video-frame";
import UploadVttList from "src/sections/video/upload-vtt-list";
import { addCourse } from "src/services/api/course-api";
import readMediaUrl from "src/utils/read-media-url";
import * as Yup from "yup";
const Page = () => {
  const [dialogState, setDialogState] = useState({
    open: false
  });
   const router = useRouter();
  const [lessons, setLessons] = useState([]); 
   const { enqueueSnackbar } = useSnackbar();
  const handleAddLesson = (newLesson) => {
    console.log(newLesson);
    
    setLessons((prevLessons) => {
      const updatedLessons = [...prevLessons, newLesson];
      formik.setFieldValue("lessons", updatedLessons);
      return updatedLessons;
    });
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
      price: 0,
      level: 0,
      description: "",
      targets: [],
      topics: [],
      requirements: [],
      lessons: lessons,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Vui lòng nhập tiêu đề"),
      subtitle: Yup.string().required("Vui lòng nhập phụ đề"),
      price: Yup.number().required("Vui lòng nhập giá của khóa học"),
      level: Yup.number().required("Vui lòng chọn cấp độ"),
      description: Yup.string().required("Vui lòng nhập mô tả khóa học"),
      targets: Yup.array()
        .min(1, "Nhập tối thiểu 1 mục tiêu")
        .of(Yup.string())
        .required("Vui lòng nhập mục tiêu"),
      topics: Yup.array()
        .min(1, "Nhập tối thiểu 1 chủ đề")
        .of(Yup.string())
        .required("Vui lòng nhập chủ đề"),
      requirements: Yup.array()
        .min(1, "Nhập tối thiểu 1 yêu cầu")
        .of(Yup.string())
        .required("Vui lòng nhập các yêu cầu về khóa học"),
      // lessons: Yup.array()
      //   .min(1, "Nhập tối thiểu 1 bài tập")
      //   .of(Yup.string())
      //   .required("Vui lòng nhập bài tập về khóa học"),
    }),

    onSubmit: async (values, helpers) => {
      console.log(values);

      try {
        await addCourse(values);
        router.push("/teacher/courses");
        enqueueSnackbar(`Tạo video thành công`, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        console.log(err);
        if (err === "Invalid body") {
          enqueueSnackbar(`Dữ liệu không được để trống`, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        } else if (err === "Course must have at least one target") {
          enqueueSnackbar(`Khóa học phải có ít nhất một mục tiêu`, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        } else if ((err = "Course lessons must have at least one item")) {
          enqueueSnackbar(`Bài học phải có ít nhất một bài tập`, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        } else {
          enqueueSnackbar(err, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        }
      }
    },
  });
  return (
    <>
      <Head>
        <title>Đăng tải khóa học</title>
      </Head>
      <form onSubmit={formik.handleSubmit}>
        <Box component="main" sx={{ flexGrow: 1, paddingBottom: "30px" }}>
          <Container maxWidth="lg">
            <Stack spacing={3}>
              <Typography variant="h4">Đăng tải khóa học</Typography>
              <Stack direction="row" spacing="15px">
                <Box sx={{ width: "50%" }}>
                  <Stack sx={{ width: "100%" }} direction="row" spacing="15px">
                    <Stack direction="column" spacing="15px" width="40%">
                      <Box sx={{ width: "100%" }}>
                        <TextField
                          error={!!(formik.touched.title && formik.errors.title)}
                          fullWidth
                          helperText={formik.touched.title && formik.errors.title}
                          label="Tên khóa học"
                          id="title"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.title}
                        />
                      </Box>
                      <Box sx={{ width: "100%" }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Chọn cấp độ</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="level"
                            fullWidth
                            onChange={(e) => {
                              formik.setFieldValue("level", e.target.value);
                            }}
                            value={formik.values.level}
                            error={formik.errors.level && formik.touched.level}
                            helperText={formik.errors.level}
                            isSearchable
                            label="Chọn cấp độ"
                          >
                            <MenuItem value={1}>HSK 1</MenuItem>
                            <MenuItem value={2}>HSK 2</MenuItem>
                            <MenuItem value={3}>HSK 3</MenuItem>
                            <MenuItem value={4}>HSK 4</MenuItem>
                            <MenuItem value={5}>HSK 5</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Stack>
                    <Stack direction="column" spacing="15px" width="40%">
                      <Box sx={{ width: "100%" }}>
                        <TextField
                          error={!!(formik.touched.subtitle && formik.errors.subtitle)}
                          fullWidth
                          helperText={formik.touched.subtitle && formik.errors.subtitle}
                          label="Phụ đề"
                          id="subtitle"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.subtitle}
                        />
                      </Box>
                      <Box sx={{ width: "100%" }}>
                        <TextField
                          error={!!(formik.touched.price && formik.errors.price)}
                          fullWidth
                          helperText={formik.touched.price && formik.errors.price}
                          label="Giá"
                          id="price"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.price}
                        />
                      </Box>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing="15px">
                    <Box sx={{ width: "82%" }}>
                      <Typography variant="caption">
                        Chọn chủ đề cho video để người dùng có thể tìm kiếm nhanh chóng và dễ dàng
                        hơn.
                      </Typography>
                      <MuiChipsInput
                        id="topics"
                        onBlur={formik.handleBlur}
                        value={formik.values.topics}
                        error={formik.errors.topics && formik.touched.topics}
                        helperText={formik.errors.topics}
                        onChange={(options) => {
                          formik.setFieldValue("topics", options);
                        }}
                        placeholder="Nhập chủ đề"
                        sx={{
                          minHeight: "40px",
                          mt: "10px",
                          width: "100%",
                        }}
                      />
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing="15px">
                    <Box sx={{ width: "82%" }}>
                      <MuiChipsInput
                        id="targets"
                        onBlur={formik.handleBlur}
                        value={formik.values.targets}
                        error={!!(formik.touched.targets && formik.errors.targets)}
                        helperText={formik.touched.targets && formik.errors.targets}
                        onChange={(options) => {
                          formik.setFieldValue("targets", options);
                        }}
                        placeholder="Trọng tâm khóa học"
                        sx={{
                          minHeight: "40px",
                          mt: "10px",
                          width: "100%",
                        }}
                      />
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing="15px">
                    <Box sx={{ width: "82%" }}>
                      <MuiChipsInput
                        id="requirements"
                        onBlur={formik.handleBlur}
                        value={formik.values.requirements}
                        error={!!(formik.touched.requirements && formik.errors.requirements)}
                        helperText={formik.touched.requirements && formik.errors.requirements}
                        onChange={(options) => {
                          formik.setFieldValue("requirements", options);
                        }}
                        placeholder="Yêu cầu khóa học"
                        sx={{
                          minHeight: "40px",
                          mt: "10px",
                          width: "100%",
                        }}
                      />
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing="15px">
                    <TextField
                      style={{ marginTop: "20px", width: "82%" }}
                      sx={{ marginTop: "20px" }}
                      required
                      multiline
                      minRows={5}
                      id="description"
                      label="Mô tả khóa học"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                    />
                  </Stack>
                </Box>
                {/* <div>
                  <UploadVideoFrame
                    onUploadedVideo={(data) => {
                      console.log(data);
                      formik.setFieldValue("videoUrl", data.videoUrl);
                      formik.setFieldValue("duration", data.duration);
                      formik.setFieldValue("mimetype", data.mimetype);
                    }}
                  />
                </div> */}
                <Box sx={{ width: "50%" }}>
                  <Typography variant="h5">Đăng tải bài học</Typography>
                  <Box margin="10px">
                    <Stack spacing={2}>
                      {lessons.map((lesson, index) => (
                        <Box
                          key={index}
                          sx={{
                            padding: 2,
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={readMediaUrl(lesson.thumbnail)}
                            alt={lesson.title}
                            style={{
                              width: "100px",
                              height: "auto",
                              marginRight: "16px",
                              borderRadius: "4px",
                            }}
                          />
                          <Box>
                            <Typography variant="h6">{lesson.title}</Typography>
                            
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                    <Button
                      sx={{ height: "50px" }}
                      fullWidth
                      style={{ marginTop: "20px" }}
                      variant="contained"
                      onClick={() =>
                        setDialogState({
                          open: true,
                        })
                      }
                    >
                      Thêm bài học
                    </Button>
                  </Box>
                </Box>
              </Stack>
            </Stack>

            <Button
              type="submit"
              sx={{ height: "50px" }}
              fullWidth
              style={{ marginTop: "20px" }}
              variant="contained"
            >
              Tạo khóa học
            </Button>
          </Container>
        </Box>
      </form>
      <AddLesson
        open={dialogState.open}
        handleClose={() =>
          setDialogState({
            open: false,
          })
        }
        onAdded={handleAddLesson}
      />
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
