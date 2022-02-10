import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import SamplePhoto1 from '../assets/profile_assets/mushrooms/king_bolete.png';
import SamplePhoto2 from '../assets/profile_assets/mushrooms/chanterelle.png';
import SamplePhoto3 from '../assets/profile_assets/mushrooms/morel.jpeg';

import cameraIcon from '../assets/profile_assets/camera_icon.png';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderImage = (photo) => {
        return (
            <View style={styles.entryImageContainer}>
                <Image
                    source={photo}
                    style={styles.entryImage}
                />
            </View>
        );
    }

    renderInfo = (name, timestamp, taggedLocation) => {
        return (
            <View style={styles.entryInfoContainer}>

                <View style={styles.entryHeaderLine}>
                    <Text style={styles.entryHeaderText}>
                        Found {name}
                    </Text>
                    <Text style={styles.entryTimestamp}>
                        {timestamp}
                    </Text>
                </View>

                <View style={styles.entryInfoLines}>

                    <View style={styles.entryInfoLine}>
                        <Icon name='location' size={15} color='#FFAA60'/>
                        <Text style={styles.entryInfoText}>
                            {taggedLocation}
                        </Text>
                    </View>

                    <View style={styles.entryInfoLine}>
                        <Image source={cameraIcon} style={styles.iconImage} resizeMode='center' />
                        <Text style={styles.entryInfoText}>
                            Photo added to catalog
                        </Text>
                    </View>

                </View>
            </View>
        );
    }

    renderHistoryEntry = (name, timestamp, taggedLocation, photo) => {
        return (
            <View style={styles.entryContainer}>
                {this.renderImage(photo)}
                {this.renderInfo(name, timestamp, taggedLocation)}
            </View>
        );
    }

    render() {
        // Sample data
        const names = ['King Bolete', 'Chanterelle', 'Morel']
        const timestamps = ['8m ago', '3d ago', '4d ago']
        const locations = ['Cascade Mountains, OR', 'Cascade Mountains, OR', 'Cascade Mountains, OR']
        const photos = [SamplePhoto1, SamplePhoto2, SamplePhoto3];
        return (
            <View style={styles.container}>
                {this.renderHistoryEntry(names[0], timestamps[0], locations[0], photos[0])}
                {this.renderHistoryEntry(names[1], timestamps[1], locations[1], photos[1])}
                {this.renderHistoryEntry(names[2], timestamps[2], locations[2], photos[2])}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    entryContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        width: '100%',
        height: 110,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
    },
    entryImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 6,
        overflow: 'hidden',
    },
    entryImage: {
        flex: 1,
        width: 90,
        height: 90,
    },
    entryInfoContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    entryHeaderLine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    entryHeaderText: {
        fontSize: 18,
        color: '#222222',
    },
    entryTimestamp: {
        fontSize: 10,
        color: '#BDBDBD',
        marginRight: 10,
    },
    entryInfoLines: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        marginLeft: 5,
    },
    entryInfoLine: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    entryInfoText: {
        fontSize: 9,
        color: '#222222',
        marginLeft: 5,
    },
    iconImage: {
        width: 15,
        height: 15,
    },
});

export default History;