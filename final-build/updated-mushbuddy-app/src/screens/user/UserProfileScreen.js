import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonGroup } from 'react-native-elements';
import { ActivityIndicator } from 'react-native'

import Info from './info';
import Badges from './badges';
import Posts from './posts';

import styles from '../../components/stylesheets/profile_styles/profile_style.js';

import * as usersActions from '../../store/actions/users';
import * as postsActions from '../../store/actions/posts';
import { useIsFocused } from '@react-navigation/native';

const UserProfileScreen = (props) => {
    const { route } = props;
    const { auth, users } = useSelector(state => state);
    const dispatch = useDispatch();
    const [id, setId] = useState(auth.user._id);

    const buttons = ['Badges', 'History'];
    const [selectedIndex, setSelectedIndex] = useState(0);

    // For scrolling
    // const [previous, setPrevious] = useState(0);
    // const [hidden, setHidden] = useState(false);

    // const handleOnScroll = (event) => {
    //     if (previous < event) {
    //         setPrevious(event);
    //         setHidden(true);
    //     } else {
    //         setPrevious(event);
    //         setHidden(false);
    //     }
    // }

    useEffect(() => {
        //console.log(route.params);
        if (route.params) {
            setId(route.params.userId);
        }
    }, []);


    useEffect(() => {
        if (users.allUsers.every(item => item._id !== id)) {
            dispatch(usersActions.fetchUsers({ id: id, auth: auth }));
        }
    }, [id, auth, dispatch, users.allUsers]);

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
                <Posts
                    auth={auth}
                    posts={users.posts}
                    id={id}
                    dispatch={dispatch}
                    //handleScroll={handleOnScroll}
                />
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

    // const renderHeader = () => {
    //     if (hidden) {
    //         return null;
    //     } else {
    //         return (
    //             <View>
    //                 <Info auth={auth} id={id} users={users} dispatch={dispatch} />
    //                 {renderButtonGroup(buttons)}
    //             </View>
    //         );
    //     }
    // }

    return (
        // users.allUsers > 1 ? (loadingIndicator()) : (
        //     <SafeAreaView style={styles.container}>
        //         {renderHeader()}
        //         {renderSubComponent()}
        //     </SafeAreaView>)
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
    if (!routeParams.name) {
        return {
            headerTitle: routeParams.name ? routeParams.name : "Profile",
        }
    } else {
        return {
            headerTitle: routeParams.name ? routeParams.name : "Profile",
        }
    }
}

export default UserProfileScreen;