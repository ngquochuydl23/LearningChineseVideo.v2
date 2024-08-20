import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import styles from "./styles";
import { colors } from "../../theme/color";
import { HelperText, TextInput } from "react-native-paper";
import { Button } from 'react-native-paper';
import { HStack } from "@react-native-material/core";
import { Formik } from "formik";
import { useState } from "react";
import { fonts } from "../../theme/fonts";
import { useNavigation } from "@react-navigation/native";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from "../../api/userApi";
import AlertDialog from "../../components/alertDialog";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [httpError, setHttpError] = useState();
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        phoneNumber: Yup
            .string()
            .length(10, 'Số điện thoại phải đủ 11 kí tự')
            .required('Vui lòng nhập số điện thoại'),
        password: Yup
            .string()
            .max(255)
            .min(8, "Mật khẩu tối thiểu 8 kí tự")
            .required('Vui lòng nhập mật khẩu')
    })

    const onSubmit = async (values) => {

        setLoading(true);
        login(values.phoneNumber, values.password)
            .then(async ({ result }) => {
                const { token, user } = result;

                await AsyncStorage.setItem('AccessToken', token);

                dispatch(setUser(user));
            })
            .catch((err) => {
                if (err === 'User does not exist') {
                    setHttpError('Người dùng chưa đăng ký.');
                } else if (err === 'Password is incorrect') {
                    setHttpError('Mật khẩu không đúng! Vui lòng thử lại.');
                } else {
                    setHttpError('Đã có lỗi từ máy chủ! Vui lòng thử lại');
                }
            })
            .finally(() => setLoading(false));
    }

    return (
        <ScreenContainer>
            <ScrollView>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/hayugo-logo.png')} />

                </View>
                <Text style={styles.loginTitle}>Đăng nhập</Text>
                <HStack ml={20}>
                    <Text style={styles.loginSubtitle}>Chưa có tài khoản?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp")}>
                        <Text
                            style={{
                                ...styles.loginSubtitle,
                                color: colors.primaryColor,
                                fontFamily: fonts.Medium
                            }}> Đăng ký
                        </Text>
                    </TouchableOpacity>
                </HStack>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{
                        phoneNumber: '',
                        password: ''
                    }}
                    onSubmit={onSubmit}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <View>
                            <TextInput
                                label={
                                    <Text style={styles.loginFieldLabel}>  Số điện thoại</Text>
                                }
                                focusable
                                dense
                                onChangeText={handleChange('phoneNumber')}
                                onBlur={handleBlur('phoneNumber')}
                                mode="outlined"
                                error={Boolean(errors.phoneNumber)}
                                keyboardType="phone-pad"
                                contentStyle={{ paddingLeft: 15 }}
                                selectionColor={colors.primaryColor}
                                cursorColor={colors.primaryColor}
                                activeOutlineColor={colors.primaryColor}
                                outlineColor={colors.borderColor}
                                outlineStyle={{
                                    borderRadius: 30,
                                    backgroundColor: colors.background
                                }}
                                style={{
                                    ...styles.loginField,
                                    marginTop: 30
                                }}
                                value={values.phoneNumber}
                                disabled={loading} />
                            <HelperText
                                style={styles.loginFieldHelperText}
                                type="error"
                                visible={errors.phoneNumber}>
                                {errors.phoneNumber}
                            </HelperText>
                            <TextInput
                                secureTextEntry={true}
                                label={
                                    <Text style={styles.loginFieldLabel}>  Mật khẩu</Text>
                                }
                                focusable
                                dense
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                mode="outlined"
                                keyboardType="ascii-capable"
                                error={errors.password}
                                contentStyle={{ paddingLeft: 15 }}
                                activeOutlineColor={colors.primaryColor}
                                outlineColor={colors.borderColor}
                                outlineStyle={{
                                    borderRadius: 30,
                                    backgroundColor: colors.background
                                }}
                                style={{
                                    ...styles.loginField,
                                    marginTop: 5
                                }}
                                disabled={loading}
                                value={values.password} />
                            <HelperText
                                style={styles.loginFieldHelperText}
                                type="error"
                                visible={errors.password}>
                                {errors.password}
                            </HelperText>
                            <Button
                                elevation={0}
                                loading={loading}
                                disabled={loading}
                                onPress={handleSubmit}
                                contentStyle={{ marginTop: 5 }}
                                labelStyle={styles.loginButtonContent}
                                mode="contained"
                                buttonColor={colors.primaryColor}
                                textColor='#fff'
                                uppercase={false}
                                style={styles.loginButton}>
                                Đăng nhập
                            </Button>
                        </View>
                    )}
                </Formik>
                <AlertDialog
                    title={'Đăng nhập không thành công'}
                    submitTitleBtn="Ok"
                    content={httpError}
                    visible={Boolean(httpError)}
                    onDismiss={() => {
                        setHttpError(null);
                    }} />
            </ScrollView>
        </ScreenContainer>
    )
}

export default LoginScreen;