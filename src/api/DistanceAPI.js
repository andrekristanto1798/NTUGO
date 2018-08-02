const BASE_URL = 'https://maps.googleapis.com/maps/api/distancematrix';
const FORMAT_JSON_AND_UNIT = '/json?units=imperial';
const API_KEY = '&key=AIzaSyAwKBu8x9waeq4bmqh_JB-EVxWn5oIsZrQ';
const ORIGIN = '&origins='
const DESTINATION = '&destinations='
const GET = 'get';

async function getEstimatedTime(busStop, busPosition) {
    let finalURL = BASE_URL
        + FORMAT_JSON_AND_UNIT
        + ORIGIN + busPosition.position.latitude + "," + busPosition.position.longitude
        + DESTINATION + busStop.position.latitude + "," + busStop.position.longitude
        + API_KEY
    const request = {
        method: GET,
    }
    return fetch(finalURL, request)
        .then(response => response.json())
        .then(response => response.rows[0].elements[0].duration.text)
        .catch(error => console.log(error));
}

const getDuration = async (busStop, busPosition) => {
    duration = await getEstimatedTime(busStop, busPosition)
    return duration
}