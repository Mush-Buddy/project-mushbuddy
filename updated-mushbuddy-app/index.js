import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainTabBar from './navigation/main_tab_bar';
import Login from './navigation/login';
import Register from './navigation/register';

import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

function Index() {
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const renderElement = () => {
        if (auth.token) {
            return (
                <NavigationContainer>
                    <MainTabBar />
                </NavigationContainer>
            );
        }
        else {
            return (
                <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name="Register" component={Register} />
                        <Tab.Screen name="Login" component={Login} />
                    </Tab.Navigator>
                </NavigationContainer>
            );
        }
    }

    return (
        renderElement()
    );
}

export default Index;