import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useState } from 'react';
import getCenter from 'geolib/es/getCenter';

function Map({ searchResult }) {
    const [selectedLocation, setSelectedLocation] = useState({});

    const coordinates = searchResult.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));
    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 8
    });


    return (
        <ReactMapGL
            mapStyle='mapbox://styles/nav1947/cks9xl79ahf2117plg3shy83x'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResult.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p onClick={() =>setSelectedLocation(result)} aria-label="push-pin" role="img" className='cursor-pointer text-2xl animate-bounce' >🔴</p>
                    </Marker>
                    {
                    selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ) : (
                        false
                    )
                }
                </div>
    ))
}
        </ReactMapGL >
    )
}
export default Map;