import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import Slide from './slide';

const Carousel = ({ items, carouselType, onSelect, clearCarousel }) => {

    const [interval, setInterval] = useState(1);
    const [width, setWidth] = useState(0);
    const intervals = items.length;

    const [selectedInterval, setSelectedInterval] = useState(0);

    useEffect(() => {
        clearCarousel.current = clearSelect
    }, []);

    const clearSelect = () => {
        setSelectedInterval(0);
    }

    // +1
    const highlightSelectedInterval = (i) => {
        setSelectedInterval(i+1);
    }

    const getInterval = (offset) => {
        for (let i = 1; i <= intervals; i++) {
            if (offset + 1 < (width / intervals) * i) {
                return i;
            }
            else if (i == intervals) {
                return i;
            }
        }
    }

    const getBulletColor = (i) => {
        if (i === interval || i === selectedInterval) {
            return 0.5;
        } else {
            return 0.1;
        }
    }

    let bullets = [];
    for (let i = 1; i <= intervals; i++) {
        bullets.push(
            <Text
                key={i}
                style={{
                    ...styles.bullet,
                    //opacity: interval === i ? 0.5 : 0.1,
                    opacity: getBulletColor(i),
                    color: selectedInterval === i ? 'green' : 'black'
                }}
            >
                &bull;
            </Text>
        );
    }

    const getGradientColors = (i) => {
        if (i === selectedInterval) {
            return ['#99CDCD', '#FFDE98'];
        }
        else {
            return ['#C0D6D6', '#F8E6B4'];
        }
    }

    // Changes on selection
    const renderGradient = () => {
        return (
            <LinearGradient
                colors={getGradientColors(interval)}
                style={{
                    ...styles.slideBackground,
                    //borderColor: selectedInterval === interval ? '#FFE6B0' : 'transparent'
                }}
            />
        );
    }

    // Varying widths based on carouselType (number of options/intervals/etc.)
    const getWidth = (type) => {
        if (type === 'cap') {
            return '1000%';
        } else if (type === 'hymenium') {
            return '500%';
        } else if (type === 'gillAttachment') {
            return '800%';
        } else if (type === 'veil') {
            return '500%';
        }
    }
    
    return (
        <View style={{
            ...styles.container,
            shadowOpacity: selectedInterval === interval ? 0.5 : 0.1,
            shadowOffset: selectedInterval === interval ? {width:1,height:6} : {width:0,height:5}
        }}>
            {renderGradient()}
            <ScrollView
                horizontal={true}
                contentContainerStyle={{
                    ...styles.scrollView,
                    width: getWidth(carouselType),
                }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                // horizontal pagination
                pagingEnabled
                decelerationRate='fast'
                // for bullets - tracking which slide we're currently on
                onScroll={data => {
                    setWidth(data.nativeEvent.contentSize.width);
                    setInterval(getInterval(data.nativeEvent.contentOffset.x));
                }}
            >
                {items.map((item, index) => {
                    return (
                        <Slide
                            key={index}
                            label={item.label}
                            carouselType={carouselType}
                            onSelect={onSelect}
                            highlightSelect={highlightSelectedInterval}
                            index={index}
                            currentSelection={selectedInterval}
                        />
                    );
                })}
            </ScrollView>
            <View style={styles.bullets}>
                {bullets}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '75%',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 12,
        shadowColor: 'black',
        marginTop: 10,
    },
    scrollView: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    bullets: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5,
    },
    bullet: {
        paddingHorizontal: 2,
        fontSize: 25,
    },
    centerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    slideBackground: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: '100%',
        borderWidth: 1,
        borderRadius: 12,
        borderColor: 'transparent',
    },
});

export default Carousel;