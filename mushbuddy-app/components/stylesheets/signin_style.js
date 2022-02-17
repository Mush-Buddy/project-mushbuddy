import { CurrentRenderContext } from '@react-navigation/native';
import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

export default StyleSheet.create({
    content: {
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        backgroundColor:'#F0ECE8',
        flex: 1,
        // justifyContent:'center',
    },
    headerContainer: {
        textAlign:'center',
        display:'flex',
        width:'100%',
        padding:20,
    },

    inputContainer: {
        display:'flex',
        backgroundColor:'white',
        alignItems:'center',
        width:'90%',
        height:'5%',
        textAlign:'center',
        marginVertical:10,
    },

    buttonContainer: {
        backgroundColor:'#59A896',
        width:'90%',
        textAlign:'center',
        alignItems:'center',
        marginVertical:5,
    },
});