import React from 'react';
import { COLORS } from '../components/stylesheets/colors';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from '../screens/auth/login'
import Register from '../screens/auth/register'

import UserProfileScreen, { screenOptions as userProfileScreenOptions } from '../screens/user/UserProfileScreen';
import UserStatsScreen, { screenOptions as userStatsScreenOptions } from '../screens/user/UserStatsScreen';
import EditProfileScreen, { screenOptions as editProfileScreenOptions } from '../screens/user/EditProfileScreen';
import AddPostScreen, { screenOptions as addPostScreenOptions } from '../screens/post/AddPostScreen';
import FindPeopleScreen from '../screens/user/FindPeopleScreen';
import MushroomCatalog from '../screens/catalog/catalog_main';
import CatalogFilter from '../screens/catalog/filter/catalog_filter';
import CatalogEntry from '../screens/catalog/catalog_entry';
import MushroomCatalogFiltered from '../screens/catalog/catalog_filterpage';
import MapNavigator from '../screens/map/map_navigator';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? COLORS.brightBlue : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.brightBlue,
};

const FindPeopleStackNavigator = createStackNavigator();

const FindPeopleNavigator = () => {
    return (
        <FindPeopleStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <FindPeopleStackNavigator.Screen
                name="Find"
                component={FindPeopleScreen}
                options={{ headerShown: false }}
            />
            <FindPeopleStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
            <FindPeopleStackNavigator.Screen
                name="UserStats"
                component={UserStatsScreen}
                options={userStatsScreenOptions}
            />
        </FindPeopleStackNavigator.Navigator>
    );
};

// const CreatePostStackNavigator = createStackNavigator();

// const CreatePostNavigator = () => {
//     return (
//         <CreatePostStackNavigator.Navigator
//             screenOptions={defaultNavOptions}
//         >
//             <CreatePostStackNavigator.Screen
//                 name="CreatePost"
//                 component={AddPostScreen}
//                 options={addPostScreenOptions}
//             />
//             <CreatePostStackNavigator.Screen
//                 name="MushroomCatalog"
//                 component={MushroomCatalog}
//                 options={{
//                     title: 'Catalog',
//                     headerStyle: {
//                         backgroundColor: 'transparent',
//                     },
//                 }}
//             />
//             <CreatePostStackNavigator.Screen
//                 name="Filter"
//                 component={CatalogFilter}
//                 options={{
//                     title: 'Catalog: Filter',
//                     headerStyle: {
//                         backgroundColor: 'transparent',
//                     },
//                 }}
//             />
//             <CreatePostStackNavigator.Screen
//                 name="Detail"
//                 component={CatalogEntry}
//                 options={{
//                     title: 'Catalog: Entry details',
//                     headerStyle: {
//                         backgroundColor: 'transparent',
//                     },
//                 }}
//             />
//             <CreatePostStackNavigator.Screen
//                 name="filteredPage"
//                 component={MushroomCatalogFiltered}
//                 options={{
//                     title: 'Catalog: Filtered',
//                     headerStyle: {
//                         backgroundColor: 'transparent',
//                     },
//                 }}
//             />
//         </CreatePostStackNavigator.Navigator>
//     );
// };

const UserStackNavigator = createStackNavigator();

const UserNavigator = () => {
    return (
        <UserStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <UserStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
             <UserStackNavigator.Screen
                name="UserStats"
                component={UserStatsScreen}
                options={userStatsScreenOptions}
            />
            <UserStackNavigator.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={editProfileScreenOptions}
            />
        </UserStackNavigator.Navigator>
    );
};

const Stack = createStackNavigator();

const CatalogNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="MushroomCatalog"
                component={MushroomCatalog}
                options={{
                    title: 'Catalog',
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                }}
            />
            <Stack.Screen
                name="Filter"
                component={CatalogFilter}
                options={{
                    title: 'Catalog: Filter',
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                }}
            />
            <Stack.Screen
                name="Detail"
                component={CatalogEntry}
                options={{
                    title: 'Catalog: Entry details',
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                }}
            />
            <Stack.Screen
                name="filteredPage"
                component={MushroomCatalogFiltered}
                options={{
                    title: 'Catalog: Filtered',
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                }}
            />
        </Stack.Navigator>
    );
};


// the navbar at the bottom of the screen.
const BottomTabNavigator = createBottomTabNavigator();

export const BottomNavigator = () => {
    return (
        <BottomTabNavigator.Navigator
            screenOptions={{
                activeTintColor: COLORS.brightBlue
            }}
        >
            <BottomTabNavigator.Screen
                name="Profile"
                component={UserNavigator}
                options={{
                    tabBarLabel: 'Profile',
                    headerShown: false,
                    tabBarIcon: (props) => (
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
                            size={24}
                            color={props.color}
                        />
                    )
                }}
            />
            <BottomTabNavigator.Screen
                name="Catalog"
                component={CatalogNavigator}
                options={{
                    tabBarLabel: 'Catalog',
                    headerShown: false,
                    tabBarIcon: (props) => (
                        <Ionicons
                            name={'newspaper'}
                            size={24}
                            color={props.color}
                        />
                    )
                }}
            />
            <BottomTabNavigator.Screen
                name="Map"
                component={MapNavigator}
                options={{
                    tabBarLabel: 'Map',
                    headerShown: false,
                    tabBarIcon: (props) => (
                        <Ionicons
                            name={'map'}
                            size={24}
                            color={props.color}
                        />
                    )
                }}
            />
            <BottomTabNavigator.Screen
                name="Community"
                component={FindPeopleNavigator}
                options={{
                    tabBarLabel: 'Community',
                    headerShown: false,
                    tabBarIcon: (props) => (
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-people' : 'ios-people'}
                            size={24}
                            color={props.color}
                        />
                    )
                }}
            />
            {/* <BottomTabNavigator.Screen
                name="Post"
                component={CreatePostNavigator}
                options={{
                    tabBarLabel: 'Post',
                    headerShown: false,
                    tabBarIcon: (props) => (
                        <Ionicons
                            name={'duplicate-outline'}
                            size={24}
                            color={props.color}
                        />
                    )
                }}
            /> */}
        </BottomTabNavigator.Navigator>
    );
};

const AuthTabNavigator = createBottomTabNavigator();

export const AuthNavigator = () => {
    return (
        <AuthTabNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <AuthTabNavigator.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false,
                    tabBarIcon: (props) => (
                        <Ionicons
                            name='person-add-outline'
                            size={24}
                            color={props.color}
                        />
                    )
                }}
            />
            <AuthTabNavigator.Screen
                name="Login"
                component={Login}
                options={{ 
                    headerShown: false,
                    tabBarIcon: (props) => (
                    <Ionicons
                        name={'log-in-outline'}
                        size={24}
                        color={props.color}
                        />
                    )
                }}
            />
        </AuthTabNavigator.Navigator>
    );
};
