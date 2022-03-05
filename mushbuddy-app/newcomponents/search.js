import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import { getDataAPI } from '../utils/fetchData';
import { View, TextInput, FlatList, Text, Button, StyleSheet, SafeAreaView, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../components/stylesheets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Search = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleSearch = async (e) => {
        if (!search) return;
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
        return (
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

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
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
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const HEADER_HEIGHT = 40;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BG,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    listSeparator: {
        height: 1,
        marginHorizontal: 10,
        backgroundColor: COLORS.GREY_3,
        marginVertical: 6,
    },
    headerContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.GREY_3,
        height: HEADER_HEIGHT,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowRadius: 2,
        shadowOffset: { width: 3, height: 3 },
        backgroundColor: COLORS.BG,
    },
    searchInput: {
        marginLeft: 20,
        fontSize: 12,
        width: '85%',
        height: 30,
    },
    listItem: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        height: 50,
    },
    fullnameText: {
        fontSize: 14,
        color: COLORS.TEXT,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    unnamedText: {
        fontSize: 14,
        color: COLORS.TEXT,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    usernameText: {
        fontSize: 14,
        color: COLORS.TEXT_LIGHTER,
        letterSpacing: 0.3,
    },
    listEmptyMessage: {
        marginTop: 10,
        color: COLORS.GREY_3,
        fontSize: 16,
        letterSpacing: 0.5,
        textAlign: 'center',
    },
    profileImageContainer: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden',
        backgroundColor: COLORS.BG,
        marginRight: 20,
    },
    profileImage: {
        flex: 1,
        width: '70%',
        height: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    userInfo: {
        flexDirection: 'column',
    },
});

export default Search;