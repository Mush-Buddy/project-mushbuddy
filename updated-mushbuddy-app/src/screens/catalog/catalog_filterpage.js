import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, View, Text, SafeAreaView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useSelector } from 'react-redux';
import { getDataAPI, postDataAPI } from '../../utils/fetchData';

import RenderCatalogEntry from './render_catalog_entry';

import styles from '../../components/stylesheets/catalog_styles/catalog_style';
import { COLORS } from '../../components/stylesheets/colors.js';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const MushroomCatalogFiltered = (props) => {
    const filterparams = props.route.params;
    //console.log(filterparams)
    const navigation = useNavigation();
    const { auth } = useSelector(state => state);
    const [catalog, setCatalog] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [shouldFetch, setShouldFetch] = useState(true);

    const [search, setSearch] = useState('');

    console.log(filterparams);
    useEffect(() => {
        if (!shouldFetch) {
            return;
        }
        const get_data = async () => {
            const res = await postDataAPI(`catalog/?page=${page}&limit=${limit}`, filterparams, auth.token);
            // console.log('called', page)
            // console.log(res.data)
            const newData = res.data.catalog;
            setShouldFetch(false);
            setCatalog(oldData => [...oldData, ...newData]);
            setPage(page + 1);
        }
        get_data();
    }, [page, shouldFetch]);

    const handleLoadMore = useCallback(() => setShouldFetch(true), []);

    // TODO: Fill this out
    // Reference search.js (users) & map_post (catalog search but w/ dropdownpicker)
    const handleSearch = async (e) => {
        console.log("handle search");
    }

    // HEADER

    // const renderHeader = () => {
    //     return (
    //         <View style={styles.headerContainer}>
    //             {renderSearchBar()}
    //             {renderFilterButton()}
    //         </View>
    //     );
    // }

    const loadingIndicator = () => {
        if (shouldFetch) {
            return (
                <View style={styles.centered} >
                    <ActivityIndicator size='large' color={Colors.primary} />
                </View>
            );
        }
    }

    // TODO
    // const renderSearchBar = () => {
    //     return (
    //         <View style={styles.searchBar}>

    //             <Icon name='search-outline' size={20} color={COLORS.GREY_3} />

    //             <TextInput
    //                 autoCapitalize='none'
    //                 autoCorrect={false}
    //                 placeholder='Search catalog...'
    //                 placeholderTextColor={COLORS.GREY_3}
    //                 maxLength={16}
    //                 value={search}
    //                 onChangeText={(search) => setSearch(search)}
    //                 style={styles.searchInput}
    //                 clearButtonMode='always'
    //                 returnKeyType='next'
    //                 onSubmitEditing={() => {
    //                     handleSearch()
    //                 }}
    //                 blurOnSubmit={true}
    //             />

    //         </View>
    //     );
    // }

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

    const renderUpperNavigation = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={styles.backButton}
                >
                    <Icon name='arrow-back' size={30} color='black' />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Filter
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderUpperNavigation()}
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
            {loadingIndicator()}
        </SafeAreaView>
    );
}

export default MushroomCatalogFiltered;