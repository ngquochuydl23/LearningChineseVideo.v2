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
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import GridAdminCourseCard from "src/components/admin/grid-course-admin-card";
import { Layout as AdminLayout } from "src/layouts/admin-layout/layout";
import UpdateCourseDialog from "src/sections/course/update-course-dialog";
import { approveCourse, deleteCourse, getCourses, rejectCourse } from "src/services/api/course-api";
const Page = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseSearch, setCourseSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const fetchCourses = () => {
    setLoading(true);
    getCourses()
      .then((res) => {
        setCourses(res);
        setCourseSearch(res);
      })
      .catch((err) => console.log(e))
      .finally(() => setLoading(false));
  };
  const approveByCourse = (id) => {
    approveCourse(id)
      .then(() => {
        fetchCourses();
        enqueueSnackbar(`Đã duyệt thành công khóa học ${id}`, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      })
      .catch((err) => {
        if (err === "Course not found") {
          enqueueSnackbar(`Khóa học không tồn tại`, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        } else {
          enqueueSnackbar(`Duyệt khóa học thất bại`, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        }
      });
  };
  const rejectByCourse = (id) => {
    rejectCourse(id)
      .then(() => {
        fetchCourses();
        enqueueSnackbar(`Đã từ chối thành công khóa học ${id}`, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      })
      .catch((err) => {
        if (err === "Course not found") {
          enqueueSnackbar(`Khóa học không tồn tại`, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        } else {
          enqueueSnackbar(`Từ chối khóa học thất bại`, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        }
      });
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  const handleSearchChange = (event) => {
    const dataSearch = event.target.value;
    setSearchTerm(dataSearch);
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(dataSearch.toLowerCase())
    );

    setCourseSearch(filtered);
  };
  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
    if (role === "ALL") {
      fetchCourses();
    } else if (role === "QUEUE") {
      setLoading(true);
      getCourses()
        .then((res) => {
          const filteredCourses = res.filter((course) => course.status === "QUEUE");
          setCourses(filteredCourses);
          setCourseSearch(filteredCourses);
        })
        .catch((err) => console.log(e))
        .finally(() => setLoading(false));
    } else if (role === "ACCEPTED") {
      setLoading(true);
      getCourses()
        .then((res) => {
          const filteredCourses = res.filter((course) => course.status === "ACCEPTED");
          setCourses(filteredCourses);
          setCourseSearch(filteredCourses);
        })
        .catch((err) => console.log(e))
        .finally(() => setLoading(false));
    } else if (role === "REJECTED") {
      setLoading(true);
      getCourses()
        .then((res) => {
          const filteredCourses = res.filter((course) => course.status === "REJECTED");
          setCourses(filteredCourses);
          setCourseSearch(filteredCourses);
        })
        .catch((err) => console.log(e))
        .finally(() => setLoading(false));
    }
  };
  return (
    <>
      <Head>
        <title>Danh sách khóa học</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Stack spacing={3} paddingBottom="30px">
            <Stack justifyContent="space-between" direction="row">
              <Typography variant="h4">Danh sách khóa học ({courses.length})</Typography>
              <FormControl sx={{ width: "30%" }}>
                <InputLabel id="demo-simple-select-label">Chọn trạng thái khóa học</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="role"
                  fullWidth
                  value={selectedRole}
                  onChange={handleRoleChange}
                  isSearchable
                  label="Khóa học"
                >
                  <MenuItem value="ALL">Tất cả</MenuItem>
                  <MenuItem value="QUEUE">Chờ duyệt</MenuItem>
                  <MenuItem value="ACCEPTED">Đã duyệt</MenuItem>
                  <MenuItem value="REJECTED">Đã từ chối</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <TextField
              fullWidth
              label="Tìm kiếm khóa học"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ my: "20px", fontSize: "30px", fontWeight: "800" }}
            />
            {loading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              courseSearch.map((course, index) => (
                <GridAdminCourseCard
                  key={index}
                  {...course}
                  onApproveItem={approveByCourse}
                  onRejectItem={rejectByCourse}
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
Page.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Page;
