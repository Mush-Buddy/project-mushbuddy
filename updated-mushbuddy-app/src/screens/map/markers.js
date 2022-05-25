import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker, Callout } from 'react-native-maps';
// import Modal from 'react-native-modal';

// a collection of markers.
// takes in a function to be invoked after dragging a marker.
const Markers = ({ markers, onDragEndEvent, onCalloutTapEvent }) => {
    return (
        <>
            {/* renders an array of markers sequentially. */}
            {markers.map((markers, index) => (
                <Marker
                    id={markers.id}
                    key={index}
                    title={markers.title}
                    content={markers.content}
                    description={markers.description}
                    mushroom={markers.mushroom}
                    coordinate={markers.coordinate}
                    draggable={true}
                    onDragEnd={(e) => onDragEndEvent(index, e.nativeEvent.coordinate)}
                >
                    <Callout
                        onPress={() => {
                            console.log("callout pressed");
                            onCalloutTapEvent("default title", "default description");
                        }}>
                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>

                            <Text style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                            }}>
                                {markers.title}
                            </Text>
                            <Text style={{
                                fontSize: 10,
                                fontStyle: 'italic',
                            }}>
                                {markers.content}
                            </Text>
                            {/* <Text>
                                    {Object.values(markers.mushroom)}
                                </Text>

                                <Text>
                                    {Object.values(markers.coordinate)}
                                </Text> */}
                            {/* <TouchableOpacity
                                    onPress={}
                                >

                                </TouchableOpacity> */}
                        </View>

                    </Callout>
                </Marker>
            ))}
        </>
    )
}

export default Markers;