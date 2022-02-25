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
        //marginTop: 5,
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
        fontSize: 15,
        color: '#222222',
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    italicizedHeaderText: {
        fontSize: 12,
        color: '#666666',
        marginLeft: 5,
        fontStyle: 'italic',
        letterSpacing: 0.15,
    },
    descriptionText: {
        flex: 1,
        fontSize: 10,
        color: '#222222',
        letterSpacing: 0.1,
    },
    filterButtonText: {
        fontSize: 13.5,
        color: '#222222',
        fontWeight: 'bold',
        letterSpacing: 0.75,
    },
    topBar: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '95%',
    },
});