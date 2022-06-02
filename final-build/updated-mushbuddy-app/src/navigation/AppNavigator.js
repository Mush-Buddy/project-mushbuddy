import React from 'react';
import { BottomNavigator, AuthNavigator } from './SocialAppNavigator';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

const AppNavigator = (props) => {
    const isAuth = useSelector(state => !!state.auth.token);
    
    return (
        <NavigationContainer>
            { isAuth && <BottomNavigator/> }
            { !isAuth && <AuthNavigator/> }
        </NavigationContainer>
    );
}

export default AppNavigator;