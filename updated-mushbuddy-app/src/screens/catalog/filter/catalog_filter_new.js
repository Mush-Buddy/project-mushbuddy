import React, { useState, useRef } from 'react';
import { Text, View, Modal, TouchableOpacity, TouchableHighlight, ScrollView, Image } from 'react-native';
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

    const [modalVisible, setModalVisible] = useState(false);

    const [cap, setCap] = useState('');
    const [hymenium, setHymenium] = useState('');
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

    // If the user selects 'none,' then that trait won't be applied as criteria for filtering.
    const processCriteria = () => {

        var criteria = {};

        if (cap !== '' || cap !== 'none') {
            criteria['capShape'] = cap;
        }

        if (hymenium !== '' || cap !== 'none') {
            criteria['gillsType'] = hymenium;
        }

        // // Needs reworking; temporary solution for now.
        // if (gillType !== '') {
        //     criteria['gillsAttachment'] = 'Yes'; // TEMP
        // }

        // if (veil !== '') {
        //     criteria['veilType'] = veil;
        // }

        return criteria;
    }

    // Rendering the two buttons (back, filter) in the header navigation.
    const renderUpperNavigation = () => {
        return (
            <View style={styles.headerContainer}>

                {/* BUTTON: Return to main catalog */}
                <TouchableOpacity
                    onPress={() => { returnToCatalog(); }}
                >
                    <Icon name='arrow-back' size={20} color='black' />
                </TouchableOpacity>

                {/* BUTTON: Filter catalog by selected criteria */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('filteredPage', processCriteria())}
                >
                    <Text style={styles.headerText}>
                        Filter
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }

    const render3DViewport = () => {
        return (
            <Mush3D
                capShape={cap}
                gillsType={hymenium}
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

    const renderCaplessMessage = () => {
        return (
            <Text>
                You must first select a cap before selecting any gills!
            </Text>
        );
    }

    const renderOptionsGrid = (currentTabIndex) => {
        if (currentTabIndex === 0) {
            return renderGrid("cap", Options.cap);
        } else if (currentTabIndex === 1) {
            if (cap === '' || cap === 'none') {
                return renderCaplessMessage();
            } else {
                return renderGrid("hymenium", Options.hymenium);
            }
        } else {
            return renderGrid("veil", Options.veil);
        }
    }

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
                            // TODO: Veil
                            if (currentTabName === "cap") {
                                setCap(item.label);
                            } else if (currentTabName === "hymenium") {
                                setHymenium(item.label);
                            }
                        }}
                        underlayColor='transparent'
                    >
                        <View style={{
                            ...styles.optionContainer,
                            shadowOpacity: item.label === cap || item.label === hymenium ? 0.8 : 0,
                            shadowColor: '#808080',
                            shadowOffset: {
                                width: 2.5,
                                height: 2.5,
                            },
                            shadowRadius: 1,
                        }}>
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

    const renderInfoButton = () => {
        return (
            <TouchableOpacity onPress={() => { 
                console.log("pressed");
                setModalVisible(true);
            }}>
                <Icon name='help-circle' size={20} color='rgba(0,0,0,0.6)' />
            </TouchableOpacity>
        );
    }

    // const renderInfoPopup = () => {
    //     <View style={{
    //         flex: 1,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         marginTop: 50,
    //     }}>
    //         <Modal
    //             //animationType='slide'
    //             presentationStyle={overFullScreen}
    //             transparent={true}
    //             visible={modalVisible}
    //             // onRequestClose={() => {
    //             //     setModalVisible(!modalVisible);
    //             // }}
    //         >
    //             <View style={{
    //                 flex: 1,
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //                 //padding: 10,
    //             }}>
    //                 <View style={{
    //                     backgroundColor: 'rgb(255,255,255)',
    //                     borderRadius: 20,
    //                     padding: 35,
    //                     alignItems: 'center',
    //                     shadowColor: '#000',
    //                     shadowOffset: {
    //                         width: 0,
    //                         height: 2,
    //                     },
    //                     shadowOpacity: 0.25,
    //                     shadowRadius: 4,
    //                     elevation: 5,
    //                 }}>
    //                     <Text>
    //                         Hello
    //                     </Text>
    //                 </View>
    //             </View>
    //         </Modal>
    //     </View>
    // }

    const renderCriteriaPopup = () => {
        return (
            <View style={styles.popupContainer}>

                <Text style={styles.popupHeaderText}>
                    CURRENT CRITERIA
                </Text>

                <View style={styles.popupSubContainer}>

                    <View style={styles.popupLeftColumn}>
                        <Text style={styles.popupText1}>
                            cap:
                        </Text>

                        <Text style={styles.popupText1}>
                            gills:
                        </Text>

                        <Text style={styles.popupText1}>
                            veil:
                        </Text>
                    </View>

                    <View style={styles.popupRightColumn}>
                        <Text style={styles.popupText2}>
                            {cap === '' ? 'none' : cap}
                        </Text>

                        <Text style={styles.popupText2}>
                            {hymenium === '' ? 'none' : hymenium}
                        </Text>

                        <Text style={styles.popupText2}>
                            none
                        </Text>
                    </View>

                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            {/* {renderInfoPopup()} */}

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
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(190,190,190,0.8)',
                borderWidth: 1,
                borderColor: 'transparent',
                borderRadius: 12,
                padding: 5,
            }}>
                {renderOptionsGrid(selectedTabIndex)}
            </View>

            <View style={{
                position: 'absolute',
                right: 30,
                top: 96,
            }}>
                {renderInfoButton()}
            </View>

            <View style={{
                position: 'absolute',
                left: 30,
                //top: 345,
                top: 95,
            }}>
                {renderCriteriaPopup()}
            </View>
        </View>
    );
}

export default CatalogFilterNew;