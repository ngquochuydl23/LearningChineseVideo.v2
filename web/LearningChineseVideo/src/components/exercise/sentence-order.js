import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { checkExcercise } from "src/services/api/exercise-api";

const ExcerciseSentence = ({ _id, lessonId, sentenceOrderQuestion, onNext }) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("none");
  const { enqueueSnackbar } = useSnackbar();
  const [answerCorrect, setAnswerCorrect] = useState("");

  const handleWordClick = (word) => {
    setSelectedWords((prev) => [...prev, word]);
  };

  const handleRemoveWord = (word) => {
    setSelectedWords((prev) => prev.filter((w) => w !== word));
  };

  const handleCheck = () => {
    const body = {
      type: "sentence-order-question",

      sentenceOrderAnswer: selectedWords,
    };
    console.log(body);

    if (selectedWords.length === 0) {
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
            // setAnswerCorrect(res.answer);
          } else {
            setCorrectAnswer("false");
          }
        })
        .catch((err) => {
          enqueueSnackbar(`Có lỗi xảy ra`, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        });
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ width: "100%", textDecoration: "none", alignItems: "center" }}
    >
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
          Sắp xếp lại câu cho đúng
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="center" gap={4} marginTop="20px">
          <Box sx={{ display: "flex", alignItems: "start", transition: "all", margin: "0 auto" }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                padding: "10px",
                borderBottom: "1px solid #dfdfdf",
                borderTop: "1px solid #dfdfdf",
                minHeight: "50px",
                minWidth: "200px",
              }}
            >
              {selectedWords.map((word, index) => (
                <Button
                  key={index}
                  onClick={() => handleRemoveWord(word)}
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    border: "1px solid #dfdfdf",
                    boxShadow: 1,
                    py: 1,
                    px: 2,
                    borderRadius: 1,
                    transition: "all 0.3s",
                    fontWeight: "400",
                  }}
                >
                  {word}
                </Button>
              ))}
            </Box>
          </Box>
        </Stack>
        <Stack
          direction="row"
          gap={2}
          width="100%"
          alignItems="center"
          justifyContent="center"
          py={2}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #dfdfdf",
              boxShadow: 1,
            }}
          >
            {sentenceOrderQuestion?.sentenceParts
              ?.filter((word) => !selectedWords.includes(word))
              .map((word, index) => (
                <Button
                  key={index}
                  onClick={() => handleWordClick(word)}
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    border: "1px solid #dfdfdf",
                    boxShadow: 1,
                    py: 1,
                    px: 2,
                    borderRadius: 1,
                    transition: "all 0.3s",
                    fontWeight: "400",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {word}
                </Button>
              ))}
          </Box>
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
                    Đáp án đúng: {sentenceOrderQuestion?.correctOrder?.join(", ")}
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
                    Đáp án đúng:
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
    </Stack>
  );
};

export default ExcerciseSentence;
