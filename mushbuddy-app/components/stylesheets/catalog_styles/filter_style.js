import { StyleSheet } from 'react-native';

import { COLORS } from '../colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: COLORS.BG,
    },
    headerContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    carouselsContainer: {
        //flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: COLORS.TEXT,
    },
    backButton: {
        position: 'absolute',
        left: 0,
    },
});