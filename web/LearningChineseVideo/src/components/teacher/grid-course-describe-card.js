import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, CardActionArea, Chip, MenuItem, Popover, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { getExcerciseByLessonId } from "src/services/api/exercise-api";
import { formatMilisecond } from "src/utils/formatMilisecond";
import { formatMoney } from "src/utils/formatMoney";
import readMediaUrl from "src/utils/read-media-url";
const GridDescribeCourseCard = ({ _id, title, onClick, duration }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRotated, setIsRotated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [excercises, setExcercises] = useState([]);
  const handleIconClick = () => {
    setIsRotated((prev) => !prev);
    setIsExpanded((prev) => !prev);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idPopover = open ? "simple-popover" : undefined;
  useEffect(() => {
    getExcerciseByLessonId(_id).then((res) => {
      setExcercises(res);
    });
  }, [_id]);
  return (
    <Stack
      direction="column"
      sx={{
        width: "100%",
        textDecoration: "none",
        borderRadius: "10px",
        backgroundColor: " #E8E8E8",
        marginBottom: "10px",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          borderRadius: "10px",
          ":hover": {
            backgroundColor: "#9ca3af",
          },
        }}
      >
        <CardActionArea component={Link} href={"/lesson/" + _id}>
          <Box sx={{ padding: "10px", width: "100%", direction: "column" }}>
            <Stack direction="row" sx={{ width: "100%" }}>
              <Typography fontSize="14px" gutterBottom sx={{ color: "black" }} component="div">
                {title}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography fontSize="14px" sx={{ color: "black" }}>
                {formatMilisecond(duration)}
              </Typography>
              {/* <MoreVertIcon onClick={handleClick} /> */}
            </Stack>
          </Box>
        </CardActionArea>
        <Stack marginTop="10px" onClick={handleIconClick} sx={{ cursor: "pointer" }}>
          <ExpandMoreIcon
            sx={{
              transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </Stack>
      </Stack>
      {isExpanded && (
        <Box
          sx={{
            marginTop: "5px",
            borderRadius: "10px",
            backgroundColor: "#EEEEEE",
          }}
        >
          {excercises.length > 0 ? (
            excercises?.map((excercise, index) =>
              excercise?.type === "fill-in-blank" ? (
                <Stack
                  direction="row"
                  sx={{
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: "#9ca3af",
                    },
                  }}
                >
                  <Typography variant="body1">{index + 1}. Điền vào chổ trống</Typography>
                </Stack>
              ) : excercise?.type === "image-question" ? (
                <Stack
                  direction="row"
                  sx={{
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: "#9ca3af",
                    },
                  }}
                >
                  <Typography variant="body1">{index + 1}. Nhìn hình trả lời câu hỏi</Typography>
                </Stack>
              ) : excercise?.type === "audio-question" ? (
                <Stack
                  direction="row"
                  sx={{
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: "#9ca3af",
                    },
                  }}
                >
                  <Typography variant="body1">{index + 1}. Nghe và trả lời câu hỏi</Typography>
                </Stack>
              ) : excercise?.type === "sentence-order-question" ? (
                <Stack
                  direction="row"
                  sx={{
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: "#9ca3af",
                    },
                  }}
                >
                  <Typography variant="body1">{index + 1}. Sắp xếp lại câu cho đúng</Typography>
                </Stack>
              ) : excercise?.type === "synonym-antonym-question" ? (
                <Stack
                  direction="row"
                  sx={{
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: "#9ca3af",
                    },
                  }}
                >
                  <Typography variant="body1">
                    {index + 1}. Tìm từ đồng nghĩa hoặc trái nghĩa
                  </Typography>
                </Stack>
              ) : (
                <Stack
                  direction="row"
                  sx={{
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: "#9ca3af",
                    },
                  }}
                >
                  <Typography variant="body1">{index + 1}. Câu hỏi về ngữ pháp</Typography>
                </Stack>
              )
            )
          ) : (
            <Stack
              sx={{
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <Typography variant="body1">Phần này không có bài tập !!!</Typography>
            </Stack>
          )}
          {excercises.length > 0 && (
            <Stack
              sx={{
                padding: "10px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <Stack direction="row" justifyContent="flex-end">
                <Button type="submit" sx={{ height: "35px", width: "120px" }} variant="contained">
                  <CardActionArea component={Link} href={"/lesson/" + _id + "/exercise"}>
                    <Typography style={{ fontSize: "13px" }}> Làm bài tập </Typography>
                  </CardActionArea>
                </Button>
              </Stack>
            </Stack>
          )}
        </Box>
      )}
      {/* <CardActionArea component={Link} href={"/lesson/" + _id + "/exercise"}></CardActionArea> */}
    </Stack>
  );
};

export default GridDescribeCourseCard;
