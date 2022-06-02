import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    entryContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        width: '100%',
        height: 110,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
    },
    entryImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 25,
        borderColor: '#F1CC96',
        borderWidth: 6,
        overflow: 'hidden',
    },
    entryImage: {
        flex: 1,
        width: 90,
        height: 90,
    },
    entryInfoContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    entryHeaderLine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    entryHeaderText: {
        fontSize: 15,
        color: '#222222',
    },
    entryTimestamp: {
        fontSize: 10,
        color: '#BDBDBD',
        marginRight: 10,
    },
    entryInfoLines: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        marginLeft: 5,
    },
    entryInfoLine: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    entryInfoText: {
        fontSize: 9,
        color: '#222222',
        marginLeft: 5,
    },
    iconImage: {
        width: 15,
        height: 15,
    },
});