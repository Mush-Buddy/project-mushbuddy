import React, { useState, useCallback, useEffect } from 'react';
import {  StyleSheet, Text, View,FlatList, TextInput, KeyboardAvoidingView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch} from 'react-redux'
import Colors from '../../constants/Colors';
import { getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import Comment from './Comment';
import { SET_USER_POSTS } from '../../store/actions/users';

const CommentsScreen = (props) => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    console.log(props)
    const { route } = props;
    const post = route.params.curr_post;
    const posts = route.params.post;
    const page = route.params.page;
    const id = route.params.id;
    const dispatch = useDispatch()
    const { auth } = useSelector(state => state);
    const [comments, setComments] = useState([]);

    const [shouldFetch, setShouldFetch] = useState(true);

    useEffect(() => {
        if (!shouldFetch) {
            return;
        }
        const get_data = async () => {
            const res = await getDataAPI(`comment/${post._id}`, auth.token)
            const newData = res.data.comments;
            setShouldFetch(false);
            setComments(oldData => [...oldData, ...newData]);
        }
        get_data()
    }, []);


    const createCommentHandler = async () => {
        if(text.length === 0){
            Alert.alert(
                'Please enter some text',
                'Cannot create empty comment',
                [{ text: 'Okay' }]
            );
        }else {
            setIsLoading(true);
            const newComment = {
                content: text,
                user: auth.user._id,
                postId: post._id

            }
            const new_Comment = await postDataAPI('comment',newComment, auth.token);
            console.log(new_Comment)
            setText('')
            setComments(oldData => [new_Comment.data.newComment,...oldData]);
            
            const postInd = posts.findIndex(p => p._id === post._id);
            const updatedPosts = [...posts];
            updatedPosts[postInd].numComments = updatedPosts[postInd].numComments + 1
            const newData = {posts:updatedPosts, page: page, _id: id}
            dispatch({
                type: SET_USER_POSTS,
                payload: newData,
            });


            setIsLoading(false);
        }
    }

    return(
        <View style={{flex:1}}>
            <KeyboardAvoidingView>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Leave a comment"
                        value={text}
                        onChangeText={(value) => setText(value)}
                    />
                    <View 
                        style={styles.postButtonContainer}
                    >
                        <TouchableOpacity
                            onPress={createCommentHandler}
                        >
                            { isLoading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text style={{ color: '#fff' }} >Post</Text>
                            ) }
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
            <FlatList
                style={styles.root}
                data={comments}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.separator} />
                    )
                }}
                keyExtractor={(item) => {
                    return item._id;
                }}
                renderItem={(item) => {
                    const comment = item.item;
                    return(
                        <Comment comment={comment}/>
                    );
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        marginBottom: 45
    },
    inputs: {
        height: 45,
        width: '85%',
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        paddingRight: 20
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        width: '100%',
        height: 45,
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
    postButtonContainer: {
        position: 'absolute', 
        right: 0, 
        height: 45,
        width: '15%' , 
        backgroundColor: Colors.brightBlue, 
        padding: 5, 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CommentsScreen;