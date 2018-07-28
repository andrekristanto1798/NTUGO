import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './src/components/Map';
import BusMarkerCluster from './src/components/BusMarkerCluster';
import { RED_BUS_LIST, RED_BUS_STOP_LIST } from './src/constants/RedBusStopConstant';

export default class App extends React.Component {
  render() {
    return (
      <Map>
        <BusMarkerCluster data={{ busStop: RED_BUS_STOP_LIST, bus: RED_BUS_LIST }} color="red" />
      </Map>
    );
  }
}

const styles = StyleSheet.create({});
