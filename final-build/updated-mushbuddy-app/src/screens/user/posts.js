import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, Text, View, Image, ActivityIndicator, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../../components/stylesheets/profile_styles/history_style.js';

import cameraIcon from '../../../assets/profile_assets/camera_icon.png';
import SamplePhoto1 from '../../../assets/profile_assets/mushrooms/king_bolete.png';

import * as postsActions from '../../store/actions/posts';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { getDataAPI, patchDataAPI } from '../../utils/fetchData'
import { showMessage } from "react-native-flash-message";
import LikeBtn from './likeBtn'
import { useNavigation } from '@react-navigation/native';
import { GET_USER_POSTS, SET_USER_POSTS } from '../../store/actions/users';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

const Posts = ({ id, auth, dispatch, posts }) => {
    // removed handleScroll param for now
    const navigation = useNavigation()
    const [post, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [shouldFetch, setShouldFetch] = useState(true);


    useEffect(() => {
        posts.forEach(data => {
            if(data._id === id){
                setPosts(data.posts)
                setPage(data.page)
            }
        })
    },[posts])


    useEffect(()=> {
        if (!shouldFetch) {
            return;
        }
        const handleLoadMoree = async () => {
            setShouldFetch(true)
            const res = await getDataAPI(`posts/${id}?limit=${page * 9}`, auth.token)
            const newData = {...res.data, page: page + 1, _id: id}
            dispatch({type: SET_USER_POSTS, payload: newData})
            setShouldFetch(false)
        }
        handleLoadMoree()
    },[shouldFetch])

    const handleLoadMore = useCallback(() => setShouldFetch(true), []);


    /*
    useEffect(()=> {
        setPosts(posts)
    },[posts])


    useEffect(() => {
        if (!shouldFetch) {
            return;
        }
        const get_data = async () => {
            const res = await getDataAPI(`posts/${id}?page=${page}&limit=${limit}`, auth.token)
            const newData = res.data.posts;
            setShouldFetch(false);
            dispatch({
                type: SET_USER_POSTS,
                payload: [...post, ...newData],
            });
            setPage(page + 1);
        }
        get_data()
    }, [page, shouldFetch]);

    const handleLoadMore = useCallback(() => setShouldFetch(true), []);
    */
    
    // Takes ImageSource input
    const renderImage = (photo) => {
        return (
            <View style={styles.entryImageContainer}>
                <Image
                    source={{uri : photo}}
                    style={styles.entryImage}
                />
            </View>
        );
    }

    // Calculate how many days have passed between now and the provided timestamp.
    const formatDate = (timestamp) => {
        const originalDate = new Date(timestamp);
        const currentDate = new Date();

        let timeElapsed = Math.abs(currentDate - originalDate);
        let daysPassed = Math.floor(timeElapsed / (1000 * 3600 * 24));

        return daysPassed;
    }

    const renderMushroomName = (name) => {
        return (
            <Text style={styles.entryHeaderText}>
                Found {name}
            </Text>
        );
    }

    const timeDifference = (current, previous) => {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var elapsed = current - previous;
    
        if (elapsed < msPerMinute) {
            return Math.round(elapsed/1000) + ' seconds ago';   
        }
        else if (elapsed < msPerHour) {
            return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
        else if (elapsed < msPerDay ) {
            return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed/msPerDay) + ' days ago';   
        }
        else if (elapsed < msPerYear) {
            return Math.round(elapsed/msPerMonth) + ' months ago';   
        }
        else {
            return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    };
    
    const renderDate = (timestamp) => {
        return (
            <Text style={styles.entryTimestamp}>
                {timeDifference(new Date(), new Date(timestamp))}
            </Text>
        );
    }

    const renderLocation = (location) => {
        return (
            <View style={styles.entryInfoLine}>
                <Icon name='location' size={15} color='#FFAA60' />
                <Text style={styles.entryInfoText}>
                    {location}
                </Text>
            </View>
        );
    }

    const renderPhotoTakenConfirmation = () => {
        return (
            <View style={styles.entryInfoLine}>
                <Image source={cameraIcon} style={styles.iconImage} resizeMode='center' />
                <Text style={styles.entryInfoText}>
                    Photo added to catalog
                </Text>
            </View>
        );
    }

    // Render the header & additional information of each entry.
    // HEADER: (1) Name of mushroom that was found, (2) number of days that've passed since this find was catalogued.
    // ADD'TL INFO: (1) Location of the find, (2) whether the user took a photo of the mushroom they found.
    const renderInfo = (name, timestamp, taggedLocation,curr_post) => {
        return (
            <TouchableOpacity style={styles.entryInfoContainer} onPress={() => {
                console.log("callout pressed");
                goToDetailedPost(curr_post.title, curr_post.description, curr_post.date, curr_post.images,curr_post.mushroom);
            }}>
                <View style={styles.entryHeaderLine}>
                    {renderMushroomName(name)}
                </View>

                <View style={styles.entryInfoLines}>
                    {renderLocation(taggedLocation)}
                </View>
                <View style={styles.entryInfoLines}>
                    {renderPhotoTakenConfirmation()}
                </View>
                <View style={styles.entryInfoLines}>
                    {renderDate(timestamp)}
                </View>
            </TouchableOpacity>
        );
    }

    const checkLiked = (likes,userId) => {
        const isLiked = likes.filter(f => f._id === userId).length !== 0;

        return isLiked;
    }

    const likeHandler = async (likes,userId,curr_post) => {
        console.log('likehandler')
        if (checkLiked(likes,userId)) {
            showMessage({
                message: `Unliked`,
                type: "warning",
                duration: 3000,
                icon: { icon: "warning", position: 'left' }
            });
            await patchDataAPI(`posts/unlike/${curr_post._id}`, null, auth.token)
            const postInd = post.findIndex(p => p._id === curr_post._id);
            const updatedPosts = [...post];
            updatedPosts[postInd].likes = updatedPosts[postInd].likes.filter(u => u._id !== auth.user._id);
            const newData = {posts:updatedPosts, page: page, _id: id}
            dispatch({type: SET_USER_POSTS, payload: newData})
        } else {
            showMessage({
                message: `Liked`,
                type: "success",
                duration: 3000,
                icon: { icon: "success", position: 'left' }
            });
            await patchDataAPI(`posts/like/${curr_post._id}`, null, auth.token)
            const postInd = post.findIndex(p => p._id === curr_post._id);
            const updatedPosts = [...post];
            updatedPosts[postInd].likes = updatedPosts[postInd].likes.concat(auth.user);
            const newData = {posts:updatedPosts, page: page, _id: id}
            dispatch({type: SET_USER_POSTS, payload: newData})
        }
    }

    const renderLikeButton = (likes,userId,post) => {
        return (
            <View style={styles.buttonContainer} >
                {checkLiked(likes,userId) ? (
                    <TouchableOpacity
                        style={styles.buttonUnfollow}
                        onPress={()=>likeHandler(likes,userId,post)}
                    >
                        <Ionicons 
                            name="heart"
                            size={24}
                            color={'black'}
                        />
                        <Text>{likes.length} </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.buttonFollow}
                        onPress={()=>likeHandler(likes,userId,post)}
                    >
                        <Ionicons 
                            name="heart-outline"
                            size={24}
                            color={'black'}
                        />
                        <Text>{likes.length} </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    const goToDetailedPost = (title, description, date, image, mushroom) => {
        // navigation.navigate('DetailedPost', {postTitle: title, postDesc: description});
        navigation.navigate('DetailedPost', {
          postTitle: title, postDesc: description, postDate: date, postImage: image, mushroom: mushroom
        });
      }

    const renderHistoryEntry = (name, timestamp, taggedLocation, photo,likes,userId,curr_post) => {
        return (
            <View style={styles.entryContainer} >
                {renderLikeButton(likes,userId,curr_post)}
                {renderImage(photo)}
                {renderInfo(name, timestamp, taggedLocation, curr_post)}
                <TouchableHighlight onPress={()=>{navigation.navigate('Comments', { curr_post, post, page, id })}}>
                    <View><Ionicons name="md-chatbox-outline" size={18} color="black" />
                    <Text>{curr_post.numComments} </Text></View>
                </TouchableHighlight>
            </View>
        );
    }

    const loadingIndicator = () => {
        if (shouldFetch){
            return (
                <View style={styles.centered} >
                    <ActivityIndicator size='large' color={Colors.GREY_1} />
                </View>
            );
        }
    }

    // const handleOnScroll = (event) => {
    //     handleScroll(event);
    // }

    return (
        <View style={styles.container}>
            <FlatList
                data={post}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.3}
                //onScroll={(e) => handleOnScroll(e.nativeEvent.contentOffset.y)}
                //ListHeaderComponent={renderHeader}
                //stickyHeaderIndices={[0]}
                keyExtractor={item => item._id}
                // Optimizations
                removeClippedSubviews={true}
                initialNumToRender={8}
                maxToRenderPerBatch={8}
                windowSize={11}
                renderItem={({ item }) => {
                    //console.log(item);
                    return renderHistoryEntry(item.title, item.createdAt, "Hanover, NH", item.mushroom.images,item.likes,auth.user._id,item);
                }}
            />
            {loadingIndicator()}
        </View>
    );
}

export default Posts;