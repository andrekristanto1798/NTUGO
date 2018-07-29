import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './src/components/Map';
import BusMarkerCluster from './src/components/BusMarkerCluster';
import { RED_BUS_STOP_LIST } from './src/constants/RedBusStopConstant';
import { BLUE_BUS_STOP_LIST } from './src/constants/BlueBusStopConstant';
import getAllBusData from './src/api/BusAPI';
<<<<<<< HEAD
import BusDetail from './src/components/BusDetail';
=======
import BusSelectionFilter, { defaultOption } from './src/components/BusSelectionFilter';
import * as BUS_TYPE from './src/constants/BusType';
>>>>>>> 46e6b120330391a1fc7795db7e95a9a9233a07e6

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
          {userSelection === BUS_TYPE.RED && (
            <BusMarkerCluster data={{ busStop: RED_BUS_STOP_LIST, bus: redBusList }} color="red" />
          )}
          {userSelection === BUS_TYPE.BLUE && (
            <BusMarkerCluster data={{ busStop: BLUE_BUS_STOP_LIST, bus: blueBusList }} color="blue" />
          )}
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
