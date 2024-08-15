import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import HomeHeader from "../../../../sections/home/HomeHeader";
import UserAvatar from 'react-native-user-avatar';
import ScreenContainer from "../../../../components/ScreenContainer";
import styles from './styles';
import libMenuRoute from "./libMenuRoute";
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';

const LibraryTab = () => {
    const navigation = useNavigation();

    const doLogOut = () => {

    }

    return (
        <ScreenContainer>
            <ScrollView>
                <HomeHeader title="Thư viện của tôi" />
                <TouchableOpacity
                //onPress={() => { navigation.navigate("EditProfile") }}
                >
                    <View style={styles.userInfoContainer}>
                        <UserAvatar
                            size={60}
                            name="Hồ Trầm"
                            src="https://storage.pgonevn.com//api/bucket/665084baa340536c521c22b1/NDM5OTFhNGFmZjVlMjYyYzNkMTM2OTFiNDAwNWQ5MjkuanBn" />
                        <View style={styles.userFullNameAndEmail}>
                            <Text style={styles.fullName}>{`Hồ Trầm`}</Text>
                            <Text style={styles.email}>{`hotram@gmail.com`}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.menuRoute}>
                    {_.map(libMenuRoute, (route, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => { navigation.navigate(route.destinationSrc) }}>
                            <View style={styles.menuRouteItem}>
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
                    <TouchableOpacity onPress={doLogOut}>
                        <View style={styles.menuRouteItem}>
                            <Text style={{ ...styles.menulabelRouteItem, color: 'red' }}>
                                {`Đăng xuất`}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ScreenContainer>
    )
}

export default LibraryTab;