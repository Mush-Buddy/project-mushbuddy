import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import styles from '../components/stylesheets/signin_style';


const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return(
        <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder} 
            style={styles.inputContainer}
            secureTextEntry={secureTextEntry}>
        </TextInput>    
    )
}

export default CustomInput;