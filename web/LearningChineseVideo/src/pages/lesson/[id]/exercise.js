import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Unstable_Grid2 as Grid,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ExcerciseAudio from "src/components/exercise/audio-excercise";
import ExcerciseFillIn from "src/components/exercise/excercise-fill-in";
import ExcerciseGramma from "src/components/exercise/gramma-excercise";
import ExcerciseImage from "src/components/exercise/image-excercise";
import ExcerciseSentence from "src/components/exercise/sentence-order";
import ExcerciseSymnonym from "src/components/exercise/synonym-antonym";
import { useAuth } from "src/hooks/use-auth";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import VideoLesson from "src/sections/lesson/video-lesson";
import VideoInfo from "src/sections/video/video-info";
import { getExcerciseByLessonId } from "src/services/api/exercise-api";
import { getLessonById } from "src/services/api/lesson-id";
const ExcercisePage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const idPopover = open ? "simple-popover" : undefined;
  const [lesson, setLesson] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [excercises, setExcercises] = useState([]);
  const [type, setType] = useState(false);
  const { id } = router.query;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const handleNextExercise = () => {
    if (currentIndex < excercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Navigate to another page when the progress bar is full

      setTimeout(() => {
        router.push(`/courses/${lesson.courseId}`);
      }, 3000);
      // Replace "/next-page" with your desired route
      enqueueSnackbar(`Đã hoàn thành bài tập`, {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  };
  const currentExercise = excercises[currentIndex];
  const progressValue = ((currentIndex + 1) / excercises.length) * 100;
  useEffect(() => {
    getLessonById(id).then((res) => {
      setLesson(res);
    });
  }, [id]);
  useEffect(() => {
    if (lesson) {
      getExcerciseByLessonId(lesson._id).then((res) => {
        setExcercises(res);
      });
    }
  }, [lesson]);
  return (
    <>
      <Head>
        <title> Bài tập</title>
      </Head>
      <Box
        sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 4, marginTop: "10px" }}
      >
        <Typography variant="h6" fontWeight="bold">
          Bài tập phần {lesson?.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Close Icon */}
          <IconButton onClick={() => router.push(`/courses/${lesson.courseId}`)}>
            <CloseIcon sx={{ color: "grey" }} />
          </IconButton>

          {/* Progress Bar */}
          <Box sx={{ flexGrow: 1, padding: "10px" }}>
            <LinearProgress
              variant="determinate"
              value={progressValue}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": { backgroundColor: "#4caf50" },
              }}
            />
          </Box>
        </Box>

        {currentExercise?.type === "fill-in-blank" ? (
          <ExcerciseFillIn key={currentIndex} {...currentExercise} onNext={handleNextExercise} />
        ) : currentExercise?.type === "synonym-antonym-question" ? (
          <ExcerciseSymnonym key={currentIndex} {...currentExercise} onNext={handleNextExercise} />
        ) : currentExercise?.type === "image-question" ? (
          <ExcerciseImage key={currentIndex} {...currentExercise} onNext={handleNextExercise} />
        ) : currentExercise?.type === "audio-question" ? (
          <ExcerciseAudio key={currentIndex} {...currentExercise} onNext={handleNextExercise} />
        ) : currentExercise?.type === "gramma-question" ? (
          <ExcerciseGramma key={currentIndex} {...currentExercise} onNext={handleNextExercise} />
        ) : (
          <ExcerciseSentence key={currentIndex} {...currentExercise} onNext={handleNextExercise} />
        )}
      </Box>
    </>
  );
};

ExcercisePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ExcercisePage;
