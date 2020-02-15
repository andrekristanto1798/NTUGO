import * as BUS_TYPE from '../constants/BusType';
import { Alert } from 'react-native';

const BASE_URL = 'https://baseride.com/routes/apigeo/routevariantvehicle';
const FORMAT_JSON = '/?format=json';
const RED_PATH = '/44478';
const BLUE_PATH = '/44479';

const GET = 'get';
const POST = 'post';

let alertIsOpen = false;

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
  const request = {
    method: GET,
  };
  return fetch(finalURL, request)
    .then(response => response.json())
    .catch(error => {
      if (!alertIsOpen) {
        alertIsOpen = true;
        Alert.alert('Network Error', error.toString(), [
          {
            text: 'OK',
            onPress: () => {
              alertIsOpen = false;
            },
          },
        ]);
      }
      return {};
    });
}

const doGetBusDataAPI = async type => {
  const data = await fetchBusData(type);
  const { vehicles = [] } = data;
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
