'use strict';
var mapboxgl = require('mapbox-gl');

mapboxgl.accessToken = 'pk.eyJ1IjoibWFya2tvbmciLCJhIjoiY2lteWNjMzFhMDQzbXZvbHUza3B6eTdoaSJ9.HuonodjO41vjRpMJk29lXA';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v8', //hosted style id
    center: [-122.32, 47.61], // starting position
    zoom: 10 // starting zoom
});

// add geojson markers
map.on('style.load', function () {
    map.addSource("markers", {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-77.03238901390978, 38.913188059745586]
                },
                "properties": {
                    "title": "Mapbox DC",
                    "marker-symbol": "monument"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-122.414, 37.776]
                },
                "properties": {
                    "title": "Mapbox SF",
                    "marker-symbol": "harbor"
                }
            }]
        }
    });

    map.addLayer({
        "id": "markers",
        "type": "symbol",
        "source": "markers",
        "layout": {
            "icon-image": "{marker-symbol}-15",
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
        }
    });
});

