import BarChartIcon from "@mui/icons-material/BarChart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import TranslateIcon from "@mui/icons-material/Translate";
import UploadIcon from "@mui/icons-material/Upload";
import { SvgIcon } from "@mui/material";
export const items = [
  {
    title: "Thống kê doanh thu",
    path: "/admin/statistical-admin",
    icon: (
      <SvgIcon fontSize="small">
        <BarChartIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Quản lý người dùng",
    path: "/admin/user-manager",
    icon: (
      <SvgIcon fontSize="small">
        <PersonIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Danh sách khóa học",
    path: "/admin/courses",
    icon: (
      <SvgIcon fontSize="small">
        <ListAltIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Danh sách video",
    path: "/admin/videos",
    icon: (
      <SvgIcon fontSize="small">
        <LocalOfferIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Đăng tải video",
    path: "/admin/upload-video",
    icon: (
      <SvgIcon fontSize="small">
        <UploadIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Từ điển",
    path: "/admin/dictionary",
    icon: (
      <SvgIcon fontSize="small">
        <TranslateIcon />
      </SvgIcon>
    ),
  },
];
