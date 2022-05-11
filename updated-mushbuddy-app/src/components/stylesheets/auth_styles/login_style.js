import { StyleSheet} from 'react-native';

import { COLORS } from '../colors';

const MARGIN_TOP = 60;
const MARGIN_LEFT = 35;

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COLORS.BG,
        height: '100%',
    },
    fieldsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: MARGIN_LEFT,
    },
    inputField: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    textInput: {
        width: 300,
        height: 40,
        backgroundColor: 'transparent',
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.GREY_3,
        fontSize: 14,
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginTop: MARGIN_TOP,
        marginLeft: MARGIN_LEFT,
        marginBottom: 60,
        color: COLORS.TEXT,
    },
    subheaderText: {
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    errorText: {
        color: '#B32000',
        marginLeft: MARGIN_LEFT,
        fontSize: 12,
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        padding: 10,
        height: 45,
        borderRadius: 12.5,
        backgroundColor: COLORS.GREEN,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowColor: COLORS.TEXT_GREEN,
        shadowOffset: {width: 2, height: 2},
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    passwordField: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toggleButton: {
        position: 'absolute',
        right: 10,
    },
});