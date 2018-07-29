import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';
import { Icon } from 'react-native-elements';

export const NTUGO_ICON = {
  BUS: 'location-arrow',
  BUS_STOP: 'bus',
};

export default class NTUGOMarker extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    position: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string,
    bearing: PropTypes.number,
    opacity: PropTypes.number,
    size: PropTypes.number,
    onClick: PropTypes.func,
  };

  onPress = () => {
    const { onClick, position, title = '' } = this.props;
    onClick && onClick({ position, title });
  };

  render() {
    const { color, position, icon, bearing = 0, size = 10, opacity = 0.6 } = this.props;
    return (
      <Marker coordinate={position} rotation={bearing} onPress={this.onPress} opacity={opacity}>
        <Icon type="font-awesome" name={icon} color={color} size={size} />
      </Marker>
    );
  }
}
