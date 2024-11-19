import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import ListIcon from "@mui/icons-material/List";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SchoolIcon from "@mui/icons-material/School";
import TranslateIcon from "@mui/icons-material/Translate";
import UploadIcon from "@mui/icons-material/Upload";
import { SvgIcon } from "@mui/material";
export const items = [
  {
    title: "Thống kê doanh thu",
    path: "/teacher/statistical",
    icon: (
      <SvgIcon fontSize="small">
        <BarChartIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Đăng tải khóa học",
    path: "/teacher/upload-course",
    icon: (
      <SvgIcon fontSize="small">
        <SchoolIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Danh sách khóa học",
    path: "/teacher/courses",
    icon: (
      <SvgIcon fontSize="small">
        <ListAltIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Đăng tải video",
    path: "/teacher/upload-video",
    icon: (
      <SvgIcon fontSize="small">
        <UploadIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Đăng tải bài tập",
    path: "/teacher/upload-exercise",
    icon: (
      <SvgIcon fontSize="small">
        <AssignmentIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Danh sách bài tập",
    path: "/teacher/exercises",
    icon: (
      <SvgIcon fontSize="small">
        <ListIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Đăng tải từ điển",
    path: "/teacher/dictionary",
    icon: (
      <SvgIcon fontSize="small">
        <TranslateIcon />
      </SvgIcon>
    ),
  },
];
