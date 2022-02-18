import React, {useState} from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';

import styles from '../components/stylesheets/signin_style';

import CustomInput from '../components/customInput';
import { useNavigation } from '@react-navigation/native';



const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const onSignInPressed = () => {
        //TODO: validate user
        navigation.navigate('Main');
    }

    const onSignUpPressed = () => {
        //TODO: validate user
        navigation.navigate('Signup');
    }

    return (
        <SafeAreaView style={styles.content}>
            <Text style={styles.headerContainer}>Log In</Text>
            <CustomInput 
                value={username}
                setValue={setUsername}
                placeholder='Username or Email' >
            </CustomInput>
            <CustomInput 
                value={password}
                setValue={setPassword}
                placeholder='password'
                secureTextEntry={true} >
            </CustomInput>

            <Pressable style={styles.buttonContainer} onPress={onSignInPressed}
            navigation={navigation}>
                <Text>log in</Text>
            </Pressable>
            
            <Pressable style={styles.buttonContainer} onPress={onSignUpPressed}
            navigation={navigation}>
                <Text>sign up</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default SignIn;