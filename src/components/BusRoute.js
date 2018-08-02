import React, { Component } from 'react';
import { Polyline } from 'react-native-maps';
import { RGBA } from '../constants/BusType';

/**
 * To render the bus route using `Polyline` component provided by `react-native-maps`
 */
export default class BusRoute extends Component {
  render() {
    const { coordinates = [], color = RGBA(255, 0, 0), width = 3, opacity = 0.1 } = this.props;
    return <Polyline coordinates={coordinates} strokeColor={color} strokeWidth={width} strokeOpacity={opacity} />;
  }
}
