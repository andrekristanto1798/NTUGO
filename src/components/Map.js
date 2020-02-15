import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

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
const Map = ({ children }) => (
  <MapView
    showsPointsOfInterest={false}
    style={styles.map}
    initialRegion={defaultRegion}
    scrollEnabled={false}
    pitchEnabled={false}
    rotateEnabled={false}
    moveOnMarkerPress={false}
    zoomEnabled={false}
  >
    {children}
  </MapView>
);

const styles = StyleSheet.create({
  map: {
    flex: 10,
  },
});

export default Map;
