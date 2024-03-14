import { OpenStreetMapProvider } from "leaflet-geosearch";
import assistance from './assistance.js';
import deleteComment from './delete-comment.js';

//Get DB values
const lat = document.querySelector('#lat')?.value || 51.505;
const lng = document.querySelector('#lng')?.value || -0.09;
const address = document.querySelector('#address').value || '';


let map;
let marker;
let markers;

//Use the provider and GeoCoder
const geocodeService = L.esri.Geocoding.geocodeService();
const provider = new OpenStreetMapProvider();

document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.querySelector('.map-container')
    if(mapContainer) {
        map = L.map('map').setView([lat,lng], 15);
        markers = new L.featureGroup().addTo(map);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);


        //Search the address
        const finder = document.querySelector('#formfinder');

        finder.addEventListener('input', searchAddress);

        //Put the pin on Edition
        if(lat && lng){
            //Add the marker
            marker = new L.marker([lat,lng], {
                draggable: true,
                autoPan: true

            })
            .addTo(map)
            .bindPopup(address)
            .openPopup();

            //Assign to the container markers
            markers.addLayer(marker);

             //Detect marker movement
             marker.on('moveend', function (e){
                const markerPointer = e.target
                const position = markerPointer.getLatLng();
                map.panTo(new L.LatLng(position.lat, position.lng));

                //Reverse geocoding again, when the user relocates the pin
                geocodeService.reverse().latlng(position, 15).run(function(error, resultGC) {
                    fillInputs(resultGC);
                    marker.bindPopup(resultGC.address.LongLabel);
                })
            })
        }
    }
})

function fillInputs(result){
    document.querySelector('#address').value = result.address.Address || '';
    document.querySelector('#city').value = result.address.City || '';
    document.querySelector('#state').value = result.address.Region || '';
    document.querySelector('#country').value = result.address.CntryName || '';
    document.querySelector('#lat').value = result.latlng.lat || '';
    document.querySelector('#lng').value = result.latlng.lng || '';



}

function searchAddress(e){
    if(e.target.value.length > 8 ){

        //If a previous marker exists, clean it
        markers.clearLayers();

        provider.search({query: e.target.value}).then((result) => {
            //If a previous marker exists, clean it
            markers.clearLayers();

            //Workaround to avoid the app crash
            if((result[0].bounds[0] === undefined)) result[0].bounds[0] = ['',''];

            //Reverse geocoding
            geocodeService.reverse().latlng(result[0].bounds[0], 15).run(function(error, resultGC) {


                fillInputs(resultGC);
                //Show the map
                map.setView(result[0].bounds[0], 15);

                //Add the marker
                marker = new L.marker(result[0].bounds[0], {
                    draggable: true,
                    autoPan: true

                })
                .addTo(map)
                .bindPopup(result[0].label)
                .openPopup();

                //Assign to the container markers
                markers.addLayer(marker);

                //Detect marker movement
                marker.on('moveend', function (e){
                    const markerPointer = e.target
                    const position = markerPointer.getLatLng();
                    map.panTo(new L.LatLng(position.lat, position.lng));

                    //Reverse geocoding again, when the user relocates the pin
                    geocodeService.reverse().latlng(position, 15).run(function(error, resultGC) {
                        fillInputs(resultGC);
                        marker.bindPopup(resultGC.address.LongLabel);
                    })
                })
            })

        })
    }
}

