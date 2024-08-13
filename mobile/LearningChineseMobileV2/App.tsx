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


const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <PaperProvider>
            <NavigationContainer>
                <StatusBar
                    barStyle={'dark-content'}
                    backgroundColor={colors.background} />
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Main"
                        component={MainScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen
                        name="Video"
                        component={VideoScreen}
                        options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>

    );
}

export default App;
