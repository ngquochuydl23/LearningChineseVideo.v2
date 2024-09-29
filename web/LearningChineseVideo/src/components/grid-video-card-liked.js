import { CardActionArea, CardMedia, Chip, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import readMediaUrl from "src/utils/read-media-url";

const GridVideoCardLiked = ({ video }) => {
  return (
    <Card
      sx={{
        width: "100%",
        textDecoration: "none",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <CardActionArea component={Link} href={"videos/" + video._id}>
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
            image={readMediaUrl(video.thumbnail)}
            alt={video.title}
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
              label={"HSK " + video.level}
            />
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
            {video.title}
          </Typography>
          <Typography fontSize="14px" variant="subtitle2" color="text.secondary">
            Chủ đề : {video.topics.join(", ")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GridVideoCardLiked;
