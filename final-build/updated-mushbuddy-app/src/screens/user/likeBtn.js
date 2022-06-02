import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { getDataAPI, patchDataAPI } from '../../utils/fetchData'

const LikeBtn = ({post,auth}) => {
    const [isLike, setIsLike] = useState(false)
    const [numLikes, setnumLikes] = useState(post.likes.length)
    const [loadLike, setLoadLike] = useState(false)

   
    // Likes
    useEffect(() => {
        if(post.likes.find(like => like._id === auth.user._id)){
            setIsLike(true)
        }else{
            setIsLike(false)
        }
    }, [post.likes])

    const handleLike = async () => {
        if(loadLike) return;
        setLoadLike(true)
        await patchDataAPI(`posts/like/${post._id}`, null, auth.token)
        setIsLike(true)
        setnumLikes(numLikes + 1)
        setLoadLike(false)
    }

    const handleUnLike = async () => {
        if(loadLike) return;
        setLoadLike(true)
        await patchDataAPI(`posts/unlike/${post._id}`, null, auth.token)
        setIsLike(false)
        setnumLikes(numLikes - 1)
        setLoadLike(false)
    }


    const renderFollowUnfollowButton = () => {
        return (
            <View style={styles.buttonContainer} >
                {isLike ? (
                    <TouchableOpacity
                        onPress={handleUnLike}
                        style={styles.buttonUnfollow}
                    >
                        {loadLike ? (
                            <ActivityIndicator size='small' color='white' />
                        ) : (
                            <Text style={styles.buttonUnfollowText}>
                                UnLike{numLikes}
                            </Text>
                        )}
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleLike}
                        style={styles.buttonFollow}
                    >
                        {loadLike ? (
                            <ActivityIndicator size='small' color='white' />
                        ) : (
                            <Text style={styles.buttonFollowText}>
                                Like{numLikes}
                            </Text>

                        )}
                    </TouchableOpacity>
                )}
            </View>
        );
    }
    
    return (
        renderFollowUnfollowButton()
    )
}

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

export default LikeBtn