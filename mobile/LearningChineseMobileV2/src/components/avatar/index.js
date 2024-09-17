import _ from 'lodash'
import UserAvatar from 'react-native-user-avatar';
import styles from './styles';
import { Image } from 'react-native';
import { readStorageUrl } from '../../utils/readStorageUrl';

const Avatar = ({ src, fullName, size = 100, loading = false }) => {

    if (!src || src.length === 0) {
        return (
            <UserAvatar
                style={{
                    ...styles.avatar,
                    height: size,
                    width: size
                }}
                size={size}
                name={fullName}
                src={readStorageUrl(src)}
            />
        )
    }

    return (
        <Image
            style={{
                ...styles.avatar,
                borderRadius: 200,
                height: size,
                width: size
            }}
            size={size}
            name={fullName}
            src={readStorageUrl(src)}
        />
    )
}

export default Avatar;