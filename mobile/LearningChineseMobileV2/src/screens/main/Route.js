import HomeTab from "./tabs/home";
import LibraryTab from "./tabs/library";
import SearchTab from "./tabs/search";

const mainRoute = [
    {
        name: 'home',
        label: 'Trang chủ',
        screen: HomeTab,
    },
    {
        name: 'search',
        label: 'Tìm kiếm',
        screen: SearchTab,
    },
    {
        name: 'library',
        label: 'Thư viện của tôi',
        screen: LibraryTab,
    }
]
export default mainRoute;