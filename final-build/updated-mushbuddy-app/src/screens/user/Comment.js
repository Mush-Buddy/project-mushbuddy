import React, {useState} from 'react';

import {  StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image } from 'react-native';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const timeDifference = (current, previous) => {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + ' seconds ago';   
    }
    else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
    else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }
    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }
    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }
    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
};

const Comment = (props) => {

    const { comment} = props;


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { }}>
                <Image 
                    style={styles.image} 
                    source={{ uri: comment.user.avatar}} 
                />
            </TouchableOpacity>
            <View style={styles.content}>
                <View style={styles.contentHeader}>
                    <Text style={styles.name}>
                        {comment.user.username + " "}
                    </Text>
                    <Text style={styles.time}>
                        {timeDifference(new Date(), new Date(comment.createdAt))}
                    </Text>
                </View>
            <View style={{ display: 'flex', flexDirection: 'row' }} >
                <Text rkType='primary3 mediumLine'>{comment.content}</Text>
            </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    content: {
        marginLeft: 16,
        flex: 1,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 20,
    },
    time: {
        fontSize: 11,
        color: "#808080",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Comment;