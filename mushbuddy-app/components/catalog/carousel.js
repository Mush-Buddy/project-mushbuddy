import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

import Slide from './slide';

const Carousel = ({ items, style }) => {

    const [interval, setInterval] = useState(1);
    const intervals = items.length;

    // let bullets = [];
    // for (let i = 1; i <= intervals; i++) {
    //     bullets.push(
    //         <Text
    //             key={i}
    //             style={{
    //                 ...styles.bullet,
    //                 opacity: interval === i ? 0.5 : 0.1
    //             }}
    //         >
    //             &bull;
    //         </Text>
    //     );
    // }
    
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{
                    ...styles.scrollView,
                    width: '1000%',
                }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                // horizontal pagination
                pagingEnabled
                decelerationRate='fast'
            >
                {items.map((item, index) => {
                    switch (style) {
                        case 'capShape':
                            return (
                                <Slide key={index} label={item.title}/>
                            );
                        default:
                            return (
                                <Slide
                                    key={index}
                                    label={item.label}
                                />
                            );
                    }
                })}
            </ScrollView>
            {/* <View style={styles.bullets}>
                {bullets}
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '75%',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 12,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        marginTop: 10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
    },
    scrollView: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    bullets: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 5,
    },
    bullet: {
        paddingHorizontal: 5,
        fontSize: 20,
    },
});

export default Carousel;