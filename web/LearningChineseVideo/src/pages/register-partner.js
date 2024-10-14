import { Box, Button, Link, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useFormik } from "formik";
import moment from "moment";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertDialog from "src/components/alert-dialog";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { signUpTeacher } from "src/services/api/user-api";
import * as Yup from "yup";
const Page = () => {
  const router = useRouter();
  const auth = useAuth();

  const [error, setError] = useState(undefined);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      gender: 0,
      birthday: "",
      identification: "",
      experience: "",
      placeWork: "",
      bio: "",
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string().trim().required("Vui lòng nhập họ tên"),
      phoneNumber: Yup.string()
        .trim()
        .length(10, "Vui lòng nhập đủ 10 kí tự")
        .required("Vui lòng nhập số điện thoại"),
      email: Yup.string()
        .trim()
        .email("Vui lòng nhập đúng định dạng")
        .required("Vui lòng nhập địa chỉ chi tiết"),
      gender: Yup.number().oneOf([0, 1]).required("Vui lòng chọn giới tính"),
      birthday: Yup.string().trim().required("Vui lòng nhập ngày sinh"),
      identification: Yup.string().trim().required("Vui lòng nhập căn cước công dân"),
      experience: Yup.string().trim().required("Vui lòng nhập kinh nghiệm dạy học của bạn"),
      placeWork: Yup.string().trim().required("Vui lòng nhập nơi làm việc"),
      bio: Yup.string().trim().required("Vui lòng nhập miêu tả về bản thân"),
    }),
    onSubmit: async (values) => {
      values.birthday = moment(values.birthday[`$d`]).format();

      signUpTeacher(values)
        .then(async (res) => {
          await auth.signIn(values.phoneNumber, values.password);
          router.push("/teacher");
        })
        .catch((err) => {
          console.log(err);
          if (err === "Email or phone number or identification is already used") {
            setError({
              title: "Đăng ký không thành công!",
              content: "Email hoặc số điện thoại hoặc căn cước công dân đã được sử dụng.",
            });
          } else {
            setError({
              title: "Đăng ký không thành công!",
              content: err.toString(),
            });
          }
        });
    },
  });

  return (
    <>
      <Head>
        <title>Đăng ký cộng tác viên</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Đăng ký cộng tác viên</Typography>
              <Typography color="text.secondary" variant="body2">
                Bạn đã có tài khoản? &nbsp;
                <Link component={NextLink} href="/auth/login" underline="hover" variant="subtitle2">
                  Đăng nhập
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
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
                <TextField
                  error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                  fullWidth
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  label="Số điện thoại"
                  id="phoneNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Mật khẩu"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    fullWidth
                    id="birthday"
                    renderInput={(props) => (
                      <TextField {...props} fullWidth sx={{ marginTop: "20px" }} />
                    )}
                    onChange={(value) => {
                      formik.setFieldValue("birthday", value);
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.errors.birthday && formik.touched.birthday}
                    helperText={formik.errors.birthday}
                    value={dayjs(formik.values.birthday) || null}
                    format="DD/MM/YYYY"
                    label="Ngày sinh"
                  />
                </LocalizationProvider>
                <TextField
                  error={!!(formik.touched.identification && formik.errors.identification)}
                  fullWidth
                  helperText={formik.touched.identification && formik.errors.identification}
                  label="Căn cước công dân"
                  id="identification"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.identification}
                />
                <TextField
                  error={!!(formik.touched.experience && formik.errors.experience)}
                  fullWidth
                  helperText={formik.touched.experience && formik.errors.experience}
                  label="Kinh nghiệm dạy học"
                  id="experience"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.experience}
                />
                <TextField
                  error={!!(formik.touched.placeWork && formik.errors.placeWork)}
                  fullWidth
                  helperText={formik.touched.placeWork && formik.errors.placeWork}
                  label="Nơi làm việc"
                  id="placeWork"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.placeWork}
                />
                <TextField
                  error={!!(formik.touched.bio && formik.errors.bio)}
                  fullWidth
                  helperText={formik.touched.bio && formik.errors.bio}
                  label="Bio"
                  id="bio"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.bio}
                  multiline
                  rows={4}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3, borderRadius: "10px" }}
                type="submit"
                variant="contained"
              >
                Đăng ký cộng tác viên
              </Button>
            </form>
          </div>
        </Box>
      </Box>
      <AlertDialog
        title={error ? error.title : undefined}
        content={error ? error.content : undefined}
        open={Boolean(error)}
        rightTxt="OK"
        handleClose={() => setError(null)}
        onRightClick={() => setError(null)}
      />
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
