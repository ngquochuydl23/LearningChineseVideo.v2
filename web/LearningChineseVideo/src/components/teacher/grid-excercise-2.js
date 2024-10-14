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
const GridTeacherEX2 = ({
  _id,
  lessonId,
  type,
  sentenceOrderQuestion,
  onDeleteItem,
  createdAt,
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
            Sắp xếp lại câu cho đúng
          </Typography>
          <MoreVertIcon onClick={handleClick} />
        </Stack>

        <Typography fontSize="15px" variant="subtitle2" color="text.secondary">
          Câu hỏi: {sentenceOrderQuestion.sentenceParts.join(", ")}
        </Typography>
        <Typography fontSize="15px" variant="subtitle2" color="text.secondary">
          Cẩu trả lời: {sentenceOrderQuestion.correctOrder.join(" ,")}
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
        <MenuItem onClick={() => onDeleteItem(_id, lessonId)}>Xóa bài tập</MenuItem>
      </Popover>
    </Stack>
  );
};

export default GridTeacherEX2;
