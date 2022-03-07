import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import styles from '../../components/stylesheets/profile_styles/badge_style.js';

import shoeIcon from '../../../assets/profile_assets/shoe.png';

const Badges = () => {

    // Render methods

    const renderBadge = (category, currentTier) => {

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

    const renderProgressBar = (progressAsDecimal) => {
        const progressColor = '#6F83E0';
        return (
            <ProgressBar
                progress={progressAsDecimal}
                color={progressColor}
                style={styles.badgeProgressBar}
            />
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.badgeRowContainer}>

                {/* Bronze badge example */}

                <View style={styles.badgeSingleContainer}>
                    {renderBadge('distanceWalked', 'bronze')}
                    {renderProgressBar(0.35)}
                </View>

                {/* Silver badge example */}

                <View style={styles.badgeSingleContainer}>
                    {renderBadge('distanceWalked', 'silver')}
                    {renderProgressBar(0.7)}
                    
                </View>

                {/* Gold badge example */}

                <View style={styles.badgeSingleContainer}>

                    {renderBadge('distanceWalked', 'gold')}
                    {renderProgressBar(0.9)}
                    
                </View>

            </View>

            <View style={styles.badgeRowContainer}>

                {/* Bronze badge example */}

                <View style={styles.badgeSingleContainer}>
                    {renderBadge('distanceWalked', 'bronze')}
                    {renderProgressBar(0.35)}
                </View>

                {/* Silver badge example */}

                <View style={styles.badgeSingleContainer}>
                    {renderBadge('distanceWalked', 'silver')}
                    {renderProgressBar(0.7)}
                    
                </View>

                {/* Gold badge example */}

                <View style={styles.badgeSingleContainer}>

                    {renderBadge('distanceWalked', 'gold')}
                    {renderProgressBar(0.9)}
                    
                </View>

            </View>

        </View>
    );
}

export default Badges;