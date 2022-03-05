import { StyleSheet } from 'react-native';

import { COLORS } from '../colors';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: COLORS.BG,
    },
    headerContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
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