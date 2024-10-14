import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import {
  Box,
  Button,
  Chip,
  Unstable_Grid2 as Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from "@mui/material";
import _ from "lodash";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GridDescribeCourseCard from "src/components/teacher/grid-course-describe-card";
import { useAuth } from "src/hooks/use-auth";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import VideoInfo from "src/sections/video/video-info";
import VideoPlayer from "src/sections/video/video-player";
import { getCourseById } from "src/services/api/course-api";
import { formatMilisecond } from "src/utils/formatMilisecond";
import { formatMoney } from "src/utils/formatMoney";
import readMediaUrl from "src/utils/read-media-url";
const CourseDetailPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const idPopover = open ? "simple-popover" : undefined;
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setLoading(true);
    // viewVideo(id)
    //   .then(() => console.log("Seen video"))
    //   .catch((err) => console.log(err));

    getCourseById(id)
      .then((res) => {
        console.log(res);
        
        setCourse(res[0])
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }
   const renderStars = (rating) => {
     return (
       <div style={{ display: "flex", gap: "5px" }}>
         {[1, 2, 3, 4, 5].map((star) => (
           <svg
             key={star}
             style={{
               width: "24px",
               height: "24px",
               color: star <= rating ? "#fbbf24" : "#d1d5db",
             }}
             fill="currentColor"
             viewBox="0 0 20 20"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
           </svg>
         ))}
       </div>
     );
   };
  return (
    <>
      <Head>
        <title> {course.title}</title>
      </Head>
      <Box component="main" sx={{ width: "100%", textDecoration: "none" }}>
        <Stack
          direction="row"
          sx={{ width: "100%", textDecoration: "none", padding: "10px" }}
          spacing={2}
        >
          <Stack display="flex" direction="column" spacing={2} sx={{ width: "65%" }}>
            <Typography variant="h5">{course.title} </Typography>
            <Typography variant="h6">{course.subtitle} </Typography>
            <Stack display="flex" direction="row" spacing={2}>
              <Typography fontSize="16px" variant="subtitle2" color="text.secondary">
                Đáng giá :{" "}
              </Typography>
              <Stack>
                {""} {renderStars(course.rating)}{" "}
              </Stack>
              <Typography>({course.rateCount} rating) </Typography>
              <Typography>({course.studentCount} student) </Typography>
            </Stack>
            <Stack display="flex" direction="row" spacing={2}>
              <Typography fontSize="16px" variant="subtitle2" color="text.secondary">
                Created by : {course.author?.fullName}
              </Typography>
              <Typography> </Typography>
              <Typography fontSize="16px" variant="subtitle2" color="text.secondary">
                Created At : {moment(course.createdAt).format("DD/MM/YYYY")}
              </Typography>
              <Typography> </Typography>
              <Typography fontSize="16px" variant="subtitle2" color="text.secondary">
                Level : HSK {course.level}
              </Typography>
            </Stack>
            <Stack display="flex" direction="column" spacing={2}>
              <Typography fontSize="25px" variant="subtitle2" color="black">
                Bạn sẽ học được gì?
              </Typography>
              <Stack direction="column">
                {course.targets?.map((text, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <Typography fontSize="15px" variant="subtitle2" color="black">
                      {text}
                    </Typography>
                  </ListItem>
                ))}
              </Stack>
            </Stack>
            <Stack display="flex" direction="column" spacing={2}>
              <Typography fontSize="25px" variant="subtitle2" color="black">
                Nội dung khóa học
              </Typography>
              <Stack direction="row" spacing={1}>
                <Typography fontSize="16px" color="black">
                  {course.lessonCount} bài học
                </Typography>
                <Stack padding="2px">
                  <FiberManualRecordIcon style={{ width: "10px" }} />
                </Stack>
                <Typography fontSize="16px" color="black">
                  Thời lượng {formatMilisecond(course.totalDuration)}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} width="100%">
                <Box sx={{ width: "100%" }}>
                  {course.lessons?.map((lesson, index) => (
                    <GridDescribeCourseCard key={index} {...lesson} />
                  ))}
                </Box>
              </Stack>
              <Stack direction="column">
                <Typography fontSize="25px" variant="subtitle2" color="black">
                  Yêu cầu khóa học
                </Typography>
                {course.requirements?.map((text, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <Typography fontSize="15px" variant="subtitle2" color="black">
                      {text}
                    </Typography>
                  </ListItem>
                ))}
              </Stack>
              <Stack direction="column">
                <Typography fontSize="25px" variant="subtitle2" color="black">
                  Mô tả khóa học:
                </Typography>
                <Typography fontSize="15px" variant="subtitle2" color="black">
                  {course.description}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {/* phần video */}
          <Stack
            display="flex"
            direction="column"
            spacing={3}
            sx={{ width: "30%", textDecoration: "none" }}
          >
            <Stack alignItems="center" justifyContent="center">
              <div
                // onClick={onClick}
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
                    borderRadius: "15px",
                    height: "170px",
                    width: "350px",
                    transition: "transform .2s",
                    position: "relative",
                    marginBottom: "10px",
                  }}
                  src={readMediaUrl(course.lessons[0]?.thumbnail)}
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
                    label={"HSK " + course.level}
                  />
                </div>
              </div>
            </Stack>
            <Stack alignItems="center" justifyContent="center">
              <Typography variant="h6" color="orange">
                {formatMoney(course.price)} VNĐ
              </Typography>
              <Button
                type="submit"
                sx={{ height: "35px", width: "200px" }}
                style={{ marginTop: "10px" }}
                variant="contained"
              >
                Đăng ký khóa học
              </Button>
              <Stack direction="column" spacing={2} padding={3}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <SchoolIcon />
                  <Typography fontSize="15px" color="black">
                    Trình độ HSK {course.level}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <MenuBookIcon />
                  <Typography fontSize="15px" color="black">
                    Tổng số {course.lessonCount} bài học
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessTimeIcon />
                  <Typography fontSize="15px" color="black">
                    Thời lượng {formatMilisecond(course.totalDuration)}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

CourseDetailPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CourseDetailPage;
