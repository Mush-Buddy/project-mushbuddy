import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authAction';
import { Button, Text, TextInput, View, KeyboardAvoidingView, SafeAreaView, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../components/stylesheets/login_style';

const Login = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const passwordInputRef = useRef();

    const handleSubmit = () => {
        let userData = { username, password }
        dispatch(login(userData))
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

                <TextInput
                    style={styles.textInput}
                    ref={passwordInputRef}
                    autoCapitalize="none"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    maxLength={30}
                    placeholderTextColor='#BDBDBD'
                />
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
        <View style={styles.container}>
            {renderHeader()}
            {renderInputFields()}
            <View style={styles.bottomContainer}>
                {renderLoginButton()}
            </View>
        </View>
    );
}

export default Login;