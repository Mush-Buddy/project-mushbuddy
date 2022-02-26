import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import Icon from 'react-native-vector-icons/Ionicons';

import SampleMarkerIcon from '../assets/favicon.png';

const Map = ({ navigation }) => {

  const moveToNewPost = () => {
    navigation.navigate('Post', {});
  }

  const renderAddPostButton = () => {
    return (
      <TouchableOpacity onPress={() => { moveToNewPost(); }}>
        <Icon name='add-circle' size={45} color='#D85000' />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 43.700859,
          longitude: -72.289398,
          latitudeDelta: 0.0,
          longitudeDelta: 0.0,
        }}>
        <Marker
          title={"Mushroom name"}
          description={"Mushroom description"}
          image={SampleMarkerIcon}
          coordinate={{ latitude: 42.03, longitude: -93.58 }}
        />
      </MapView>

      <Callout style={styles.buttonCallout}>
        {renderAddPostButton()}
      </Callout>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonCallout: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    right: 15,
    bottom: 10,
    // justifyContent: 'space-between',
    // alignSelf: 'center',
    backgroundColor: 'transparent',
    // shadowOffset: {
    //   width: 2.5,
    //   height: 2.5,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    // shadowColor: '#3A1C00',
  },
});

export default Map;
