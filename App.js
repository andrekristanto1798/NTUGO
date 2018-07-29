import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//Import component
import Map from './src/components/Map';
import BusMarkerCluster from './src/components/BusMarkerCluster';
import BusRoute from './src/components/BusRoute';
import BusSelectionFilter, { defaultOption } from './src/components/BusSelectionFilter';
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

  onUserSelectBus = busName => {
    this.setState({ userSelection: busName });
  };

  render() {
    const { redBusList, blueBusList, userSelection } = this.state;
    return (
      <View style={styles.mainContainer}>
        <Map>
          {userSelection === BUS_TYPE.RED && [
            <BusMarkerCluster
              key="red-bus-marker"
              data={{ busStop: RED_BUS_STOP_LIST, bus: redBusList }}
              color="red"
            />,
            <BusRoute key="red-bus-route" coordinates={RED_BUS_ROUTE} color={BUS_TYPE.RGBA(255, 0, 0, 0.3)} />,
          ]}
          {userSelection === BUS_TYPE.BLUE && [
            <BusMarkerCluster
              key="blue-bus-marker"
              data={{ busStop: BLUE_BUS_STOP_LIST, bus: blueBusList }}
              color="blue"
            />,
            <BusRoute key="blue-bus-route" coordinates={BLUE_BUS_ROUTE} color={BUS_TYPE.RGBA(0, 0, 255, 0.3)} />,
          ]}
        </Map>
        <BusSelectionFilter options={defaultOption} active={userSelection} onSelect={this.onUserSelectBus} />
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
