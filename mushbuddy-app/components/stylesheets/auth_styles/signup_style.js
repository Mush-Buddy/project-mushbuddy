import { StyleSheet} from 'react-native';

import { COLORS } from '../colors';

const MARGIN_TOP = 60;
const MARGIN_LEFT = 35;
const MARGIN_BOTTOM = 30;

export default StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
        backgroundColor: COLORS.BG,
        //height: '100%',
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        width: 300,
        marginTop: MARGIN_TOP,
        marginLeft: MARGIN_LEFT,
        marginBottom: 50,
    },
    headerText: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 40,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: COLORS.TEXT,
    },
    fieldsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: MARGIN_LEFT,
    },
    sectionContainer: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
    },
    sectionHeaderText: {
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing: 3,
        color: COLORS.TEXT_GREEN,
        marginBottom: 30,
    },
    inputField: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
        marginBottom: 20,
    },
    textInput: {
        width: 300,
        height: 40,
        backgroundColor: 'transparent',
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.GREY_3,
        fontSize: 14,
    },
    inputRow: {
        flex: 1,
        flexDirection: 'row',
        //marginRight: 35,
    },
    textInputInRow: {
        paddingBottom: 10,
        backgroundColor: 'transparent',
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.GREY_3,
        fontSize: 14,
        marginRight: 20,
        width: 140,
        marginTop: 10,
    },
    subheaderText: {
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: MARGIN_BOTTOM,
    },
    signupButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        padding: 10,
        height: 45,
        borderRadius: 12.5,
        backgroundColor: COLORS.GREEN,
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