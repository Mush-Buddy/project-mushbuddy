import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Map from './map.js';
import MapPost from './map_post.js';

const Stack = createStackNavigator();

const MapNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
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
                name="Post"
                component={MapPost}
                options={{
                    title: 'Map: Log a mushroom finding',
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                }}
            />
        </Stack.Navigator>
    );
};

export default MapNavigator;