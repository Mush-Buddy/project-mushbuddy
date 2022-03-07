import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

// import ENV from '../../env';
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import * as usersActions from '../../store/actions/users';
import { showMessage } from "react-native-flash-message";
// import VerifiedUser from '../../constants/VerifiedUser';
import { Octicons } from '@expo/vector-icons';



const ListItem = (props) => {
    const { user } = props;

    const [isLoading, setIsLoading] = useState(false);
    const { auth } = useSelector(state => state);
    const loggedInUserId = useSelector(state => state.auth.user._id);
    const allUsers = useSelector(state => state.users.allUsers);
    const loggedInUser = useSelector(state => state.auth.user);
    // currUser following list

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const checkFollow = (userId) => {
        const isFollowed = loggedInUser.following.filter(f => f._id === userId).length !== 0;
        return isFollowed;
    }

    const followUserHandler = async () => {
        // setIsLoading(true);
        if(checkFollow(user._id)){
            showMessage({
                message: `Your have unfollowed ${user.firstName}.`,
                type: "warning",
                duration: 3000,
                icon: { icon: "warning", position: 'left' }
            });
            await dispatch(usersActions.unfollowUser({ user, auth }))
        } else {
            showMessage({
                message: `Your are now following ${user.firstName}.`,
                type: "success",
                duration: 3000,
                icon: { icon: "success", position: 'left' }
            });
            await dispatch(usersActions.followUser({ user, auth }))
        }
        // setIsLoading(false);
    }




    // check user._id is in following list

    const [imageUri, setImageUri] = useState(user.avatar);


    const onImageErrorHandler = () => {
        setImageUri('$https://toppng.com/uploads/preview/mushroom-11528330976u1y8bcba7o.png')
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageUri }} 
                onError={onImageErrorHandler}
                style={styles.avatar}
            />
            <View style={styles.content}>
                <View style={styles.mainContent}>
                    <View style={styles.text}>
                        <Text
                            onPress={() => navigation.push('UserProfile', { userId: user._id, name: user.firstName })}
                            style={styles.name}
                        >{user.username}
                        </Text>
                    </View>
                    <Text style={styles.timeAgo}>
                        { user.email }
                    </Text>
                </View>
                { user._id !== loggedInUser._id && (
                    <View style={{ position: 'absolute', right: 0}} >
                        { checkFollow(user._id) ? (
                            <TouchableOpacity
                                onPress={followUserHandler}
                                style={{  backgroundColor: Colors.brightBlue, padding: 10, borderRadius: 15 }}
                            >
                                { isLoading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={{ color: '#fff' }} >UnFollow</Text>
                                ) }
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={followUserHandler}
                                style={{  backgroundColor: Colors.brightBlue, padding: 10, borderRadius: 15 }}
                            >
                                { isLoading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={{ color: '#fff' }} >Follow</Text>
                                )}
                            </TouchableOpacity>
                        ) }
                    </View>
                ) }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "#FFFFFF",
        alignItems: 'flex-start',
      },
      avatar: {
        width:50,
        height:50,
        borderRadius:25,
        backgroundColor: '#c2c2c2'
      },
      text: {
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap:'wrap'
      },
      content: {
        flex: 1,
        marginLeft: 16,
        marginRight: 0
      },
      mainContent: {
        marginRight: 60
      },
      img: {
        height: 50,
        width: 50,
        margin: 0
      },
      attachment: {
          
      },
      separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
      },
      timeAgo:{
        fontSize:12,
        color:"#696969"
      },
      name:{
        fontSize:16,
        color:"#1E90FF"
      }
})

export default ListItem;