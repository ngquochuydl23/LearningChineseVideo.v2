import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Link,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import AlertDialog from 'src/components/alert-dialog';
import { useState } from 'react';

const Page = () => {
    const router = useRouter();
    const auth = useAuth();
    const [error, setError] = useState(undefined);
    const formik = useFormik({
        initialValues: {
            phoneNumber: '',
            password: '',
        },
        validationSchema: Yup.object({
            phoneNumber: Yup
                .string()
                .max(11, 'Số điện thoại phải đủ 11 kí tự')
                .required('Vui lòng nhập số điện thoại'),
            password: Yup
                .string()
                .max(255)
                .required('Vui lòng nhập mật khẩu')
        }),
        onSubmit: async (values, helpers) => {
            try {
                await auth.signIn(values.phoneNumber, values.password);
                router.push('/');
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);

                if (err === 'User does not exist') {
                    setError({
                        title: 'Đăng ký không thành công!',
                        content: 'Tài khoản không tồn tại.'
                    })
                }
                else if (err === 'Password is incorrect') {
                    setError({
                        title: 'Đăng ký không thành công!',
                        content: 'Sai mật khẩu'
                    })
                }
                else {
                    setError({
                        title: 'Đăng ký không thành công!',
                        content: err
                    })
                }
            }
        }
    });

    return (
        <>
            <Head>
                <title>
                    Đăng nhập
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
                                Đăng nhập
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2">
                                Bạn chưa có tài khoản?
                                &nbsp;
                                <Link
                                    component={NextLink}
                                    href="/register"
                                    underline="hover"
                                    variant="subtitle2">
                                    Đăng ký
                                </Link>
                            </Typography>
                        </Stack>
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit} >
                            <Stack spacing={3}>
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
                                Đăng nhập
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
