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
      title: "Chicago Mushroom",
      description: "This mushroom was found near Chicago",
      coordinate: {latitude: 42.03, longitude: -93.58},
    },
    {
      title: "Dartmouth Mushroom",
      description: "This mushroom was found near Dartmouth",
      coordinate: {latitude: 43.700859, longitude: -72.289398},
    },
    {
      title: "Around Dartmouth Mushroom",
      description: "This mushroom was found near Around Dartmouth",
      coordinate: {latitude: 44.700859, longitude: -75.289398},
    },
    {
      title: "Los Angeles Mushroom",
      description: "This mushroom was found near Los Angeles",
      coordinate: {latitude: 34, longitude: -118},
    }
  ])

  // listener for updates to postState
  const postState = useSelector(state => state.profile.newPostMade);
  // console.log(postState);
  // console.log("rerender");

  // Add a marker to the map.
  // currently offers no input fields, add those later.
  // note that the coordinate information is passed in as "event" parameter. This is fed in as e.nativeEvent in the MapView properties in render()
  // TODO: coordinate is from location services, title and description must be linked up to input fields.
  const addMarker = (event, title, description) => {
    console.log("new marker to be placed at:")
    console.log(event.coordinate)
    const newMarker = {title: title, description: description, coordinate: event.coordinate}
    setMarkers([...testMarkers, newMarker])
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
          latitudeDelta: 0.0,
          longitudeDelta: 0.0,
        }}
        // temporary. a UI entry field will be used later to add markers
        onPress={e => addMarker(e.nativeEvent, "marker title", "marker description")} 
        showsUserLocation={true}
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
