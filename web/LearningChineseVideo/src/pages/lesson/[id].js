import { Box, Unstable_Grid2 as Grid, Stack, Typography } from "@mui/material";
import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "src/hooks/use-auth";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import VideoLesson from "src/sections/lesson/video-lesson";
import VideoInfo from "src/sections/video/video-info";
import { getLessonById } from "src/services/api/lesson-id";
const LessonDetailPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const idPopover = open ? "simple-popover" : undefined;
  const [lesson, setLesson] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setLoading(true);
    // viewVideo(id)
    //   .then(() => console.log("Seen video"))
    //   .catch((err) => console.log(err));

    getLessonById(id)
      .then((res) => setLesson(res))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <Head>
        <title> {lesson.title}</title>
      </Head>
      <Box>
        <VideoLesson
          _id={lesson.courseId}
          lessonId={lesson._id}
          videoUrl={lesson.videoUrl}
          thumbnail={lesson.thumbnail}
          title={lesson.title}
          description={lesson.description}
        />
        {/* ở đây */}

        <Stack display="flex" direction="row">
          {/* <VideoInfo {...video} tags={video.topics} />

          <Stack flex="1" display="flex"></Stack> */}
        </Stack>
      </Box>
    </>
  );
};

LessonDetailPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default LessonDetailPage;
