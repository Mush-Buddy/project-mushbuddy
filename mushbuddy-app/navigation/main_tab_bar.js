import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/FontAwesome';

import Profile from '../components/profile';
import Map from '../components/map';
import Catalog from '../components/catalog';
import Community from '../components/community';

const Tab = createBottomTabNavigator();

const MainTabBar = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Search"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName;

                        if (route.name === 'Profile') {
                            iconName = 'info-circle';
                        }

                        return <Ionicons name={iconName} size={26} color={focused ? '#58AADA' : 'grey'} />;
                    },
                })}
            >
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name="Map" component={Map} />
                <Tab.Screen name="Catalog" component={Catalog} />
                <Tab.Screen name="Community" component={Community} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default MainTabBar;
