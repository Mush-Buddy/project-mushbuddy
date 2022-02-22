import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import styles from '../components/stylesheets/catalog_style.js';
import { getDataAPI } from '../utils/fetchData'
import { useSelector } from 'react-redux'

const MushroomCatalog = () => {
    const renderCatalogImageWithURL = (link) => {
        return (
            <View style={styles.imageContainer}>
                <Image
                    source={{uri: link}}
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

    const renderCatalogEntry = (entry) => {
        return (
            <View style={styles.catalogEntryContainer}>
                {renderCatalogImageWithURL(entry.images)}
                {renderCatalogInfo(entry.nameCommon, entry.nameScientific, entry.description)}
            </View>
        );
    }

    const { auth } = useSelector(state => state)
    const [catalog, setCatalog] = useState([])
    const [limit, setLimit] = useState(9)
    const [page, setPage] = useState(1)

    useEffect(async () => {
        const res = await getDataAPI(`catalog/?page=${page}&limit=${limit}`, auth.token)
        const newData = res.data.catalog
        console.log(catalog.length,'length','useeffect')
        if (newData.length > 0){
            setCatalog(newData);
            setPage(page+1)
            console.log(catalog.length,'length','useeffect')
        }
      }, []);

    const handleLoadMore = async () => {
        const res = await getDataAPI(`catalog/?page=${page}`, auth.token)
        const newData = res.data.catalog
        console.log(catalog.length,'length')
        console.log(newData,page,catalog)
        if (newData.length > 0){
            setCatalog( (c) => {
                return c.concat(newData)});
            setPage(page+1)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={catalog}
                renderItem={({ item }) => { return renderCatalogEntry(item); }}
                onEndReached = {handleLoadMore}
                keyExtractor={(item, index) => index}
                ItemSeparatorComponent={() => <View style={{ marginLeft: 17.5, width: '90%', height: 0.5, backgroundColor: '#222222'}} />}
            />
        </SafeAreaView>
    );
}

export default MushroomCatalog;
