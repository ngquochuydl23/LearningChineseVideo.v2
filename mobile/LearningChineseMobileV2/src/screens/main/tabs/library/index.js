import { Text, TouchableOpacity, View } from "react-native"
import HomeHeader from "../../../../sections/home/homeHeader";
import UserAvatar from 'react-native-user-avatar';
import ScreenContainer from "../../../../components/ScreenContainer";
import styles from './styles';
import libMenuRoute from "./libMenuRoute";
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/slices/userSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { readStorageUrl } from "../../../../utils/readStorageUrl";
import Avatar from "../../../../components/avatar";


const LibraryTab = () => {
    const { user } = useSelector((state) => state.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const doLogOut = async () => {
        await AsyncStorage.removeItem('AccessToken');
        dispatch(logout());
    }

    return (
        <ScreenContainer>
            <HomeHeader title="Thư viện của tôi" />
            <TouchableOpacity
                onPress={() => { navigation.navigate("EditProfile") }}>
                <View style={styles.userInfoContainer}>
                    <Avatar
                        size={60}
                        name={user.fullName}
                        src={user.avatar} />
                    <View style={styles.userFullNameAndEmail}>
                        <Text style={styles.fullName}>{user.fullName}</Text>
                        <Text style={styles.email}>{user.email}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.menuRoute}>
                {_.map(libMenuRoute, (route, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => { navigation.navigate(route.destinationSrc) }}>
                        <View style={styles.menuRouteItem} key={index}>
                            <Text style={styles.menulabelRouteItem}>
                                {route.label}
                            </Text>
                            {route.enableSubtitle &&
                                <Text style={styles.subtitleRouteItem}>
                                    {`Đã lưu 44 video`}
                                </Text>
                            }
                        </View>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity
                    onPress={doLogOut}>
                    <View style={styles.menuRouteItem}>
                        <Text style={{ ...styles.menulabelRouteItem, color: 'red' }}>
                            {`Đăng xuất`}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScreenContainer>
    )
}

export default LibraryTab;