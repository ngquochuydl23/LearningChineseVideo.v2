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
const GridTeacherEX3 = ({
  _id,
  lessonId,
  type,
  fillInBlank,
  onDeleteItem,
  createdAt,
  grammaQuestion,
  synonymAntonymQuestion,
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
            {type === "fill-in-blank"
              ? "Điền vào chổ trống"
              : type === "synonym-antonym-question"
              ? "Tìm từ đồng nghĩa hoặc trái nghĩa"
              : "Câu hỏi ngữ pháp"}
          </Typography>
          <MoreVertIcon onClick={handleClick} />
        </Stack>

        <Typography fontSize="15px" variant="subtitle2" color="text.secondary">
          Câu hỏi:{""}
          {type === "fill-in-blank"
            ? fillInBlank?.question
            : type === "synonym-antonym-question"
            ? synonymAntonymQuestion?.question
            : grammaQuestion?.question}
        </Typography>
        <Typography fontSize="15px" variant="subtitle2" color="text.secondary">
          Cẩu trả lời: {""}
          {type === "fill-in-blank"
            ? fillInBlank?.answers.join(" ,")
            : type === "synonym-antonym-question"
            ? synonymAntonymQuestion?.answers.join(" , ")
            : grammaQuestion?.answers.join(" , ")}
        </Typography>
        <Typography fontSize="15px" variant="subtitle2" color="text.secondary">
          Cẩu trả lời đúng:
          {type === "fill-in-blank"
            ? fillInBlank?.answers[fillInBlank?.rightAwswerPosition]
            : type === "synonym-antonym-question"
            ? synonymAntonymQuestion?.answers[synonymAntonymQuestion?.rightAwswerPosition]
            : grammaQuestion?.answers[grammaQuestion?.rightAwswerPosition]}
        </Typography>
        <Typography fontSize="15px" variant="subtitle2" color="text.secondary">
          Tải lên lúc: ngày {moment(createdAt).format("DD/MM/YYYY")}
        </Typography>
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

export default GridTeacherEX3;
