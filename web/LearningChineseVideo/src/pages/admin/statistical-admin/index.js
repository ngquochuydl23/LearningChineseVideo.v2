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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Chart } from "chart.js/auto";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import ChartAdmin from "src/components/chartAdmin";
import { Scrollbar } from "src/components/scrollbar";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AdminLayout } from "src/layouts/admin-layout/layout";
import UpdateCourseDialog from "src/sections/course/update-course-dialog";
import { getCommissions } from "src/services/api/admin-admission";
import { formatMoney } from "src/utils/formatMoney";
const Page = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [commissions, setCommissions] = useState([]);
  const { getUser, user } = useAuth();
  const [tongDoanhThu, setTongDoanhThu] = useState(0);
  const [doanhThuTheoThang, setDoanhThuTheoThang] = useState(0);
  const [doanhThuTheoNam, setDoanhThuTheoNam] = useState(0);
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [listOrders, setListOrders] = useState([]);
  useEffect(() => {
    getCommissions().then((res) => {
      setCommissions(res);
      setListOrders(res);
      // Tính tổng doanh thu
      const totalEarnings = res.reduce((acc, curr) => acc + curr.amount, 0);
      setTongDoanhThu(totalEarnings);

      // Tính doanh thu theo tháng và theo năm
      const currentMonth = new Date().getMonth() + 1; // Tháng hiện tại (1-12)
      const currentYear = new Date().getFullYear(); // Năm hiện tại

      const monthlyEarnings = res
        .filter((item) => new Date(item.createdAt).getMonth() + 1 === currentMonth)
        .reduce((acc, curr) => acc + curr.amount, 0);
      setDoanhThuTheoThang(monthlyEarnings);

      const yearlyEarnings = res
        .filter((item) => new Date(item.createdAt).getFullYear() === currentYear)
        .reduce((acc, curr) => acc + curr.amount, 0);
      setDoanhThuTheoNam(yearlyEarnings);
    });
  }, [user]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    // Thêm logic xử lý doanh thu theo tháng, năm và tất cả tại đây
    if (event.target.value === "MONTH") {
      // Xử lý doanh thu theo tháng
      const currentMonth = new Date().getMonth() + 1;
      getCommissions().then((res) => {
        setCommissions(
          res.filter((item) => new Date(item.createdAt).getMonth() + 1 === currentMonth)
        );
      });
    } else if (event.target.value === "YEAR") {
      // Xử lý doanh thu theo năm
      const currentYear = new Date().getFullYear();

      getCommissions().then((res) => {
        setCommissions(
          res.filter((item) => new Date(item.createdAt).getFullYear() === currentYear)
        );
      });
    } else {
      // Xử lý tất cả doanh thu
      getCommissions().then((res) => {
        setCommissions(res);
      });
    }
  };
  return (
    <>
      <Head>
        <title>Thống kê doanh thu</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Stack spacing={3} paddingBottom="30px">
            <Typography variant="h4">Thống kê doanh thu</Typography>
          </Stack>
          <FormControl sx={{ width: "30%" }}>
            <InputLabel id="demo-simple-select-label">Chọn thống kê doanh thu</InputLabel>
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
              <MenuItem value="MONTH">Doanh thu theo tháng</MenuItem>
              <MenuItem value="YEAR">Doanh thu theo năm</MenuItem>
            </Select>
          </FormControl>
          <Stack
            sx={{ width: "100%", marginTop: "10px" }}
            display="flex"
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Stack sx={{ marginTop: "10px", height: "400px", width: "1000px" }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h7">Tổng doanh thu: {formatMoney(tongDoanhThu)} đ</Typography>
                <Typography variant="h7">
                  Doanh thu theo tháng hiện tại: {formatMoney(doanhThuTheoThang)} đ
                </Typography>
                <Typography variant="h7">
                  Doanh thu theo năm: {formatMoney(doanhThuTheoNam)} đ
                </Typography>
              </Stack>

              <ChartAdmin res={commissions} />
            </Stack>
          </Stack>
          <Stack
            sx={{ width: "100%", marginTop: "20px" }}
            display="flex"
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Scrollbar>
              <Box sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">#</TableCell>
                      <TableCell>Tên khóa học</TableCell>
                      <TableCell>Thời gian</TableCell>
                      <TableCell>Giá</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listOrders.map((item, index) => {
                      return (
                        <TableRow hover sx={{ textDecoration: "none" }} key={item.id}>
                          <TableCell padding="checkbox">{index + 1}</TableCell>
                          <TableCell>{item.course?.title}</TableCell>
                          <TableCell>{formatDate(item.createdAt)}</TableCell>
                          <TableCell>{formatMoney(item.amount)} đ</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Scrollbar>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Page;
