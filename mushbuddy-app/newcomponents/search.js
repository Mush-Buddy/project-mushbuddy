import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import { getDataAPI } from '../utils/fetchData';
import { View, TextInput, FlatList, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
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

    const renderHeaderContainer = () => {
        return (
            <View style={styles.headerContainer}>
                {/* {renderHeader()} */}
                {renderSearchBar()}
                {/* {renderSearchButton()} */}
            </View>
        );
    }

    const renderSeparator = () => {
        return (
            <View style={styles.listSeparator}/>
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

    return (
        <SafeAreaView style={styles.container}>

            {renderHeaderContainer()}

            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    // TODO - Navigate to other user's profile
                    <TouchableOpacity onPress={() => console.log("pressed")}>
                        <View style={styles.listItem}>
                            <Text style={styles.listText}>
                                {item.username}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={renderSeparator}
                ListEmptyComponent={renderEmptyStatement}
            />
        </SafeAreaView>
    );
}

const MARGIN_TOP = 40;
const MARGIN_LEFT = 20;
const HEADER_HEIGHT = 40;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0ECE8',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    listSeparator: {
        height: 1,
        marginHorizontal: 5,
        backgroundColor: COLORS.GREY_3,
    },
    headerContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 10,
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
    },
    searchInput: {
        marginLeft: 20,
        fontSize: 12,
        width: '85%',
        height: 30,
    },
    searchButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: HEADER_HEIGHT,
        borderRadius: 12.5,
        backgroundColor: COLORS.GREEN,
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    listItem: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        height: 50,
    },
    listText: {
        fontSize: 16,
        color: COLORS.TEXT,
    },
    listEmptyMessage: {
        marginTop: 10,
        color: COLORS.GREY_3,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Search;