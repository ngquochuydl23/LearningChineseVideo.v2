import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, CardActionArea, Chip, MenuItem, Popover, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { formatMilisecond } from "src/utils/formatMilisecond";
import { formatMoney } from "src/utils/formatMoney";
import readMediaUrl from "src/utils/read-media-url";
const GridTeacherEX4 = ({
  _id,
  lessonId,
  type,
  imageQuestion,
  onDeleteItem,
  createdAt,
  audioQuestion,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idPopover = open ? "simple-popover" : undefined;

  return (
    <Stack direction="row" sx={{ width: "100%", textDecoration: "none" }}>
      {/* <CardActionArea component={Link} href={"/courses/" + _id}> */}

      <Box
        sx={{
          padding: "20px",
          ml: "10px",
          mt: "20px",
          borderRadius: "10px",
          width: "100%",
          cursor: "pointer",
          backgroundColor: "#EEEEEE",
          ":hover": {
            backgroundColor: "#f5f5f5",
          },
          direction: "column",
        }}
      >
        <Stack justifyContent="space-between" direction="row" sx={{ width: "100%" }}>
          <Typography
            fontSize="20px"
            gutterBottom
            variant="h5"
            sx={{ color: "black" }}
            component="div"
          >
            {type === "audio-question" ? "Nghe và trả lời câu hỏi" : "Nhìn hình trả lời câu hỏi"}
          </Typography>
          <MoreVertIcon onClick={handleClick} />
        </Stack>
        <Stack direction="row">
          <Stack width="20%">
            {type === "audio-question" ? (
              <audio
                style={{
                  borderRadius: "10px",
                  height: "130px",
                  width: "190px",
                  transition: "transform .2s",
                  position: "relative",
                  marginBottom: "10px",
                }}
                controls
                src={readMediaUrl(imageQuestion?.audioUrl)}
              />
            ) : (
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
            )}
          </Stack>
          <Stack width="70%" spacing={1}>
            <Typography fontSize="15px" variant="subtitle2" color="text.secondary">
              Câu hỏi:{""}
              {type === "audio-question" ? audioQuestion?.question : imageQuestion?.question}
            </Typography>
            <Typography fontSize="15px" variant="subtitle2" color="text.secondary">
              Cẩu trả lời: {""}
              {type === "audio-question"
                ? audioQuestion?.answers.join(" , ")
                : imageQuestion?.answers.join(" , ")}
            </Typography>
            <Typography fontSize="15px" variant="subtitle2" color="text.secondary">
              Cẩu trả lời đúng:
              {type === "audio-question"
                ? audioQuestion?.answers[audioQuestion?.rightAwswerPosition]
                : imageQuestion?.answers[imageQuestion?.rightAwswerPosition]}
            </Typography>
            <Typography fontSize="15px" variant="subtitle2" color="text.secondary">
              Tải lên lúc: ngày {moment(createdAt).format("DD/MM/YYYY")}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      {/* </CardActionArea> */}
      <Popover
        id={idPopover}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => onDeleteItem(_id, lessonId)}>Xóa video</MenuItem>
      </Popover>
    </Stack>
  );
};

export default GridTeacherEX4;
