import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { ProgressBar } from 'react-native-paper';

import shoeIcon from '../assets/profile_assets/shoe.png';

class Badges extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderBadge = (category, currentTier) => {

        let matchingIcon;
        if (category === 'distanceWalked') {
            matchingIcon = shoeIcon;
        }

        let matchingBorder;
        if (currentTier === 'bronze') {
            matchingBorder = '#AE9084';
        } else if (currentTier === 'silver') {
            matchingBorder = '#B3CCE6';
        } else {
            matchingBorder = '#FFD218';
        }

        return (
            <View style={[ styles.badgeImageContainer, { 
                borderColor: matchingBorder
            } ]}>
                <Image
                    source={matchingIcon}
                    style={styles.badgeImage}
                    resizeMode='center'
                    />
            </View>
        );
    }

    renderProgressBar = (progressAsDecimal) => {
        const progressColor = '#6F83E0';
        return (
            <ProgressBar
                progress={progressAsDecimal}
                color={progressColor}
                style={styles.badgeProgressBar}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.badgeRowContainer}>

                    {/* Bronze badge example */}

                    <View style={styles.badgeSingleContainer}>
                        {this.renderBadge('distanceWalked', 'bronze')}
                        {this.renderProgressBar(0.35)}
                    </View>

                    {/* Silver badge example */}

                    <View style={styles.badgeSingleContainer}>
                        {this.renderBadge('distanceWalked', 'silver')}
                        {this.renderProgressBar(0.7)}
                        
                    </View>

                    {/* Gold badge example */}

                    <View style={styles.badgeSingleContainer}>

                        {this.renderBadge('distanceWalked', 'gold')}
                        {this.renderProgressBar(0.9)}
                        
                    </View>

                </View>

                <View style={styles.badgeRowContainer}>

                    {/* Bronze badge example */}

                    <View style={styles.badgeSingleContainer}>
                        {this.renderBadge('distanceWalked', 'bronze')}
                        {this.renderProgressBar(0.35)}
                    </View>

                    {/* Silver badge example */}

                    <View style={styles.badgeSingleContainer}>
                        {this.renderBadge('distanceWalked', 'silver')}
                        {this.renderProgressBar(0.7)}
                        
                    </View>

                    {/* Gold badge example */}

                    <View style={styles.badgeSingleContainer}>

                        {this.renderBadge('distanceWalked', 'gold')}
                        {this.renderProgressBar(0.9)}
                        
                    </View>

                </View>

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
    badgeRowContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    badgeSingleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeImageContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderColor: '#FFD218',
        borderWidth: 6,
        overflow: 'hidden',
    },
    badgeImage: {
        flex: 1,
        width: '85%',
        height: '85%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    badgeProgressBar: {
        width: 55,
        marginTop: 10,
    },
});

export default Badges;