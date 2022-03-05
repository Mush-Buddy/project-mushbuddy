import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import styles from '../stylesheets/profile_styles/badge_style.js';

import shoeIcon from '../../assets/profile_assets/shoe.png';

class Badges extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Render methods

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

export default Badges;