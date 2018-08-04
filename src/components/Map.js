import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';

// Default region for NTU
const defaultRegion = {
  latitude: 1.3481125818429907,
  latitudeDelta: 0.017689970239689323,
  longitude: 103.68311846628785,
  longitudeDelta: 0.011774562299237346,
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
        region={defaultRegion}
        scrollEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        moveOnMarkerPress={false}
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
