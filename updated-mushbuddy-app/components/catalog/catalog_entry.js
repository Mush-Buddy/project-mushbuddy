import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../stylesheets/catalog_styles/catalog_entry_style';

// Platform-specific import:
// ReadMore module isn't compatible with Expo's web simulator, so only import (and use) it
// if platform is iOS/Android.
// let ReadMore;
// if (Platform.OS !== 'web') {
//     ReadMore = require('@fawazahmed/react-native-read-more').default;
// }

const CatalogEntry = ({ route, navigation }) => {
    const currentEntry = route.params.item;

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

export default CatalogEntry;