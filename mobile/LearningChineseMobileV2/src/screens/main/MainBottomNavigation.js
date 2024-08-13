import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import _ from 'lodash'
import mainRoute from "./Route";
const Tab = createBottomTabNavigator();

const MainScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarLabelStyle: {
                    fontWeight: 500,
                    color: 'gray'
                },
                // tabBarActiveTintColor: colors.primaryColor,
                // tabBarInactiveTintColor: 'gray',

            })}>
            {_.map(mainRoute, (route, index) => {
                return (
                    <Tab.Screen
                        key={index}
                        name={route.name}
                        component={route.screen}
                        options={{
                            headerShown: false,
                            tabBarLabel: route.label,
                            // tabBarIcon: ({ color, focused }) => (
                            //     <Foundation name="home" color={color} size={25} />
                            // ),
                        }}

                    />
                )
            })}
        </Tab.Navigator>
    )
}

export default MainScreen;