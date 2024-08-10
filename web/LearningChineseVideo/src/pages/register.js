import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Link,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { signUp } from 'src/services/api/user-api';
import AlertDialog from 'src/components/alert-dialog';
import { useState } from 'react';



const Page = () => {
    const router = useRouter();
    const auth = useAuth();

    const [error, setError] = useState(undefined);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            gender: 0,
            level: 0
        },
        validationSchema: Yup.object().shape({
            fullName: Yup.string()
                .trim()
                .required('Vui lòng nhập họ tên'),
            phoneNumber: Yup.string()
                .trim()
                .length(10, 'Vui lòng nhập đủ 10 kí tự')
                .required('Vui lòng nhập số điện thoại'),
            email: Yup.string()
                .trim()
                .email('Vui lòng nhập đúng định dạng')
                .required('Vui lòng nhập địa chỉ chi tiết'),
            gender: Yup.number()
                .oneOf([0, 1])
                .required('Vui lòng chọn giới tính'),
            level: Yup.number()
                .oneOf([1, 2, 3, 4, 5])
                .required('Vui lòng chọn cấp độ')
        }),
        onSubmit: async values => {
            signUp(values)
                .then(async (res) => {
                    await auth.signIn(values.phoneNumber, values.password);
                    router.push('/');
                })
                .catch(err => {
                    console.log(err);
                    if (err === 'Email is already used') {
                        setError({
                            title: 'Đăng ký không thành công!',
                            content: 'Email đã được sử dụng. Vui lòng chọn email khác.'
                        })
                    }
                    else if (err === 'Phonenumber is already used') {
                        setError({
                            title: 'Đăng ký không thành công!',
                            content: 'Số điện thoại đã được sử dụng. Vui lòng nhập số điện thoại khác.'
                        })
                    }
                    else {
                        setError({
                            title: 'Đăng ký không thành công!',
                            content: err.toString()
                        })
                    }
                })
        },
    });

    return (
        <>
            <Head>
                <title>
                    Đăng ký
                </title>
            </Head>
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}>
                    <div>
                        <Stack
                            spacing={1}
                            sx={{ mb: 3 }}>
                            <Typography variant="h4">
                                Đăng ký
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2">
                                Bạn đã có tài khoản?
                                &nbsp;
                                <Link
                                    component={NextLink}
                                    href="/auth/login"
                                    underline="hover"
                                    variant="subtitle2">
                                    Đăng nhập
                                </Link>
                            </Typography>
                        </Stack>
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit} >
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
                                    sx={{ marginTop: '20px' }}
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
                                    sx={{ marginTop: '20px' }}
                                    onChange={(e) => {
                                        formik.setFieldValue('gender', e.target.value)
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.gender && formik.touched.gender}
                                    helperText={formik.errors.gender}
                                    value={formik.values.gender}
                                    id="gender"
                                    label="Giới tính">
                                    <MenuItem
                                        key={0}
                                        value={0}>
                                        Nữ
                                    </MenuItem>
                                    <MenuItem
                                        key={1}
                                        value={1}>
                                        Nam
                                    </MenuItem>
                                </TextField>
                                <TextField
                                    fullWidth
                                    select
                                    sx={{ marginTop: '20px' }}
                                    onChange={(e) => {
                                        formik.setFieldValue('level', e.target.value)
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.errors.level && formik.touched.level}
                                    helperText={formik.errors.level}
                                    value={formik.values.level}
                                    id="level"
                                    label="Cấp độ">
                                    <MenuItem
                                        key={1}
                                        value={1}>
                                        HSK 1
                                    </MenuItem>
                                    <MenuItem
                                        key={2}
                                        value={2}>
                                        HSK 2
                                    </MenuItem>
                                    <MenuItem
                                        key={3}
                                        value={3}>
                                        HSK 3
                                    </MenuItem>
                                    <MenuItem
                                        key={4}
                                        value={4}>
                                        HSK 4
                                    </MenuItem>
                                    <MenuItem
                                        key={5}
                                        value={5}>
                                        HSK 5
                                    </MenuItem>
                                </TextField>
                            </Stack>
                            {formik.errors.submit && (
                                <Typography
                                    color="error"
                                    sx={{ mt: 3 }}
                                    variant="body2"
                                >
                                    {formik.errors.submit}
                                </Typography>
                            )}
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3, borderRadius: '10px' }}
                                type="submit"
                                variant="contained">
                                Đăng ký
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

Page.getLayout = (page) => (
    <AuthLayout>
        {page}
    </AuthLayout>
);

export default Page;
