import React from 'react';
import { StatusBar, useColorScheme, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/main/MainBottomNavigation';
import { colors } from './src/theme/color';
import VideoScreen from './src/screens/video';
import { PaperProvider } from 'react-native-paper';
import WatchVideoScreen from './src/screens/watchVideo';
import SavedVocabularyScreen from './src/screens/savedVocabulary';
import { fonts } from './src/theme/fonts';
import EditProfileScreen from './src/screens/editProfile';
import LoginScreen from './src/screens/login';
import SignUpScreen from './src/screens/signUp';
import reduxStore from './src/redux/reduxStore';
import { Provider } from "react-redux";
import { useSelector } from "react-redux";


const Stack = createNativeStackNavigator();

function App() {
    //const { isLoggedIn } = useSelector((state) => state.user);
    const isDarkMode = useColorScheme() === 'dark';
    const isSignedIn = true;
    return (

        <PaperProvider>
            <NavigationContainer>
                <StatusBar
                    barStyle={'dark-content'}
                    backgroundColor={colors.background} />
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{ headerShadowVisible: false }}>
                    {isSignedIn ? (
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
                                name="SavedVocabulary"
                                component={SavedVocabularyScreen}
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
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

export default App;
