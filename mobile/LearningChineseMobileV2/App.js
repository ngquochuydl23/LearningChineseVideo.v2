import React, { useEffect } from 'react';
import { StatusBar, Text, useColorScheme, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/main/MainBottomNavigation';
import { colors } from './src/theme/color';
import VideoScreen from './src/screens/video';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import WatchVideoScreen from './src/screens/watchVideo';
import { fonts } from './src/theme/fonts';
import EditProfileScreen from './src/screens/editProfile';
import LoginScreen from './src/screens/login';
import SignUpScreen from './src/screens/signUp';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout, setLoading, setUser } from './src/redux/slices/userSlice';
import SavedScreen from './src/screens/saved';
import { persistLogin } from './src/api/userApi';
import SavedDetailScreen from './src/screens/savedDetail';
import { ToastProvider } from 'react-native-paper-toast';
import VideoLikedScreen from './src/screens/liked';
const Stack = createNativeStackNavigator();

function App() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.user);
    const isDarkMode = useColorScheme() === 'dark';

    const getUser = async () => {
        const token = await AsyncStorage.getItem('AccessToken');
        if (!token) {
            await AsyncStorage.removeItem('AccessToken');

            dispatch(logout());
        } else {

            persistLogin()
                .then(({ result }) => {
                    dispatch(setUser(result));
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    useEffect(() => {
        dispatch(setLoading());
        getUser();
    }, []);

    console.log(state);
    if (state.isLoading) {
        return (
            <View>
                <StatusBar
                    barStyle={'dark-content'}
                    backgroundColor={colors.background} />
                <Text>Loading</Text>
            </View>
        )
    }

    return (
        <PaperProvider theme={DefaultTheme}>
            <ToastProvider>
                <NavigationContainer>
                    <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor={colors.background} />
                    <Stack.Navigator
                        initialRouteName="Login"
                        screenOptions={{ headerShadowVisible: false }}>
                        {!state.isLoggedIn ? (
                            <>
                                <Stack.Screen
                                    name="Login"
                                    component={LoginScreen}
                                    options={{ headerShown: false }} />
                                <Stack.Screen
                                    name="SignUp"
                                    component={SignUpScreen}
                                    options={{
                                        headerShown: true,
                                        title: ''
                                    }} />
                            </>
                        ) : (
                            <>
                                <Stack.Screen
                                    name="Main"
                                    component={MainScreen}
                                    options={{ headerShown: false }} />
                                <Stack.Screen
                                    name="Video"
                                    component={VideoScreen}
                                    options={{ headerShown: false }} />
                                <Stack.Screen
                                    name="WatchVideo"
                                    component={WatchVideoScreen}
                                    options={{ headerShown: false }} />
                                <Stack.Screen
                                    name="SavedDetail"
                                    component={SavedDetailScreen}
                                    options={{
                                        headerShown: true,
                                        headerTitleStyle: {
                                            fontFamily: fonts.Medium,
                                            fontSize: 18
                                        },
                                        title: 'Các từ đã lưu'
                                    }} />
                                <Stack.Screen
                                    name="Saved"
                                    component={SavedScreen}
                                    options={{
                                        headerShown: true,
                                        headerTitleStyle: {
                                            fontFamily: fonts.Medium,
                                            fontSize: 18
                                        },
                                        title: 'Từ vựng đã lưu'
                                    }} />
                                <Stack.Screen
                                    name="EditProfile"
                                    component={EditProfileScreen}
                                    options={{
                                        headerShown: true,
                                        headerTitleStyle: {
                                            fontFamily: fonts.Medium,
                                            fontSize: 18
                                        },
                                        title: 'Chỉnh sửa hồ sơ'
                                    }} />
                                <Stack.Screen
                                    name="VideoLiked"
                                    component={VideoLikedScreen}
                                    options={{
                                        headerShown: true,
                                        headerTitleStyle: {
                                            fontFamily: fonts.Medium,
                                            fontSize: 18
                                        },
                                        title: 'Video đã like'
                                    }} />    
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </ToastProvider>
        </PaperProvider>
    );
}

export default App;
