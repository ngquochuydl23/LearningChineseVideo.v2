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
const GridTeacherCourseCard = ({
  _id,
  firstLesson,
  title,
  level,
  lessonCount,
  totalDuration,
  price,
  onClick,
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          position: "relative",
        }}
      >
        <img
          style={{
            borderRadius: "10px",
            height: "130px",
            width: "220px",
            transition: "transform .2s",
            position: "relative",
            marginBottom: "10px",
          }}
          onClick={onClick}
          src={readMediaUrl(firstLesson?.thumbnail)}
        />
        <div
          style={{
            margin: "10px",
            display: "flex",
            position: "absolute",
            zIndex: 1,
          }}
        >
          <Chip
            sx={{
              fontWeight: "600",
              backgroundColor: "green",
              fontSize: "14px",
              color: "white",
            }}
            label={"HSK " + level}
          />
        </div>
      </div>
      {/* <CardActionArea component={Link} href={"/courses/" + _id}> */}
      <Box sx={{ padding: "5px", ml: "10px", width: "100%", cursor: "pointer" }}>
        <Stack justifyContent="space-between" direction="row" sx={{ width: "100%" }}>
          <Typography
            onClick={onClick}
            fontSize="20px"
            gutterBottom
            variant="h5"
            sx={{ color: "black" }}
            component="div"
          >
            {title}
          </Typography>
          <MoreVertIcon onClick={handleClick} />
        </Stack>

        <Typography fontSize="14px" variant="subtitle2" color="text.secondary" onClick={onClick}>
          Số lượng bài học: {lessonCount}
        </Typography>
        <Typography fontSize="14px" variant="subtitle2" color="text.secondary" onClick={onClick}>
          Số giờ học: {formatMilisecond(totalDuration)}
        </Typography>
        <Typography fontSize="14px" variant="subtitle2" color="text.secondary" onClick={onClick}>
          Giá: {formatMoney(price)} VNĐ
        </Typography>
        <Typography fontSize="14px" variant="subtitle2" color="text.secondary" onClick={onClick}>
          Tải lên lúc: {moment(createdAt).format("DD/MM/YYYY")}
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
        <MenuItem onClick={() => onDeleteItem(_id)}>Xóa video</MenuItem>
      </Popover>
    </Stack>
  );
};

export default GridTeacherCourseCard;
