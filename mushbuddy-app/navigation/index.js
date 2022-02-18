import React from 'react'
import {View, Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import MainTabBar from './main_tab_bar';
import SignIn from './signin';
import SignUp from './signup';
//to use navigation in any component, add the screen here and use useNavigation

const Navigation = () => {
    return (
        <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={SignIn} />
          <Stack.Screen name="Signup" component={SignUp} />

          <Stack.Screen name="Main" component={MainTabBar} />
        </Stack.Navigator>
      </NavigationContainer>
    )

}

export default Navigation;