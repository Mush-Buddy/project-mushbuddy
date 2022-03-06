import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useSelector } from 'react-redux';
import { getDataAPI } from '../../utils/fetchData';

import RenderCatalogEntry from './render_catalog_entry';

//import styles from '../stylesheets/catalog_styles/catalog_style.js';
import styles from '../stylesheets/catalog_styles/catalog_style';
import { COLORS } from '../stylesheets/colors.js';

// import { GLOBALTYPES } from '../redux/actions/globalTypes';
// import { useDispatch } from 'react';

const MushroomCatalog = ({ navigation }) => {
    const { auth } = useSelector(state => state);
    const [catalog, setCatalog] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [shouldFetch, setShouldFetch] = useState(true);

    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!shouldFetch) {
            return;
        }
        const get_data = async () => {
            const res = await getDataAPI(`catalog/?page=${page}&limit=${limit}`, auth.token);
            // console.log('called', page);
            // console.log(res.data);
            const newData = res.data.catalog;
            setShouldFetch(false);
            setCatalog(oldData => [...oldData, ...newData]);
            setPage(page + 1);
        }
        get_data()
    }, [page, shouldFetch]);

    const handleLoadMore = useCallback(() => setShouldFetch(true), []);

    // TODO: Fill this out
    // Reference search.js (users) & map_post (catalog search but w/ dropdownpicker)
    const handleSearch = async (e) => {
        console.log("handle search");
    }

    // HEADER

    const renderHeader = () => {
        if (shouldFetch) {
            return (
                <View style={styles.loadingContainer}>
                    <Text>
                        Loading catalog...
                    </Text>
                </View>
            );
        }
        else {
            return (
                <View style={styles.headerContainer}>
                    {renderSearchBar()}
                    {renderFilterButton()}
                </View>
            );
        }
    }

    // TODO
    const renderSearchBar = () => {
        return (
            <View style={styles.searchBar}>

                <Icon name='search-outline' size={20} color={COLORS.GREY_3} />

                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder='Search catalog...'
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

    const navigateToFilterPage = () => {
        navigation.navigate('Filter');
    }

    const renderFilterButton = () => {
        return (
            <TouchableOpacity
                onPress={() => { navigateToFilterPage(); }}
            >
                <Icon name='filter' size={20} color='black' />
            </TouchableOpacity>
        );
    }

    // LIST

    const renderSeparator = () => {
        return (
            <View style={{ marginLeft: 17.5, width: '90%', height: 0.5, backgroundColor: '#222222' }} />
        );
    }

    const renderListItem = ({ item }) => (
        <RenderCatalogEntry item={item} navigation={navigation} />
    )

    const getItemLayout = (data, index) => (
        { length: 100, offset: 100 * index, index }
    );

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <FlatList
                data={catalog}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ItemSeparatorComponent={renderSeparator}
                //ListHeaderComponent={renderHeader}
                //stickyHeaderIndices={[0]}
                keyExtractor={item => item._id}
                // Optimizations
                removeClippedSubviews={true}
                initialNumToRender={8}
                maxToRenderPerBatch={8}
                windowSize={11}
                getItemLayout={getItemLayout}
                renderItem={renderListItem}
            />
        </SafeAreaView>
    );
}

export default MushroomCatalog;