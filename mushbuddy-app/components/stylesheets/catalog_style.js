import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBarContainer: {
        //fill later
    },
    catalogEntryContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        paddingLeft: 20,
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderColor: 'transparent',
        overflow: 'hidden',
        marginLeft: 5,
        marginRight: 30,
    },
    image: {
        flex: 1,
        width: 50,
        height: 50,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerLine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginBottom: 2.5,
    },
    headerText: {
        fontSize: 17.5,
        color: '#222222',
    },
    italicizedHeaderText: {
        fontSize: 12,
        color: '#666666',
        marginLeft: 5,
        fontStyle: 'italic',
    },
    descriptionText: {
        flex: 1,
        fontSize: 10,
        color: '#222222',
    },
    filterPress: {
        fontSize: 12,
    },
    topNavigation: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});