import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import _ from 'lodash'
import mainRoute from "./Route";
import { Icon } from "react-native-paper";
import { fonts } from "../../theme/fonts";
import { colors } from "../../theme/color";
import { Text } from "react-native";



const Tab = createBottomTabNavigator();

const MainScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarLabelStyle: {
                    fontWeight: 500,
                    fontFamily: fonts.Regular,
                    color: 'gray',
                    padding: 0,
                    margin: 0,
                    includeFontPadding: false
                },

                tabBarActiveTintColor: colors.primaryColor,
                tabBarInactiveTintColor: 'gray',

            })}>
            {_.map(mainRouzte, (route, index) => {
                return (
                    <Tab.Screen
                        key={index}
                        name={route.name}
                        component={route.screen}
                        options={{
                            headerShown: false,
                            tabBarLabel: route.label,
                            tabBarIcon: ({ color, focused }) => (focused
                                ? <route.activeIcon
                                    width={24}
                                    style={{ color: color }}
                                    height={24} />
                                : <route.inactiveIcon
                                    width={24}
                                    style={{ color: color }}
                                    height={24} />
                            ),
                        }}

                    />
                )
            })}
        </Tab.Navigator>
    )
}

export default MainScreen;