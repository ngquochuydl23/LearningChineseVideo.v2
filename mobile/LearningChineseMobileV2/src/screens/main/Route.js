import HomeTab from "./tabs/home";
import LibraryTab from "./tabs/library";

const mainRoute = [
    {
        name: 'home',
        label: 'Trang chủ',
        screen: HomeTab,
    },
    {
        name: 'library',
        label: 'Thư viện của tôi',
        screen: LibraryTab,
    }
]
export default mainRoute;