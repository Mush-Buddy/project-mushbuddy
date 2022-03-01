import React, { memo } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import styles from '../components/stylesheets/catalog_style.js';

const RenderCatalogEntry = ({item, navigation}) => {
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
    
    const showCatalogEntryDetail = ({navigation,item}) => {
        navigation.navigate('Detail', { item });
    }
    
    return (
        <TouchableHighlight onPress={() => { showCatalogEntryDetail({navigation, item}); }} underlayColor="transparent">
            <View style={styles.catalogEntryContainer}>
                {renderCatalogImageWithURL(item.images)}
                {renderCatalogInfo(item.nameCommon, item.nameScientific, item.description)}
            </View>
        </TouchableHighlight>
    );  
};

export default memo(RenderCatalogEntry);
