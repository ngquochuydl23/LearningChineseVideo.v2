import { Box, Unstable_Grid2 as Grid, TextField, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import GridVideoCard from "src/components/grid-video-card";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import GridVideoSection from "src/sections/home/grid-video-section";
import {
  getCourses,
  getMostPopularVideo,
  getRecentlyAddedVideo,
  getVideo,
  getVideos,
  getVideosByHSK,
} from "src/services/api/video-api";
const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videoSearch, setVideoSearch] = useState([]);
  const [videos, setVideos] = useState([]);
  // Hàm xử lý sự kiện khi giá trị trong thanh tìm kiếm thay đổi
  const handleSearchChange = (event) => {
    const dataSearch = event.target.value;
    setSearchTerm(dataSearch);
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(dataSearch.toLowerCase())
    );

    setVideoSearch(filtered);
  };

  // Lấy danh sách video khi component được mount
  useEffect(() => {
    getVideos().then((videos) => {
      setVideos(videos);
      setVideoSearch(videos); // Khởi tạo videoSearch với tất cả các video
    });
  }, []);

  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>
      <Box>
        <TextField
          fullWidth
          label="Tìm kiếm video"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ my: "20px", fontSize: "30px", fontWeight: "800" }}
        />
        <Typography my="20px" fontSize="30px" fontWeight="800" variant="h5">
          Video tìm kiếm
        </Typography>
        <Grid spacing="15px" container>
          {_.map(videoSearch, (video) => (
            <Grid item lg={3}>
              <GridVideoCard key={video._id} {...video} />
            </Grid>
          ))}
        </Grid>

        <GridVideoSection
          title="Phổ biến tiếng nhất"
          limitPerTrans={4}
          loadVideos={async (offset, limit) => {
            return await getMostPopularVideo(0, 12);
          }}
        />

        <GridVideoSection
          title="HSK 1"
          limitPerTrans={4}
          loadVideos={async (offset, limit) => {
            return await getVideosByHSK(1, 0, 12);
          }}
        />

        <GridVideoSection
          title="HSK 2"
          limitPerTrans={4}
          loadVideos={async (offset, limit) => {
            return await getVideosByHSK(2, 0, 12);
          }}
        />

        <GridVideoSection
          title="HSK 3"
          limitPerTrans={4}
          loadVideos={async (offset, limit) => {
            return await getVideosByHSK(3, 0, 10000);
          }}
        />

        <GridVideoSection
          title="HSK 4"
          limitPerTrans={4}
          loadVideos={async (offset, limit) => {
            return await getVideosByHSK(4, 0, 10000);
          }}
        />
        <GridVideoSection
          title="HSK 5"
          limitPerTrans={5}
          loadVideos={async (offset, limit) => {
            return await getVideosByHSK(5, 0, 12);
          }}
        />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
