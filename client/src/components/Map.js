import React, { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import axios from 'axios';

const accessToken = 'pk.eyJ1Ijoic2J6aGVjaGV2IiwiYSI6ImNrbG51YTZ0bjBsbngydm1zcmlrN21lemoifQ.VMydvvgdgj3rwfRPtu6sWA';
mapboxgl.accessToken = accessToken;

export default function Map({ center, zone, initialView, getSelectedZone, updateZone }) {

    const [map, setMap] = useState(null);
    const [currentLayer, setCurrentLayer] = useState('');

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/sbzhechev/cklnq1ist4k9r17ms6qwfqp32', // style URL
            center: initialView, // starting position [lng, lat]
            zoom: 10.5, // starting zoom
            pitch: 30,
            bearing: -17.6,
            antialias: true
        });

        const search = new MapboxGeocoder({
            accessToken: accessToken,
            mapboxgl: mapboxgl,
            marker: true,
            zoom: 10.5
        });

        search.on('result', (e) => {
            console.log(e);
            axios.get(`https://hackaubg3.ew.r.appspot.com/criminal-level?address="${e.result.place_name}"`)
            .then((response) => updateZone(response.data.data.district_result.district))
            .catch((error) => console.log(error));
        });

        map.addControl(search);

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

            if ( !map.getSource(`route${zone.zoneNum}`) ) {
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
            }

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
            getSelectedZone(zone.zoneNum);
        }
       
    }, [map, zone, center, currentLayer, getSelectedZone]);

    return (
        <div id="map">
        </div>
    )
};