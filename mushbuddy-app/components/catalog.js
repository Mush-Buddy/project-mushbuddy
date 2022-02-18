import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

import styles from './stylesheets/catalog_style.js';

// import SamplePhoto1 from '../assets/profile_assets/mushrooms/king_bolete.png';
// import SamplePhoto2 from '../assets/profile_assets/mushrooms/chanterelle.png';
// import SamplePhoto3 from '../assets/profile_assets/mushrooms/morel.jpeg';

import catalogData from '../assets/mushroomDict.json';

class Catalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
        this.updateSearch = this.updateSearch.bind(this);
    }

    // not currently in use ---

    updateSearch = (searchText) => {
        const formattedSearch = searchText.toLowerCase();
        this.setState({ query: formattedSearch });
    };

    renderSearchBar = () => {
        return (
            <View style={styles.searchBarContainer}>
                <SearchBar
                    placeholder="Search here..."
                    onChangeText={this.updateSearch}
                    value={this.state.query}
                    lightTheme={true}
                />
            </View>
        );
    };

    // -----

    renderCatalogImage = (photo) => {
        return (
            <View style={styles.imageContainer}>
                <Image
                    source={photo}
                    style={styles.image}
                />
            </View>
        );
    }

    renderCatalogImageWithURL = (link) => {
        return (
            <View style={styles.imageContainer}>
                <Image
                    source={{uri: link}}
                    style={styles.image}
                />
            </View>
        );
    }

    renderCatalogInfo = (name, scientificName, description) => {
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

    // renderCatalogEntry = (name, scientificName, description, photo) => {
    //     return (
    //         <View style={styles.catalogEntryContainer}>
    //             {this.renderCatalogImage(photo)}
    //             {this.renderCatalogInfo(name, scientificName, description)}
    //         </View>
    //     );
    // }

    renderCatalogEntry = (entry) => {
        return (
            <View style={styles.catalogEntryContainer}>
                {this.renderCatalogImageWithURL(entry.images)}
                {this.renderCatalogInfo(entry.nameCommon, entry.nameScientific, entry.description)}
            </View>
        );
    }

    onPressFilter = () => {
        console.log("Attempting to filter");
    }

    renderFilterButton = () => {
        return (
            <TouchableOpacity
                style={styles.filterPress}
                onPress={this.onPressFilter}
            >
                <Text>Filter</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.topNavigation}>
                    {this.renderFilterButton()}
                </View>
                {/* <ScrollView>
                    {this.renderCatalogEntry(names[0], scientificNames[0], 'this is a sample description', photos[0])}
                    {this.renderCatalogEntry(names[1], scientificNames[1], 'this is a sample description', photos[1])}
                    {this.renderCatalogEntry(names[2], scientificNames[2], 'this is a sample description', photos[2])}
                    {this.renderCatalogEntry(names[0], scientificNames[0], 'this is a sample description', photos[0])}
                    {this.renderCatalogEntry(names[1], scientificNames[1], 'this is a sample description', photos[1])}
                    {this.renderCatalogEntry(names[2], scientificNames[2], 'this is a sample description', photos[2])}
                    {this.renderCatalogEntry(names[0], scientificNames[0], 'this is a sample description', photos[0])}
                    {this.renderCatalogEntry(names[1], scientificNames[1], 'this is a sample description', photos[1])}
                    {this.renderCatalogEntry(names[2], scientificNames[2], 'this is a sample description', photos[2])}
                </ScrollView> */}
                <FlatList
                    data={catalogData}
                    renderItem={({ item }) => { return this.renderCatalogEntry(item); }}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => <View style={{ marginLeft: 17.5, width: '90%', height: 0.5, backgroundColor: '#222222'}} />}
                />
            </SafeAreaView>
        );
    }
}

export default Catalog;
