import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';

// Default region for NTU
const defaultRegion = {
  latitude: 1.348429306314554,
  latitudeDelta: 0.027844680407943523,
  longitude: 103.68314763531089,
  longitudeDelta: 0.014920793473734761,
};

/**
 * To render MapView in `react-native-maps` using `expo` wrapper
 * 
 * Only accept `children` as prop and ignore another `prop`
 */
export default class Map extends React.Component {
  render() {
    return (
      <MapView
        showsPointsOfInterest={false}
        onRegionChange={this.onRegionChange}
        style={styles.map}
        initialRegion={defaultRegion}
      >
        {this.props.children}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 10,
  },
});
