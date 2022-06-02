import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, View, TextInput, FlatList, Text, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../../components/stylesheets/search_styles/search_style';
import { COLORS } from '../../components/stylesheets/colors';
import * as usersActions from '../../store/actions/users';
import ChatListItem from '../../components/UI/ChatListItem';
import { getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'

const ChatListScreen = () => {
    const { auth } = useSelector(state => state);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [conversations, setConversations] = useState([])
    const dispatch = useDispatch()
    const isFocused = useIsFocused();

    useEffect(async ()=> {
        if (isFocused){
            setIsLoading(true)
            const res = await getDataAPI(`message/conversations`, auth.token)
            setConversations(res.data.conversations)
            setIsLoading(false)
        }
    },[isFocused])

    const renderResults = () => (
        <FlatList
            data={conversations}
            keyExtractor={(item) => item._id}
            renderItem={(c) => (
                <ChatListItem conversation={c.item}/>
            )}
            ItemSeparatorComponent={renderSeparator}
            ListEmptyComponent={renderEmptyStatement}
        />
    );

    const renderSeparator = () => {
        return (
            <View style={styles.listSeparator} />
        );
    }

    // Message to render if list is empty
    const renderEmptyStatement = () => {
        return (
            <Text style={styles.listEmptyMessage}>
                No conversations.
            </Text>
        );
    }

    const renderLoadingIndicator = () => {
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color={COLORS.GREY_1} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    { isLoading ? ( renderLoadingIndicator() ) : (renderResults())}
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

export default ChatListScreen;