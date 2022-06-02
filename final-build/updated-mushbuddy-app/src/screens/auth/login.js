import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../../store/actions/auth';
import { Text, TextInput, View, KeyboardAvoidingView, SafeAreaView, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../../components/stylesheets/auth_styles/login_style';

const Login = () => {
    const dispatch = useDispatch();
    //const authStatus = useSelector(state => state.auth.error);
    const [error, setError] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-outline');

    const passwordInputRef = useRef();

    const handleSubmit = async () => {
        let userData = { username, password };
        const result = await dispatch(signin(userData));

        // If a string is returned, then we know it's an error message.
        // Display the error message in the UI.
        if (typeof result === 'string') {
            setError(result);
            //console.log(result);
        }
    }

    const renderLoginError = () => {
        if (error != '') {
            if (error == 'wrong_username') {
                return (
                    <Text style={styles.errorText}>
                        The username you entered does not match our records.
                        Please double-check and try again.
                    </Text>
                );
            } else {
                return (
                    <Text style={styles.errorText}>
                        The password you entered does not match our records.
                        Please double-check and try again.
                        (Remember that passwords are case-sensitive.)
                    </Text>
                );
            }
        }
    }

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye-outline') {
            setRightIcon('eye-off-outline');
        } else if (rightIcon === 'eye-off-outline') {
            setRightIcon('eye-outline');
        }
        setPasswordVisibility(!passwordVisibility);
    }

    const renderHeader = () => {
        return (
            <Text style={styles.headerText}>
                Log in
            </Text>
        );
    }

    const renderInputFields = () => {
        return (
            <View style={styles.fieldsContainer}>
                {renderUsernameInputField()}
                {renderPasswordInputField()}
            </View>
        );
    }

    const renderUsernameInputField = () => {
        return (
            <View style={styles.inputField}>

                <Text style={styles.subheaderText}>
                    Username
                </Text>

                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={(username) => setUsername(username)}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        passwordInputRef.current.focus();
                    }}
                    blurOnSubmit={false}
                    maxLength={16}
                    placeholderTextColor='#BDBDBD'
                />
            </View>
        );
    }

    const renderPasswordInputField = () => {
        return (
            <View style={styles.inputField}>

                <Text style={styles.subheaderText}>
                    Password
                </Text>
                
                <View style={styles.passwordField}>
                    <TextInput
                        style={styles.textInput}
                        ref={passwordInputRef}
                        autoCapitalize="none"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        maxLength={30}
                        placeholderTextColor='#BDBDBD'
                        secureTextEntry={passwordVisibility}
                    />

                    <TouchableOpacity
                        onPress={handlePasswordVisibility}
                        style={styles.toggleButton}
                    >
                        <Icon name={rightIcon} size={18} color='black' />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const renderLoginButton = () => {
        return (
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => handleSubmit()}
            >
                <Text style={styles.buttonText}>
                    Log in
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {renderHeader()}
                    {renderInputFields()}
                    {renderLoginError()}
                    <View style={styles.bottomContainer}>
                        {renderLoginButton()}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

export default Login;