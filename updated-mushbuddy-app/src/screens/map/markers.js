import React from 'react';
import MapView, { Marker } from 'react-native-maps';

// a collection of markers
const Markers = ( {markers} ) => {
    return (
        <>
            {/* renders an array of markers sequentially. */}
            {markers.map((markers, index) => (
                <Marker 
                    key={index}
                    title={markers.title}
                    description={markers.description}
                    coordinate={markers.coordinate}
                /> 
            ))}
        </>
    )
}

export default Markers;