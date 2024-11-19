import {
  Box,
  Button,
  Container,
  Unstable_Grid2 as Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useFormik } from "formik";
import _ from "lodash";
import moment from "moment";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import CustomAvatar from "src/components/custom-avt";
import { useAuth } from "src/hooks/use-auth";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { rejectAdmin, requestAdmin } from "src/services/api/admin-api";
import { uploadFile } from "src/services/api/upload-api";
import { editUserInfo } from "src/services/api/user-api";
import * as Yup from "yup";

const Page = () => {
  const { getUser, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      gender: 0,
      birthday: undefined,
      avatar: undefined,
    },
    onSubmit: (values) => {
      editUserInfo(values)
        .then((res) => {
          enqueueSnackbar(`Cập nhật hồ sơ thành công`, {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar(`Lỗi, cập nhật hồ sơ không thành công`, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        });
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues(user);
    }
  }, []);
  const handleRequestAdmin = () => {
    requestAdmin(user._id)
      .then((res) => {
        enqueueSnackbar(`Gửi yêu cầu làm admin thành công`, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(`Gửi yêu cầu thất bại`, {
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
        <title>Tài khoản</title>
      </Head>
      <Box>
        <Container maxWidth="sm">
          <Stack alignItems="center" direction="column" spacing="25px">
            <div className="relative rounded-full overflow-hidden flex">
              <CustomAvatar
                src={formik.values.avatar}
                loading={loading}
                fullname={formik.values.fullName}
                onClick={() => document.getElementById("pick-image").click()}
                sx={{
                  height: "180px",
                  width: "180px",
                }}
              />
              <input
                onChange={(event) => {
                  var file = event.target.files[0];
                  setLoading(true);
                  uploadFile(file)
                    .then(({ medias }) => {
                      formik.setFieldValue("avatar", medias[0].url);
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }}
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                id="pick-image"
              />
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6"
            >
              <TextField
                fullWidth
                id="fullName"
                label="Họ và tên"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.fullName && formik.touched.fullName}
                helperText={formik.errors.fullName}
                value={formik.values.fullName}
              />
              <TextField
                fullWidth
                sx={{ marginTop: "20px" }}
                id="email"
                label="Địa chỉ email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.email && formik.touched.email}
                helperText={formik.errors.email}
                value={formik.values.email}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  fullWidth
                  id="birthday"
                  renderInput={(props) => (
                    <TextField {...props} fullWidth sx={{ marginTop: "20px" }} />
                  )}
                  onChange={(value) => {
                    formik.setFieldValue("birthday", moment(value[`$d`]).format());
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.errors.birthday && formik.touched.birthday}
                  helperText={formik.errors.birthday}
                  value={dayjs(formik.values.birthday)}
                  format="DD/MM/YYYY"
                  label="Ngày sinh"
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                select
                sx={{ marginTop: "20px" }}
                onChange={(e) => {
                  formik.setFieldValue("gender", e.target.value);
                }}
                onBlur={formik.handleBlur}
                error={formik.errors.gender && formik.touched.gender}
                helperText={formik.errors.gender}
                value={formik.values.gender}
                id="gender"
                label="Giới tính"
              >
                <MenuItem key={0} value={0}>
                  Nữ
                </MenuItem>
                <MenuItem key={1} value={1}>
                  Nam
                </MenuItem>
              </TextField>
              <TextField
                required
                fullWidth
                sx={{ marginTop: "20px" }}
                id="phoneNumber"
                label="Số điện thoại"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.phoneNumber && formik.touched.phoneNumber}
                helperText={formik.errors.phoneNumber}
                value={formik.values.phoneNumber}
              />
              <Button
                disabled={formik.values === formik.initialValues}
                type="submit"
                fullWidth
                sx={{ height: "50px", mt: "30px" }}
                variant="contained"
              >
                Lưu
              </Button>
            </form>
            {user?.role === "User" && user.approveAdmin === "" && (
              <Stack width="100%" sx={{ mt: "20px", mb: "30px" }}>
                <Button
                  // disabled
                  type="button"
                  fullWidth
                  sx={{ height: "50px", mb: "30px" }}
                  variant="contained"
                  onClick={() => {
                    handleRequestAdmin();
                  }}
                >
                  Gửi yêu cầu làm admin
                </Button>
              </Stack>
            )}
            {user?.role === "User" && user.approveAdmin === "QUEUE" && (
              <Stack width="100%" sx={{ mt: "20px", mb: "30px" }}>
                <span style={{ fontSize: "15px", color: "black" }}>
                  * Đã gửi yêu cầu, chờ admin xác nhận
                </span>
                <Button
                  disabled
                  type="button"
                  fullWidth
                  sx={{ height: "50px", mb: "30px" }}
                  variant="contained"
                >
                  Chờ xác nhận ...
                </Button>
              </Stack>
            )}
            {user?.role === "User" && user.approveAdmin === "REJECTED" && (
              <Stack width="100%" sx={{ mt: "20px", mb: "30px" }}>
                <span style={{ fontSize: "15px", color: "red" }}>* Yêu cầu bị từ chối</span>
                <Button
                  type="button"
                  fullWidth
                  sx={{ height: "50px", mb: "30px" }}
                  variant="contained"
                  onClick={() => {
                    handleRequestAdmin();
                  }}
                >
                  Gửi lại
                </Button>
              </Stack>
            )}
            {user?.role === "Administrator" && (
              <Stack width="100%" sx={{ mt: "20px", mb: "30px" }}>
                <span style={{ fontSize: "15px", color: "green" }}>* Đã là Admin</span>
                <Button
                  disabled
                  type="button"
                  fullWidth
                  sx={{ height: "50px", mb: "30px" }}
                  variant="contained"
                >
                  Đã được chấp nhận làm Admin
                </Button>
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
