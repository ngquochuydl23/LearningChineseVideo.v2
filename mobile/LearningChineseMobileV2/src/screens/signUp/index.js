import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
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

const SignUpScreen = () => {

    const validationSchema = Yup.object({
        phoneNumber: Yup
            .string()
            .max(11, 'Số điện thoại phải đủ 11 kí tự')
            .required('Vui lòng nhập số điện thoại'),
        password: Yup
            .string()
            .max(255)
            .required('Vui lòng nhập mật khẩu')
    })

    const [loading, setLoading] = useState(false);
    const onSubmit = (values) => {
        //setLoading(true);
        console.log(values);
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
                        phoneNumber: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <TextInput
                                label={
                                    <Text style={styles.loginFieldLabel}>  Họ và tên</Text>
                                }
                                focusable
                                dense
                                onChangeText={handleChange('phoneNumber')}
                                onBlur={handleBlur('phoneNumber')}
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
                                value={values.phoneNumber}
                                disabled={loading} />
                            <TextInput
                                label={
                                    <Text style={styles.loginFieldLabel}>  Địa chỉ email</Text>
                                }
                                focusable
                                dense
                                onChangeText={handleChange('phoneNumber')}
                                onBlur={handleBlur('phoneNumber')}
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
                                value={values.phoneNumber}
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
                    )}
                </Formik>

            </ScrollView>
        </ScreenContainer>
    )
}

export default SignUpScreen;