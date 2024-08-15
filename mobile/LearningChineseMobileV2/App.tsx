import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
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


const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <PaperProvider>
            <NavigationContainer>
                <StatusBar
                    barStyle={'dark-content'}
                    backgroundColor={colors.background} />
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{ headerShadowVisible: false }}>
                    <Stack.Screen
                        name="Main"
                        component={MainScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen
                        name="Video"
                        component={VideoScreen}
                        options={{ headerShown: false }} />
                    {/* <Stack.Screen
                        name="WatchVideo"
                        component={WatchVideoScreen}
                        options={{ headerShown: false }} /> */}EditProfileScreen
                    <Stack.Screen
                        name="SavedVocabulary"
                        component={SavedVocabularyScreen}
                        options={{

                            headerShown: true,
                            cardShadowEnabled: false,
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
                            cardShadowEnabled: false,
                            headerTitleStyle: {
                                fontFamily: fonts.Medium,
                                fontSize: 18
                            },
                            title: 'Chỉnh sửa hồ sơ'
                        }} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>

    );
}

export default App;
