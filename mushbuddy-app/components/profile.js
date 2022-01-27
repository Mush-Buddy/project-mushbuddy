import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

import styles from './stylesheets/profile_style.js';

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}></View>

        <Avatar
          size="xlarge"
          rounded
          containerStyle={{ backgroundColor: "#FFFFFF" }}
          source={{uri: "https://www.svgrepo.com/show/276142/mushroom.svg" }}
        />

        <View style={styles.body}>

          <View style={styles.bodyContent}>

            <Text style={styles.userName}>Aleksander Zitko</Text>
            <Text style={styles.userHandle}>@aleks_ko</Text>
            <Text style={styles.userLocation}>Portland, OR</Text>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Add Buddy</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }
}

export default Profile;
