import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const Map = () => {
    return (
      // working mapview.
      <View style={styles.container}>
        <MapView 
          style={styles.map}
          initialRegion={{
            latitude: 43.700859,
            longitude: -72.289398,
            latitudeDelta: 0.0,
            longitudeDelta: 0.0,
          }}  
        >
        
        <Marker title = {"mushroom is here"} description = {"here is some information about the mushroom"} coordinate={{latitude: 42.03, longitude: -93.58}}></Marker>
        </MapView>
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
});

export default Map;
