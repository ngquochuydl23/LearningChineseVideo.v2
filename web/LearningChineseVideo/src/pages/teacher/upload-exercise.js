import {
  Box,
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
import Head from "next/head";
import { useEffect, useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/teacher-layout/layout";
import QuestionAudio from "src/sections/exercise/audio-question";
import FillInBlank from "src/sections/exercise/fill-in-blank";
import QuestionGramma from "src/sections/exercise/gramma-question";
import QuestionImage from "src/sections/exercise/question-image";
import QuestionSentence from "src/sections/exercise/sentence-question";
import QuestionSynonym from "src/sections/exercise/synonym-question";
import { getCourseById, getCourses } from "src/services/api/course-api";
const Page = () => {
  const [type, setType] = useState(1);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [idLesson, setIdLesson] = useState();
  useEffect(() => {
    setLoading(true);
    getCourses()
      .then((res) => {
        console.log(res);

        setCourses(res);
      })
      .catch((err) => console.log(e))
      .finally(() => setLoading(false));
  }, []);
  const selectCourse = (id) => {
    getCourseById(id).then((res) => {
      setLessons(res[0].lessons);
    });
  };

  return (
    <>
      <Head>
        <title>Đăng tải bài tập</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, paddingBottom: "30px" }}>
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Typography variant="h4">Đăng tải bài tập</Typography>
          </Stack>
          <Stack
            sx={{ width: "100%", marginTop: "10px" }}
            spacing={4}
            direction="row"
            justifyContent="space-between"
          >
            <FormControl sx={{ width: "30%" }}>
              <InputLabel id="demo-simple-select-label">Chọn khóa học</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="course"
                fullWidth
                onChange={(e) => {
                  selectCourse(e.target.value);
                }}
                // value={formik.values.level}
                isSearchable
                label="Chọn dạng khóa học"
              >
                {courses.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "30%" }}>
              <InputLabel id="demo-simple-select-label">Chọn dạng bài học</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="type"
                fullWidth
                onChange={(e) => {
                  setIdLesson(e.target.value);
                }}
                // value={formik.values.level}
                // error={formik.errors.level && formik.touched.level}
                // helperText={formik.errors.level}
                isSearchable
                label="Chọn dạng bài học"
              >
                {lessons.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "30%" }}>
              <InputLabel id="demo-simple-select-label">Chọn bài tập</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="type"
                fullWidth
                onChange={(e) => {
                  setType(e.target.value);
                  //console.log(e.target.value);
                }}
                // value={formik.values.level}
                // error={formik.errors.level && formik.touched.level}
                // helperText={formik.errors.level}
                isSearchable
                label="Chọn dạng bài tập"
              >
                <MenuItem value={1}>Điền vào chổ trống</MenuItem>
                <MenuItem value={2}>Câu hỏi hình ảnh</MenuItem>
                <MenuItem value={3}>Câu hỏi Audio</MenuItem>
                <MenuItem value={4}>Sắp xếp câu</MenuItem>
                <MenuItem value={5}>Từ trái nghĩa</MenuItem>
                <MenuItem value={6}>Ngữ pháp</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="column" spacing="15px" width="100%">
            <Box sx={{ width: "100%", padding: "20px" }}>
              {type === 1 ? (
                <FillInBlank type={type} setType={setType} lessonId={idLesson} />
              ) : type === 2 ? (
                <QuestionImage type={type} setType={setType} lessonId={idLesson} />
              ) : type === 3 ? (
                <QuestionAudio type={type} setType={setType} lessonId={idLesson} />
              ) : type === 4 ? (
                <QuestionSentence type={type} setType={setType} lessonId={idLesson} />
              ) : type === 5 ? (
                <QuestionSynonym type={type} setType={setType} lessonId={idLesson} />
              ) : (
                <QuestionGramma type={type} setType={setType} lessonId={idLesson} />
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
