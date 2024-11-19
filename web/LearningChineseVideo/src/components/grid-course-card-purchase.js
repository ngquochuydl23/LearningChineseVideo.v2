import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, CardActionArea, CardMedia, Chip, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { formatMoney } from "src/utils/formatMoney";
import readMediaUrl from "src/utils/read-media-url";

const GridVideoCardPurchase = ({
  courseId,
  firstLesson,
  title,
  level,
  totalDuration,
  price,
  studentCount,
  lessonCount,
  author,
}) => {
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  return (
    <Card
      sx={{
        width: "100%",
        textDecoration: "none",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <CardActionArea component={Link} href={"courses/" + courseId}>
        <div
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "column",
            justifyContent: "flex-end",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            height="200"
            sx={{
              transition: "transform .2s",
              position: "relative",
              top: "-1px",
              ":hover": {
                transform: "scale(1.1)",
              },
            }}
            image={readMediaUrl(firstLesson.thumbnail)}
            alt={title}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "15px",
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
            {/* <Chip
              sx={{
                fontWeight: "600",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                fontSize: "14px",
                color: "white",
              }}
              label={millisToMinutesAndSeconds(totalDuration)}
            /> */}
          </div>
        </div>
        <CardContent sx={{ padding: "10px" }}>
          <Typography
            fontSize="20px"
            gutterBottom
            line
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
            variant="h5"
            component="div"
          >
            {title}
          </Typography>
          <Typography
            fontSize="20px"
            gutterBottom
            line
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              color: "orange",
            }}
            variant="h6"
            component="div"
          >
            {formatMoney(price)}đ
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            justifyContent="space-between"
            marginBottom="10px"
          >
            <Box display="flex" alignItems="center" gap={0.5}>
              <PersonIcon fontSize="smail" />
              <Typography variant="body1">{author.fullName}</Typography>
            </Box>
            {/* <Box display="flex" alignItems="center" gap={0.5}>
              <GroupIcon fontSize="smail" />
              <Typography variant="body1">{studentCount}</Typography>
            </Box> */}
            {/* Name */}

            {/* Play icon with text */}
            {/* <Box display="flex" alignItems="center" gap={0.5}>
              <PlayArrowIcon fontSize="small" />
              <Typography variant="body1">{lessonCount}</Typography>
            </Box> */}

            {/* Time icon with text */}
            {/* <Box display="flex" alignItems="center" gap={0.5}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body1">{millisToMinutesAndSeconds(totalDuration)}</Typography>
            </Box> */}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GridVideoCardPurchase;
