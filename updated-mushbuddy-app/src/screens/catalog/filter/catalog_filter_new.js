import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import { LinearGradient } from 'expo-linear-gradient';
import { ButtonGroup } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import Modal from 'react-native-modal';

import styles from '../../../components/stylesheets/catalog_styles/filter_style';

import Mush3D from './mush_3d';
import Images from './index_images';
import Options from './index_options';

import Image1 from '../../../../assets/diagrams/mushroom_diagram.png';

const CatalogFilterNew = ({ navigation }) => {

    const tabs = ['CAP', 'GILLS', 'VEIL'];
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedModalTabIndex, setSelectedModalTabIndex] = useState(0);
    const modalTabs = ['About', 'ID Basics', 'Viewport', 'Filter'];

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

        if (cap === 'none') {
            console.log("cap is none!!!!!");
        }

        if (cap !== '' || cap !== 'none') {
            console.log("CAP in processCriteria: " + cap);
            criteria['capShape'] = cap;
        }

        if (hymenium != "" || hymenium != "none") {
            //console.log("setting gillsType: " + hymenium);
            criteria['gillsType'] = hymenium;
        }

        // // Needs reworking; temporary solution for now.
        // if (gillType !== '') {
        //     criteria['gillsAttachment'] = 'Yes'; // TEMP
        // }

        // if (veil !== '') {
        //     criteria['veilType'] = veil;
        // }

        console.log("CRITERIA:");
        console.log(criteria);

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

    // MODAL: Instructional popup

    const renderInfoButton = () => {
        return (
            <TouchableOpacity onPress={() => {
                // console.log("pressed");
                setModalVisible(true);
            }}>
                <Icon name='help-circle' size={20} color='rgba(0,0,0,0.6)' />
            </TouchableOpacity>
        );
    }

    const renderModalTabs = (tabOptions) => {
        return (
            <ButtonGroup
                onPress={(value) => {
                    setSelectedModalTabIndex(value);
                }}
                selectedIndex={selectedModalTabIndex}
                buttons={tabOptions}
                containerStyle={styles.modalTabs}
                buttonStyle={styles.modalTabItem}
                textStyle={styles.modalTabItemText}
                selectedButtonStyle={{
                    backgroundColor: '#FFC65C',
                    marginTop: 0,
                }}
                selectedTextStyle={{
                    color: 'black'
                }}
                innerBorderStyle={{ color: 'transparent' }}
            />
        );
    }

    const renderNextButton = () => {
        return (
            <TouchableOpacity
                style={styles.modalBottomBar}
                onPress={() => { setSelectedModalTabIndex(selectedModalTabIndex+1); }}
            >
                    <Text style={styles.modalBottomBarText}>Next: {modalTabs[selectedModalTabIndex+1]}</Text>
                    <Icon name='chevron-forward-outline' size={15} color='#4B463E' style={{marginLeft:3}}/>
            </TouchableOpacity>
        );
    }

    const renderFinishedButton = () => {
        return (
            <TouchableOpacity
                style={styles.modalBottomBar}
                onPress={() => {
                    setModalVisible(false);
                    setSelectedModalTabIndex(0); // reset
                }}
            >
                <Text style={styles.modalBottomBarText}>Got it</Text>
                <Icon name='checkmark-outline' size={20} color='#4B463E' style={{marginLeft:3}}/>
            </TouchableOpacity>
        )
    }

    const renderTab0 = () => {
        return (
            <View style={styles.modalContentContainer}>
                <Text style={styles.modalSubHeaderText}>
                    About the Catalog Filter
                </Text>

                <View style={{ width: '100%' }}>
                    <Text style={styles.modalBodyText}>
                        The MushBuddy catalog serves many purposes. Helping users identify mushrooms is one of them.
                    </Text>
                </View>

                {renderNextButton()}
            </View>
        );
    }

    const renderTab1 = () => {
        return (
            <View style={styles.modalContentContainer}>

                <Text style={styles.modalSubHeaderText}>
                    Basics of identification
                </Text>

                <View style={{ width: '100%' }}>
                    <Text style={styles.modalBodyText}>
                        Mushrooms have complex anatomies that can be simplified into four major physical characteristics:
                        the cap, the gills, the veil, and the stem.
                    </Text>

                    <View style={styles.diagramImageContainer}>
                        <Image
                            source={Image1}
                            style={styles.diagramImage}
                            resizeMode='center'
                        />
                    </View>

                    <Text style={styles.modalBodyText}>
                        Identifying the presence or absence of these parts — and, if present, the forms these parts take on —
                        often leads us closer to identifying the mushroom itself.
                    </Text>
                </View>
                {renderNextButton()}
            </View>
        );
    }

    const renderTab2 = () => {
        return (
            <View style={styles.modalContentContainer}>

                <Text style={styles.modalSubHeaderText}>
                    Using the 3D Mushroom Viewport
                </Text>

                <View style={{
                    width: '100%',
                }}>
                    <Text style={styles.modalBodyText}>
                        You can use the viewport to build a mushroom with similar, if not identical, parts,
                        to the one you're trying to identify.
                    </Text>

                    <Text style={styles.modalBodyText}>
                        For each part, there are multiple options below the viewport. These are the different appearances, or forms, these parts can take on.
                        Try selecting the option that most resembles what you see in your mushroom.
                    </Text>

                    <Text style={styles.modalBodyText}>
                        If none of the options seem familiar to you, you can leave that part alone.
                    </Text>
                </View>
                {renderNextButton()}
            </View>
        );
    }

    const renderTab3 = () => {
        return (
            <View style={styles.modalContentContainer}>

                <Text style={styles.modalSubHeaderText}>
                    Filtering with Physical Criteria
                </Text>

                <View style={{
                    width: '100%',
                }}>
                    <Text style={styles.modalBodyText}>
                        Once you've built a mushroom in the viewport that resembles the one you'd like to identify,
                        tap Filter at the top-right corner of your screen.
                    </Text>

                    <Text style={styles.modalBodyText}>
                        You'll then be taken to a filtered catalog, containing only the mushrooms that match your chosen set of criteria.
                    </Text>

                    <Text style={styles.modalBodyText}>
                        You don't need to round out your set of criteria with every part. Instead, stick to the parts that you're
                        confident about identifying. The catalog will only be filtered by the criteria you specify.
                    </Text>

                    <Text style={styles.modalBodyText}>
                        If the filtered catalog yields no promising results, you can return to the viewport and try filtering with other options.
                    </Text>
                </View>
                {renderFinishedButton()}
            </View>
        );
    }

    const renderModalContent = (idx) => {
        if (idx === 0) {
            return renderTab0();
        } else if (idx === 1) {
            return renderTab1();
        } else if (idx === 2) {
            return renderTab2();
        } else {
            return renderTab3();
        }
    }

    const renderInfoPopup = () => {
        return (
            <View>
                <Modal
                    isVisible={modalVisible}
                    backdropColor='black'
                    backdropOpacity={0.70}
                    coverScreen={true}
                    onBackdropPress={() => {
                        setModalVisible(false);
                        setSelectedModalTabIndex(0); // reset
                    }}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 200,
                    }}
                >
                    <View style={{
                        flexDirection: 'column',
                    }}>

                        {/* tabs */}
                        <View
                            style={{
                                marginLeft: 40,
                            }}
                        >
                            {renderModalTabs(modalTabs)}
                        </View>
                        <ScrollView style={styles.modalContainer}>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-start',
                                    // borderWidth: 1,
                                    // borderColor: 'red',
                                }}
                                onPress={() => {
                                    setModalVisible(false);
                                    setSelectedModalTabIndex(0); // reset
                                }}>
                                <Icon name='close-outline' size={25} color='black' />
                            </TouchableOpacity>
                            {renderModalContent(selectedModalTabIndex)}
                        </ScrollView>

                    </View>

                </Modal>
            </View>
        );
    }

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

            {renderInfoPopup()}

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