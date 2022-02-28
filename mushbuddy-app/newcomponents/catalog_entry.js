import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { StyleSheet } from 'react-native';

// Platform-specific import:
// ReadMore module isn't compatible with Expo's web simulator, so only import (and use) it
// if platform is iOS/Android.
// let ReadMore;
// if (Platform.OS !== 'web') {
//     ReadMore = require('@fawazahmed/react-native-read-more').default;
// }

const CatalogEntry = ({ route, navigation }) => {
    const currentEntry = route.params.entry;

    const returnToMainCatalog = () => {
        navigation.navigate('MushroomCatalog');
    }

    // Button to go back to viewing main catalog
    const renderUpperNavigation = () => {
        return (
            <View style={styles.upperBar}>
                <TouchableOpacity
                    // style={styles.roundedButton}
                    onPress={() => { returnToMainCatalog(); }}
                >
                    <Icon name='arrow-back' size={30} color='black' />
                </TouchableOpacity>
            </View>
        );
    }

    const renderImageWithURL = (link) => {
        return (
            <View style={styles.centerContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: link }}
                        style={styles.image}
                    />
                </View>
            </View>
        );
    }

    // read more
    const renderDescription = (description) => {
        // if (Platform.OS !== 'web') {
        //     return (
        //         <View style={styles.descriptionContainer}>
        //             <ReadMore
        //                 numberOfLines={3}
        //                 style={styles.bodyText}
        //                 seeMoreText={'Expand description'}
        //                 seeLessText={'Collapse description'}
        //                 seeMoreStyle={styles.readMoreText}
        //                 seeLessStyle={styles.readMoreText}
        //                 animate={true}
        //                 ellipsis={' '}
        //             >
        //                 {description}
        //             </ReadMore>
        //         </View>
        //     );
        // } else {
            return (
                <View style={styles.descriptionContainer}>
                    <Text style={styles.bodyText}>
                        {description}
                    </Text>
                </View>
            );
        // }
    }

    const renderHeader = (commonName, scientificName) => {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    {commonName}
                </Text>
                <Text style={styles.subheaderText}>
                    ({scientificName})
                </Text>
            </View>
        );
    }

    const renderSeasons = (seasons) => {
        const iconSize = 20;
        // const defaultColor = '#222222';
        const defaultIconNames = ['leaf-outline', 'snow-outline', 'rose-outline', 'sunny-outline'];
        const filledIconNames = ['leaf', 'snow', 'rose', 'sunny'];
        let fall = false;
        let winter = false;
        let spring = false;
        let summer = false;

        if (seasons === 'fall' || seasons === 'autumn') {
            fall = true;
        }
        else if (seasons === 'winter') {
            winter = true;
        }
        else if (seasons === 'spring') {
            spring = true;
        }
        else {
            summer = true;
        }

        return (
            <View style={styles.seasonsContainer}>
                <Icon name={fall ? filledIconNames[0] : defaultIconNames[0]} size={iconSize} color={fall ? '#FFAA60' : '#222222'} />
                <Icon name={winter ? filledIconNames[1] : defaultIconNames[1]} size={iconSize} color={winter ? '#FFAA60' : '#222222'} />
                <Icon name={spring ? filledIconNames[2] : defaultIconNames[2]} size={iconSize} color={spring ? '#FFAA60' : '#222222'} />
                <Icon name={summer ? filledIconNames[3] : defaultIconNames[3]} size={iconSize} color={summer ? '#FFAA60' : '#222222'} />
            </View>
        );
    }

    const renderInfoLine = (headerText, subheaderText) => {
        return (
            <View style={styles.infoLineContainer}>
                <Text style={styles.traitTitleText}>
                    {headerText}
                </Text>
                <Text style={styles.traitDataText}>
                    {subheaderText}
                </Text>
            </View>
        );
    }

    const parseYesOrNo = (textInput) => {
        if (textInput === 'N/A' || textInput === 'n/a' || textInput === 'none' || textInput === 'no') {
            return 'No';
        } else {
            return 'Yes';
        }
    }

    const renderOtherInfo = (entry) => {
        return (
            <View style={styles.otherInfoContainer}>
                {renderInfoLine("Bruising", entry.bruising)}

                {renderInfoLine("Cap shape", entry.capShape)}
                {renderInfoLine("Cap colors", entry.capColors)}

                {renderInfoLine("Has gills?", parseYesOrNo(entry.hasGills))}
                {renderInfoLine("Gills attached?", parseYesOrNo(entry.gillsAttachment))}
                {renderInfoLine("Type of gills", entry.gillsType)}

                {renderInfoLine("Has veil?", parseYesOrNo(entry.hasVeil))}
                {renderInfoLine("Veil type", entry.veilType)}

                {renderInfoLine("Spore print", entry.sporePrint)}

                {renderInfoLine("Stem colors", entry.stemColors)}

                {renderInfoLine("Use", entry.use)}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderUpperNavigation()}
                <View style={styles.entryContainer}>
                    {renderHeader(currentEntry.nameCommon, currentEntry.nameScientific)}
                    {renderImageWithURL(currentEntry.images)}
                    {renderSeasons(currentEntry.seasons)}

                    {/* <Text style={styles.sectionHeaderText}>
                        Description
                    </Text> */}
                    {renderDescription(currentEntry.description)}

                    <Text style={styles.sectionHeaderText}>
                        Physical characteristics
                    </Text>
                    {renderOtherInfo(currentEntry)}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    upperBar: {
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    entryContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15,
    },
    headerContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
    },
    imageContainer: {
        width: 335,
        height: 335,
        borderRadius: 12.5,
        borderColor: 'transparent',
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        width: 335,
        height: 335,
    },
    headerText: {
        fontSize: 30,
        color: '#222222',
        letterSpacing: 0.5,
        fontWeight: 'bold',
    },
    subheaderText: {
        fontSize: 15,
        color: '#666666',
        fontStyle: 'italic',
        marginTop: 5,
        letterSpacing: 1,
    },
    sectionHeaderText: {
        fontSize: 22.5,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: '#666666',
    },
    descriptionContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        marginTop: 10,
        marginBottom: 15,
    },
    bodyText: {
        fontSize: 12,
        letterSpacing: 0.25,
        color: '#222222',
    },
    readMoreText: {
        fontSize: 10,
        color: '#CEB3A2',
        marginTop: 2.5,
    },
    seasonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 30,
        marginBottom: 10,
    },
    otherInfoContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        marginTop: 10,
    },
    infoLineContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 5,
    },
    traitTitleText: {
        fontSize: 12.5,
        letterSpacing: 0.5,
        color: '#222222',
        fontWeight: 'bold',
    },
    traitDataText: {
        fontSize: 11,
        letterSpacing: 0.25,
        color: '#474747',
    },
});

export default CatalogEntry;