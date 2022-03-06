import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { View, TextInput, FlatList, Text, SafeAreaView, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { getDataAPI } from '../../utils/fetchData';

import styles from '../stylesheets/search_styles/search_style';
import { COLORS } from '../stylesheets/colors';

var hasNotSearched = true;

const Search = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleSearch = async (e) => {
        if (!search) return;
        
        hasNotSearched = false;

        try {
            const res = await getDataAPI(`users/?username=${search}`, auth.token);
            //console.log(res);
            setUsers(res.data.users);
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg }
            });
        }
    }

    const capitalizeFirstLetterOf = (nameString) => {
        return nameString.charAt(0).toUpperCase() + nameString.slice(1);
    }

    const renderHeaderContainer = () => {
        return (
            <View style={styles.headerContainer}>
                {renderSearchBar()}
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
                    value={search}
                    onChangeText={(search) => setSearch(search)}
                    style={styles.searchInput}
                    clearButtonMode='always'
                    returnKeyType='next'
                    onSubmitEditing={() => {
                        handleSearch()
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
        console.log(hasNotSearched);
        if(hasNotSearched) return (
            <Text style={styles.listEmptyMessage}>
               Search for a user!
            </Text>
        );
        else return (
            <Text style={styles.listEmptyMessage}>
                No users with this username were found.
            </Text>
        );
    }

    const renderUserAvatar = (imgUri) => {
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

    return (
        <SafeAreaView style={styles.container}>

            {renderHeaderContainer()}

            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    // TODO - Navigate to other user's profile
                    <TouchableOpacity onPress={() => console.log(item)}>
                        <View style={styles.listItem}>
                            {renderUserAvatar(item.avatar)}
                            {renderNameAndHandle(item.firstName, item.lastName, item.username)}
                        </View>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={renderSeparator}
                ListEmptyComponent={renderEmptyStatement}
            />
        </SafeAreaView>
    );
}

export default Search;