import { Image, Text, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react'

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

const Info = ({id, auth, dispatch}) => {
    const [userData, setUserData] = useState([])
    
    useEffect(() => {
        if(id === auth.user._id){
            setUserData([auth.user])
        }
    }, [id, auth, dispatch])

    return (
        <ScrollView> 
            {
                userData.map(user => (<View key = {user._id}>
                    <Image
                        style={styles.tinyLogo}
                        source={{uri:user.avatar}}
                    />
                    <View>
                        <Text>{user.username}</Text>
                        <Text>username</Text>
                    </View>
                    <View>
                        <Text>{user.followers.length}</Text>
                        <Text>Followers</Text>
                    </View>
                    <View>
                        <Text>{user.following.length}</Text>
                        <Text>Following</Text>
                    </View>
                </View>
                ))
            }
        </ScrollView >
    )
}

export default Info