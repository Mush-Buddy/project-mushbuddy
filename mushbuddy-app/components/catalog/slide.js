import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';

import { COLORS } from '../stylesheets/colors';

import Images from './imagePaths.js';

const Slide = ({ label }) => {

    //const { title } = props;
    //console.log("slide title: " + title);
    //console.log(imgPath);

    const imgPath = '../../assets/catalog/cap_shapes/';
    const fileType = '.png';
    //console.log(imgPath + 'campanulate' + fileType);

    const returnImageByLabel = (imgLabel) => {
        return (
            <View style={styles.imageContainer}>
                <Image
                    source={Images.cap[imgLabel]}
                    resizeMode='center'
                    style={styles.image}
                />
            </View>
        )
    }

    return (
        <View style={styles.slide}>
            <View style={styles.slideContents}>
                <Text style={styles.captionText}>
                    {label}
                </Text>
                {returnImageByLabel(label)}
            </View>
        </View>
    );
}

const IMAGE_SIZE = 75;

const styles = StyleSheet.create({
    slide: {
        padding: 20,
        flexBasis: '100%',
        flex: 1,
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 200,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    slideContents: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    captionText: {
        textAlign: 'center',
        fontSize: 20,
        letterSpacing: 0.25,
        color: COLORS.TEXT,
        fontWeight: 'bold',
    },
    imageContainer: {
        marginTop: 12.5,
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: 10,
        borderColor: 'transparent',
        overflow: 'hidden',
        // marginLeft: 5,
        // marginRight: 30,
    },
    image: {
        flex: 1,
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
    },
});

export default Slide;