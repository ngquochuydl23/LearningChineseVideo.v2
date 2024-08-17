import { Text, View } from "react-native"
import ScreenContainer from "../../components/ScreenContainer";
import UserAvatar from 'react-native-user-avatar';
import { useSelector } from "react-redux";
import { readStorageUrl } from "../../utils/readStorageUrl";
import styles from "./style";

const EditProfileScreen = () => {
    const { user } = useSelector((state) => state.user);
    return (
        <ScreenContainer>
            <View style={styles.avatarContainer}>
                <UserAvatar
                    style={styles.avatar}
                    size={100}
                    name={user.FullName}
                    src={readStorageUrl("/api/bucket/665084baa340536c521c22b1/NDM5OTFhNGFmZjVlMjYyYzNkMTM2OTFiNDAwNWQ5MjkuanBn")} />
                <View style={styles.uploadImgButton}>
                    <Text>ALo</Text>
                </View>
            </View>

        </ScreenContainer>
    )
}

export default EditProfileScreen;