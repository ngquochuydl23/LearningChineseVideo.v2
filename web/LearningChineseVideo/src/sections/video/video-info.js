import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Box, Button, TextField, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import CustomAvatar from "src/components/custom-avt";
import { useAuth } from "src/hooks/use-auth";
import { addComment, getCommentsOfVideo } from "src/services/api/comment-api";
import { addLike, check, delLike } from "src/services/api/like-api";
import { dateCrateComment } from "src/utils/formatDate";
import { CommentItem } from "./comment-list";
const VideoInfo = ({ title, description, tags = [], level }) => {
  const [like, setLike] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { getUser, user } = useAuth();
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const LevelCard = ({ level }) => {
    return (
      <Chip
        sx={{
          borderRadius: "4px",
          ml: "10px",
          fontWeight: "600",
          backgroundColor: "rgb(241, 238, 131, 0.5)",
          fontSize: "20px",
          color: "#e5d300",
        }}
        label={"HSK " + level}
      />
    );
  };
  // Check đã like hay chưa
  useEffect(() => {
    check(id)
      .then((res) => {
        setLike(true);
      })
      .catch((err) => {
        setLike(false);
      });
    getCommentsOfVideo(id).then((res) => {
      setComments(res);
    });
  }, [id]);

  // Chức năng like
  const handleLike = () => {
    if (like === false) {
      addLike(id)
        .then((res) => {
          setLike(true);
          enqueueSnackbar(`Like video thành công`, {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        })
        .catch((err) => {
          enqueueSnackbar(`Like video không thành công`, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        });
    } else {
      delLike(id)
        .then((res) => {
          setLike(false);
          enqueueSnackbar(`Hủy like video thành công`, {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        })
        .catch((err) => {
          enqueueSnackbar(`Hủy like video không thành công`, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        });
    }
  };
  // Chức năng bình luận
  const createComment = () => {
    const data = {
      content: content,
      videoId: id,
    };

    addComment(data)
      .then((res) => {
        setContent("");
        getCommentsOfVideo(id)
          .then((comments) => {
            setComments(comments);
          })
          .catch((err) => {
            enqueueSnackbar(`Xem tất cả bình luận không thành công`, {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            });
          });
        enqueueSnackbar(`Bình luận video thành công!!!`, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      })
      .catch((err) => {
        enqueueSnackbar(`Bình luận không thành công`, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      });
  };
  return (
    <Box padding="15px" flex="2" flexDirection="column" display="flex">
      <Stack display="flex" direction="row">
        <Typography lineHeight="35px" fontSize="25px" variant="h1">
          {title}
        </Typography>
        <Stack display="flex" direction="row" gap={"10px"} padding={"10px"}>
          <ThumbUpIcon
            marginTop="50"
            onClick={() => handleLike()}
            style={{ cursor: "pointer", color: like === true ? "red" : "black" }}
          />
          <Typography fontWeight="500" fontSize="17px">
            Like
          </Typography>
        </Stack>
      </Stack>

      <Stack mt="30px" direction="row">
        <Typography fontWeight="500" fontSize="20px">
          Cấp độ:
        </Typography>
        <LevelCard level={level} />
      </Stack>
      <Stack mt="20px" direction="row" spacing={1}>
        <Typography fontWeight="500" fontSize="20px">
          Chủ đề:
        </Typography>
        {_.map(tags, (tag) => (
          <Chip
            sx={{
              fontWeight: "600",
              backgroundColor: "#b100cd",
              fontSize: "14px",
              color: "white",
            }}
            label={tag}
          />
        ))}
      </Stack>
      <Typography mt="30px" fontSize="16px" variant="subtitle2">
        {description}
      </Typography>

      <Stack display="flex" direction="column" gap={"10px"} marginTop={"5px"} padding={"5px"}>
        <Typography fontWeight="500" fontSize="17px">
          {comments.length} bình luận
        </Typography>
        <Stack display="flex" direction="row" gap={"10px"} marginTop={"5px"}>
          <CustomAvatar
            fullname={user.fullName}
            src={user.avatar}
            sx={{ cursor: "pointer", height: 50, width: 50 }}
          />
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            label="Viết bình luận..."
            style={{ height: "50px" }}
          />
        </Stack>
        <Stack
          display="flex"
          direction="row"
          gap={"10px"}
          marginTop={"5px"}
          justifyContent="flex-end"
        >
          <Button sx={{ height: "40px" }} variant="contained" onClick={() => createComment()}>
            Bình luận
          </Button>
        </Stack>
        {/* Danh sách các comment */}
        <Stack
          display="flex"
          direction="column"
          gap={"30px"}
          paddingTop={"5px"}
          paddingBottom={"10px"}
        >
          {comments.map((comment, index) => (
            <Stack display="flex" direction="row" gap={"20px"} key={index}>
              <CustomAvatar
                fullname={comment.creator?.fullName}
                src={comment.creator?.avatar}
                sx={{ cursor: "pointer", height: 50, width: 50 }}
              />
              <Stack display="flex" direction="column" gap={"10px"}>
                <Stack display="flex" direction="row" gap={"15px"}>
                  <Typography fontWeight="500" fontSize="14px">
                    {comment.creator?.fullName}
                  </Typography>
                  <Typography fontSize="14px">{dateCrateComment(comment.createdAt)}</Typography>
                </Stack>
                <Typography fontSize="13px">{comment.content}</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default VideoInfo;
