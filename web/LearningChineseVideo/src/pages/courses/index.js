import { Box, Unstable_Grid2 as Grid } from "@mui/material";
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import GridCourseSection from "src/sections/course/grid-course-section";
import {
  getCourses
} from "src/services/api/course-api";

const Page = () => {
  return (
    <>
      <Head>
        <title>Danh sách khóa học</title>
      </Head>
      <Box sx={{marginBottom:'10px'}}>
        <GridCourseSection
          title="Danh sách khóa học"
          limitPerTrans={4}
          loadCourses={async (offset, limit) => {
            return await getCourses(0, 12);
          }}
        />

     

        
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
