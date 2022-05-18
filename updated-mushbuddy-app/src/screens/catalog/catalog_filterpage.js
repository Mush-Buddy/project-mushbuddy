import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, View, Text, SafeAreaView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Tags from 'react-native-tags';

import { useSelector } from 'react-redux';
import { postDataAPI } from '../../utils/fetchData';

import RenderCatalogEntry from './render_catalog_entry';

import styles from '../../components/stylesheets/catalog_styles/catalog_style';
import { COLORS } from '../../components/stylesheets/colors.js';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const MushroomCatalogFiltered = (props) => {
    const filterParams = props.route.params;
    //console.log(filterparams)
    //const [filterParams, setFilterParams] = props.route.params;
    const navigation = useNavigation();
    const { auth } = useSelector(state => state);
    const [catalog, setCatalog] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [shouldFetch, setShouldFetch] = useState(true);

    //const [search, setSearch] = useState('');

    useEffect(() => {
        if (!shouldFetch) {
            return;
        }
        const get_data = async () => {
            const res = await postDataAPI(`catalog/?page=${page}&limit=${limit}`, filterParams, auth.token);
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
    // const handleSearch = async (e) => {
    //     console.log("handle search");
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
            <View style={styles.upperBar}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={styles.backButton}
                >
                    <Icon name='arrow-back' size={20} color='black' />
                </TouchableOpacity>
                <Text style={styles.centeredTitleText}>
                    Filtering by...
                </Text>
            </View>
        );
    }

    // filterParams as tags
    const renderFilterCriteria = () => {

        const criteriaTags = [];

        for (const [key, value] of Object.entries(filterParams)) {
            if (key === 'capShape') {
                criteriaTags.push("cap: " + `${value}`);
            } else if (key === 'gillsType') {
                criteriaTags.push("gills: " + `${value}`);
            } else {
                criteriaTags.push("veil: " + `${value}`);
            }
        }

        if (criteriaTags.length === 0) {
            return (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>
                        none
                    </Text>
                </View>
            );
        } else {
            return (
                <Tags
                    initialTags={criteriaTags}
                    maxNumberOfTags={Object.keys(filterParams).length}
                    onTagPress={(index, tagLabel, e, deleted) => {
                        console.log(index, tagLabel, e, deleted ? "deleted" : "not deleted");
                    }}
                    containerStyle={{
                        width: '100%',
                        justifyContent: "center",
                        paddingHorizontal: 50,
                        marginTop: 5,
                    }}
                    deleteTagOnPress={false}
                    readonly={true}
                    renderTag={({ tag, index, onPress }) => (
                        <View
                            key={`${tag}-${index}`}
                            //onPress={onPress}
                            style={{
                                marginLeft: 10,
                                borderWidth: 1,
                                borderColor: 'transparent',
                                borderRadius: 12,
                                backgroundColor: 'gray',
                                paddingHorizontal: 5,
                                paddingVertical: 2
                            }}
                        >
                            <Text style={{color: 'white'}}>
                                {tag}
                            </Text>
                        </View>
                    )}
                />
            );
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderUpperNavigation()}
            {renderFilterCriteria()}
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