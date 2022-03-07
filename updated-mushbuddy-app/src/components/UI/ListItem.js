import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import * as usersActions from '../../store/actions/users';
import { showMessage } from "react-native-flash-message";

const ListItem = (props) => {
    const { user } = props;

    const [isLoading, setIsLoading] = useState(false);
    const { auth } = useSelector(state => state);
    const loggedInUserId = useSelector(state => state.auth.user._id);
    const allUsers = useSelector(state => state.users.allUsers);
    const loggedInUser = useSelector(state => state.auth.user);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const checkFollow = (userId) => {
        const isFollowed = loggedInUser.following.filter(f => f._id === userId).length !== 0;
        return isFollowed;
    }

    const followUserHandler = async () => {
        if (checkFollow(user._id)) {
            showMessage({
                message: `You have unfollowed ${user.firstName}.`,
                type: "warning",
                duration: 3000,
                icon: { icon: "warning", position: 'left' }
            });
            await dispatch(usersActions.unfollowUser({ user, auth }))
        } else {
            showMessage({
                message: `You are now following ${user.firstName}.`,
                type: "success",
                duration: 3000,
                icon: { icon: "success", position: 'left' }
            });
            await dispatch(usersActions.followUser({ user, auth }));
        }
    }

    // check user._id is in following list

    const [imageUri, setImageUri] = useState(user.avatar);

    const onImageErrorHandler = () => {
        setImageUri('$https://toppng.com/uploads/preview/mushroom-11528330976u1y8bcba7o.png');
    }

    const capitalizeFirstLetterOf = (nameString) => {
        return nameString.charAt(0).toUpperCase() + nameString.slice(1);
    }

    const renderUserAvatar = (imgUri) => {
        return (
            <View style={styles.profileImageContainer}>
                <Image
                    source={{ uri: imgUri }}
                    onError={onImageErrorHandler}
                    style={styles.profileImage}
                    resizeMode='center'
                />
            </View>
        );
    }

    const renderNameAndHandle = (firstName, lastName, username) => {
        if (typeof firstName === 'undefined' || typeof lastName === 'undefined') {
            return (
                <View style={styles.userInfo}>
                    <Text style={styles.unnamedText}>
                        (Unnamed user)
                    </Text>
                    <Text style={styles.usernameText}>
                        @{username}
                    </Text>
                </View>
            );
        }
        else {
            return (
                <View style={styles.userInfo}>
                    <Text style={styles.fullnameText}>
                        {capitalizeFirstLetterOf(firstName)} {capitalizeFirstLetterOf(lastName)}
                    </Text>
                    <Text style={styles.usernameText}>
                        @{username}
                    </Text>
                </View>
            );
        }
    }

    const renderFollowUnfollowButton = () => {
        return (
            <View style={styles.buttonContainer} >
                {checkFollow(user._id) ? (
                    <TouchableOpacity
                        onPress={followUserHandler}
                        style={styles.buttonUnfollow}
                    >
                        {isLoading ? (
                            <ActivityIndicator size='small' color='white' />
                        ) : (
                            <Text style={styles.buttonUnfollowText}>
                                Unfollow
                            </Text>
                        )}
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={followUserHandler}
                        style={styles.buttonFollow}
                    >
                        {isLoading ? (
                            <ActivityIndicator size='small' color='white' />
                        ) : (
                            <Text style={styles.buttonFollowText}>
                                Follow
                            </Text>
                        )}
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    return (
        <TouchableOpacity onPress={() => navigation.push('UserProfile', { userId: user._id, name: user.firstName })}>
            <View style={styles.container}>
                {renderUserAvatar(imageUri)}
                {renderNameAndHandle(user.firstName, user.lastName, user.username)}
                {user._id !== loggedInUser._id && renderFollowUnfollowButton()}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 15,
        paddingVertical: 5,
        paddingHorizontal: 5,
        alignItems: 'center',
        height: 75,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 4
        },
        shadowOpacity: 0.2,
        shadowRadius: 7.5,
    },
    profileImageContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        marginRight: 20,
        marginLeft: 10,
    },
    profileImage: {
        flex: 1,
        width: '70%',
        height: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    text: {
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    // content: {
    //     flex: 1,
    //     marginLeft: 16,
    //     marginRight: 0,
    // },
    userInfo: {
        flexDirection: 'column',
    },
    mainContent: {
        marginRight: 60,
    },
    img: {
        height: 50,
        width: 50,
        margin: 0,
    },
    fullnameText: {
        fontSize: 13,
        color: Colors.TEXT,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    unnamedText: {
        fontSize: 13,
        color: Colors.TEXT,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    usernameText: {
        fontSize: 11,
        color: Colors.TEXT_LIGHTER,
        letterSpacing: 0.3,
    },
    timeAgo: {
        fontSize: 12,
        color: "#696969",
    },
    name: {
        fontSize: 16,
        color: "#1E90FF",
    },
    buttonContainer: {
        position: 'absolute',
        right: 0,
    },
    buttonFollow: {
        borderWidth: 1,
        borderColor: Colors.brightBlue,
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 15,
        marginRight: 5,
    },
    buttonUnfollow: {
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: Colors.brightBlue,
        padding: 10,
        borderRadius: 15,
        marginRight: 5,
    },
    buttonFollowText: {
        color: Colors.brightBlue,
        fontSize: 11,
        letterSpacing: 0.3,
    },
    buttonUnfollowText: {
        color: 'white',
        fontSize: 11,
        letterSpacing: 0.3,
    }
})

export default ListItem;