import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { COLORS } from '../../components/stylesheets/colors';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Map from './map.js';
import MapPost from './map_post.js';

// borrowed from other navigator
import AddPostScreen, { screenOptions as addPostScreenOptions } from '../post/AddPostScreen';
import FindPeopleScreen from '../user/FindPeopleScreen';
import MushroomCatalog from '../catalog/catalog_main';
import CatalogFilter from '../catalog/filter/catalog_filter';
import CatalogEntry from '../catalog/catalog_entry';
import MushroomCatalogFiltered from '../catalog/catalog_filterpage';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? COLORS.brightBlue : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.brightBlue,
};

const Stack = createStackNavigator();

const MapNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={defaultNavOptions}
            initialRouteName={Map}
        >
            <Stack.Screen
                name="MapMain"
                component={Map}
                options={{
                    title: 'Map',
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                }}
            />
            <Stack.Screen
                name="CreatePost"
                component={AddPostScreen}
                options={addPostScreenOptions}
            />
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




        // <Stack.Navigator
        //     screenOptions={{ headerShown: false }}
        // >
        //     <Stack.Screen
        //         name="MapMain"
        //         component={Map}
        //         options={{
        //             title: 'Map',
        //             headerStyle: {
        //                 backgroundColor: 'transparent',
        //             },
        //         }}
        //     />
        //     <Stack.Screen
        //         name="Post"
        //         component={MapPost}
        //         options={{
        //             title: 'Map: Log a mushroom finding',
        //             headerStyle: {
        //                 backgroundColor: 'transparent',
        //             },
        //         }}
        //     />
            
        // </Stack.Navigator>
    );
};

export default MapNavigator;