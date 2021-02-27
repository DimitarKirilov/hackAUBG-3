import React, { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2J6aGVjaGV2IiwiYSI6ImNrbG51YTZ0bjBsbngydm1zcmlrN21lemoifQ.VMydvvgdgj3rwfRPtu6sWA';

export default function MapTest() {

    const [map, setMap] = useState(null);

    useEffect(() => {

        const map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/sbzhechev/cklnq1ist4k9r17ms6qwfqp32', // style URL
            center: [-73.935242, 40.730610], // starting position [lng, lat]
            // center: [-122.48369693756104, 37.83381888486939],
            zoom: 16, // starting zoom
            pitch: 30,
            bearing: -17.6,
            antialias: true
        });

        map.dragRotate.disable();

        map.on('style.load', function (e) {
            map.addSource('markers1', {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-73.935242, 40.730610]
                        },
                        "properties": {
                            "modelId": 1,
                        },
                    }]
                }
            });

            map.addSource('markers2', {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-73.932242, 40.730610]
                        },
                        "properties": {
                            "modelId": 1,
                        },
                    }]
                }
            });

            map.addSource('markers3', {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-73.940242, 40.730610]
                        },
                        "properties": {
                            "modelId": 1,
                        },
                    }]
                }
            });

            map.addLayer({
                "id": "circles1",
                "source": "markers1",
                "type": "circle",
                "paint": {
                    "circle-radius": map.getZoom() * 4,
                    "circle-color": "#ffff00",
                    "circle-opacity": 0.5,
                    "circle-stroke-width": 0,
                },
                "filter": ["==", "modelId", 1],
            });

            map.addLayer({
                "id": "circles2",
                "source": "markers2",
                "type": "circle",
                "paint": {
                    "circle-radius": map.getZoom() * 4,
                    "circle-color": "#ff0000",
                    "circle-opacity": 0.5,
                    "circle-stroke-width": 0,
                },
                "filter": ["==", "modelId", 1],
            });

            map.addLayer({
                "id": "circles3",
                "source": "markers3",
                "type": "circle",
                "paint": {
                    "circle-radius": map.getZoom() * 4,
                    "circle-color": "#00ff00",
                    "circle-opacity": 0.5,
                    "circle-stroke-width": 0,
                },
                "filter": ["==", "modelId", 1],
            });

            setMap(map);
        });

        // Set options
        const marker1 = new mapboxgl.Marker({
            color: "#FF0000",
            draggable: true
        }).setLngLat([-73.935242, 40.730610])
        .addTo(map);

        const marker2 = new mapboxgl.Marker({
            color: "#FF0000",
            draggable: true
        }).setLngLat([-73.932242, 40.730610])
        .addTo(map);

        const marker3 = new mapboxgl.Marker({
            color: "#FF0000",
            draggable: true
        }).setLngLat([-73.940242, 40.730610])
        .addTo(map);

        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'bottom-right');
       
    }, []);

    useEffect(() => {
        if (map && map.zoom) {
            map.getLayer('circles1').paint['circle-radius'] = map.getZoom() * 4;
        }
    }, [map])

    return (
        <div id="map">
        </div>
    )
};