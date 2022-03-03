import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/authAction';
import { Button, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import styles from '../components/stylesheets/signup_style';

const Register = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const handleSubmit = () => {
        let userData = { email, username, password, firstName, lastName, city, state };
        dispatch(register(userData));
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
                    />

                    <TextInput
                        style={styles.textInputInRow}
                        autoCapitalize="none"
                        placeholder="Last name"
                        value={lastName}
                        onChangeText={(lastName) => setlastName(lastName)}
                        placeholderTextColor='#BDBDBD'
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
                    />

                    <TextInput
                        style={styles.textInputInRow}
                        autoCapitalize="none"
                        placeholder="State"
                        value={state}
                        onChangeText={(state) => setState(state)}
                        placeholderTextColor='#BDBDBD'
                    />
                </View>

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
                />

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
                    autoCapitalize="none"
                    placeholder="Password"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    placeholderTextColor='#BDBDBD'
                />
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
