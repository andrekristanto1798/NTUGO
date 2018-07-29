import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './src/components/Map';
import BusMarkerCluster from './src/components/BusMarkerCluster';
import { RED_BUS_LIST, RED_BUS_STOP_LIST } from './src/constants/RedBusStopConstant';
import { BLUE_BUS_STOP_LIST } from './src/constants/BlueBusStopConstant';
import getAllBusData from './src/api/BusAPI';

export default class App extends React.Component {
  state = {
    redBusList: [],
    blueBusList: [],
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

  render() {
    const { redBusList, blueBusList } = this.state;
    return (
      <Map>
        <BusMarkerCluster data={{ busStop: RED_BUS_STOP_LIST, bus: redBusList }} color="red" />
        <BusMarkerCluster data={{ busStop: BLUE_BUS_STOP_LIST, bus: blueBusList }} color="blue" />
      </Map>
    );
  }
}

const styles = StyleSheet.create({});
