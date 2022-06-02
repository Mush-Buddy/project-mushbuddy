import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ActivityIndicator, View, TextInput, FlatList, Text, SafeAreaView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../../components/stylesheets/search_styles/search_style';
import { COLORS } from '../../components/stylesheets/colors';
import * as usersActions from '../../store/actions/users';
import ListItemChatScreen from '../../components/UI/ListItemChatScreen';
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import socketIO from 'socket.io-client';
import { BASE_URL } from '../../utils/config'
let socket;

const FindPeopleScreen = () => {
    const { auth } = useSelector(state => state);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        socket = socketIO.connect(BASE_URL)
        socket.emit('joinUser', auth.user)
        dispatch({type: 'SOCKET', payload: socket})
    },[])

    const loadFindPeople = async () => {
        setIsLoading(true);
        try {
            const result = await dispatch(usersActions.fetchFindPeopleUsers({search:searchText,auth}));
            setData(result);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }

    const capitalizeFirstLetterOf = (nameString) => {
        return nameString.charAt(0).toUpperCase() + nameString.slice(1);
    }

    const renderResults = () => (
        <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={(user) => (
                <ListItemChatScreen user={user.item} />
            )}
            ItemSeparatorComponent={renderSeparator}
            ListEmptyComponent={renderEmptyStatement}
        />
    );

    
    const renderChatButton = () => {
        return (
            <View>
                <TouchableOpacity onPress={() => navigation.push('ChatList')}>
                    <Ionicons name="ios-chatbubbles-outline" size={40} color="black" />
                </TouchableOpacity>
            </View>
        );
    }

    const renderHeaderContainer = () => {
        return (
            <View style={styles.headerContainer}>
                {renderSearchBar()}
                {renderChatButton()}
            </View>
        );
    }

    const renderSearchBar = () => {
        return (
            <View style={styles.searchBar}>

                <Icon name='search-outline' size={20} color={COLORS.GREY_3} />

                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder='Search users...'
                    placeholderTextColor={COLORS.GREY_3}
                    maxLength={16}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    style={styles.searchInput}
                    clearButtonMode='always'
                    returnKeyType='next'
                    onSubmitEditing={() => {
                        loadFindPeople()
                    }}
                    blurOnSubmit={true}
                />

            </View>
        );
    }

    const renderSeparator = () => {
        return (
            <View style={styles.listSeparator} />
        );
    }

    // Message to render if list is empty
    const renderEmptyStatement = () => {
        return (
            <Text style={styles.listEmptyMessage}>
                No users with this username were found.
            </Text>
        );
    }

    const renderLoadingIndicator = () => {
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color={COLORS.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    {renderHeaderContainer()}
                    { isLoading ? ( renderLoadingIndicator() ) : (renderResults())}
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

export default FindPeopleScreen;
