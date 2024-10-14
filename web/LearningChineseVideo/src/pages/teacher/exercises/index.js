import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  Unstable_Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import GridTeacherEX2 from "src/components/teacher/grid-excercise-2";
import GridTeacherEX3 from "src/components/teacher/grid-excercise-3";
import GridTeacherEX4 from "src/components/teacher/grid-excercise-4";
import { Layout as TeacherLayout } from "src/layouts/teacher-layout/layout";
import UpdateCourseDialog from "src/sections/course/update-course-dialog";
import { getCourseById, getCourses } from "src/services/api/course-api";
import { deleteExFromCourse, getExcerciseByLessonId } from "src/services/api/exercise-api";
const Page = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [idLesson, setIdLesson] = useState();
  const [excercises, setExcercises] = useState([]);
  useEffect(() => {
    getCourses()
      .then((res) => {
        console.log(res);

        setCourses(res);
      })
      .catch((err) => console.log(e))
      .finally(() => setLoading(false));
  }, []);
  const selectCourse = (id) => {
    setLoading(true);
    getCourseById(id)
      .then((res) => {
        setLessons(res[0].lessons);
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar("Failed to load lessons", { variant: "error" });
      })
      .finally(() => setLoading(false));
  };
  const selectLesson = (id) => {
    setLoading(true);
    getExcerciseByLessonId(id)
      .then((res) => {
        setExcercises(res);
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar("Failed to load lessons", { variant: "error" });
      })
      .finally(() => setLoading(false));
  };
  const deleteEx = (id, lessonId) => {
    deleteExFromCourse(lessonId, id)
      .then(() => {
        window.location.reload();
        enqueueSnackbar(`Đã xóa thành công bài tập ${id}`, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(`Xóa bài tập thất bại`, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      });
  };
  return (
    <>
      <Head>
        <title>Danh sách bài tập</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Stack spacing={3} paddingBottom="30px">
            <Typography variant="h4">Danh sách bài tập</Typography>
          </Stack>
          <Stack
            sx={{ width: "100%", marginTop: "10px" }}
            spacing={4}
            direction="row"
            justifyContent="space-between"
          >
            <FormControl sx={{ width: "50%" }}>
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
            <FormControl sx={{ width: "50%" }}>
              <InputLabel id="demo-simple-select-label">Chọn dạng bài học</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="type"
                fullWidth
                onChange={(e) => {
                  // setIdLesson(e.target.value);
                  selectLesson(e.target.value);
                }}
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
          </Stack>
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            excercises.map((excercise, index) =>
              excercise?.type === "sentence-order-question" ? (
                <GridTeacherEX2 key={index} {...excercise} onDeleteItem={deleteEx} />
              ) : excercise?.type === "image-question" ? (
                <GridTeacherEX4 key={index} {...excercise} onDeleteItem={deleteEx} />
              ) : excercise?.type === "audio-question" ? (
                <GridTeacherEX4 key={index} {...excercise} onDeleteItem={deleteEx} />
              ) : (
                <GridTeacherEX3 key={index} {...excercise} onDeleteItem={deleteEx} />
              )
            )
          )}
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <TeacherLayout>{page}</TeacherLayout>;

export default Page;
