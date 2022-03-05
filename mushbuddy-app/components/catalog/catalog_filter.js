import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../stylesheets/catalog_styles/filter_style';

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

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderUpperNavigation()}
                <Text>
                    (1) Cap: Shape, color(s)
                    (2) Gills: Present (y/n)? Attached? Type?
                    (3) Veil: Present (y/n)? Type?
                    (4) Stem: Color(s)
                    (5) Bruises: Y/N?
                    (6) Use
                </Text>
            </ScrollView>
        </View>
    );
}

export default CatalogFilter;