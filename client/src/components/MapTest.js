import React, { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2J6aGVjaGV2IiwiYSI6ImNrbG51YTZ0bjBsbngydm1zcmlrN21lemoifQ.VMydvvgdgj3rwfRPtu6sWA';

export default function MapTest({ center, zone, initialView }) {

    const [map, setMap] = useState(null);
    const [currentLayer, setCurrentLayer] = useState('');

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/sbzhechev/cklnq1ist4k9r17ms6qwfqp32', // style URL
            center: initialView, // starting position [lng, lat]
            zoom: 11, // starting zoom
            pitch: 30,
            bearing: -17.6,
            antialias: true
        });

        map.dragRotate.disable();

        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'bottom-right');

        map.on('click', function(e) {
            // The event object (e) contains information like the
            // coordinates of the point on the map that was clicked.
            console.log('A click event has occurred at ', e);
        });

        map.on('style.load', function (e) {
            setMap(map);
        });

    }, [initialView]); 

    useEffect(() => {
        if (map && zone.coordinates && center) {
            if (currentLayer === `route${zone.zoneNum}`) return;
            let str = zone.coordinates;

            let coordinates = str.split('((')[1].split('))')[0].split(', ');

            let arrayOfTuples = [];
            coordinates.forEach((coordinate) => {
                let lat = coordinate.split(' ')[0];
                let lng = coordinate.split(' ')[1];
                arrayOfTuples.push([Number(lat), Number(lng)]);
            });

            map.panTo(arrayOfTuples[0]);

            if (map.getLayer(currentLayer)) map.removeLayer(currentLayer);

            map.addSource(`route${zone.zoneNum}`, {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                    'type': 'LineString',
                    'coordinates': arrayOfTuples
                    }
                }
            });

            map.addLayer({
                'id': `route${zone.zoneNum}`,
                'type': 'fill',
                'source': `route${zone.zoneNum}`,
                'layout': {},
                'paint': {
                    // The fill color for the layer is set to a light purple
                    'fill-color': zone.zoneColor,
                    'fill-opacity': 0.3
                }
            });

            setCurrentLayer(`route${zone.zoneNum}`);
        }
       
    }, [map, zone, center, currentLayer]);

    return (
        <div id="map">
        </div>
    )
};