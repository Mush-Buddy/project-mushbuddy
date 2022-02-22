import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/actions/authAction'
import { Button, Text, TextInput, View  } from 'react-native'

const Login = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        let userData = {username, password}
        dispatch(login(userData))
    }


    return (
        <View style={{ justifyContent: "center", alignItems: "center",flex:1}}>
            <View>
                <TextInput autoCapitalize = "none"
                    placeholder="username" 
                    value={username} onChangeText ={(username) => setUsername(username)}
                />
                <TextInput autoCapitalize = "none"
                    placeholder="password" 
                    value={password} onChangeText ={(password) => setPassword(password)}
                />
                <Button
                    onPress={() => handleSubmit()}
                    title="Login"
                />
            </View>
        </View>

    )
}

export default Login
