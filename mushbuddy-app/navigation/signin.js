import React, {useState} from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';

import styles from '../components/stylesheets/signin_style';

import { ButtonGroup } from 'react-native-elements';
import CustomInput from '../components/customInput';

const onSignInPressed = () => {

}

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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

            <Pressable style={styles.buttonContainer} onPress={onSignInPressed}>
                <Text>log in</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default SignIn;