import { BLUE_BUS_STOP_LIST, BLUE_EDGE_LIST } from '../constants/BlueBusStopConstant';
import { RED_BUS_STOP_LIST, RED_EDGE_LIST } from '../constants/RedBusStopConstant';

const BASE_URL = 'https://maps.googleapis.com/maps/api/distancematrix';
const FORMAT_JSON_AND_UNIT = '/json?units=imperial';
const API_KEY = '&key=AIzaSyAwKBu8x9waeq4bmqh_JB-EVxWn5oIsZrQ';
const ORIGIN = '&origins=';
const DESTINATION = '&destinations=';
const GET = 'get';

async function getEstimatedTime(busStop, busPosition) {
  let finalURL =
    BASE_URL +
    FORMAT_JSON_AND_UNIT +
    ORIGIN +
    busPosition.position.latitude +
    ',' +
    busPosition.position.longitude +
    DESTINATION +
    busStop.position.latitude +
    ',' +
    busStop.position.longitude +
    API_KEY;
  const request = {
    method: GET,
  };
  return fetch(finalURL, request)
    .then(response => response.json())
    .then(response => response.rows[0].elements[0].duration.text)
    .catch(error => console.log(error));
}

const getDuration = async (busStop, busPosition) => {
  duration = await getEstimatedTime(busStop, busPosition);
  return duration;
};

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

/**
 * Finds the closest stop, returns the bus stop object
 */
function findClosestBusStop(lat, lon, busType) {
  let minDistance, closest;
  const STOPS = busType === 'blue' ? BLUE_BUS_STOP_LIST : RED_BUS_STOP_LIST;
  for (let i = 0; i < STOPS.length; i++) {
    let busstop = STOPS[i];
    currDistance = distance(lat, lon, busstop.position.latitude, busstop.position.longitude);
    if (currDistance < minDistance || !minDistance) {
      minDistance = currDistance;
      closest = busstop;
    }
  }
  return closest;
}

/**
 * Given the origin and destination, find the distance between the two stops travelled by the campus shuttle type.
 */
function findDistanceBetweenBusStops(origin, destination, busType) {
  const EDGE_LIST = busType === 'blue' ? BLUE_EDGE_LIST : RED_EDGE_LIST;
  let i = 0;
  let n = EDGE_LIST.length;
  while (true) {
    if (EDGE_LIST[i % n].start.name === origin.name) {
      break;
    }
    i++;
  }

  let totalDistance = 0;
  while (true) {
    if (EDGE_LIST[i % n].end.name === destination.name) {
      break;
    }
    totalDistance += EDGE_LIST[i % n].distance;
    i++;
  }

  return totalDistance;
}

/**
 * Returns the estimated arrival time of shuttle bus.
 *
 * @param {JSON} bus The JSON returned by the shuttle bus API
 * @param {JSON} busStop The bus stop where the user is currently located
 * @param {String} busType Either 'blue' or 'red'
 * @returns {Number} the unit time in hour
 */
function estimateArrivalTime(bus, busStop, busType) {
  let closestStop = findClosestBusStop(bus.position.latitude, bus.position.longitude, busType);
  let distance = findDistanceBetweenBusStops(closestStop, busStop, busType);
  let estimatedTime = distance / 1000 / bus.speed;
  return parseFloat((estimatedTime * 60).toPrecision(3));
}

/**
 * Return the estimated arrival of the next two buses as an array.
 * If there's only one bus, returns only one value. If there's no bus, returns empty array.
 *
 * @param {JSON} vehicles JSON value returned by the shuttle bus API
 * @param {JSON} busStop bus stop where user is currently located
 * @param {String} busType either 'blue' or 'red'
 */
export function getNextTwoBus(vehicles, busStop, busType) {
  let timeList = [];
  for (let i = 0; i < vehicles.length; i++) {
    let time = estimateArrivalTime(vehicles[i], busStop, busType);
    timeList.push(time);
  }
  timeList = timeList.sort();
  timeList = timeList.slice(0, 2);
  return timeList;
}
