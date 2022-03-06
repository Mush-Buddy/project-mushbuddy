import { StyleSheet } from 'react-native';

import { COLORS } from '../colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: COLORS.BG,
    },
    headerContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    carouselsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: COLORS.TEXT,
    },
    subheaderText: {
        fontSize: 18,
        fontWeight: 'normal',
        letterSpacing: 0.5,
        color: COLORS.TEXT,
        marginBottom: 5,
        textAlign: 'center',
        width: '90%',
    },
    backButton: {
        position: 'absolute',
        left: 0,
    },
    button: {
        width: 150,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        borderColor: 'transparent',
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        letterSpacing: 0.5,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    bottomBar: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    }
});