import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeRowContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    badgeSingleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeImageContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderColor: '#FFD218',
        borderWidth: 6,
        overflow: 'hidden',
    },
    badgeImage: {
        flex: 1,
        width: '85%',
        height: '85%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    badgeProgressBar: {
        width: 55,
        marginTop: 10,
    },
});