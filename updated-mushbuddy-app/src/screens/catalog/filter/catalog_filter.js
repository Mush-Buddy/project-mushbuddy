import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

import styles from '../../../components/stylesheets/catalog_styles/filter_style';
import Carousel from './carousel';

import Options from './index_options';

const CatalogFilter = ({ navigation }) => {
    const [cap, setCap] = useState('');
    const [hymenium, setHymenium] = useState('');
    const [gillType, setGillType] = useState('');
    const [veil, setVeil] = useState('');

    const clearCap = useRef(null);
    const clearHymenium = useRef(null);
    const clearGillType = useRef(null);
    const clearVeil = useRef(null);

    const resetSelections = () => {

        setCap('');
        setHymenium('');
        setGillType('');
        setVeil('');

        clearCap.current();
        clearHymenium.current();
        clearGillType.current();
        clearVeil.current();
    }

    const returnToCatalog = () => {
        navigation.navigate('MushroomCatalog');
    }

    const onCapSelected = (selectedLabel) => {
        setCap(selectedLabel);
    }

    const onHymeniumSelected = (selectedLabel) => {
        setHymenium(selectedLabel);
    }

    const onGillTypeSelected = (selectedLabel) => {
        setGillType(selectedLabel);
    }

    const onVeilSelected = (selectedLabel) => {
        setVeil(selectedLabel);
    }

    const processCriteria = () => {

        var criteria = {};

        if (cap !== '') {
            criteria['capShape'] = cap;
        }

        if (hymenium !== '') {
            criteria['gillsType'] = hymenium;
        }

        // Needs reworking; temporary solution for now.
        if (gillType !== '') {
            criteria['gillsAttachment'] = 'Yes'; // TEMP
        }

        if (veil !== '') {
            criteria['veilType'] = veil;
        }

        return criteria;
    }

    const renderButtons = () => {
        return (
            <View style={styles.bottomBar}>
                {renderClearButton()}
                {renderSubmitButton()}
            </View>
        );
    }

    const renderClearButton = () => {
        return (
            <LinearGradient
                colors={['#7a95e4', '#787ee3']}
                style={styles.button}
            >
                <TouchableOpacity
                    onPress={resetSelections}
                >
                    <Text style={styles.buttonText}>
                        Clear selections
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }

    // TODO: Handle submit
    const renderSubmitButton = () => {
        //processCriteria();
        return (
            <LinearGradient
                colors={['#5cc76d', '#60af85']}
                style={styles.button}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('filteredPage', processCriteria())}
                >
                    <Text style={styles.buttonText}>
                        Filter by these selections
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }

    // Button to go back to viewing main catalog
    const renderUpperNavigation = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => { returnToCatalog(); }}
                    style={styles.backButton}
                >
                    <Icon name='arrow-back' size={30} color='black' />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Filter
                </Text>
            </View>
        );
    }

    // Selectable options for cap shape (11)
    const renderCapOptions = (options) => {
        return (
            <Carousel
                carouselType='cap'
                items={options}
                onSelect={onCapSelected}
                clearCarousel={clearCap}
            />
        );
    }

    const renderHymeniumOptions = (options) => {
        return (
            <Carousel
                carouselType='hymenium'
                items={options}
                onSelect={onHymeniumSelected}
                clearCarousel={clearHymenium}
            />
        );
    }

    const renderGillTypeOptions = (options) => {
        return (
            <Carousel
                carouselType='gillAttachment'
                items={options}
                onSelect={onGillTypeSelected}
                clearCarousel={clearGillType}
            />
        );
    }

    const renderVeilOptions = (options) => {
        return (
            <Carousel
                carouselType='veil'
                items={options}
                onSelect={onVeilSelected}
                clearCarousel={clearVeil}
            />
        );
    }

    const renderSubheader = (subheader) => {
        return (
            <Text style={styles.subheaderText}>
                {subheader}
            </Text>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderUpperNavigation()}

                <View style={styles.carouselsContainer}>
                    {renderSubheader('What type of cap does your mushroom have?')}
                    {renderCapOptions(Options.cap)}
                </View>
            
                <View style={styles.carouselsContainer}>
                    {renderSubheader('What type of spore-bearing surface (hymenium) does your mushroom have?')}
                    {renderHymeniumOptions(Options.hymenium)}
                </View>

                <View style={styles.carouselsContainer}>
                    {renderSubheader('How does the spore-bearing surface (hymenium) you chose above attach to the stem?')}
                    {renderGillTypeOptions(Options.gillAttachment)}
                </View>
                <View style={styles.carouselsContainer}>
                    {renderSubheader('Is a veil (universal or partial) present?')}
                    {renderVeilOptions(Options.veil)}
                </View>

                {renderButtons()}

            </ScrollView>
        </View>
    );
}

export default CatalogFilter;