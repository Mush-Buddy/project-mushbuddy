import React from 'react';
import MapView, { Marker } from 'react-native-maps';

// a collection of markers
// add a param for a function i think
const Markers = ( {markers, onDragEndEvent} ) => {
    return (
        <>
            {/* renders an array of markers sequentially. */}
            {markers.map((markers, index) => (
                <Marker 
                    id={markers.id}
                    key={index}
                    title={markers.title}
                    description={markers.description}
                    mushroom={markers.mushroom}
                    coordinate={markers.coordinate}
                    draggable={true}
                    onDragEnd={(e) => onDragEndEvent(index, e.nativeEvent.coordinate)}
                /> 
            ))}
        </>
    )
}

export default Markers;