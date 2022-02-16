import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserByID } from '../actions';

import { View, Text, TouchableOpacity, SafeAreaView, Image, ImageBackground, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import defaultIcon from '../assets/icon_default.png';

import { ButtonGroup } from 'react-native-elements';

import styles from './stylesheets/profile_style.js';

import headerBackground from '../assets/profile_assets/header_background2.png';

import Badges from './badges.js';
import History from './history.js';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 2
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    this.props.getUserByID();
  }

  renderName = () => {
    if (this.props.user.username && this.props.user.username !== '') {
      console.log(this.props.user.username);
    }
  }

  updateIndex = (selectedIndex) => {
    this.setState({ selectedIndex });
  }

  renderSubComponent = () => {
    if (this.state.selectedIndex === 1) {
      return (
        <History />
      );
    } else {
      return (
        <Badges />
      );
    }
  }

  render() {
    const buttons = ['Badges', 'History'];
    const { selectedIndex } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.upperContainer}>
            <ImageBackground source={headerBackground} resizeMode="stretch" style={styles.headerBackgroundImage}>

              <View style={styles.upperNavigation}>
                {/* <Icon name='arrow-back' size={24} color='white' /> */}
                <Icon name='cog' size={24} color='white' />
              </View>

              <View style={styles.profileStripContainer}>

                <View style={styles.profileImageContainer}>
                  <Image
                    source={defaultIcon}
                    style={styles.profileImage}
                    resizeMode='center'
                  />
                </View>

                <View style={styles.userInfoContainer}>
                  <Text style={styles.headerText}>
                    {/* {this.renderName()} */}
                    Aleskander Zitko
                  </Text>
                  <Text style={styles.subheaderText}>
                    @ aleks_ko
                  </Text>
                  <View style={styles.locationLine}>
                    <Icon name='location' size={14} color='#FFAA60' />
                    <Text> Portland, OR</Text>
                  </View>
                </View>

              </View>
            </ImageBackground>
          </View>

          <View style={styles.buttonGroupContainer}>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
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

          {this.renderSubComponent()}

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  user: reduxState.user.userObject,
});

//export default Profile;
export default connect(mapStateToProps, {
  getUserByID,
})(Profile);