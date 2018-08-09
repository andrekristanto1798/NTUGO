import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NTUGOMarker, { NTUGO_ICON } from './NTUGOMarker';

/**
 * To render Bus and Bus Stop UI based on the `props.data` provided
 *
 * `bus` and `busStop` must be in `Array` type
 *
 * You can also customize the styling of the component by providing the props,
 *
 * Example: `color`, `opacity`, `size` which are used for customizing the `Icon` component inside the `Marker` component
 */
export default class BusStopMarkerCluster extends React.PureComponent {
  static propTypes = {
    busStop: PropTypes.array.isRequired,
    color: PropTypes.string.isRequired,
  };

  onClick = type => ({ position, title }) => {
    const { onClick } = this.props;
    onClick && onClick({ type, position, title });
  };

  renderBusStop = ({ position, color, ...additionalProps }) => {
    return <NTUGOMarker size={20} position={position} color={color} icon={NTUGO_ICON.BUS_STOP} {...additionalProps} />;
  };

  render() {
    const { busStop, color, active = null } = this.props;
    const BusStop = this.renderBusStop;
    return [
      busStop.map(({ position, name, ...additionalProps }, i) => (
        <BusStop
          onClick={this.onClick('bus-stop')}
          key={i}
          position={position}
          color={color}
          title={name}
          opacity={active === name ? 1 : 0.3}
          {...additionalProps}
        />
      )),
    ];
  }
}
