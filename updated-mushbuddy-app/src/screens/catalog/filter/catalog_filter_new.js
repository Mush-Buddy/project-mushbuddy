import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { ButtonGroup } from 'react-native-elements';

import { FlatGrid } from 'react-native-super-grid';

import styles from '../../../components/stylesheets/catalog_styles/filter_style';
import Carousel from './carousel';

import Images from './index_images';
import Options from './index_options';

import Mush3D from './mush_3d';

const CatalogFilterNew = ({ navigation }) => {

    const tabs = ['CAP', 'GILLS', 'VEIL'];
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const [cap, setCap] = useState('');
    // const [hymenium, setHymenium] = useState('');
    // const [gillType, setGillType] = useState('');
    // const [veil, setVeil] = useState('');

    // const clearCap = useRef(null);
    // const clearHymenium = useRef(null);
    // const clearGillType = useRef(null);
    // const clearVeil = useRef(null);

    // const resetSelections = () => {

    //     setCap('');
    //     setHymenium('');
    //     setGillType('');
    //     setVeil('');

    //     clearCap.current();
    //     clearHymenium.current();
    //     clearGillType.current();
    //     clearVeil.current();
    // }

    const returnToCatalog = () => {
        navigation.navigate('MushroomCatalog');
    }

    const onCapSelected = (selectedLabel) => {
        setCap(selectedLabel);
    }

    // const onHymeniumSelected = (selectedLabel) => {
    //     setHymenium(selectedLabel);
    // }

    // const onGillTypeSelected = (selectedLabel) => {
    //     setGillType(selectedLabel);
    // }

    // const onVeilSelected = (selectedLabel) => {
    //     setVeil(selectedLabel);
    // }

    const processCriteria = () => {

        var criteria = {};

        if (cap !== '') {
            criteria['capShape'] = cap;
        }

        // if (hymenium !== '') {
        //     criteria['gillsType'] = hymenium;
        // }

        // // Needs reworking; temporary solution for now.
        // if (gillType !== '') {
        //     criteria['gillsAttachment'] = 'Yes'; // TEMP
        // }

        // if (veil !== '') {
        //     criteria['veilType'] = veil;
        // }

        return criteria;
    }

    // const renderButtons = () => {
    //     return (
    //         <View style={styles.bottomBar}>
    //             {renderClearButton()}
    //             {renderSubmitButton()}
    //         </View>
    //     );
    // }

    // const renderClearButton = () => {
    //     return (
    //         <LinearGradient
    //             colors={['#7a95e4', '#787ee3']}
    //             style={styles.button}
    //         >
    //             <TouchableOpacity
    //                 onPress={resetSelections}
    //             >
    //                 <Text style={styles.buttonText}>
    //                     Clear selections
    //                 </Text>
    //             </TouchableOpacity>
    //         </LinearGradient>
    //     );
    // }

    // // TODO: Handle submit
    // const renderSubmitButton = () => {
    //     return (
    //         <LinearGradient
    //             colors={['#5cc76d', '#60af85']}
    //             style={styles.button}
    //         >
    //             <TouchableOpacity
    //                 onPress={() => navigation.navigate('filteredPage', processCriteria())}
    //             >
    //                 <Text style={styles.buttonText}>
    //                     Filter by these selections
    //                 </Text>
    //             </TouchableOpacity>
    //         </LinearGradient>
    //     );
    // }

    // Button to go back to viewing main catalog
    const renderUpperNavigation = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => { returnToCatalog(); }}
                    //style={styles.backButton}
                >
                    <Icon name='arrow-back' size={20} color='black' />
                </TouchableOpacity>
                <Text
                    style={styles.headerText}
                >
                    Filter
                </Text>
            </View>
        );
    }

    // Selectable options for cap shape (11)
    // const renderCapOptions = (options) => {
    //     return (
    //         <Carousel
    //             carouselType='cap'
    //             items={options}
    //             onSelect={onCapSelected}
    //             clearCarousel={clearCap}
    //         />
    //     );
    // }

    // const renderHymeniumOptions = (options) => {
    //     return (
    //         <Carousel
    //             carouselType='hymenium'
    //             items={options}
    //             onSelect={onHymeniumSelected}
    //             clearCarousel={clearHymenium}
    //         />
    //     );
    // }

    // const renderGillTypeOptions = (options) => {
    //     return (
    //         <Carousel
    //             carouselType='gillAttachment'
    //             items={options}
    //             onSelect={onGillTypeSelected}
    //             clearCarousel={clearGillType}
    //         />
    //     );
    // }

    // const renderVeilOptions = (options) => {
    //     return (
    //         <Carousel
    //             carouselType='veil'
    //             items={options}
    //             onSelect={onVeilSelected}
    //             clearCarousel={clearVeil}
    //         />
    //     );
    // }

    // const renderSubheader = (subheader) => {
    //     return (
    //         <Text style={styles.subheaderText}>
    //             {subheader}
    //         </Text>
    //     );
    // }

    const render3DViewport = () => {
        return (
            <Mush3D
                capShape={cap}
            />
        );
    }

    const renderTabs = (tabOptions) => {
        return (
            <ButtonGroup
                onPress={(value) => {
                    setSelectedTabIndex(value);
                }}
                selectedIndex={selectedTabIndex}
                buttons={tabOptions}
                containerStyle={styles.horizontalTabs}
                buttonStyle={styles.tabItem}
                textStyle={styles.tabItemText}
                selectedButtonStyle={{
                    shadowColor: '#808080',
                    shadowOffset: {
                        width: 2.5,
                        height: 2.5,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    backgroundColor: 'white'
                }}
                selectedTextStyle={{
                    color: 'black'
                }}
                innerBorderStyle={{ color: 'transparent' }}
            />
        );
    }

    const renderOptionsGrid = (currentTabIndex) => {
        if (currentTabIndex === 0) {
            return renderGrid("cap", Options.cap);
        } else if (currentTabIndex === 1) {
            return renderGrid("hymenium", Options.hymenium);
        } else {
            return renderGrid("veil", Options.veil);
        }
    }

    // const renderGrid = (currentTabName, items) => {
    //     return (
    //         <FlatGrid
    //             itemDimension={90}
    //             data={items}
    //             spacing={0}
    //             maxItemsPerRow={4}
    //             showsVerticalScrollIndicator={false}
    //             renderItem={({ item }) => (
    //                 <View style={styles.optionContainer}>
    //                     <View style={styles.optionSubContainer}>
    //                         {renderImageByLabel(currentTabName, item.label)}
    //                         <Text style={styles.optionText}>
    //                             {item.label}
    //                         </Text>
    //                     </View>
    //                 </View>
    //             )}
    //         />
    //     );
    // }

    const renderGrid = (currentTabName, items) => {
        return (
            <FlatGrid
                itemDimension={90}
                data={items}
                spacing={0}
                maxItemsPerRow={4}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableHighlight
                        onPress={() => {
                            // setSelection(label);
                            // onSelect(label);
                            // highlightSelect(index);
                            console.log("selected");
                            console.log(item.label);
                            setCap(item.label);
                        }}
                        underlayColor='transparent'
                    >
                        <View style={styles.optionContainer}>
                            <View style={styles.optionSubContainer}>
                                {renderImageByLabel(currentTabName, item.label)}
                                <Text style={styles.optionText}>
                                    {item.label}
                                </Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                )}
            />
        );
    }

    const renderImageByLabel = (currentTabName, imgLabel) => {
        return (
            <View style={styles.imageContainer}>
                <Image
                    source={Images[currentTabName][imgLabel]}
                    resizeMode='center'
                    style={{
                        ...styles.image
                    }}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>

            {renderUpperNavigation()}

            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '45%',
            }}>
                {render3DViewport()}
            </View>

            {renderTabs(tabs)}

            <View style={{
                width: '100%',
                //height: '40%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(190,190,190,0.8)',
                borderWidth: 1,
                borderColor: 'transparent',
                borderRadius: 12,
                padding: 5,
            }}>
                {/* {renderOptionsGrid("cap", Options.cap)} */}
                {renderOptionsGrid(selectedTabIndex)}
            </View>

            {/* {renderButtons()} */}
        </View>
    );
}

export default CatalogFilterNew;