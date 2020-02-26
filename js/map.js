/*
    *Amina Mahmood
    *Fountain of Mobile Design
    *Mr. Cady
    *map.js
*/
// Get current position 
navigator.geolocation.getCurrentPosition( onSuccess, onError, { timeout: 30000 } );

function onSuccess( position ) {
    if ( position.coords ) {
    let lat = position.coords.latitude,
        lng=position.coords.longitude,


    //Google Maps
        myLatlng = new google.maps.LatLng( lat, lng ),
        mapOptions = { zoom: 7, center: myLatlng },
        map = new google.maps.Map( document.getElementById( 'map-canvas' ), mapOptions ),
        marker = new google.maps.Marker( { position: myLatlng, map: map } );
    }
}

// Display to show error message
function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

// To change the location to different location
function initMap() {
    // Display the default map location
    var center = {lat: 39.771148, lng: -99.836975};
    var map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: 3, center: center});

    // Display the all city list
    var rochester = {lat: 43.1610, lng: -77.6109 };
    var chicago = {lat: 41.8781, lng: -87.6298 };
    var miami = {lat: 25.7617, lng: -80.1918 };
    var london = {lat: 51.5074, lng: -0.1278 };
    var tokyo = {lat: 35.6762, lng: 139.6503 };

    // List of locations and change the city from the selection
    if(document.getElementById("cityList").value == 'rochester') {
        var map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: 7, center: rochester});
        new google.maps.Marker({position: rochester, map: map});
    }

    else if(document.getElementById("cityList").value == 'chicago') {
        var map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: 7, center: chicago});
        new google.maps.Marker({position: chicago, map: map});
    }

    else if(document.getElementById("cityList").value == 'miami') {
        var map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: 7, center: miami});
        new google.maps.Marker({position: miami, map: map});
    }

    else if(document.getElementById("cityList").value == 'london') {
        var map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: 7, center: london});
        new google.maps.Marker({position: london, map: map});
    }

    else if(document.getElementById("cityList").value == 'tokyo') {
        var map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: 7, center: tokyo});
        new google.maps.Marker({position: tokyo, map: map});
    }
    // Call a function method for changeWeather
    changeWeather(); 

    // Call a function method for getTime
    getTime();
}

// List of current temperature, location, city, longtide, and longitude
var curTemp;
var curLocation;
var curCity;
var lati;
var long;

function changeWeather() {
    var url = 'http://api.openweathermap.org/data/2.5/weather';
    var cityToSearch = document.getElementById("cityList").value;

    var params = {
        q: cityToSearch,
        appid: 'b8df9c0dae2b73b915295fd6e27bf810',
        units: 'imperial'
    }

    $.getJSON( url, params,
        function(resp) {
        curTemp = resp.main.temp;
        curLocation = resp.name;
        curCity = resp.name;
        lati = resp.coord.lat;
        long = resp.coord.lon;
            
        document.getElementById('temp').innerHTML = curTemp + " F";
        document.getElementById('location').innerHTML = curLocation;
        document.getElementById('city').innerHTML = "City: " + curCity;
        document.getElementById('latitude').innerHTML = "Latitude: " + lati;
        document.getElementById('longitude').innerHTML = "Longitude: " + long;
        })
}

// Get a function method for time
function getTime(city, offset) {
    // Display the time zone
    var date = new Date();
    var num = date.toLocaleDateString('en-US', {hour12: false, timeZone: "America/New_York"});
    document.getElementById("time").innerHTML = num;

    // Display for EST 
    if (document.getElementById("cityList").value == 'rochester'|| document.getElementById("cityList").value == 'miami') {
        var est = date.toLocaleTimeString('en-US', {hour12: false, timeZone: 'America/New_York' })
        document.getElementById("time").innerHTML = est;
    }

    // Display for CDT
    else if (document.getElementById("cityList").value == 'chicago') {
        var cdt = date.toLocaleTimeString('en-US', {hour12: false, timeZone: 'America/Chicago' })
        document.getElementById("time").innerHTML = cdt;
    }
    
    // Display for BST
    else if (document.getElementById("cityList").value == 'london') {
        var bst = date.toLocaleTimeString('en-US', {hour12: false, timeZone: 'Europe/London' })
        document.getElementById("time").innerHTML = bst;
    }

    // Display for JST
    else if (document.getElementById("cityList").value == 'tokyo') {
        var jst = date.toLocaleTimeString('en-US', {hour12: false, timeZone: 'Asia/Tokyo' })
        document.getElementById("time").innerHTML = jst;
    }
}