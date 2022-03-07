import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonGroup } from 'react-native-elements';
import {ActivityIndicator} from 'react-native'

import Info from './info';
import Badges from './badges.js';
import Posts from './posts';

import styles from '../../components/stylesheets/profile_styles/profile_style.js';

import * as usersActions from '../../store/actions/users';
import * as postsActions from '../../store/actions/posts';

const UserProfileScreen = (props) => {
    const { route } = props;
    const { auth, users, posts } = useSelector(state => state);
    const dispatch = useDispatch();
    const [id,setId] = useState(auth.user._id)
    
    useEffect(()=>{
        console.log(route.params)
        if(route.params){
            setId(route.params.userId);
    }  
    },[])

    useEffect(() => {
        if (users.allUsers.every(item => item._id !== id)){
            dispatch(usersActions.fetchUsers({id:id,auth:auth}));
        }
    },[id, auth, dispatch,users.allUsers])


    const buttons = ['Badges', 'History'];
    const [selectedIndex, setSelectedIndex] = useState(0);

    const renderButtonGroup = (buttonOptions) => {
        return (
            <View style={styles.buttonGroupContainer}>
                <ButtonGroup
                    onPress={(value) => {
                        setSelectedIndex(value);
                    }}
                    selectedIndex={selectedIndex}
                    buttons={buttonOptions}
                    textStyle={{
                        fontSize: 12,
                        color: '#BDBDBD',
                    }}
                    containerStyle={{
                        width: '90%',
                        height: 30,
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                    }}
                    buttonContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: 'transparent',
                    }}
                    innerBorderStyle={{ color: '#BDBDBD' }}
                    selectedButtonStyle={{
                        backgroundColor: 'transparent',
                    }}
                    selectedTextStyle={{ color: '#6C6C6C', fontWeight: 'bold' }}
                />
            </View>
        );
    }

    const renderSubComponent = () => {
        if (selectedIndex === 0) {
            return (
                <Badges />
            );
        } else {
            return (
                // <History />
                <Posts auth={auth} posts={posts} id={id} dispatch={dispatch}/>
            );
        }
    }

    const loadingIndicator = () => {
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    return (
        users.allUsers >1 ? (loadingIndicator()) : (<SafeAreaView style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                >
                    <Info auth={auth} id={id} users={users} dispatch={dispatch}/>
                    {renderButtonGroup(buttons)}
                </ScrollView>
                {renderSubComponent()}
            </SafeAreaView>)
    );
}

export const screenOptions = (navData) => {

    const routeParams = navData.route.params ? navData.route.params : {};
    if(!routeParams.name){
        return{
            headerTitle: routeParams.name ? routeParams.name : "Profile",
        }
    } else {
        return{
            headerTitle: routeParams.name ? routeParams.name : "Profile",
        }
    }

    
}

export default UserProfileScreen;