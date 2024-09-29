import { Box, Unstable_Grid2 as Grid, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import GridVideoCardLiked from "src/components/grid-video-card-liked";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { getVideoLiked } from "src/services/api/like-api";
const VideoLiked = () => {
  const [videos, setVideos] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    getVideoLiked()
      .then((res) => {
        console.log(res);

        setVideos(res);
      })
      .catch((err) => {
        enqueueSnackbar(`Xem tất cả video đã like không thành công!!!`, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      });
  }, []);
  return (
    <>
      <Box>
        <Stack alignItems="center" justifyContent="space-between" direction="row">
          <Stack spacing="20px" sx={{ paddingBottom: "20px" }}>
            <Typography mb="30px" variant="h4">
              Video đã like
            </Typography>
            <Grid container spacing={2}>
              {videos.map((video, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <GridVideoCardLiked video={video.video} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
VideoLiked.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default VideoLiked;
