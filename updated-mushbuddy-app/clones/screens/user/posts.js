import React, { useState, useEffect, useCallback} from 'react'
import { FlatList, Text, View, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../../components/stylesheets/profile_styles/history_style.js';

import cameraIcon from '../../../assets/profile_assets/camera_icon.png';
import SamplePhoto1 from '../../../assets/profile_assets/mushrooms/king_bolete.png';

import * as postsActions from '../../store/actions/posts';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { getDataAPI } from '../../utils/fetchData'

const Posts = ({ id, auth, dispatch, posts }) => {
    const [post, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [shouldFetch, setShouldFetch] = useState(true);

    useEffect(() => {
        if (!shouldFetch) {
            return;
        }
        const get_data = async () => {
            const res = await getDataAPI(`posts/${id}?page=${page}&limit=${limit}`, auth.token)
            const newData = res.data.posts;
            setShouldFetch(false);
            setPosts(oldData => [...oldData, ...newData]);
            setPage(page + 1);
        }
        get_data()
    }, [page, shouldFetch]);

    const handleLoadMore = useCallback(() => setShouldFetch(true), []);


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

    const loadingIndicator = () => {
        if (shouldFetch){
            return (
                <View style={styles.centered} >
                    <ActivityIndicator size='large' color={Colors.primary} />
                </View>
            );
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={post}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                //ListHeaderComponent={renderHeader}
                //stickyHeaderIndices={[0]}
                keyExtractor={item => item._id}
                // Optimizations
                removeClippedSubviews={true}
                initialNumToRender={8}
                maxToRenderPerBatch={8}
                windowSize={11}
                renderItem={({ item }) => {
                    return renderHistoryEntry(item.title, item.createdAt, "sample location", SamplePhoto1);
                }}
            />
            {loadingIndicator()}
        </View>
    );
}

export default Posts;