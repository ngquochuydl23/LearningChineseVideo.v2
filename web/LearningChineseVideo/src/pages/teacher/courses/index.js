import {
  Box,
  CircularProgress,
  Container,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import GridTeacherCourseCard from "src/components/teacher/grid-course-teacher-card";
import { Layout as TeacherLayout } from "src/layouts/teacher-layout/layout";
import UpdateCourseDialog from "src/sections/course/update-course-dialog";
import { deleteCourse, getCourses } from "src/services/api/course-api";
const Page = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const fetchCourses = () => {
    setLoading(true);
    getCourses()
      .then((res) => {
        console.log(res);

        setCourses(res);
      })
      .catch((err) => console.log(e))
      .finally(() => setLoading(false));
  };
  const deleteByCourse = (id) => {
    deleteCourse(id)
      .then(() => {
        console.log(`Course ${id} is successfully deleted.`);
        fetchCourses();
        enqueueSnackbar(`Đã xóa thành công khóa học ${id}`, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(`Xóa khóa học thất bại`, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      });
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
      <Head>
        <title>Danh sách khóa học</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Stack spacing={3} paddingBottom="30px">
            <Typography variant="h4">Danh sách khóa học ({courses.length})</Typography>
            {loading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              courses.map((course, index) => (
                <GridTeacherCourseCard
                  key={index}
                  {...course}
                  onDeleteItem={deleteByCourse}
                  onClick={() => setEditingCourse(course)}
                />
              ))
            )}
          </Stack>
        </Container>
        <UpdateCourseDialog
          course={editingCourse}
          onUpdated={fetchCourses}
          handleClose={() => {
            setEditingCourse();
          }}
          open={Boolean(editingCourse)}
        />
      </Box>
    </>
  );
};
Page.getLayout = (page) => <TeacherLayout>{page}</TeacherLayout>;

export default Page;
