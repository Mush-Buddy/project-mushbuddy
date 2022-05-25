import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import Markers from './markers.js';

import * as postActions from '../../store/actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from "react-native-flash-message";

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

  const dispatch = useDispatch();

  // render markers
  useEffect(() => {
    console.log('fetching')
    const get_data = async () => {
        const res = await getDataAPI(`posts/${auth.user._id}?page=${page}&limit=${limit}`, auth.token)
        const newData = res.data.posts;

        // render markers as stored in the backend
        const markers = newData.map(data => {return {title:data.title, content:data.content, coordinate:data.coordinate, id:data._id, mushroom:data.mushroom, description:data.description}});

        setPosts(markers);
        setPage(page);
    }
    get_data()
}, [page, shouldFetch, posts]);

  // move to the create new post screen
  const moveToNewPost = () => {
    // no params to pass in here
    navigation.navigate('CreatePost');
  }

  const goToDetailedPost = (title, description) => {
    // navigation.navigate('DetailedPost', {postTitle: title, postDesc: description});
    navigation.navigate('DetailedPost', {
      postTitle: title, postDesc: description
    });
  }

  // renders the red add post button over the map.
  const renderAddPostButton = () => {
    return (
      <TouchableOpacity onPress={() => { moveToNewPost(); }}>
        <Icon name='add-circle' size={45} color='#D85000' />
      </TouchableOpacity>
    );
  }

  // currently brings up the index and the new coordinate where the marker was dropped.
  const updateMarker = async (index, newCoordinate) => {
    let id = post[index].id;
    let title = post[index].title;
    let mushroom = post[index].mushroom;
    let content = post[index].content;
    let description = post[index].description;
    // new coordinate is given to this variable
    let coordinate = newCoordinate;
    let postData = { title, mushroom, content, coordinate, description };

    try {
      await dispatch(postActions.updatePost({ id, postData, auth }));
    } catch (error) {
        showMessage({
            message: error.message,
            type: "danger",
            duration: 3000,
            icon: { icon: "danger", position: 'left' }
        });
        console.log("ERROR ", error.message);
    }
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
        // umcomment this if you need to see coordinates on tap/click
        // onPress={e => console.log(e.nativeEvent.coordinate)}
      >
      {/* next, render all markers, using Markers component and fetched data */}
      <Markers markers={post} onDragEndEvent={updateMarker} onCalloutTapEvent={() => goToDetailedPost()}/>
      </MapView>}
        
      {/* add button*/}
      <Callout style={styles.buttonCallout}>
        {renderAddPostButton()}
      </Callout>
    </View>
  );
}

// --- old functions ---
  // Add a marker to the map.
  // currently offers no input fields, add those later.
  // note that the coordinate information is passed in as "event" parameter. This is fed in as e.nativeEvent in the MapView properties in render()
  // TODO: coordinate is from location services, title and description must be linked up to input fields.
  // const addMarker = (coordinate, title, description) => {
  //   console.log("new marker to be placed at:")
  //   console.log(coordinate)
  //   const newMarker = {title: title, description: description, coordinate: event.coordinate}
  //   setMarkers([...testMarkers, newMarker])
  // }

  // const defaultCoords = {latitude: 43.703, longitude: -72.293}

  // random range for current region:
  //   "latitude": 43.706926586852234,
  //   "longitude": -72.29416723076919,
  // and
  //   "latitude": 43.69475372084176,
  //   "longitude": -72.28457748717949,

  // in render
  //   {/* some past lines that worked */}
  // {/* <Marker title = {testMarkers[0].title} description = {testMarkers[0].description} coordinate={testMarkers[0].coordinate}></Marker> */}
  // {/* <Marker title = {"chicago mushroom"} description = {"mushroom description"} coordinate={{latitude: 42.03, longitude: -93.58}}></Marker>
  // {/* <Marker title = {"dartmouth mushroom"} description = {"mushroom description"} coordinate={{latitude: 43.700859, longitude: -72.289398}}></Marker> */}
  // {/* <Marker
  //     title={"Mushroom name"}
  //     description={"Mushroom description"}
  //     image={SampleMarkerIcon}
  //     coordinate={{ latitude: 42.03, longitude: -93.58 }}
  // /> */}

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
