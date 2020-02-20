import * as BUS_TYPE from '../constants/BusType';

const BASE_URL = 'http://baseride.com/routes/apigeo/routevariantvehicle';
const FORMAT_JSON = '?format=json';
const RED_PATH = '/44478';
const BLUE_PATH = '/44479';

async function fetchBusData(type) {
  var finalURL = BASE_URL;
  switch (type) {
    case BUS_TYPE.RED:
      finalURL += RED_PATH + FORMAT_JSON;
      break;
    case BUS_TYPE.BLUE:
      finalURL += BLUE_PATH + FORMAT_JSON;
      break;
    default:
      break;
  }
  return new Promise(resolve => {
    function handleResponse() {
      const response = JSON.parse(this.responseText);
      resolve(response);
    }
    function handleError() {
      const response = {};
      resolve(response);
    }
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', handleResponse);
    oReq.addEventListener('error', handleError);
    oReq.open('GET', finalURL, true);
    oReq.send();
  });
}

const doGetBusDataAPI = async type => {
  let vehicles = [];
  const result = await fetchBusData(type);
  if (result && result.vehicles) vehicles = result.vehicles;
  if (vehicles.length <= 0) return [];
  return vehicles.reduce((acc, data, i) => {
    const { bearing, lat, lon, speed, projection, stats } = data;
    const { edge_id } = projection;
    const { avg_speed } = stats;
    const tempBus = {
      bearing,
      position: { latitude: parseFloat(lat, 7), longitude: parseFloat(lon, 7) },
      speed,
      edge_id,
      avg_speed,
    };
    return [...acc, tempBus];
  }, []);
};

const getAllBusData = async () => {
  const parsedRedBus = await doGetBusDataAPI(BUS_TYPE.RED);
  const parsedBlueBus = await doGetBusDataAPI(BUS_TYPE.BLUE);
  return {
    parsedRedBus,
    parsedBlueBus,
  };
};

export default getAllBusData;
