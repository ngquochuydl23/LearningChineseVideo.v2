import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, CardActionArea, Chip, Grid, MenuItem, Popover, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { checkExcercise } from "src/services/api/exercise-api";
import { formatMilisecond } from "src/utils/formatMilisecond";
import { formatMoney } from "src/utils/formatMoney";
import readMediaUrl from "src/utils/read-media-url";
const ExcerciseImage = ({ _id, lessonId, imageQuestion, onNext }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [chooseAnswer, setChooseAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState("none");
  const { enqueueSnackbar } = useSnackbar();
  const [answerCorrect, setAnswerCorrect] = useState("");
  const handleButtonClick = (index) => {
    setChooseAnswer(index);

    setSelectedIndex(index);
  };
  const handleCheck = () => {
    const body = {
      type: "image-question",
      imageQuestionAnswer: {
        positionAnswer: chooseAnswer,
      },
    };
    if (chooseAnswer === null) {
      enqueueSnackbar(`Vui lòng chọn câu trả lời`, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else {
      checkExcercise(lessonId, _id, body)
        .then((res) => {
          if (res.checkResult === true) {
            setCorrectAnswer("true");
          } else {
            setAnswerCorrect(res.rightAnswer);
            setCorrectAnswer("false");
          }
        })
        .catch((err) => {
          if (err === "Lesson not found") {
            enqueueSnackbar(`Không tìm thấy bài học`, {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            });
          } else if (err === "Excercise not found") {
            enqueueSnackbar(`Không tìm thấy bài tập`, {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            });
          } else if (err === "Invalid question") {
            enqueueSnackbar(`Câu hỏi không hợp lệ`, {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            });
          } else {
            enqueueSnackbar(`Có lỗi xảy ra`, {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            });
          }
        });
    }
  };
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ width: "100%", textDecoration: "none", alignItems: "center" }}
    >
      {/* <CardActionArea component={Link} href={"/courses/" + _id}> */}
      <Box
        sx={{
          padding: "20px",
          ml: "10px",
          mt: "20px",
          borderRadius: "10px",
          width: "70%",

          backgroundColor: "#FFFFFD",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Nhìn hình và chọn đáp án đúng
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="center" gap={4} marginTop="20px">
          <Box sx={{ display: "flex", alignItems: "start", transition: "all", margin: "0 auto" }}>
            <Box
              sx={{
                position: "relative",
                maxWidth: "xs",
                px: 4,
                py: 2,
                bgcolor: "blue.500",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <img
                style={{
                  borderRadius: "10px",
                  height: "130px",
                  width: "190px",
                  transition: "transform .2s",
                  position: "relative",
                  marginBottom: "10px",
                }}
                src={readMediaUrl(imageQuestion?.imageUrl)}
              />
              <Typography fontSize="18px">{imageQuestion?.question}</Typography>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  transform: "translate(-100%, -50%)",
                  width: 0,
                  height: 0,
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  borderRight: "10px solid blue.500",
                }}
              />
            </Box>
          </Box>
        </Stack>
        <Stack direction="row" gap={2} width="100%" alignItems="center" py={2}>
          <Grid container spacing={2}>
            {imageQuestion?.answers?.map((option, index) => (
              <Grid item xs={6} key={index}>
                <Button
                  onClick={() => handleButtonClick(index)}
                  sx={{
                    width: "100%",
                    bgcolor: selectedIndex === index ? "#0099FF" : "white",
                    color: selectedIndex === index ? "white" : "black",
                    border: "1px solid #dfdfdf",
                    boxShadow: 1,
                    py: 3,
                    borderRadius: 1,
                    transition: "all 0.3s",
                    fontWeight: "400",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {option}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Stack
          sx={{
            padding: "10px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            backgroundColor:
              correctAnswer === "true" ? "#33CC33" : correctAnswer === "false" ? "red" : "white",
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            {correctAnswer === "true" ? (
              <>
                <Stack direction="row" justifyContent="center" gap={2}>
                  <CheckCircleIcon sx={{ color: "white" }} />
                  <Typography style={{ fontSize: "15px", color: "white", fontWeight: "400" }}>
                    Làm tốt lắm!
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="flex-end" sx={{ marginTop: "auto" }}>
                  <Button
                    onClick={() => {
                      handleCheck, onNext();
                    }}
                    type="submit"
                    sx={{ height: "40px", width: "150px", backgroundColor: "#33CC33" }}
                  >
                    <Typography style={{ fontSize: "13px", color: "white" }}> Tiếp tục</Typography>
                  </Button>
                </Stack>
              </>
            ) : correctAnswer === "false" ? (
              <>
                <Stack direction="row" justifyContent="center" gap={2}>
                  <CancelIcon sx={{ color: "white" }} />
                  <Typography style={{ fontSize: "15px", color: "white", fontWeight: "400" }}>
                    Đáp án đúng: {answerCorrect}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="flex-end" sx={{ marginTop: "auto" }}>
                  <Button
                    onClick={() => {
                      handleCheck, onNext();
                    }}
                    type="submit"
                    sx={{ height: "40px", width: "150px", backgroundColor: "#EE0000" }}
                  >
                    <Typography style={{ fontSize: "13px", color: "white" }}> Tiếp tục</Typography>
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <Stack direction="row" justifyContent="center" gap={2}>
                  <Typography style={{ fontSize: "15px", color: "white", fontWeight: "400" }}>
                    Đáp án đúng: {answerCorrect}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="flex-end" sx={{ marginTop: "auto" }}>
                  <Button
                    onClick={handleCheck}
                    type="submit"
                    sx={{ height: "40px", width: "150px" }}
                    variant="contained"
                  >
                    <Typography style={{ fontSize: "13px", color: "white" }}> Kiểm tra</Typography>
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Stack>
      </Box>
      {/* </CardActionArea> */}
    </Stack>
  );
};

export default ExcerciseImage;
