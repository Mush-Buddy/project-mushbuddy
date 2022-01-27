import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';

import styles from './stylesheets/catalog_style.js';

class Catalog extends Component {

    // Very rudimentary placeholder search bar

    state = {
        search: '',
    };

    handleOnChangeSearch = (search) => {
        this.setState({ search });
    };

    renderSearchBar = () => {

        const { search } = this.state;

        return (
            <View style={styles.searchBarView}>
                <SearchBar
                    placeholder="Search here..."
                    onChangeText={this.handleOnChangeSearch}
                    value={search}
                />
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>

                {this.renderSearchBar()}

                <Text>
                    Mushroom catalog here.
                </Text>
            </View>
        );
    }
}

export default Catalog;
