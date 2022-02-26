import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import { getDataAPI } from '../utils/fetchData';

const MapPost = ({ navigation }) => {
    const { auth } = useSelector(state => state);

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
    //const [nameText, setNameText] = useState('');

    useEffect(async () => {
        const res = await getDataAPI(`catalog/?page=${page}&limit=${limit}`, auth.token);
        const newData = res.data.catalog;
        if (newData.length > 0) {
            setData(newData);
            setPage(page + 1);
            setItems(loadDataIntoItems(newData));
        }
    }, []); // this empty array (second arg.) prevents getDataAPI from being called every time a component updates

    const handleLoadMore = async () => {
        const res = await getDataAPI(`catalog/?page=${page}`, auth.token);
        const newData = res.data.catalog;
        if (newData.length > 0) {
            setData((c) => {
                return c.concat(newData);
            });
            setPage(page + 1);
        }
    }

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
            />
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

            <View style={styles.inputFieldsContainer}>

                <View style={styles.inputFieldIndividual}>
                    <Text style={styles.subheaderText}>
                        Name of the mushroom
                    </Text>
                    {/* <TextInput
                            style={styles.inputText}
                            autoCapitalize="none"
                            placeholder="Name of your mushroom..."
                            placeholderTextColor="#777777"
                            onChangeText={(newNameText) => setNameText(newNameText)}
                            defaultValue={nameText}
                            maxLength={40}
                        /> */}
                    {renderCatalogDropdown()}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputFieldsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 20,
        marginRight: 20,
    },
    inputFieldIndividual: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 15,
        marginLeft: 10,
    },
    headerText: {
        fontSize: 22.5,
        fontWeight: 'bold',
        color: '#222222',
        letterSpacing: 0.8,
    },
    subheaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 10,
    },
    bodyText: {
        fontSize: 12,
        color: '#222222',
    },
    inputText: {
        fontSize: 12,
        color: '#222222',
    },
    exitButton: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        left: 5,
    },
});

export default MapPost;
