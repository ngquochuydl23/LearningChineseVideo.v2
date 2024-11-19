import { Box, Unstable_Grid2 as Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import GridVideoCardPurchase from "src/components/grid-course-card-purchase";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import GridCourseSection from "src/sections/course/grid-course-section";
import { getOrderUser } from "src/services/api/order-api";
const CoursePurchased = () => {
  const [listOrders, setListOrders] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    getOrderUser().then((res) => {
      const mergedLineItems = res.reduce((acc, curr) => {
        return acc.concat(curr.lineItems);
      }, []);

      console.log(mergedLineItems);

      setListOrders(mergedLineItems);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Danh sách khóa học đã mua</title>
      </Head>

      <Box sx={{ marginBottom: "10px" }}>
        <Typography my="20px" fontSize="30px" fontWeight="800" variant="h5">
          Danh sách khóa học đã mua
        </Typography>
        {listOrders && (
          <Grid spacing="15px" container>
            {listOrders.map((course) => (
              <Grid item lg={3} key={course.courseId}>
                <GridVideoCardPurchase {...course} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};
CoursePurchased.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default CoursePurchased;
