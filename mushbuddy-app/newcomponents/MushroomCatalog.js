import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, SafeAreaView, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native';
import styles from '../components/stylesheets/catalog_style.js';
import { getDataAPI } from '../utils/fetchData';
import { useSelector } from 'react-redux';
import RenderCatalogEntry from './renderCatalogEntry'

const MushroomCatalog = ({ navigation }) => {
    const { auth } = useSelector(state => state);
    const [catalog, setCatalog] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [shouldFetch, setShouldFetch] = useState(true);

    useEffect(() => {
        if (!shouldFetch) {
            return;
        }
        const get_data = async () => {
            const res = await getDataAPI(`catalog/?page=${page}&limit=${limit}`, auth.token);
            console.log('called',page)
            console.log(res.data)
            const newData = res.data.catalog;
            setShouldFetch(false);
            setCatalog(oldData => [...oldData, ...newData]);
            setPage(page + 1);
        }
        get_data()
    }, [page,shouldFetch]);

    const handleLoadMore =  useCallback (() =>  setShouldFetch(true), [])


    const renderFilterButton = () => {
        if (shouldFetch) {
            return (
                <Text>Loading...</Text>
            );
        }
        return ( 
            <View style={styles.topBar}>
                <TouchableOpacity
                    onPress={() => { }}
                // style={styles.filterButton}
                >
                    <Text style={styles.filterButtonText}>
                        Filter
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const seperator = () => {
        return (
            <View style={{ marginLeft: 17.5, width: '90%', height: 0.5, backgroundColor: '#222222' }}/>
        );
    }

    const renderItem = ({ item }) => (<RenderCatalogEntry item={item} navigation = {navigation}/>)

    const getItemLayout = (data, index) => (
        {length: 100, offset: 100 * index, index}
      );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={catalog}
                onEndReached={handleLoadMore}
                onEndReachedThreshold = {0.5}
                ItemSeparatorComponent={seperator}
                ListHeaderComponent={renderFilterButton}
                stickyHeaderIndices={[0]}
                keyExtractor = {item => item._id}
                // Optimizations
                removeClippedSubviews = {true}
                initialNumToRender = {8}
                maxToRenderPerBatch = {8}
                windowSize = {11}
                getItemLayout = {getItemLayout}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
}

export default MushroomCatalog;