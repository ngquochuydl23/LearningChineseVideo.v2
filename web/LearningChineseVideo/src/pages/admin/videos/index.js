import {
  Box,
  CircularProgress,
  Container,
  Unstable_Grid2 as Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import GridVideoAdminCard from "src/components/grid-video-admin-card";
import { Layout as AdminLayout } from "src/layouts/admin-layout/layout";
import UpdateVideoDialog from "src/sections/update-video-dialog";
import { delVideo, getVideos } from "src/services/api/video-api";

const Page = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [videoSearch, setVideoSearch] = useState([]);
  const fetchVideo = () => {
    setLoading(true);
    getVideos()
      .then((res) => {
        setVideos(res);
        setVideoSearch(res);
      })
      .catch((err) => console.log())
      .finally(() => setLoading(false));
  };
  const handleSearchChange = (event) => {
    const dataSearch = event.target.value;
    setSearchTerm(dataSearch);
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(dataSearch.toLowerCase())
    );

    setVideoSearch(filtered);
  };
  const deleteVideo = (id) => {
    delVideo(id)
      .then(() => {
        console.log(`Video ${id} is successfully deleted.`);
        fetchVideo();
        enqueueSnackbar(`Đã xóa thành công video ${id}`, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(`Xóa video thất bại`, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      });
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <>
      <Head>
        <title>Danh sách video</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Stack spacing={3} paddingBottom="30px">
            <Typography variant="h4">Danh sách video ({videos.length})</Typography>
            <TextField
              fullWidth
              label="Tìm kiếm video"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ my: "20px", fontSize: "30px", fontWeight: "800" }}
            />
            {loading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              _.map(videoSearch, (video) => (
                <GridVideoAdminCard
                  {...video}
                  onDeleteItem={deleteVideo}
                  onClick={() => setEditingVideo(video)}
                />
              ))
            )}
          </Stack>
        </Container>
        <UpdateVideoDialog
          video={editingVideo}
          onUpdated={fetchVideo}
          handleClose={() => {
            setEditingVideo();
          }}
          open={Boolean(editingVideo)}
        />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Page;
