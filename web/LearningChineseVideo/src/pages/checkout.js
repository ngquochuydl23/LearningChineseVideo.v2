import { CreditCard } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { set } from "lodash";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { getCarts } from "src/services/api/cart-api";
import { checkout } from "src/services/api/order-api";
import { checkPayment, deletePayment } from "src/services/api/payment-api";
import readMediaUrl from "src/utils/read-media-url";
import * as Yup from "yup";

// Define countries and validation schema
const countries = ["Việt Nam", "Mỹ", "Nhật Bản", "Đức"];

const PaymentSchema = Yup.object().shape({
  country: Yup.string().required("Chọn quốc gia là bắt buộc"),
  cardName: Yup.string().required("Vui lòng nhập tên chủ thẻ"),
  cardNumber: Yup.string()
    .matches(/^[0-9]{16}$/, "Số tài khoản phải đủ 16 chữ số")
    .required("Vui lòng nhập số tài khoản"),
  expiryDate: Yup.string().required("Vui lòng nhập ngày hết hạn"),
  cvv: Yup.string()
    .matches(/^[0-9]{3,4}$/, "CVC/CVV không hợp lệ")
    .required("Nhập CVC/CVV"),
});

const Page = () => {
  const router = useRouter();
  const [lineItems, setLineItems] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [type, setType] = useState(0);
  const [information, setInformation] = useState();
  const [url, setUrl] = useState("");
  const pathname = usePathname();
  const paymentRef = useRef();
  useEffect(() => {
    getCarts()
      .then((res) => {
        setLineItems(res), setType(0);
      })
      .catch((err) => console.error(err));
  }, []);

  const calTotal = (items) => items.reduce((acc, item) => acc + item.course.price, 0);

  useEffect(() => {
    if (pathname === "/checkout" && lineItems.length > 0) {
      //calTotal(lineItems) + calTotal(lineItems) * 0.1
      setUrl(
        `https://qr.sepay.vn/img?bank=ACB&acc=37731017&&template=compact&amount=${"20000"}&des=MaKH${
          lineItems[0].userId
        }MaCourse${lineItems[0].courseId}THANHTOAN`
      );
    }
  }, [pathname, lineItems]);

  useEffect(() => {
    if (pathname === "/checkout" && lineItems.length > 0) {
      paymentRef.current = setInterval(() => {
        const body = { course_id: lineItems[0].courseId, user_id: lineItems[0].userId };
        checkPayment(body).then((res) => {
          if (res) {
            const startInfo = res.paymentInfo.indexOf("CT") + 2;
            const endInfo = res.paymentInfo.indexOf("toi");
            const accountNumber = res.paymentInfo
              .substring(startInfo, endInfo)
              .replace("tu", "")
              .trim()
              .split(" ")[0];
            const accountName = res.paymentInfo
              .substring(startInfo, endInfo)
              .replace("tu", "")
              .trim()
              .replace(accountNumber, "")
              .trim();
            checkout({
              accountName,
              accountNumber,
            }).then((res) => {
              router.push("/");
              enqueueSnackbar(`Thanh toán thành công`, {
                variant: "success",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
              });
              deletePayment(res._id);
            });
          }
        });
      }, 2000);
    } else {
      clearInterval(paymentRef.current);
    }
    return () => clearInterval(paymentRef.current);
  }, [pathname, lineItems]);

  const handleSubmit = (values) => {
    setType(1);
    setInformation(values);
    console.log(values);
    console.log(calTotal(lineItems));
    // console.log({
    //   nameOnCard: values.cardName,
    //   cardNumber: values.cardNumber,
    //   expiryDate: values.expiryDate,
    //   cvv: values.cvv,
    // });
  };

  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>

      <Box>
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12} md={7}>
            {type === 0 ? (
              <Box sx={{ maxWidth: 800, margin: "auto", padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                  Thanh toán
                </Typography>

                {/* Formik Form */}
                <Formik
                  initialValues={{
                    country: "Việt Nam",
                    cardName: "",
                    cardNumber: "",
                    expiryDate: "",
                    cvv: "",
                  }}
                  validationSchema={PaymentSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, handleChange }) => (
                    <Form>
                      {/* Billing Address */}
                      <Card sx={{ marginBottom: 3 }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Địa chỉ thanh toán
                          </Typography>
                          <Field
                            as={Select}
                            name="country"
                            fullWidth
                            sx={{ mt: "20px" }}
                            onChange={handleChange}
                            error={touched.country && Boolean(errors.country)}
                          >
                            {countries.map((country) => (
                              <MenuItem key={country} value={country}>
                                {country}
                              </MenuItem>
                            ))}
                          </Field>
                        </CardContent>
                      </Card>

                      {/* Payment Method */}
                      <Card sx={{ marginBottom: 3 }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Thanh Toán Qua Ngân Hàng
                            <IconButton sx={{ float: "right" }}>
                              <CreditCard />
                            </IconButton>
                          </Typography>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <img src={url} width={"200px"} />
                            <div style={{ display: "flex", flexDirection: "column" }}>
                              <span style={{ fontSize: "18px" }}>Tên chủ TK: THAI QUANG BAO</span>
                              <span className="font-medium text-[14px]">Số TK: 37731017 </span>
                              <span className="rounded-md text-[14px]">
                                Sử dụng app Momo hoặc app Ngân hàng để thanh toán
                              </span>
                              {/* <span className='rounded-md text-[14px]'>Khóa Học {course.title} - {formatMoney(course.price)}đ</span> */}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* <Button type="submit" variant="contained" color="primary" fullWidth>
                        Tiếp theo
                      </Button> */}
                    </Form>
                  )}
                </Formik>
              </Box>
            ) : type === 1 ? (
              <></>
            ) : (
              <></>
            )}
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Chi Tiết Đơn Hàng
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />

              {lineItems.map((item) => (
                <Box
                  key={item.id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ marginBottom: 1 }}
                >
                  <Box display="flex" alignItems="center">
                    <img
                      style={{
                        width: 80,
                        aspectRatio: 16 / 9,
                        borderRadius: 4,
                        objectFit: "cover",
                      }}
                      src={readMediaUrl(item.course.firstLesson.thumbnail)}
                      alt={item.course.title}
                    />
                    <Typography sx={{ marginLeft: 2, fontWeight: 600 }}>
                      {item.course.title}
                    </Typography>
                  </Box>
                  <Typography>
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                      item.course.price
                    )}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ marginY: 2 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography>Tạm tính:</Typography>
                <Typography>
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                    calTotal(lineItems)
                  )}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" sx={{ marginTop: 1 }}>
                <Typography>Thuế (10%):</Typography>
                <Typography>
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                    calTotal(lineItems) * 0.1
                  )}
                </Typography>
              </Box>

              <Divider sx={{ marginY: 2 }} />
              <Box display="flex" justifyContent="space-between" sx={{ marginBottom: 2 }}>
                <Typography variant="h6">Tổng cộng:</Typography>
                <Typography variant="h6">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                    calTotal(lineItems) + calTotal(lineItems) * 0.1
                  )}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
