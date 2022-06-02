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
    Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as postActions from '../../store/actions/posts';
import { COLORS } from '../../components/stylesheets/colors';
import { showMessage } from "react-native-flash-message";
import RenderCatalogEntry from '../catalog/render_catalog_entry';
import ImageUpload from './ImagePicker'
// props is just all the default properties sent through navigator
const AddPostScreen = (props) => {
    const { route } = props;
    const { auth } = useSelector(state => state);
    const [mushroom, setMushroom] = useState('');

    // unused
    // const [title, setTitle] = useState('');
    //const [content, setContent] = useState('');
    // const [latitude, setLatitude] = useState('');
    // const [longitude, setLongitude] = useState('');

    const [desc, setDesc] = useState('No description entered.');
    const [images, setImages] = useState("https://www.pngitem.com/pimgs/m/114-1146463_red-mushroom-png-fantasy-mushrooms-png-transparent-png.png");
    const [postDateTime, setPostDateTime] = useState('');
    const [firstLoad, setFirstLoad] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const clearForm = () => {
        //setTitle('');
        setMushroom('');
        //setContent('');
        setDesc('');
        // setLatitude('');
        // setLongitude('');
        setIsLoading(false);
    }

    useEffect(() => {
        console.log('images',images)
    }, [images]);

    useEffect(() => {
        if (!firstLoad) {
            setFirstLoad(true);
            setPostDateTime(new Date().toLocaleString());
            console.log(postDateTime);
        }
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
        if (desc === '') {
            showMessage({
                message: "Please enter description.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        return true;
    }

    function getRandomNumberBetween(min, max){
        return Math.floor(Math.random()*(max-min+1)+min);
      }

    // post creation
    // Create a post.
    const createPost = async () => {
        setIsLoading(true);
        if (validatePost()) {
            try {
                let mushroom = route.params.selectedItem._id;
                let title = route.params.selectedItem.nameCommon;
                // basically just scientific name
                let content = route.params.selectedItem.nameScientific;
                let description = desc;
                // Currently, we just selecting a random coordinate in the area of choice. (Hanover, NH)
                let coordinate = {latitude: getRandomNumberBetween(4369475372084176, 4370692658685223,) / 100000000000000, longitude: getRandomNumberBetween(7229416723076919, 7228457748717949) / -100000000000000};
                let date = postDateTime;


                let postData = { title, mushroom, content, coordinate, description, date, images };
                await dispatch(postActions.createPost({ postData, auth }));
                clearForm();
                showMessage({
                    message: "Your post was successfully created.",
                    type: "success",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' }
                });
                // return to map screen
                props.navigation.navigate('MapMain');
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
        props.navigation.navigate('Catalog', { isSelecting: true });
    }

    // input fields
    // for the select mushroom button at the top
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

    const renderDescriptionInputField = () => {
            return (
                <View style={styles.inputField}>
                    <Text style={styles.textLabel}>
                        Description
                    </Text>
                    <View
                        style={styles.inputContainerDesc}>
                        <TextInput style={styles.inputs}
                            placeholder="Describe your find"
                            underlineColorAndroid='transparent'
                            value={desc}
                            onChangeText={(text) => setDesc(text)}
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

    // rendering
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
                    <Text>
                        {postDateTime}
                    </Text>
                    {renderSelectButton()}
                    {renderDescriptionInputField()}
                    <ImageUpload setImages = {setImages} images={images}></ImageUpload>
                    {renderPostButton()}
                    {/* {renderTitleInputField()} */}
                    {/* {renderContentInputField()} */}
                    {/* {renderLatitudeInputField()} */}
                    {/* {renderLongitudeInputField()} */}
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export const screenOptions = {
    headerTitle: 'Log your mushroom find',
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
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
        height: 40,
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
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5,

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
    inputContainerDesc: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        width: 300,
        height: 200,
        marginTop: 10,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'flex-start',
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
        marginTop: 20,
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
        fontWeight: '600'
    },
})

export default AddPostScreen;