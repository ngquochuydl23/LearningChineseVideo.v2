import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import styles from "./styles";
import { colors } from "../../theme/color";
import { TextInput } from "react-native-paper";
import { Button } from 'react-native-paper';
import { HStack } from "@react-native-material/core";
import { Formik } from "formik";
import { useState } from "react";
import { fonts } from "../../theme/fonts";
import * as Yup from 'yup';
import moment from "moment";
import { DatePickerModal } from 'react-native-paper-dates';
import { login, signUp } from "../../api/userApi";
import { setUser } from "../../redux/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import AlertDialog from "../../components/alertDialog";


const SignUpScreen = () => {
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [httpError, setHttpError] = useState();
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        phoneNumber: Yup
            .string()
            // .length(11, 'Số điện thoại phải đủ 11 kí tự')
            .required('Vui lòng nhập số điện thoại'),
        password: Yup
            .string()
            .max(255)
            .required('Vui lòng nhập mật khẩu'),
        email: Yup
            .string()
            .email('Invalid email')
            .required('Email is required'),
    })

    const onDismiss = () => {
        setOpen(false);
    };

    const onSubmit = (values) => {
        setLoading(true);
        signUp(values)
            .then(() => {
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
            })
            .catch((err) => {
                if (err === 'Email or phone number is already used') {

                    setHttpError('Số điện thoại hoặc email đã được sử dụng.');
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }
    return (
        <ScreenContainer>
            <ScrollView>
                <Text style={styles.loginTitle}>Đăng ký</Text>
                <HStack ml={20}>
                    <Text style={styles.loginSubtitle}>Đã có tài khoản?</Text>
                    <TouchableOpacity>
                        <Text
                            style={{
                                ...styles.loginSubtitle,
                                color: colors.primaryColor,
                                fontFamily: fonts.Medium
                            }}> Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </HStack>
                <Formik
                    initialValues={{
                        fullName: '',
                        phoneNumber: '',
                        email: '',
                        password: '',
                        birthday: moment(),
                        gender: 0,
                        level: 1
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                        return (
                            <View>
                                <TextInput
                                    label={
                                        <Text style={styles.loginFieldLabel}>  Họ và tên</Text>
                                    }
                                    focusable
                                    dense
                                    onChangeText={handleChange('fullName')}
                                    onBlur={handleBlur('fullName')}
                                    mode="outlined"
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
                                    value={values.fullName}
                                    disabled={loading} />
                                <TextInput
                                    label={
                                        <Text style={styles.loginFieldLabel}>  Địa chỉ email</Text>
                                    }
                                    focusable
                                    dense
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    mode="outlined"
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
                                        marginTop: 15
                                    }}
                                    value={values.email}
                                    disabled={loading} />
                                <TextInput
                                    label={
                                        <Text style={styles.loginFieldLabel}>  Số điện thoại</Text>
                                    }
                                    focusable
                                    dense
                                    onChangeText={handleChange('phoneNumber')}
                                    onBlur={handleBlur('phoneNumber')}
                                    mode="outlined"
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
                                        marginTop: 15
                                    }}
                                    value={values.phoneNumber}
                                    disabled={loading} />
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
                                    contentStyle={{ paddingLeft: 15 }}
                                    activeOutlineColor={colors.primaryColor}
                                    outlineColor={colors.borderColor}
                                    outlineStyle={{
                                        borderRadius: 30,
                                        backgroundColor: colors.background
                                    }}
                                    style={{
                                        ...styles.loginField,
                                        marginTop: 15
                                    }}
                                    disabled={loading}
                                    value={values.password} />
                                {/* <TouchableOpacity onPress={() => setOpen(true)}>
                                    <TextInput
                                        label={
                                            <Text style={styles.loginFieldLabel}>  Ngày sinh</Text>
                                        }
                                        focusable
                                        dense
                                        pointerEvents="none"
                                        onBlur={handleBlur('birthday')}
                                        mode="outlined"
                                        editable={false}
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
                                            marginTop: 15
                                        }}
                                        value={values.birthday}
                                        disabled={loading} />
                                </TouchableOpacity> */}
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
                                    Đăng ký
                                </Button>
                            </View>
                        )
                    }}
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

export default SignUpScreen;