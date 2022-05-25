import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import { getDataAPI } from '../../utils/fetchData';

// unused old UI

const DetailedPost = ({ route, navigation }) => {
    const { postTitle, postDesc, postDate, postImage } = route.params;

    // not sure what these are for
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
    
    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    {postTitle}
                </Text>
            </View>

            <View style={styles.inputFieldIndividual}>
                <Image source={{uri: postImage}}
                style={{width: 150, height: 150}} />
            </View>

            <View style={styles.inputFieldIndividual}>
                <Text style={styles.subheaderText}>
                    Details
                </Text>
                <Text style={styles.bodyText}>
                    Mushroom found on: {postDate}
                </Text> 
            </View>

            <View style={styles.inputFieldIndividual}>
                <Text style={styles.subheaderText}>
                    Description
                </Text>
                <Text style={styles.bodyText}>
                    {postDesc}
                </Text> 
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
        alignItems: 'flex-start'
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
        fontSize: 16,
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
    dropDownText: {
        fontSize: 12,
    },
    dropDownLabel: {
        fontSize: 12,
    },
});

export default DetailedPost;
