import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getProfileUsers } from '../../redux/actions/profileAction';

import { View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonGroup } from 'react-native-elements';

import Info from './info';
import Badges from './badges.js';
import Posts from './posts';

import styles from '../stylesheets/profile_styles/profile_style.js';

const Profile = () => {
    const { profile, auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const id = auth.user._id;
    useEffect(() => {
        if (profile.ids.every(item => item !== id)) {
            dispatch(getProfileUsers({ id, auth }))
        }
    }, [id, auth, dispatch, profile.ids]);

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
                <Posts auth={auth} id={id} dispatch={dispatch} profile={profile} />
            );
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                <Info auth={auth} id={id} dispatch={dispatch} profile={profile} />
                {renderButtonGroup(buttons)}
            </ScrollView>
            {renderSubComponent()}
        </SafeAreaView>
    );
}

export default Profile;