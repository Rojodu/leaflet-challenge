function createMap(earthquakes) {
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let basemap = {
        "World Map": streetmap
    };

    let overlayMap = {
        "Earthquakes": earthquakes
    };

    let map = L.map("map", {
        center: [25, -100],
        zoom: 4,
        layers: [streetmap, earthquakes]
    });

    //let legend = L.control({ position: "bottomright" });
    //legend.onAdd = function() {
      //  let div = L.DomUtil.create("div", "info legend");
        //let limits = 
}

function createMarkers(response) {
    let earthquakes = response.features;

    let quakeMarkers = [];

    for (let i = 0; i < earthquakes.length; i++) {
        let quake = earthquakes[i];
        let redshift = (255-2*Math.floor(quake.geometry.coordinates[2])).toString(16);
        let fillColor = "#"+redshift+"7eff"
        let radius = quake.properties.mag * 10000;
        let quakeMarker = L.circle([quake.geometry.coordinates[1],quake.geometry.coordinates[0]], {
            color: "black",
            fillColor: fillColor,
            fillOpacity: 0.75,
            radius: radius
            }).bindPopup("<h3>Location:"+quake.properties.place+"<h3><h3>Magnitude:"+quake.properties.mag+"<h3><h3>Depth:"+quake.geometry.coordinates[2]+"</h3>");

        quakeMarkers.push(quakeMarker);
    }

    createMap(L.layerGroup(quakeMarkers));
}

url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

d3.json(url).then(createMarkers);