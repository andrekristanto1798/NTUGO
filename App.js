import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
//Import component
import MyMap from './src/components/Map';
import BusMarkerCluster from './src/components/BusMarkerCluster';
import BusStopMarkerCluster from './src/components/BusStopMarkerCluster';
import BusRoute from './src/components/BusRoute';
import BusSelectionFilter, { defaultOption } from './src/components/BusSelectionFilter';
import BusDetail from './src/components/BusDetail';
//Import data
import { RED_BUS_STOP_LIST } from './src/constants/RedBusStopConstant';
import { BLUE_BUS_STOP_LIST } from './src/constants/BlueBusStopConstant';
import RED_BUS_ROUTE from './src/constants/RedBusRoute';
import BLUE_BUS_ROUTE from './src/constants/BlueBusRoute';
import * as BUS_TYPE from './src/constants/BusType';
//Import API
import getAllBusData from './src/api/BusAPI';
import { getNextTwoBus } from './src/api/DistanceAPI';

//To ignore the Remote debugger warning
console.ignoredYellowBox = ['Remote debugger'];

export default class App extends React.Component {
  state = {
    userSelection: BUS_TYPE.RED,
    busStopDetail: null,
    busStop: {
      red: RED_BUS_STOP_LIST,
      blue: BLUE_BUS_STOP_LIST,
    },
    bus: {
      red: [],
      blue: [],
    },
    busColor: 'red',
    busRoute: {
      red: RED_BUS_ROUTE,
      blue: BLUE_BUS_ROUTE,
    },
    routeColor: {
      red: BUS_TYPE.RGBA(255, 0, 0, 0.3),
      blue: BUS_TYPE.RGBA(0, 0, 255, 0.3),
    },
  };

  /**
   * This is to retrieve data from the API and automatically update
   * the bus list in the component state
   */
  retrieveDataFromServer = async () => {
    const { parsedBlueBus, parsedRedBus } = await getAllBusData();
    this.setState({
      bus: {
        blue: parsedBlueBus,
        red: parsedRedBus,
      },
    });
  };

  componentDidMount() {
    //Get initial data
    this.retrieveDataFromServer();
    //Do get data from the server every 5s
    const timeToRetrieveData = 5000;
    setInterval(this.retrieveDataFromServer, timeToRetrieveData);
  }

  /**
   * Callback
   * Getting the user selection data from BusSelectionFilter component
   */
  onUserSelectBus = busName => {
    const { userSelection } = this.state;
    var busColor = 'red';
    if (userSelection === busName) return;
    if (busName === BUS_TYPE.RED) {
      busColor = 'red';
    }
    if (busName === BUS_TYPE.BLUE) {
      busColor = 'blue';
    }
    this.setState({ busColor, userSelection: busName });
  };

  /**
   * Callback when marker is clicked
   * @param type the type of the marker which depends on the BusMarkerCluster obj
   * @param title the name of the marker
   * @param position the position of the marker
   */
  onClickMarker = markerType => ({ type, title, position }) => {
    if (type === 'bus-stop') {
      //yes: Do get the data from manager and pass it to the busStopDetail state
      //which later on will be rendered inside `BusDetail` Component
      var vehicles = this.state.bus[this.state.busColor];
      var busType = markerType;
      var busStop = {
        name: title,
        position,
      };
      const timeList = getNextTwoBus(vehicles, busStop, busType);
      this.setState({
        busStopDetail: { busStopName: title, busType: markerType, timeList },
      });
    } else if (type === 'bus') {
      //yes: Do Nothing
    } else {
      //Do Nothing
    }
  };

  render() {
    const { busStopDetail, userSelection } = this.state;
    const { bus, busStop, busColor, busRoute, routeColor } = this.state;
    return (
      <View style={styles.mainContainer}>
        <MyMap>
          <BusStopMarkerCluster
            onClick={this.onClickMarker(busColor)}
            key="bus-stop-marker"
            busStop={busStop[busColor]}
            color={busColor}
            active={busStopDetail && busStopDetail.busStopName}
          />
          <BusMarkerCluster key="bus-marker" bus={bus[busColor]} color={busColor} />
          <BusRoute key="bus-route" coordinates={busRoute[busColor]} color={routeColor[busColor]} />
        </MyMap>
        <BusSelectionFilter options={defaultOption} active={userSelection} onSelect={this.onUserSelectBus}>
          <BusDetail {...busStopDetail} />
        </BusSelectionFilter>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});
