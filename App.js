import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//Import component
import Map from './src/components/Map';
import BusMarkerCluster from './src/components/BusMarkerCluster';
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

//To ignore the Remote debugger warning
console.ignoredYellowBox = ['Remote debugger'];

export default class App extends React.Component {
  state = {
    redBusList: [],
    blueBusList: [],
    userSelection: BUS_TYPE.RED,
    busDetail: null,
  };

  /**
   * This is to retrieve data from the API and automatically update
   * the bus list in the component state
   */
  retrieveDataFromServer = async () => {
    const { parsedBlueBus, parsedRedBus } = await getAllBusData();
    this.setState({
      blueBusList: parsedBlueBus,
      redBusList: parsedRedBus,
    });
  };

  componentDidMount() {
    //Do get data from the server every 5s
    const timeToRetrieveData = 5000;
    setInterval(this.retrieveDataFromServer, timeToRetrieveData);
  }

  /**
   * Callback
   * Getting the user selection data from BusSelectionFilter component
   */
  onUserSelectBus = busName => {
    this.setState({ userSelection: busName });
  };

  /**
   * Callback when marker is clicked
   * @param type the type of the marker which depends on the BusMarkerCluster obj
   * @param title the name of the marker
   * @param position the position of the marker
   */
  onClickMarker = markerType => ({ type, title, position }) => {
    if (type === 'bus-stop') {
      //yes: Do get the data from manager and pass it to the busDetail state
      //which later on will be rendered inside `BusDetail` Component
      this.setState({
        busDetail: { busStopName: title, busType: markerType },
      });
    } else if (type === 'bus') {
      //yes: Do Nothing
    } else {
      //Do Nothing
    }
  };

  renderBusBasedOnUserSelection = () => {
    const { redBusList, blueBusList, userSelection } = this.state;
    var busStop, bus, busColor, busRoute, routeColor;
    switch (userSelection) {
      case BUS_TYPE.RED:
        busStop = RED_BUS_STOP_LIST;
        bus = redBusList;
        busColor = 'red';
        busRoute = RED_BUS_ROUTE;
        routeColor = BUS_TYPE.RGBA(255, 0, 0, 0.3);
        break;
      case BUS_TYPE.BLUE:
        busStop = BLUE_BUS_STOP_LIST;
        bus = blueBusList;
        busColor = 'blue';
        busRoute = BLUE_BUS_ROUTE;
        routeColor = BUS_TYPE.RGBA(0, 0, 255, 0.3);
        break;
      default:
        busStop = [];
        bus = [];
        busColor = 'green';
        break;
    }
    return [
      <BusMarkerCluster
        onClick={this.onClickMarker(busColor)}
        key="bus-marker"
        data={{ busStop, bus }}
        color={busColor}
      />,
      <BusRoute key="bus-route" coordinates={busRoute} color={routeColor} />,
    ];
  };

  render() {
    const { busDetail, userSelection } = this.state;
    return (
      <View style={styles.mainContainer}>
        <Map>{this.renderBusBasedOnUserSelection()}</Map>
        <BusSelectionFilter options={defaultOption} active={userSelection} onSelect={this.onUserSelectBus}>
          {busDetail && <BusDetail {...busDetail} />}
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
  },
});
