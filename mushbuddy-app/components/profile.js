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
      selectedIndex: 0
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    this.props.getUserByID();
  }

  updateIndex = (selectedIndex) => {
    this.setState({ selectedIndex });
  }

  getUserName = () => {
    if (this.props.user.user) {
      console.log("can access this.props.user.user");
      console.log(this.props.user.user.username);
      return this.props.user.user.username;
    }
    else {
      console.log("can't access this.props.user.user");
    }
  }

  // Render methods

  renderProfileImage = () => {
    return (
      <View style={styles.profileImageContainer}>
        <Image
          source={defaultIcon}
          style={styles.profileImage}
          resizeMode='center'
        />
      </View>
    );
  }

  // Modular profile info renderers

  renderUserName = () => {
    return (
      <Text style={styles.headerText}>
        {this.getUserName()}
        {/* Aleskander Zitko */}
      </Text>
    );
  }

  renderUserHandle = () => {
    return (
      <Text style={styles.subheaderText}>
        @ aleks_ko
      </Text>
    );
  }

  renderUserLocation = () => {
    return (
      <View style={styles.locationLine}>
        <Icon name='location' size={14} color='#FFAA60' />
        <Text> Portland, OR</Text>
      </View>
    );
  }

  renderProfileInfo = () => {
    return (
      <View style={styles.userInfoContainer}>
        {this.renderUserName()}
        {this.renderUserHandle()}
        {this.renderUserLocation()}
      </View>
    );
  }

  renderButtonGroup = (buttonOptions) => {
    return (
      <View style={styles.buttonGroupContainer}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={this.state.selectedIndex}
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

  renderSubComponent = () => {
    if (this.state.selectedIndex === 0) {
      return (
        <Badges />
      );
    } else {
      return (
        <History />
      );
    }
  }

  render() {
    const buttons = ['Badges', 'History'];
    //const { selectedIndex } = this.state;

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
                {this.renderProfileImage()}
                {this.renderProfileInfo()}
              </View>

            </ImageBackground>
          </View>

          {this.renderButtonGroup(buttons)}
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