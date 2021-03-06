function createMap(markers) {

    var map = L.map('map').setView([30.505, -0.09], 3);

    var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
    });

    
    var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	    subdomains: 'abcd',
	    minZoom: 1,
	    maxZoom: 16,
	    ext: 'jpg'
    });

    var Esri_WorldShadedRelief = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
        maxZoom: 13
    });

    var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
    });


    L.layerGroup(markers)
    .addTo(map);

    // OpenStreetMap_HOT.addTo(map);
    // Stamen_Watercolor.addTo(map);
    // Esri_WorldShadedRelief.addTo(map);
    Esri_WorldGrayCanvas.addTo(map);

}


d3.json('/api/top_breeds').then(function (response) {
    console.log(response)

    var pawIcon = L.icon({
        iconUrl: '../static/js/paw-print-clip-art.png',
        iconSize:     [30, 30], // size of the icon
        iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var markers = []
    for (let i = 0; i < response.length; i++) {
        var popupContent = `<div><center><img src="${response[i].image_url}" class=popup-img width="180" height=auto></center> <center>
        <h6>${response[i].name}</h6></center> <br> <center><h7>${response[i].origin}</h7></center><hr> </div`;
        var marker = L.marker([response[i].lat,response[i].lng],{
            icon: pawIcon
        })
        .bindPopup(popupContent, {
            maxWidth : 560
        });
        
        markers.push(marker)

    }
    createMap(markers);

})

// https://github.com/eesur/country-codes-lat-long
