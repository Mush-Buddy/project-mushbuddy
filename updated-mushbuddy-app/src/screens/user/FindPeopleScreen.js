import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ActivityIndicator, View, TextInput, FlatList, Text, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../../components/stylesheets/search_styles/search_style';
import { COLORS } from '../../components/stylesheets/colors';
import * as usersActions from '../../store/actions/users';
import ListItem from '../../components/UI/ListItem';

const FindPeopleScreen = () => {
    const { auth } = useSelector(state => state);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    
    const dispatch = useDispatch();

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
                <ListItem user={user.item} />
            )}
            ItemSeparatorComponent={renderSeparator}
            ListEmptyComponent={renderEmptyStatement}
        />
    );


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
