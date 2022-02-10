import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';

import styles from './stylesheets/catalog_style.js';

import SamplePhoto1 from '../assets/profile_assets/mushrooms/king_bolete.png';
import SamplePhoto2 from '../assets/profile_assets/mushrooms/chanterelle.png';
import SamplePhoto3 from '../assets/profile_assets/mushrooms/morel.jpeg';

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

    renderCatalogInfo = (name, scientificName, description) => {
        return (
            <View style={styles.infoContainer}>
                {/* <Text style={styles.headerText}>
                    {name} ({scientificName})
                </Text> */}
                <View style={styles.headerLine}>
                    <Text style={styles.headerText}>
                        {name}
                    </Text>
                    <Text style={styles.italicizedHeaderText}>
                        {scientificName}
                    </Text>
                </View>
                <Text style={styles.descriptionText}>
                    {description}
                </Text>
            </View>
        );
    }

    renderCatalogEntry = (name, scientificName, description, photo) => {
        return (
            <View style={styles.catalogEntryContainer}>
                {this.renderCatalogImage(photo)}
                {this.renderCatalogInfo(name, scientificName, description)}
            </View>
        );
    }

    render() {
        const names = ['King Bolete', 'Chanterelle', 'Morel'];
        const scientificNames = ['Boletus edulis', 'Cantharellus', 'Morchella esculenta'];
        const photos = [SamplePhoto1, SamplePhoto2, SamplePhoto3];
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    {this.renderCatalogEntry(names[0], scientificNames[0], 'this is a sample description', photos[0])}
                    {this.renderCatalogEntry(names[1], scientificNames[1], 'this is a sample description', photos[1])}
                    {this.renderCatalogEntry(names[2], scientificNames[2], 'this is a sample description', photos[2])}
                    {this.renderCatalogEntry(names[0], scientificNames[0], 'this is a sample description', photos[0])}
                    {this.renderCatalogEntry(names[1], scientificNames[1], 'this is a sample description', photos[1])}
                    {this.renderCatalogEntry(names[2], scientificNames[2], 'this is a sample description', photos[2])}
                    {this.renderCatalogEntry(names[0], scientificNames[0], 'this is a sample description', photos[0])}
                    {this.renderCatalogEntry(names[1], scientificNames[1], 'this is a sample description', photos[1])}
                    {this.renderCatalogEntry(names[2], scientificNames[2], 'this is a sample description', photos[2])}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Catalog;
