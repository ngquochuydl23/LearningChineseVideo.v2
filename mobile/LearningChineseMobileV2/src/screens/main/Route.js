import HomeTab from "./tabs/home";
import LibraryTab from "./tabs/library";
import SearchTab from "./tabs/search";
import IcInactiveHome from '../../assets/icons/ic_inactive-home.svg';
import IcActiveHome from '../../assets/icons/ic_active-home.svg';
import IcInactiveLib from '../../assets/icons/ic_inactive-lib.svg';
import IcActiveLib from '../../assets/icons/ic_active-lib.svg';
import IcInactiveSearch from '../../assets/icons/ic_inactive-search.svg';
import IcActiveSearch from '../../assets/icons/ic_active-search.svg';
import IcActiveCourse from '../../assets/icons/ic_active_course.svg';
import IcInactiveCourse from '../../assets/icons/ic_inactive-course.svg';
import CourseScreen from "./tabs/course";

const mainRoute = [
    {
        name: 'home',
        label: 'Trang chủ',
        activeIcon: IcActiveHome,
        inactiveIcon: IcInactiveHome,
        screen: HomeTab,
    },
    {
        name: 'search',
        label: 'Tìm kiếm',
        activeIcon: IcActiveSearch,
        inactiveIcon: IcInactiveSearch,
        screen: SearchTab,
    },
    {
        name: 'course',
        label: 'Khóa học',
        activeIcon: IcActiveCourse,
        inactiveIcon: IcInactiveCourse,
        screen: CourseScreen,
    },
    {
        name: 'library',
        label: 'Thư viện của tôi',
        activeIcon: IcActiveLib,
        inactiveIcon: IcInactiveLib,
        screen: LibraryTab,
    }
]
export default mainRoute;