import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Unstable_Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Chart } from "chart.js/auto";
import { set } from "lodash";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import ChartAdmin from "src/components/chartAdmin";
import { Scrollbar } from "src/components/scrollbar";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AdminLayout } from "src/layouts/admin-layout/layout";
import UpdateCourseDialog from "src/sections/course/update-course-dialog";
import {
  approveTeacher,
  approveUser,
  getAllAdmins,
  getAllTeachers,
  getAllUserNotAdmin,
  getAllUsers,
  rejectAdmin,
  rejectUser,
} from "src/services/api/admin-api";
import { formatMoney } from "src/utils/formatMoney";
const Page = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { getUser, user } = useAuth();
  const [selectedRole, setSelectedRole] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userSearch, setUserSearch] = useState([]);
  // Hàm xử lý sự kiện khi giá trị trong Select thay đổi
  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);

    if (role === "All") {
      setUsers(allUsers); // Hiển thị tất cả người dùng nếu không chọn vai trò nào
      setUserSearch(allUsers);
    } else if (role === "User") {
      getAllUserNotAdmin().then((res) => {
        setUsers(res);
        setUserSearch(res);
      });
    } else if (role === "Teacher") {
      getAllTeachers().then((res) => {
        setUsers(res);
        setUserSearch(res);
      });
    } else if (role === "Administrator") {
      getAllAdmins().then((res) => {
        setUsers(res);
        setUserSearch(res);
      });
    } else if (role === "Teacher-approved") {
      getAllTeachers().then((res) => {
        setUsers(res.filter((user) => user.approve === "ACCEPTED"));
        setUserSearch(res.filter((user) => user.approve === "ACCEPTED"));
      });
    } else if (role === "Teacher-not-approved") {
      getAllTeachers().then((res) => {
        setUsers(res.filter((user) => user.approve === "QUEUE"));
        setUserSearch(res.filter((user) => user.approve === "QUEUE"));
      });
    } else if (role === "Teacher-rejected") {
      getAllTeachers().then((res) => {
        setUsers(res.filter((user) => user.approve === "REJECTED"));
        setUserSearch(res.filter((user) => user.approve === "REJECTED"));
      });
    } else if (role === "User-rejected") {
      getAllUserNotAdmin().then((res) => {
        setUsers(res.filter((user) => user.approveAdmin === "REJECTED"));
        setUserSearch(res.filter((user) => user.approveAdmin === "REJECTED"));
      });
    } else if (role === "User-queue") {
      getAllUserNotAdmin().then((res) => {
        setUsers(res.filter((user) => user.approveAdmin === "QUEUE"));
        setUserSearch(res.filter((user) => user.approveAdmin === "QUEUE"));
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res);
      setAllUsers(res);
      setUserSearch(res);
    });
  }, [user]);
  const handleSearchChange = (event) => {
    const dataSearch = event.target.value;
    setSearchTerm(dataSearch);
    const filtered = users.filter((user) =>
      user.fullName.toLowerCase().includes(dataSearch.toLowerCase())
    );

    setUserSearch(filtered);
  };
  const handleApprove = (id) => {
    approveTeacher(id)
      .then((res) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === res._id ? { ...user, approve: "ACCEPTED" } : user))
        );
        enqueueSnackbar(`Duyệt giáo viên thành công`, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      })
      .catch((error) => {
        enqueueSnackbar(`Duyệt giáo viên thất bại`, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      });
  };
  const handleApproveUser = (id) => {
    approveUser(id)
      .then((res) => {
        // setUsers((prevUsers) =>
        //   prevUsers.map((user) => (user._id === res._id ? { ...user, approveAdmin: true } : user))
        // );
        enqueueSnackbar(`Duyệt admin thành công`, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        window.location.reload();
      })
      .catch((error) => {
        enqueueSnackbar(`Duyệt admin thất bại`, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      });
  };
  const handleReject = (id) => {
    rejectUser(id)
      .then((res) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === res._id ? { ...user, approve: "REJECTED" } : user))
        );
        enqueueSnackbar(`Từ chối giáo viên thành công`, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        window.location.reload();
      })
      .catch((error) => {
        enqueueSnackbar(`Từ chối giáo viên thất bại`, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      });
  };
  const handleRejectUser = (id) => {
    rejectAdmin(id)
      .then((res) => {
        enqueueSnackbar(`Từ chối người dùng thành công`, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        window.location.reload();
      })
      .catch((error) => {
        enqueueSnackbar(`Từ chối người dùng thất bại`, {
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
        <title>Quản lý người dùng</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Stack
            spacing={3}
            paddingBottom="30px"
            display="flex"
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="h4">Quản lý người dùng</Typography>

            <FormControl sx={{ width: "30%" }}>
              <InputLabel id="demo-simple-select-label">Chọn vai trò</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="role"
                fullWidth
                value={selectedRole}
                onChange={handleRoleChange}
                isSearchable
                label="Vai trò"
              >
                <MenuItem value="All">Tất cả</MenuItem>
                <MenuItem value="Administrator">Administrator</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Teacher">Teacher</MenuItem>
                <MenuItem value="Teacher-not-approved">Teacher chưa duyệt</MenuItem>
                <MenuItem value="Teacher-approved">Teacher đã duyệt</MenuItem>
                <MenuItem value="Teacher-rejected">Teacher đã từ chối</MenuItem>
                <MenuItem value="User-queue">User chờ duyệt</MenuItem>
                <MenuItem value="User-rejected">User bị từ chối</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <TextField
            fullWidth
            label="Tìm kiếm người dùng"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ my: "20px", fontSize: "30px", fontWeight: "800" }}
          />
          <Stack
            sx={{ width: "100%", marginTop: "10px" }}
            display="flex"
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              sx={{ width: "100%", marginTop: "10px" }}
              display="flex"
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Scrollbar>
                <Box sx={{ minWidth: 1200 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">#</TableCell>
                        <TableCell>Tên người dùng</TableCell>
                        <TableCell>Số điện thoại</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Giới tính</TableCell>
                        {(selectedRole === 'Teacher'
                          || selectedRole === 'Teacher-not-approved'
                          || selectedRole === 'Teacher-approved'
                          || selectedRole === 'Teacher-rejected')
                          ? <>
                            <TableCell>Tiểu sử</TableCell>
                            <TableCell>Kinh nghiệm</TableCell>
                          </>
                          : <>
                            <TableCell>Thời gian tạo</TableCell>
                            <TableCell>Vai trò</TableCell>
                          </>
                        }
                        <TableCell align="center">Chức năng</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userSearch.map((item, index) => {
                        return (
                          <TableRow hover sx={{ textDecoration: "none" }} key={item.id}>
                            <TableCell padding="checkbox">{index + 1}</TableCell>
                            <TableCell>{item.fullName}</TableCell>
                            <TableCell>{item.phoneNumber}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.gender === 0 ? "Nam" : "Nữ"}</TableCell>
                            {(selectedRole === 'Teacher'
                              || selectedRole === 'Teacher-not-approved'
                              || selectedRole === 'Teacher-approved'
                              || selectedRole === 'Teacher-rejected')
                              ? <>
                                <TableCell>{item.bio}</TableCell>
                                <TableCell>{item.experience}</TableCell>
                              </>
                              :
                              <>
                                <TableCell>{formatDate(item.createdAt)}</TableCell>
                                <TableCell>{item.role}</TableCell>
                              </>
                            }
                            <TableCell>
                              {item.role === "Teacher" && item.approve === "QUEUE" ? (
                                <Stack justifyContent="center" gap={1} direction="row">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleApprove(item._id)}
                                    sx={{ fontSize: "12px" }}
                                  >
                                    Duyệt
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleReject(item._id)}
                                    sx={{ fontSize: "12px" }}
                                  >
                                    Từ chối
                                  </Button>
                                </Stack>
                              ) : item.role === "User" && item.approveAdmin === "QUEUE" ? (
                                <Stack justifyContent="center" gap={1} direction="row">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleApproveUser(item._id)}
                                    sx={{ fontSize: "12px" }}
                                  >
                                    Duyệt
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ fontSize: "12px" }}
                                    onClick={() => handleRejectUser(item._id)}
                                  >
                                    Từ chối
                                  </Button>
                                </Stack>
                              ) : item.role === "Teacher" && item.approve === "REJECTED" ? (
                                "Đã từ chối"
                              ) : item.role === "User" && item.approveAdmin === "REJECTED" ? (
                                "Đã từ chối"
                              ) : item.role === "User" && item.approveAdmin === "" ? (
                                ""
                              ) : (
                                "Đã duyệt"
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Box>
              </Scrollbar>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Page;
