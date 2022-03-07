import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as usersActions from '../../store/actions/users';
import Colors from '../../constants/Colors';

import { showMessage } from "react-native-flash-message";

const EditProfileScreen = (props) => {
    const { auth } = useSelector(state => state)
    const loggedUser = useSelector(state => state.auth.user);
    const users = useSelector(state => state.users.allUsers);
    const userDetails = useSelector(state => state.auth.user);
    
    const [firstName, setfirstName] = useState(userDetails.firstName);
    const [lastName, setlastName] = useState(userDetails.lastName);
    const [city, setcity] = useState(userDetails.city);
    const [state, setstate] = useState(userDetails.state);

    const [previousUpdate, setPreviousUpdate] = useState(userDetails.updatedAt);
   
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const clearForm = () => {
        setfirstName('');
        setlastName('');
        setcity('');
        setstate('');
    }

    const validatePost = () => {
        if (firstName.length < 1){
            showMessage({
                message: "Please enter a valid firstName.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if (lastName.length < 1){
            showMessage({
                message: "Please enter a valid lastName.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if (city.length < 1){
            showMessage({
                message: "Please enter a valid city.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if (state.length < 1){
            showMessage({
                message: "Please enter a valid state.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        return true;
    }


    const updatePost = async () => {
        setIsLoading(true);
        if(validatePost()){
            try {
                let userData = {firstName, lastName, city, state}
                await dispatch(usersActions.updateProfile({userData,auth}))
                clearForm()
                props.navigation.navigate('YourProfile', { screen: 'UserProfile' });
                showMessage({
                    message: "Your profile was successfully edited.",
                    type: "success",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' }
                });
            } catch (error) {
                showMessage({
                    message: error.message,
                    type: "danger",
                    icon: { icon: "danger", position: 'left' }
                });
                console.log("ERROR ",error.message);
            }
        } 
        setIsLoading(false);
    }

    return(
        <ScrollView>
            <KeyboardAvoidingView style={styles.screen} >
                <View style={styles.container}>
                    <View style={styles.labelContainer} >
                        <Text style={styles.labelText} >firstName</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="firstName"
                            underlineColorAndroid='transparent'
                            value={firstName}
                            onChangeText={(text) => setfirstName(text) }
                        />
                    </View>
                    <View style={styles.labelContainer} >
                        <Text style={styles.labelText} >lastName</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="lastName"
                            underlineColorAndroid='transparent'
                            value={lastName}
                            onChangeText={(text) => setlastName(text) }
                        />
                    </View>
                    <View style={styles.labelContainer} >
                        <Text style={styles.labelText} >state</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="State"
                            underlineColorAndroid='transparent'
                            value={state}
                            onChangeText={(text) => setstate(text) }
                        />
                    </View>
                    <View style={styles.labelContainer} >
                        <Text style={styles.labelText} >city</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="City"
                            underlineColorAndroid='transparent'
                            value={city}
                            onChangeText={(text) => setcity(text) }
                        />
                    </View>

                    <TouchableOpacity 
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={updatePost}
                    >

                        { isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        )  :(
                            <Text style={styles.loginText}>
                                Update
                            </Text>
                        ) }
                        
                    </TouchableOpacity>

                </View>   
                
            </KeyboardAvoidingView>

        </ScrollView>
    );
};

export const screenOptions = {
    headerTitle: 'Edit Profile',
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMsgContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#D8000C',
        backgroundColor: "#FFBABA" ,
        color: "#D8000C",
        borderRadius: 25,
    },
    msgText: {
        fontSize: 15,
    },
    msgIcon: {
        width: 30,
        height: 30,
        // marginLeft: 15,
        justifyContent: 'center'
    },

    labelContainer: {
        alignSelf: 'flex-start',
        marginLeft: 16
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
        color: Colors.accent
    },
    inputContainer: {
        // borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        // borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        paddingRight: 15
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: Colors.brightBlue,
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    loginText: {
        color: 'white',
    },
})

export default EditProfileScreen;