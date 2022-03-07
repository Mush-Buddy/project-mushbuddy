import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { signup, signin } from '../../store/actions/auth';
import { Text, TextInput, View, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../../components/stylesheets/auth_styles/signup_style';
import Login from './login';

const Register = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-outline');

    const lastNameRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = () => {
        let userData = { email, username, password, firstName, lastName, city, state };
        dispatch(signup(userData));
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
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    Create new account
                </Text>
            </View>
        );
    }

    const renderInputFields = () => {
        return (
            <View style={styles.fieldsContainer}>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeaderText}>
                        profile information.
                    </Text>
                    {renderNamesInputField()}
                    {renderLocationInputField()}
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeaderText}>
                        account credentials.
                    </Text>
                    {renderUsernameInputField()}
                    {renderEmailInputField()}
                    {renderPasswordInputField()}
                </View>

            </View>
        );
    }

    const renderNamesInputField = () => {
        return (
            <View style={styles.inputField}>

                <Text style={styles.subheaderText}>
                    Full name
                </Text>

                <View style={styles.inputRow}>

                    <TextInput
                        style={styles.textInputInRow}
                        autoCapitalize="none"
                        placeholder="First name"
                        value={firstName}
                        onChangeText={(firstName) => setfirstName(firstName)}
                        placeholderTextColor='#BDBDBD'
                        returnKeyType='next'
                        onSubmitEditing={() => {
                            lastNameRef.current.focus();
                        }}
                        blurOnSubmit={false}
                        maxLength={14}
                    />

                    <TextInput
                        style={styles.textInputInRow}
                        autoCapitalize="none"
                        placeholder="Last name"
                        value={lastName}
                        onChangeText={(lastName) => setlastName(lastName)}
                        placeholderTextColor='#BDBDBD'
                        ref={lastNameRef}
                        maxLength={14}
                        returnKeyType='next'
                        onSubmitEditing={() => {
                            cityRef.current.focus();
                        }}
                        blurOnSubmit={false}
                    />

                </View>

            </View>
        );
    }

    // TODO:
    // Replace with react-native-google-places-autocomplete (placeholder="Add your location")
    // https://www.npmjs.com/package/react-native-google-places-autocomplete

    const renderLocationInputField = () => {
        return (
            <View style={styles.inputField}>

                <Text style={styles.subheaderText}>
                    Location
                </Text>

                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.textInputInRow}
                        autoCapitalize="none"
                        placeholder="City"
                        value={city}
                        onChangeText={(city) => setCity(city)}
                        placeholderTextColor='#BDBDBD'
                        ref={cityRef}
                        maxLength={20}
                        returnKeyType='next'
                        onSubmitEditing={() => {
                            stateRef.current.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    <TextInput
                        style={styles.textInputInRow}
                        autoCapitalize="none"
                        placeholder="State"
                        value={state}
                        onChangeText={(state) => setState(state)}
                        placeholderTextColor='#BDBDBD'
                        returnKeyType='next'
                        ref={stateRef}
                        maxLength={20}
                        onSubmitEditing={() => {
                            usernameRef.current.focus();
                        }}
                        blurOnSubmit={false}
                    />
                </View>

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
                    placeholder="Username"
                    value={username}
                    onChangeText={(username) => setUsername(username)}
                    placeholderTextColor='#BDBDBD'
                    maxLength={16}
                    ref={usernameRef}
                    returnKeyType='next'
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                        emailRef.current.focus();
                    }}
                />

            </View>
        );
    }

    const renderEmailInputField = () => {
        return (
            <View style={styles.inputField}>

                <Text style={styles.subheaderText}>
                    Email address
                </Text>

                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email address"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    placeholderTextColor='#BDBDBD'
                    returnKeyType='next'
                    ref={emailRef}
                    maxLength={40}
                    onSubmitEditing={() => {
                        passwordRef.current.focus();
                    }}
                    blurOnSubmit={false}
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
                        autoCapitalize="none"
                        placeholder="Password"
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        placeholderTextColor='#BDBDBD'
                        secureTextEntry={passwordVisibility}
                        ref={passwordRef}
                        maxLength={30}
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

    const renderSignupButton = () => {
        return (
            <TouchableOpacity
                style={styles.signupButton}
                onPress={() => handleSubmit()}
            >
                <Text style={styles.buttonText}>
                    Sign up
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderHeader()}
                {renderInputFields()}
                <View style={styles.bottomContainer}>
                    {renderSignupButton()}
                </View>
            </ScrollView>
        </View>
    );
}

export default Register;