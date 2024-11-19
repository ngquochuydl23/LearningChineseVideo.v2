import Head from 'next/head';
import { Box, Button, Divider, Unstable_Grid2 as Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import GridVideoSection from 'src/sections/home/grid-video-section';
import { getMostPopularVideo, getRecentlyAddedVideo, getVideo, getVideos, getVideosByHSK } from 'src/services/api/video-api';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { getCarts, removeCartById } from 'src/services/api/cart-api';
import readMediaUrl from 'src/utils/read-media-url';
import { useSnackbar } from 'notistack';
import _ from 'lodash';


const Page = () => {
    const [lineItems, setLineItems] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const fetchCarts = () => {
        getCarts()
            .then((res) => {
                console.log(res)
                setLineItems(res)
            })
            .catch(err => console.log(err))
    }


    const calTotal = (lineItems) => {
        return lineItems.reduce((acc, item) => acc + item.course.price, 0)
    }

    const removeCart = (id) => {
        removeCartById(id)
            .then((res) => {
                fetchCarts();
                enqueueSnackbar(`Xóa giỏ hàng thành công`, {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                });
            })
            .catch(err => {
                console.log(err);
                enqueueSnackbar(`Xóa giỏ hàng thất bại`, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                });
            })
    }

    useEffect(() => {
        fetchCarts();
    }, [])


    return (
        <>
            <Head>
                <title>
                    Trang chủ
                </title>
            </Head>
            <Box>
                <Grid container spacing={3} sx={{ padding: 2 }}>
                    {/* Left Side: Cart Items */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h5" gutterBottom>Giỏ Hàng của Bạn</Typography>
                            <Divider sx={{ marginBottom: 2 }} />

                            {lineItems.map((item) => (
                                <Box
                                    key={item._id}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ marginBottom: 2 }}
                                >
                                    <Box display="flex" >
                                        <img
                                            style={{ width: 150, aspectRatio: 16 / 9, borderRadius: 4, objectFit: 'cover' }}
                                            src={readMediaUrl(item.course.firstLesson.thumbnail)}
                                            alt={item.course.title} />

                                        <Box sx={{ marginLeft: 2 }}>
                                            <Typography variant="h6">{item.course.title}</Typography>
                                            <Typography variant="body2" color="text.secondary">Tác giả: {item.course.author.fullName}</Typography>

                                        </Box>
                                    </Box>

                                    <Box display="flex">
                                        <Typography variant="h6" sx={{ marginRight: 2 }}>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.course.price)}
                                        </Typography>
                                        <IconButton color="error" onClick={() => removeCart(item._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            ))}
                        </Paper>
                    </Grid>

                    {/* Right Side: Summary & Checkout */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>Chi Tiết Thanh Toán</Typography>
                            <Divider sx={{ marginBottom: 2 }} />

                            <Box display="flex" justifyContent="space-between" sx={{ marginBottom: 1 }}>
                                <Typography>Tạm tính:</Typography>
                                {!_.isEmpty(lineItems) &&
                                    <Typography>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calTotal(lineItems))}</Typography>
                                }
                            </Box>

                            <Box display="flex" justifyContent="space-between" sx={{ marginBottom: 2 }}>
                                <Typography>Thuế (10%):</Typography>
                                {!_.isEmpty(lineItems) &&
                                    <Typography>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calTotal(lineItems) * 0.1)}</Typography>
                                }
                            </Box>

                            <Divider sx={{ marginBottom: 2 }} />

                            <Box display="flex" justifyContent="space-between" sx={{ marginBottom: 2 }}>
                                <Typography variant="h6">Tổng cộng:</Typography>
                                {!_.isEmpty(lineItems) &&
                                    <Typography variant="h6">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calTotal(lineItems) + calTotal(lineItems) * 0.1)}
                                    </Typography>
                                }
                            </Box>

                            <TextField label="Nhập mã giảm giá" fullWidth sx={{ marginBottom: 2 }} />
                            <Button
                                href='/checkout'
                                disabled={_.isEmpty(lineItems)}
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginBottom: 1 }}>
                                Thanh Toán
                            </Button>
                            <Button variant="outlined" color="secondary" fullWidth>Tiếp Tục Mua Sắm</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
