import { Text, View } from "react-native"
import ScreenContainer from "../../components/ScreenContainer";
import UserAvatar from 'react-native-user-avatar';
import { useSelector } from "react-redux";
import { readStorageUrl } from "../../utils/readStorageUrl";
import styles from "./style";
import { Formik } from "formik";
import { IconButton, TextInput } from "react-native-paper";
import * as Yup from 'yup';
import { useState } from "react";
import { colors } from "../../theme/color";
import { Button } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadFile } from "../../api/storageApi";
import log from "../../logger";

const EditProfileScreen = () => {
    const { user } = useSelector((state) => state.user);

    const [loading, setLoading] = useState(false);
    const validationSchema = Yup.object({
        PhoneNumber: Yup
            .string()
            .max(11, 'Số điện thoại phải đủ 11 kí tự')
            .required('Vui lòng nhập số điện thoại'),
    })

    const onSubmit = (values) => {
        //setLoading(true);
        console.log(values);
    }

    const onAvatarEdit = () => {
        const options = {
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        log.info("Request picking image");
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {

                log.warn('User cancelled image picker');
            } else if (response.error) {

                log.error('Image picker error: ', response.error);
            } else {

                const file = response.assets[0]
                uploadFile({
                    uri: file.uri,
                    name: file.fileName,
                    type: file.type,
                })
                    .then(({ medias }) => {

                    })
                    .catch((err) => {
                        log.error(err)
                    })
            }
        });
    }

    return (
        <ScreenContainer>
            <View style={styles.avatarContainer}>
                <UserAvatar
                    style={styles.avatar}
                    size={100}
                    name={user.FullName}
                    src={readStorageUrl(user.Avatar)}
                />
                <View style={styles.uploadImgButton}>
                    <IconButton
                        onPress={onAvatarEdit}
                        size={14}
                        style={{ margin: 0 }}
                        background={colors.background}
                        mode="contained"
                        iconColor={'#696969'}
                        icon={"pencil"} />
                </View>
            </View>
            <Formik
                initialValues={{ ...user }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({ handleChange, handleBlur, handleSubmit, values, dirty }) => (
                    <View>
                        <TextInput
                            label={
                                <Text style={styles.textFieldLabel}> Họ và tên</Text>
                            }
                            focusable
                            dense
                            onChangeText={handleChange('FullName')}
                            onBlur={handleBlur('FullName')}
                            mode="outlined"
                            contentStyle={styles.textFieldContent}
                            selectionColor={colors.primaryColor}
                            cursorColor={colors.primaryColor}
                            activeOutlineColor={colors.primaryColor}
                            outlineColor={colors.borderColor}
                            outlineStyle={{
                                borderRadius: 30,
                                backgroundColor: colors.background
                            }}
                            style={{
                                ...styles.textField,
                                marginTop: 30
                            }}
                            value={values.FullName}
                            disabled={loading} />
                        <TextInput
                            label={
                                <Text style={styles.textFieldLabel}> Địa chỉ email</Text>
                            }
                            focusable
                            dense
                            onChangeText={handleChange('Email')}
                            onBlur={handleBlur('Email')}
                            mode="outlined"
                            contentStyle={styles.textFieldContent}
                            selectionColor={colors.primaryColor}
                            cursorColor={colors.primaryColor}
                            activeOutlineColor={colors.primaryColor}
                            outlineColor={colors.borderColor}
                            outlineStyle={{
                                borderRadius: 30,
                                backgroundColor: colors.background
                            }}
                            style={{
                                ...styles.textField,
                                marginTop: 20
                            }}
                            value={values.Email}
                            disabled={loading} />
                        <TextInput
                            label={
                                <Text style={styles.textFieldLabel}>  Số điện thoại</Text>
                            }
                            focusable
                            dense
                            onChangeText={handleChange('PhoneNumber')}
                            onBlur={handleBlur('PhoneNumber')}
                            mode="outlined"
                            keyboardType="phone-pad"
                            contentStyle={styles.textFieldContent}
                            selectionColor={colors.primaryColor}
                            cursorColor={colors.primaryColor}
                            activeOutlineColor={colors.primaryColor}
                            outlineColor={colors.borderColor}
                            outlineStyle={{
                                borderRadius: 30,
                                backgroundColor: colors.background
                            }}
                            style={{
                                ...styles.textField,
                                marginTop: 20
                            }}
                            value={values.PhoneNumber}
                            disabled={loading} />
                        <TextInput
                            secureTextEntry={true}
                            label={
                                <Text style={styles.textFieldLabel}>  Mật khẩu</Text>
                            }
                            focusable
                            dense
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            mode="outlined"
                            keyboardType="ascii-capable"
                            contentStyle={styles.textFieldContent}
                            activeOutlineColor={colors.primaryColor}
                            outlineColor={colors.borderColor}
                            outlineStyle={{
                                borderRadius: 30,
                                backgroundColor: colors.background
                            }}
                            style={{
                                ...styles.textField,

                                marginTop: 20
                            }}
                            disabled={loading}
                            value={values.password} />
                        <Button
                            elevation={0}
                            loading={loading}
                            disabled={loading || !dirty}
                            onPress={handleSubmit}
                            contentStyle={{ marginTop: 5 }}
                            labelStyle={styles.updateButtonContent}
                            mode="contained"
                            buttonColor={colors.primaryColor}
                            textColor='#fff'
                            uppercase={false}
                            style={styles.updateButton}>
                            Cập nhật hồ sơ
                        </Button>
                    </View>
                )}
            </Formik>
        </ScreenContainer>
    )
}

export default EditProfileScreen;