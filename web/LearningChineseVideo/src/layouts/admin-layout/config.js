import { SvgIcon } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import UploadIcon from '@mui/icons-material/Upload';

export const items = [
  {
    title: 'Danh sách video',
    path: '/admin/videos',
    icon: (
      <SvgIcon fontSize="small">
        <LocalOfferIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Đăng tải video',
    path: '/admin/upload-video',
    icon: (
      <SvgIcon fontSize="small">
        <UploadIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Từ điển',
    path: '/admin/dictionary',
    icon: (
      <SvgIcon fontSize="small">
        <TranslateIcon />
      </SvgIcon>
    )
  }
];