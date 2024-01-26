const header = document.querySelector('h1');
const temp = document.querySelector('#temp');
const desc = document.querySelector('#desc');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        header.innerHTML = "Geolocation is not supported by this browser.";
    }
}
getLocation()

function showPosition(position) {
    console.log(position.coords.latitude, position.coords.longitude)
    fetch('/weather-report?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            header.innerHTML = data.location;
            temp.innerHTML = data.temp + "°C";
            desc.innerHTML = data.weather;
        })
        .catch(err => console.log(err))
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            header.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            header.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            header.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            header.innerHTML = "An unknown error occurred."
            break;
    }
}