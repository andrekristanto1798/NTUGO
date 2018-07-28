import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';

const defaultRegion = {
  latitude: 1.348429306314554,
  latitudeDelta: 0.027844680407943523,
  longitude: 103.68314763531089,
  longitudeDelta: 0.014920793473734761,
};

export default class App extends React.Component {
  render() {
    return <MapView onRegionChange={this.onRegionChange} style={styles.map} initialRegion={defaultRegion} />;
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
