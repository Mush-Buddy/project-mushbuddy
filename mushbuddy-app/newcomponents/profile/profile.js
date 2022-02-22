import Info from '../info'
import { useSelector, useDispatch } from 'react-redux'
import Posts from '../posts'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { getProfileUsers } from '../../redux/actions/profileAction'

const Profile = () => {
    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const id  = auth.user._id
    useEffect(() => {
        if(profile.ids.every(item => item !== id)){
            dispatch(getProfileUsers({id, auth}))
        }
    },[id, auth, dispatch, profile.ids])

    return (
        <View>
            <Info auth={auth} id={id} dispatch = {dispatch} profile = {profile}/>
            <Posts auth={auth} id={id} dispatch = {dispatch} profile={profile} />
        </View>
    )
}

export default Profile