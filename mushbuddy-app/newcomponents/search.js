import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import { getDataAPI } from '../utils/fetchData'
import { View, TextInput, FlatList, Text, Button } from 'react-native'

const Search = () => {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()


    const handleSearch = async (e) => {
        if(!search) return;
        try {
            const res = await getDataAPI(`users/?username=${search}`, auth.token)
            console.log(res)
            setUsers(res.data.users)
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
            })
        }
    }

    return (
        <View style={{ justifyContent: "center", alignItems: "center",flex:1}}>
            <View>
                <TextInput autoCapitalize = {'none'}
                    placeholder= "Typer Username"
                    value = {search}
                    onChangeText={(search) => setSearch(search)} />
                <Button
                    onPress={() => handleSearch()}
                    title="Search"
                />
            </View>

            <FlatList
                data={users}
                keyExtractor = {(item) => item._id}
                renderItem={({ item }) => (
                        <View>
                            <Text>{item.username}</Text>
                        </View>
                )}
            />
    </View>
    )
}

export default Search