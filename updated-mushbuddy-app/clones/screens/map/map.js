import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Markers from './markers.js';

// sample custom markers
//import SampleMarkerIcon from '../../assets/favicon.png';
import { getDataAPI } from '../../utils/fetchData'

const Map = ( { navigation } ) => {
  const [post, setPosts] = useState([]);
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const { auth } = useSelector(state => state)
  const { posts } = useSelector(state => state)
  const [shouldFetch, setShouldFetch] = useState(true);

  const defaultCoords = {latitude: 43.703, longitude: -72.293}

  function getRandomNumberBetween(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  // random range for current region:
  //   "latitude": 43.706926586852234,
  //   "longitude": -72.29416723076919,
  // and
  //   "latitude": 43.69475372084176,
  //   "longitude": -72.28457748717949,

  useEffect(() => {
    console.log('fetching')
    const get_data = async () => {
        const res = await getDataAPI(`posts/${auth.user._id}?page=${page}&limit=${limit}`, auth.token)
        const newData = res.data.posts;
        // putting markers in random locations within the region (for now)
        const markers = newData.map(data => {return {title:data.title,description:data.content,coordinate: {latitude: getRandomNumberBetween(4369475372084176, 4370692658685223,) / 100000000000000, longitude: getRandomNumberBetween(7229416723076919, 7228457748717949) / -100000000000000}}})
        setPosts(markers);
        setPage(page);
        console.log(newData,markers)
    }
    get_data()
}, [page,shouldFetch,posts]);

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

  // Add a marker to the map.
  // currently offers no input fields, add those later.
  // note that the coordinate information is passed in as "event" parameter. This is fed in as e.nativeEvent in the MapView properties in render()
  // TODO: coordinate is from location services, title and description must be linked up to input fields.
  const addMarker = (coordinate, title, description) => {
    console.log("new marker to be placed at:")
    console.log(coordinate)
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
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        showsUserLocation={true}
        // onPress={e => console.log()}
      >

      {/* next, render all markers */}
      <Markers markers={post} />
      <Markers markers={testMarkers} />
      </MapView>}
        
      {/*
      <Callout style={styles.buttonCallout}>
        {renderAddPostButton()}
      </Callout>
      */}

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
