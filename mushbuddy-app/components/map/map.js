import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

import Markers from './markers.js';

// sample custom markers
//import SampleMarkerIcon from '../../assets/favicon.png';

// import { newPostMade } from '../.../redux/actions/profileAction';
import { useSelector } from 'react-redux';

import { newPostMade } from '../../redux/actions/profileAction';

const Map = ( { navigation } ) => {
  //console.log("rerender");
  // testing markers we use for testing purposes. This will be a backend call at some point
  const [testMarkers, setMarkers] = useState([
    {
      title: "Enoki",
      description: "A Enoki was found here",
      coordinate: {latitude: 43.700859, longitude: -72.289398},
    },
    {
      title: "Chanterelle",
      description: "A Chanterelle was found here",
      coordinate: {latitude: 43.703, longitude: -72.286},
    },
    {
      title: "Porcini",
      description: "A Porcini was found here",
      coordinate: {latitude: 43.704, longitude: -72.293},
    },
  ])

  // The user's location.
  const [userLocation, setUserLocation] = useState({latitude: 0.0, longitude: 0.0});

  // listener for updates to postState
  const postState = useSelector(state => state.profile.newPostMade);
  // console.log(postState);
  // console.log("rerender");

  // just use these coordinates if location services don't work
  const defaultCoords = {latitude: 43.703, longitude: -72.293}
  // Add a marker to the map.
  // TODO: coordinate is from location services, title and description must be linked up to input fields.
  const addMarker = (coordinate, title, description) => {
    console.log("new marker to be placed at:")
    console.log(coordinate)
    const newMarker = {title: title, description: description, coordinate: coordinate}
    setMarkers([...testMarkers, newMarker])
  }

  // update the user location with their new GPS coordinates.
  const updateUserLocation = (event) => {
    const newLocation = {latitude: event.coordinate.latitude, longitude: event.coordinate.longitude};
    // this might not update right away
    setUserLocation(newLocation);
  }

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
    {<MapView
        style={styles.map}
        initialRegion={{
          latitude: 43.700859,
          longitude: -72.289398,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        // temporary. a UI entry field will be used later to add markers
        showsUserLocation={true}
        // updates the userLocation state on location change
        onUserLocationChange={e => updateUserLocation(e.nativeEvent)}
      >

      {/* next, render all markers */}
      <Markers markers={testMarkers} />
      </MapView>}
        
      <Callout style={styles.buttonCallout}>
        {renderAddPostButton()}
      </Callout>

      {/* some past lines that worked */}
      {/* <Marker title = {testMarkers[0].title} description = {testMarkers[0].description} coordinate={testMarkers[0].coordinate}></Marker> */}
      {/* <Marker title = {"chicago mushroom"} description = {"mushroom description"} coordinate={{latitude: 42.03, longitude: -93.58}}></Marker>
      {/* <Marker title = {"dartmouth mushroom"} description = {"mushroom description"} coordinate={{latitude: 43.700859, longitude: -72.289398}}></Marker> */}
      {/* <Marker
          title={"Mushroom name"}
          description={"Mushroom description"}
          image={SampleMarkerIcon}
          coordinate={{ latitude: 42.03, longitude: -93.58 }}
      /> */}

    </View>
  );
}

// map stylesheet
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
    backgroundColor: 'transparent',
  },
});

export default Map;
