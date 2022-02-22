import React, { useState, useEffect } from 'react'
import { FlatList, Text, View } from 'react-native';

const Posts = ({auth, id, dispatch,profile}) => {
    const [posts, setPosts] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(0)

    useEffect(() => {
        profile.posts.forEach(data => {
            if(data._id === id){
                setPosts(data.posts)
                setResult(data.result)
                setPage(data.page)
            }
        })
    },[profile.posts, id])

    return (
        <View>
            <FlatList
                data={posts}
                keyExtractor = {(item) => item._id}
                renderItem={({ item }) => (
                <Text>{item.title}</Text>
                )}
            />
        </View>
    )
}

export default Posts