import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as postActions from '../../store/actions/posts';
import { COLORS } from '../../components/stylesheets/colors';
import { showMessage } from "react-native-flash-message";
import RenderCatalogEntry from '../catalog/render_catalog_entry';

const AddPostScreen = (props) => {
    const { route } = props;
    const { auth } = useSelector(state => state);
    //const [title, setTitle] = useState('');
    const [mushroom, setMushroom] = useState('');
    //const [content, setContent] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const clearForm = () => {
        //setTitle('');
        setMushroom('');
        //setContent('');
        setLatitude('');
        setLongitude('');
        setIsLoading(false);
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', clearForm);
        return () => {
            unsubscribe();
        };
    }, [clearForm]);

    const validatePost = () => {
        // if (!title || title.length === 0) {
        //     showMessage({
        //         message: "Please enter a title.",
        //         type: "danger",
        //         duration: 3000,
        //         icon: { icon: "danger", position: 'left' }
        //     });
        //     return false;
        // }
        // if (!content || content.length === 0) {
        //     showMessage({
        //         message: "Please enter a description.",
        //         type: "danger",
        //         duration: 3000,
        //         icon: { icon: "danger", position: 'left' }
        //     });
        //     return false;
        // }
        if (typeof route.params === 'undefined') {
            showMessage({
                message: "Please select a mushroom.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        return true;
    }

    const createPost = async () => {
        setIsLoading(true);
        if (validatePost()) {
            //console.log("VALID POST");
            try {
                let mushroom = route.params.selectedItem._id;
                let title = route.params.selectedItem.nameCommon;
                let content = route.params.selectedItem.nameScientific;
                let postData = { title, mushroom, content };
                await dispatch(postActions.createPost({ postData, auth }));
                clearForm();
                props.navigation.navigate('Catalog');
                showMessage({
                    message: "Your post was successfully created.",
                    type: "success",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' }
                });
            } catch (error) {
                showMessage({
                    message: error.message,
                    type: "danger",
                    duration: 3000,
                    icon: { icon: "danger", position: 'left' }
                });
                console.log("ERROR ", error.message);
            }
        }
        setIsLoading(false);
    }

    const selectMushroom = () => {
        props.navigation.push('MushroomCatalog', { isSelecting: true });
    }

    const renderSelectButton = () => {
        return (
            <TouchableOpacity
                style={[styles.buttonContainer, styles.button]}
                onPress={selectMushroom}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>
                        Select mushroom from catalog
                    </Text>
                )}
            </TouchableOpacity>
        );
    }

    // const renderTitleInputField = () => {
    //     return (
    //         <View style={styles.inputField}>
    //             <Text style={styles.textLabel}>
    //                 Title
    //             </Text>
    //             <View style={styles.inputContainer}>
    //                 <TextInput
    //                     style={styles.inputs}
    //                     placeholder="Title"
    //                     underlineColorAndroid='transparent'
    //                     value={title}
    //                     onChangeText={(text) => setTitle(text)}
    //                 />
    //             </View>
    //         </View>
    //     );
    // }

    // const renderContentInputField = () => {
    //     return (
    //         <View style={styles.inputField}>
    //             <Text style={styles.textLabel}>
    //                 Content
    //             </Text>
    //             <View
    //                 style={styles.inputContainer}>
    //                 <TextInput style={styles.inputs}
    //                     placeholder="Content"
    //                     underlineColorAndroid='transparent'
    //                     value={content}
    //                     onChangeText={(text) => setContent(text)}
    //                 />
    //             </View>
    //         </View>
    //     );
    // }

    const renderLatitudeInputField = () => {
        return (
            <View style={styles.inputField} >
                <Text style={styles.textLabel}>
                    Latitude
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Latitude"
                        underlineColorAndroid='transparent'
                        value={latitude}
                        onChangeText={(text) => setLatitude(text)}
                    />
                </View>
            </View>
        );
    }

    const renderLongitudeInputField = () => {
        return (
            <View style={styles.inputField}>
                <Text style={styles.textLabel}>
                    Longitude
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputs}
                        placeholder='Longitude'
                        underlineColorAndroid='transparent'
                        value={longitude}
                        onChangeText={(text) => setLongitude(text)}
                    />
                </View>
            </View>
        );
    }

    const renderPostButton = () => {
        return (
            <TouchableOpacity
                style={[styles.buttonContainer, styles.button]}
                onPress={createPost}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>
                        Post
                    </Text>
                )}
            </TouchableOpacity>
        );
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            {route.params && <RenderCatalogEntry
                item={route.params.selectedItem}
                navigation={props.navigation}
            />}

            <KeyboardAvoidingView
                style={styles.screen}
                behavior="padding"
            >

                <View style={styles.container}>
                    {renderSelectButton()}
                    {/* {renderTitleInputField()}
                    {renderContentInputField()} */}
                    {renderLatitudeInputField()}
                    {renderLongitudeInputField()}

                    {renderPostButton()}
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export const screenOptions = {
    headerTitle: 'Create Post',
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: COLORS.BG,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputField: {
        flexDirection: 'column',
    },
    errorMsgContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#D8000C',
        backgroundColor: "#FFBABA",
        color: "#D8000C",
        borderRadius: 25,
    },
    msgText: {
        fontSize: 15,
    },
    msgIcon: {
        width: 30,
        height: 30,
        justifyContent: 'center',
    },
    labelContainer: {
        alignSelf: 'flex-start',
        marginLeft: 16,
    },
    textLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
        color: COLORS.accent,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        paddingRight: 15
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    button: {
        backgroundColor: COLORS.brightBlue,
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 10,
    },
    buttonText: {
        color: 'white',
    },
})

export default AddPostScreen;