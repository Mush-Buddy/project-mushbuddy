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
        height: 5,
        marginHorizontal: 10,
        marginVertical: 6,
    },
    headerContainer: {
        marginTop: 20,
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
        marginHorizontal: 20,
    },
    searchInput: {
        marginLeft: 20,
        fontSize: 12,
        width: '85%',
        height: 30,
    },
    listEmptyMessage: {
        marginTop: 10,
        color: COLORS.GREY_3,
        fontSize: 16,
        letterSpacing: 0.5,
        textAlign: 'center',
    },
});

