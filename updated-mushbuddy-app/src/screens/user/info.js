import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../../components/stylesheets/profile_styles/profile_style.js';

import headerBackground from '../../../assets/profile_assets/header_background2.png';

import MenuItem from "../../components/UI/MenuItem";

import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const Info = ({ id, auth, dispatch, users }) => {
    console.log(users)
    const [userData, setUserData] = useState([]);
    const [isLoading,  setIsLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        if(id === auth.user._id){
            setUserData([auth.user]);
        } else{
            const newData = users.allUsers.filter(user => user._id === id);
            setUserData(newData);
        }
    }, [id, auth, dispatch, users.allUsers]);

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

    const renderFullName = (firstName, lastName) => {
        return (
            <Text style={styles.headerText}>
                {firstName} {lastName}
            </Text>
        );
    }

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

    const renderProfileInfo = (firstName, lastName, username, userLocation) => {
        return (
            <View style={styles.userInfoContainer}>
                {renderFullName(firstName, lastName)}
                {renderUsername(username)}
                {renderUserLocation(userLocation)}
            </View>
        );
    }

    // TODO: Fix styling
    const renderFollowersFollowing = (currUser) => {
        return (
            isLoading ? ( loadingIndicator() )  :
            (<View style={{paddingRight: 20}}>
                <TouchableOpacity onPress={() => navigation.navigate(
                                            'UserStats',
                                            { activeTab: 0, currUser: currUser}
                                        )}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 12, color: 'grey' }}>Followers:{currUser.followers && currUser.followers.length}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate(
                                            'UserStats',
                                            { activeTab: 1, currUser: currUser }
                                        )}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 12, color: 'grey' }}>Following:{currUser.following && currUser.following.length}</Text>
                    </View>
                </TouchableOpacity>
            </View>)
        )
    }

    const loadingIndicator = () => {
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.upperContainer}>
            <ImageBackground source={headerBackground} resizeMode="stretch" style={styles.headerBackgroundImage}>
                <View style={styles.upperNavigation}>
                    <MenuItem/>
                </View>   
                {
                    isLoading ? ( loadingIndicator() )  :
                        userData.map(user => (<View style={styles.profileStripContainer} key={user._id}>
                            {renderProfileImage(user.avatar)}
                            {renderProfileInfo(user.firstName, user.lastName, user.username, `${user.city}, ${user.state}`,user)}
                            {renderFollowersFollowing(user)}
                        </View>
                        ))
                    
                }
            </ImageBackground>
        </View> 
    );
}

export default Info