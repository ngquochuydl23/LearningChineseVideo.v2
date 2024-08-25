import HomeTab from "./tabs/home";
import LibraryTab from "./tabs/library";
import SearchTab from "./tabs/search";

const mainRoute = [
    {
        name: 'home',
        label: 'Trang chủ',
        activeIcon: "home-variant",
        inactiveIcon: "home-variant-outline",
        screen: HomeTab,
    },
    {
        name: 'search',
        label: 'Tìm kiếm',
        activeIcon: "search-web",
        inactiveIcon: "search-web",
        screen: SearchTab,
    },
    {
        name: 'library',
        label: 'Thư viện của tôi',
        activeIcon: "library-shelves",
        inactiveIcon: "library-shelves",
        screen: LibraryTab,
    }
]
export default mainRoute;