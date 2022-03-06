import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';

import { COLORS } from '../../stylesheets/colors';

import Options from './index_options';
import Images from './index_images';

const Slide = ({ carouselType, label, onSelect, highlightSelect, index, currentSelection }) => {

    const [selection, setSelection] = useState('');

    const processType = (type) => {
        if (type === 'gillAttachment') {
            return 'attached hymenium';
        } else {
            return type;
        }
    }

    const processLabel = (label) => {
        if (label === 'none') {
            return 'has no ' + processType(carouselType);
        } else {
            if (label === 'ring_and_volva') {
                return 'ring & volva';
            }
            return label;
        }
    }

    const renderImageByLabel = (imgLabel) => {
        return (
            <View style={styles.imageContainer}>
                <Image
                    source={Images[carouselType][imgLabel]}
                    resizeMode='center'
                    style={{
                        ...styles.image,
                        opacity: currentSelection === (index+1) ? 1 : 0.75
                    }}
                />
            </View>
        )
    }

    const renderContents = () => {
        return (
            <View style={styles.slideContents}>
                <Text style={{
                    ...styles.captionText,
                    color: currentSelection === (index+1) ? '#9D4118' : '#7A7A7A',
                    textShadowColor: currentSelection === (index+1) ? '#EFB774' : 'transparent',
                    }}>
                    {processLabel(label)}
                </Text>
                {renderImageByLabel(label)}
            </View>
        );
    }

    return (
        <View style={styles.slide}>
            <TouchableHighlight
                onPress={() => {
                    setSelection(label);
                    onSelect(label);
                    //highlightSelect(intVal); // index?
                    highlightSelect(index);
                }}
                underlayColor={'transparent'}
                //delayPressIn={500}
            >
                {renderContents()}
            </TouchableHighlight>
        </View>
    );
}

const IMAGE_SIZE = 75;

const styles = StyleSheet.create({
    slide: {
        flexBasis: '100%',
        flex: 1,
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 150,
    },
    slideContents: {
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captionText: {
        textAlign: 'center',
        fontSize: 18,
        letterSpacing: 0.25,
        //color: COLORS.TEXT,
        fontWeight: 'bold',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
    },
    imageContainer: {
        marginTop: 12.5,
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: 10,
        borderColor: 'transparent',
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
    },
});

export default Slide;