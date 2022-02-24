import React, { useState, useEffect } from 'react'
import { FlatList, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../components/stylesheets/profile_styles/history_style.js';

import cameraIcon from '../assets/profile_assets/camera_icon.png';
import SamplePhoto1 from '../assets/profile_assets/mushrooms/king_bolete.png';

const Posts = ({ auth, id, dispatch, profile }) => {
    const [posts, setPosts] = useState([]);
    const [result, setResult] = useState(9);
    const [page, setPage] = useState(0);

    useEffect(() => {
        profile.posts.forEach(data => {
            if (data._id === id) {
                setPosts(data.posts);
                setResult(data.result);
                setPage(data.page);
            }
        })
    }, [profile.posts, id]);

    // Takes ImageSource input
    const renderImage = (photo) => {
        return (
            <View style={styles.entryImageContainer}>
                <Image
                    source={photo}
                    style={styles.entryImage}
                />
            </View>
        );
    }

    // Calculate how many days have passed between now and the provided timestamp.
    const formatDate = (timestamp) => {
        const originalDate = new Date(timestamp);
        const currentDate = new Date();

        let timeElapsed = Math.abs(currentDate - originalDate);
        let daysPassed = Math.floor(timeElapsed / (1000 * 3600 * 24));

        return daysPassed;
    }

    const renderMushroomName = (name) => {
        return (
            <Text style={styles.entryHeaderText}>
                Found {name}
            </Text>
        );
    }

    const renderDate = (timestamp) => {
        return (
            <Text style={styles.entryTimestamp}>
                {formatDate(timestamp)}d ago
            </Text>
        );
    }

    const renderLocation = (location) => {
        return (
            <View style={styles.entryInfoLine}>
                <Icon name='location' size={15} color='#FFAA60' />
                <Text style={styles.entryInfoText}>
                    {location}
                </Text>
            </View>
        );
    }

    const renderPhotoTakenConfirmation = () => {
        return (
            <View style={styles.entryInfoLine}>
                <Image source={cameraIcon} style={styles.iconImage} resizeMode='center' />
                <Text style={styles.entryInfoText}>
                    Photo added to catalog
                </Text>
            </View>
        );
    }

    // Render the header & additional information of each entry.
    // HEADER: (1) Name of mushroom that was found, (2) number of days that've passed since this find was catalogued.
    // ADD'TL INFO: (1) Location of the find, (2) whether the user took a photo of the mushroom they found.
    const renderInfo = (name, timestamp, taggedLocation) => {
        return (
            <View style={styles.entryInfoContainer}>

                <View style={styles.entryHeaderLine}>
                    {renderMushroomName(name)}
                    {renderDate(timestamp)}
                </View>

                <View style={styles.entryInfoLines}>
                    {renderLocation(taggedLocation)}
                    {renderPhotoTakenConfirmation()}
                </View>

            </View>
        );
    }

    const renderHistoryEntry = (name, timestamp, taggedLocation, photo) => {
        return (
            <View style={styles.entryContainer}>
                {renderImage(photo)}
                {renderInfo(name, timestamp, taggedLocation)}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    return renderHistoryEntry(item.title, item.createdAt, "sample location", SamplePhoto1);
                }}
            />
        </View>
    );
}

export default Posts;