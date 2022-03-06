import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../stylesheets/profile_styles/profile_style.js';

import headerBackground from '../../assets/profile_assets/header_background2.png';
//import defaultIcon from '../../assets/profile_assets/icon_default.png';

const Info = ({ id, auth, dispatch }) => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (id === auth.user._id) {
            setUserData([auth.user]);
        }
    }, [id, auth, dispatch]);

    const renderProfileImage = (imgUri) => {
        return (
            <View style={styles.profileImageContainer}>
                <Image
                    source={{ uri: imgUri }}
                    style={styles.profileImage}
                    resizeMode='center'
                />
            </View>
        );
    }

    // const renderUserName = (userName) => {
    //     return (
    //         <Text style={styles.headerText}>
    //             {userName}
    //         </Text>
    //     )
    // }

    const renderFullName = (firstName, lastName) => {
        return (
            <Text style={styles.headerText}>
                {firstName} {lastName}
            </Text>
        );
    }

    // const renderUserHandle = (userHandle) => {
    //     return (
    //         <Text style={styles.subheaderText}>
    //             @ {userHandle}
    //         </Text>
    //     );
    // }

    const renderUsername = (username) => {
        return (
            <Text style={styles.subheaderText}>
                @ {username}
            </Text>
        );
    }

    const renderUserLocation = (userLocation) => {
        return (
            <View style={styles.locationLine}>
                <Icon name='location' size={14} color='#FFAA60' />
                <Text> {userLocation}</Text>
            </View>
        );
    }

    // const renderProfileInfo = (userName, userHandle, userLocation) => {
    //     return (
    //         <View style={styles.userInfoContainer}>
    //             {renderUserName(userName)}
    //             {renderUserHandle(userHandle)}
    //             {renderUserLocation(userLocation)}
    //         </View>
    //     );
    // }

    const renderProfileInfo = (firstName, lastName, username, userLocation) => {
        return (
            <View style={styles.userInfoContainer}>
                {renderFullName(firstName, lastName)}
                {renderUsername(username)}
                {renderUserLocation(userLocation)}
            </View>
        );
    }

    return (

        <View style={styles.upperContainer}>
            <ImageBackground source={headerBackground} resizeMode="stretch" style={styles.headerBackgroundImage}>

                <View style={styles.upperNavigation}>
                    <Icon name='cog' size={24} color='white' />
                </View>

                {
                    userData.map(user => (<View style={styles.profileStripContainer} key={user._id}>
                        {renderProfileImage(user.avatar)}
                        {/* {renderProfileInfo(user.username, "test_handle", "test_location")} */}
                        {renderProfileInfo(user.firstName, user.lastName, user.username, "test_location")}
                        {/* {console.log(user)} */}
                    </View>
                    ))
                }

            </ImageBackground>
        </View>
    );
}

export default Info