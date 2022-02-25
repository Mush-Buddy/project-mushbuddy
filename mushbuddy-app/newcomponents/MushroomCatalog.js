import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, Image, SafeAreaView, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native';
import styles from '../components/stylesheets/catalog_style.js';
import { getDataAPI } from '../utils/fetchData';
import { useSelector } from 'react-redux';

const MushroomCatalog = ({ navigation }) => {
    const { auth } = useSelector(state => state);
    const [catalog, setCatalog] = useState([]);
    const [limit, setLimit] = useState(9);
    const [page, setPage] = useState(1);

    useEffect(async () => {
        const res = await getDataAPI(`catalog/?page=${page}&limit=${limit}`, auth.token);
        const newData = res.data.catalog;
        if (newData.length > 0) {
            setCatalog(newData);
            setPage(page + 1);
        }
    }, [navigation]);

    const handleLoadMore = async () => {
        const res = await getDataAPI(`catalog/?page=${page}`, auth.token);
        const newData = res.data.catalog;
        if (newData.length > 0) {
            setCatalog((c) => {
                return c.concat(newData)
            });
            setPage(page + 1)
        }
    }

    // Render methods

    const renderCatalogImageWithURL = (link) => {
        return (
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: link }}
                    style={styles.image}
                />
            </View>
        );
    }

    const renderCatalogInfo = (name, scientificName, description) => {
        return (
            <View style={styles.infoContainer}>
                <View style={styles.headerLine}>
                    <Text style={styles.headerText}>
                        {name}
                    </Text>
                    <Text style={styles.italicizedHeaderText}>
                        ({scientificName})
                    </Text>
                </View>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.descriptionText}>
                    {description}
                </Text>
            </View>
        );
    }

    // pass in entry to display
    const showCatalogEntryDetail = (entry) => {
        //console.log(entry);
        navigation.navigate('Detail', { entry });
    }

    const renderCatalogEntry = (entry) => {
        return (
            <TouchableHighlight onPress={() => { showCatalogEntryDetail(entry); }} underlayColor="transparent">
                <View style={styles.catalogEntryContainer}>
                    {renderCatalogImageWithURL(entry.images)}
                    {renderCatalogInfo(entry.nameCommon, entry.nameScientific, entry.description)}
                </View>
            </TouchableHighlight>
        );
    }

    const renderFilterButton = () => {
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

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={catalog}
                renderItem={({ item }) => { return renderCatalogEntry(item); }}
                onEndReached={handleLoadMore}
                keyExtractor={(item, index) => index}
                ItemSeparatorComponent={() => <View style={{ marginLeft: 17.5, width: '90%', height: 0.5, backgroundColor: '#222222' }}/>}
                ListHeaderComponent={renderFilterButton()}
                stickyHeaderIndices={[0]}
            />
        </SafeAreaView>
    );
}

export default MushroomCatalog;
