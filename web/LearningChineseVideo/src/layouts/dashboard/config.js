import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

export const items = [
  {
    title: 'Trang Chủ',
    path: '/',
    icon: (
      <HomeIcon />
    )
  },
  {
    title: 'Từ vựng đã lưu',
    path: '/saved',
    icon: (
      <LocalLibraryIcon />
    )
  }
];
