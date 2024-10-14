import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Grid, Stack, SvgIcon, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import axios from "axios";
import _, { set } from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import webvtt from "node-webvtt";
import { ScrollPanel } from "primereact/scrollpanel";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { getCourseById } from "src/services/api/course-api";
import formatDate from "src/utils/formatDate";
import { formatMilisecond } from "src/utils/formatMilisecond";
import { formatTimeToMinute } from "src/utils/formatTimeToMinute";
import readMediaUrl from "src/utils/read-media-url";

const TranscriptItem = ({ lesson, currentLessonId, onClick }) => {
  const isActive = lesson._id === currentLessonId;
  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        borderRadius: "15px",
      }}
      onClick={onClick}
    >
      <Stack
        spacing="20px"
        width="100%"
        paddingX="5px"
        paddingY="5px"
        paddingRight="10px"
        alignItems="center"
        direction="row"
        sx={{ cursor: "pointer" }}
      >
        <Stack
          direction="column"
          sx={{
            color: "#696969",
            borderRadius: "20px",
            px: "5px",
            py: "2px",
            backgroundColor: isActive ? "rgb(6, 174, 212, 0.2)" : "#f5f5f5",
            "&:hover": {
              backgroundColor: "rgb(6, 174, 212, 0.2)",
              borderRadius: "15px",
            },
          }}
        >
          <Stack direction="row" width="400px" height="50px">
            <SvgIcon fontSize="small">
              <PlayArrowIcon />
            </SvgIcon>
            <Typography fontWeight="600" fontSize="16px" variant="subtitle1">
              {lesson.position + 1}. {lesson.title}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography fontWeight="600" fontSize="16px" variant="subtitle1" marginLeft={3}>
              {formatTimeToMinute(lesson.duration)} |{" "}
              {moment(lesson.createdAt).format("DD/MM/YYYY")}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider sx={{ ml: "20px" }} />
    </Box>
  );
};

const VideoLesson = ({ _id, videoUrl, thumbnail, title, description, lessonId }) => {
  const videoPlayerRef = useRef();
  const [currentLessonId, setCurrentLessonId] = useState(lessonId || null);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [listLesson, setListLesson] = useState([]);
  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(videoUrl);
  const [currentThumbnail, setCurrentThumbnail] = useState(thumbnail);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);
  const router = useRouter();

  const onProgress = (state) => {
    const videoElement = document.querySelector("video");

    if (!videoElement) return;

    const currentTime = state.playedSeconds;
    setPlayedSeconds(currentTime);

    // Logic to determine the current lesson based on the currentTime
    const currentLesson = listLesson.find((lesson) => {
      // Assuming each lesson has a startTime and endTime in seconds
      return currentTime >= lesson.startTime && currentTime <= lesson.endTime;
    });

    if (currentLesson) {
      setCurrentLessonId(currentLesson._id);
    }
  };

  useEffect(() => {
    setLoading(true);
    getCourseById(_id)
      .then((res) => {
        console.log(res);
        setListLesson(res[0]?.lessons);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [_id]);

  const handleTranscriptItemClick = (lesson) => {
    setCurrentLessonId(lesson._id);
    setCurrentVideoUrl(readMediaUrl(lesson.videoUrl));
    setCurrentThumbnail(lesson.thumbnail);
    setCurrentTitle(lesson.title);
    setCurrentDescription(lesson.description);
    router.push(`/lesson/${lesson._id}`);
  };

  if (loading) {
    return null;
  }

  return (
    <Stack display="flex" direction="row">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 2,
          width: "100%",
        }}
      >
        <ReactPlayer
          ref={videoPlayerRef}
          width="100%"
          height="80vh"
          style={{
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "black",
          }}
          onPlay={() => setPlaying(true)}
          playing={playing}
          onProgress={onProgress}
          controls={true}
          config={{
            file: {
              attributes: {
                crossOrigin: "true",
              },
            },
          }}
          light={currentThumbnail}
          url={currentVideoUrl}
        />
        <Stack direction="column" paddingTop={5} paddingBottom={5}>
          <Typography fontSize="25px" variant="subtitle2" color="black">
            {currentTitle}
          </Typography>
          <Typography fontSize="15px" variant="subtitle2" color="black">
            {currentDescription}
          </Typography>
        </Stack>
      </Box>
      <ScrollPanel
        id="ScrollPanel"
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          height: "80vh",
          paddingLeft: "20px",
        }}
      >
        <Box>
          <Stack overflow="hidden" spacing="10px" direction="column">
            {listLesson?.map((lesson, index) => (
              <TranscriptItem
                key={index}
                lesson={lesson}
                currentLessonId={currentLessonId}
                onClick={() => handleTranscriptItemClick(lesson)}
              />
            ))}
          </Stack>
        </Box>
      </ScrollPanel>
    </Stack>
  );
};

export default VideoLesson;
