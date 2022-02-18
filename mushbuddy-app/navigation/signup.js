import React, {useState} from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';

import styles from '../components/stylesheets/signin_style';

import CustomInput from '../components/customInput';
import { useNavigation } from '@react-navigation/native';



const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const signedUp = () => {
        //TODO: validate user
        navigation.navigate('Main');
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
            
            <Pressable style={styles.buttonContainer} onPress={signedUp}
            navigation={navigation}>
                <Text>sign up</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default SignUp;