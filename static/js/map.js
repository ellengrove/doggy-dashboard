function createMap(markers) {

    var map = L.map('map').setView([51.505, -0.09], 4);

    var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
    });

    L.layerGroup(markers)
    .addTo(map);

    OpenStreetMap_HOT.addTo(map);

}


d3.json("../data/top_dogs.json").then(function (response) {
    var breeds = response.top_dog_breeds
    console.log(breeds)
    console.log(breeds.length)

    var pawIcon = L.icon({
        iconUrl: 'js/pawprint.png',
        iconSize:     [38, 38], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var markers = []
    for (let i = 0; i < breeds.length; i++) {
        if (isNaN(breeds[i].origin_coords[0]) === Boolean(false)) {
            var marker = L.marker([breeds[i].origin_coords[0],breeds[i].origin_coords[1]],
                {icon: pawIcon})
            .bindPopup(`${breeds[i].breed} <hr> ${breeds[i].origin} `)
            // console.log(breeds[i].origin_coords[0])
        }
        markers.push(marker)

    }
    createMap(markers);
    // console.log(markers)

})

// https://github.com/eesur/country-codes-lat-long
