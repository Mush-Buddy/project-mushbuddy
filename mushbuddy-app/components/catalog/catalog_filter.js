import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../stylesheets/catalog_styles/filter_style';
import Carousel from './carousel';

const CatalogFilter = ({ navigation }) => {
    const returnToCatalog = () => {
        navigation.navigate('MushroomCatalog');
    }

    // Button to go back to viewing main catalog
    const renderUpperNavigation = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => { returnToCatalog(); }}
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

    // 10
    const capOptions = [
        {
            label: 'campanulate',
        }, {
            label: 'conical',
        }, {
            label: 'convex',
        }, {
            label: 'depressed',
        }, {
            label: 'flat',
        }, {
            label: 'infundibuliform',
        }, {
            label: 'offset',
        }, {
            label: 'ovate',
        }, {
            label: 'umbilicate',
        }, {
            label: 'umbonate',
        }
    ];

    // 8
    const gillOptions = [
        {
            label: 'adnate',
        }, {
            label: 'adnexed',
        }, {
            label: 'decurrent',
        }, {
            label: 'emarginate',
        }, {
            label: 'free',
        }, {
            label: 'seceding',
        }, {
            label: 'sinuate',
        }, {
            label: 'subdecurrent',
        }
    ];

    // 5
    const veilOptions = [
        {
            label: 'bare',
        }, {
            label: 'ring',
        }, {
            label: 'volva',
        }, {
            label: 'ring and volva',
        }, {
            label: 'cortina',
        }
    ];

    // Selectable options for cap shape (10)
    const renderCapOptions = (options) => {
        return (
            <Carousel
                style='slide'
                //itemsPerInterval={1}
                items={options}
                numItems={options.length}
                //width={width}
            />
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView showVerticalScrollIndicator={false}>
                {renderUpperNavigation()}
                <View style={styles.carouselsContainer}>
                    {renderCapOptions(capOptions)}
                </View>
            </ScrollView>
        </View>
    );
}

export default CatalogFilter;