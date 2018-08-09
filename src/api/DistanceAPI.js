import { BLUE_EDGE_LIST } from '../constants/BlueBusStopConstant';
import { RED_EDGE_LIST } from '../constants/RedBusStopConstant';

// Get distance between two points
function getDistance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

/**
 * Finds the closest stop, returns the bus stop object
 */
function findClosestBusStop(bus, busType) {
  const EDGES = busType === 'blue' ? BLUE_EDGE_LIST : RED_EDGE_LIST;
  for (let i = 0; i < EDGES.length; i++) {
    if (EDGES[i].edge_id === bus.edge_id) return EDGES[i].end;
  }
}

/**
 * Given the origin and destination, find the distance between the two stops travelled by the campus shuttle type.
 * Returns the distance and the no of stops passed as an array.
 */
function findDistanceBetweenBusStops(origin, destination, busType) {
  if (!origin || !destination || !busType) return null;
  const EDGE_LIST = busType === 'blue' ? BLUE_EDGE_LIST : RED_EDGE_LIST;
  let n = EDGE_LIST.length,
    i = 0,
    totalDistance = 0,
    end = 0,
    start = 0;
  // return 0 if bus is in the final edge
  if (origin.name === destination.name) return { distance: 0, noOfStops: 0 };

  // find the initial edge
  while (true) {
    if (EDGE_LIST[i % n].start.name === origin.name) {
      start = i;
      break;
    }
    i++;
  }

  // find the terminating edge
  while (true) {
    if (EDGE_LIST[i % n].start.name === destination.name) {
      end = i;
      break;
    }
    totalDistance += EDGE_LIST[i % n].distance;
    i++;
  }
  return {
    distance: totalDistance,
    noOfStops: (end - start) % n,
  };
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
  // find the stop the bus is heading to
  let closestStop = findClosestBusStop(bus, busType);

  // find distance from the bus to that stop (km)
  let initialDistance = getDistance(
    bus.position.latitude,
    bus.position.longitude,
    closestStop.position.latitude,
    closestStop.position.longitude
  );

  // find distance to the destination stop then add to the initial distance
  let betweenStops = findDistanceBetweenBusStops(closestStop, busStop, busType);
  let distance = betweenStops.distance / 1000 + initialDistance;
  let noOfStopsPassed = betweenStops.noOfStops;
  // calculate estimated time. Adding 30 for buffer each stops passed (dynamic according to no of stops passed)
  const buffer = 60 / 3600; //1 min
  let estimatedTime = parseFloat(distance / 1000 / bus.avg_speed) + parseFloat(buffer * noOfStopsPassed);
  const timeInMin = parseFloat((estimatedTime * 60).toPrecision(3));
  return timeInMin;
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
  timeList = timeList.sort((a, b) => a - b);
  timeList = timeList.slice(0, 2);
  return timeList;
}
