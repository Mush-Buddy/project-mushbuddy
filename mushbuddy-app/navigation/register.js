import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../redux/actions/authAction'
import { Button, Text, TextInput, View  } from 'react-native'

const Register = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    

    const handleSubmit = () => {
        let userData = {email, username, password, firstName, lastName, city, state }
        dispatch(register(userData))
    }


    return (
        <View style={{ justifyContent: "center", alignItems: "center",flex:1}}>
            <View>
                <TextInput autoCapitalize = "none"
                    placeholder="firstName" 
                    value={firstName} onChangeText={firstName => setfirstName(firstName)}
                />
                <TextInput autoCapitalize = "none"
                    placeholder="lastName" 
                    value={lastName} onChangeText ={lastName => setlastName(lastName)}
                />
                <TextInput autoCapitalize = "none"
                    placeholder="username" 
                    value={username} onChangeText ={(username) => setUsername(username)}
                />
                <TextInput autoCapitalize = "none"
                    placeholder="email" 
                    value={email} onChangeText ={(email) => setEmail(email)}
                />
                <TextInput autoCapitalize = "none"
                    placeholder="state" 
                    value={state} onChangeText ={(state) => setState(state)}
                />
                <TextInput autoCapitalize = "none"
                    placeholder="city" 
                    value={city} onChangeText ={(city) => setCity(city)}
                />
                <TextInput autoCapitalize = "none"
                    placeholder="password" 
                    value={password} onChangeText ={(password) => setPassword(password)}
                />
                <Button
                    onPress={() => handleSubmit()}
                    title="Register"
                />
            </View>
        </View>

    )
}

export default Register
