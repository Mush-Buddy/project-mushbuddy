import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';

const HEADER_HEIGHT = 40;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BG,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    listSeparator: {
        height: 1,
        marginHorizontal: 10,
        backgroundColor: COLORS.GREY_3,
        marginVertical: 6,
    },
    headerContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.GREY_3,
        height: HEADER_HEIGHT,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowRadius: 2,
        shadowOffset: { width: 3, height: 3 },
        backgroundColor: COLORS.BG,
    },
    searchInput: {
        marginLeft: 20,
        fontSize: 12,
        width: '85%',
        height: 30,
    },
    listItem: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        height: 50,
    },
    fullnameText: {
        fontSize: 14,
        color: COLORS.TEXT,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    unnamedText: {
        fontSize: 14,
        color: COLORS.TEXT,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    usernameText: {
        fontSize: 14,
        color: COLORS.TEXT_LIGHTER,
        letterSpacing: 0.3,
    },
    listEmptyMessage: {
        marginTop: 10,
        color: COLORS.GREY_3,
        fontSize: 16,
        letterSpacing: 0.5,
        textAlign: 'center',
    },
    profileImageContainer: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden',
        backgroundColor: COLORS.BG,
        marginRight: 20,
    },
    profileImage: {
        flex: 1,
        width: '70%',
        height: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    userInfo: {
        flexDirection: 'column',
    },
});

