import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SearchBar } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import { getDataAPI } from '../../utils/fetchData';

// this is probably where the old UI is contained

const MapPost = ({navigation}, props) => {
    // idk lol
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [mushrooms, setMushrooms] = useState([]);
    // dropdown setup
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    // not sure if these will be compatible --
    const [limit, setLimit] = useState(9);
    const [page, setPage] = useState(1);
    // input field setup
    const [nameText, setNameText] = useState('');

    // go back to map menu (probably gonna want to create a post here somehow)
    const returnToMap = () => {
        navigation.navigate('MapMain');
    }

    const renderUpperNavigation = () => {
        return (
            <TouchableOpacity
                onPress={() => { returnToMap(); }}
                style={styles.exitButton}
            >
                <Icon name='close' size={22.5} color='black' />
            </TouchableOpacity>
        );
    }

    // DROPDOWN PICKER --
    // Populating with duplicate values from what I assume is too many API calls
    // setItems is currently being called in useEffect

    const loadDataIntoItems = (catalogData) => {
        const currentData = catalogData;
        let loadedItems = items;
        if (typeof currentData !== 'undefined' && currentData.length > 0) {
            for (var i = 0; i < currentData.length; i++) {
                loadedItems.push({
                    label: currentData[i].nameCommon,
                    value: currentData[i]._id,
                });
            }
        }
        console.log(loadedItems);
        return loadedItems;
    }

    // onOpen & onClose functionality
    const renderCatalogDropdown = () => {
        return (
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                searchable={true}
                searchablePlaceholder="Search..."
                searchableError="No existing entries match your search."
                maxHeight={150}
                style={styles.dropDownView}
                textStyle={styles.dropDownText}
                labelStyle={styles.dropDownLabel}
                autoScroll={true}
                containerStyle={styles.dropDownContainer}
                onOpen={() => console.log('opened dropdownpicker')}
                onClose={() => console.log('closed dropdownpicker')}
                labelProps={{ numberOfLines: 1 }}
            />
        );
    }

    // INPUT FIELD --
    // Using this as a substitute for dropdown picker until that gets fixed.

    const renderInputField = () => {
        return (
            <TextInput
                style={styles.inputText}
                autoCapitalize="none"
                placeholder="Name of your mushroom..."
                placeholderTextColor="#777777"
                onChangeText={(newNameText) => setNameText(newNameText)}
                defaultValue={nameText}
                maxLength={40}
            />
        );
    }

    // TODO:
    // (1) Make the post (API call)**
    // (2) Return to map (already there, see below)
    const handleOnPressUpload = () => {
        returnToMap();
    }

    const renderUploadButton = () => {
        // TODO: Should first check if all fields have been completed
        return (
            <Pressable style={styles.uploadButton} onPress={handleOnPressUpload}>
                <Text style={styles.buttonText}>
                    Upload
                </Text>
            </Pressable>
        );
    }

    // may need to wrap all this in KeyboardAvoidingView later
    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                {renderUpperNavigation()}
                <Text style={styles.headerText}>
                    Record your findings
                </Text>
            </View>

            <View style={styles.inputFieldIndividual}>
                <Text style={styles.subheaderText}>
                    Mushroom name
                </Text>
                {/* {renderInputField()} */}
                {renderCatalogDropdown()}
            </View>

            <View style={styles.inputFieldIndividual}>
                <Text style={styles.subheaderText}>
                    Location found
                </Text>
            </View>

            <View style={styles.footerContainer}>
                {renderUploadButton()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0ECE8',
        paddingHorizontal: 15,
    },
    headerContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 30,
        //marginLeft: 10,
        borderWidth: 1,
        borderColor: 'blue',
    },
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 20,
    },
    inputFieldIndividual: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: 'green',
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#222222',
        letterSpacing: 1,
    },
    subheaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    bodyText: {
        fontSize: 12,
        color: '#222222',
    },
    inputText: {
        height: 30,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        fontSize: 12,
        color: '#222222',
    },
    exitButton: {
        position: 'absolute',
        left: 1,
    },
    uploadButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 37.5,
        borderRadius: 4,
        backgroundColor: '#59A896',
    },
    buttonText: {
        fontSize: 14,
        letterSpacing: 1,
        color: 'white',
        fontWeight: 'bold',
    },
    dropDownView: {
        backgroundColor: 'transparent',
    },
    dropDownContainer: {
        borderWidth: 1,
        borderColor: 'red',

    },
    dropDownText: {
        fontSize: 12,
    },
    dropDownLabel: {
        fontSize: 12,
    },
});

export default MapPost;
