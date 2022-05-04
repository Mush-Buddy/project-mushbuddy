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
                    key={index}
                    title={markers.title}
                    description={markers.description}
                    coordinate={markers.coordinate}
                    draggable={true}
                    onDragEnd={() => onDragEndEvent(index)}
                /> 
            ))}
        </>
    )
}

export default Markers;