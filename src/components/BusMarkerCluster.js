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
export default class BusMarkerCluster extends Component {
  static propTypes = {
    data: PropTypes.shape({
      busStop: PropTypes.array,
      bus: PropTypes.array,
    }).isRequired,
    color: PropTypes.string.isRequired,
  };

  onClickBusStop = ({ position, title }) => {
    console.log({ position, title });
    //Open the Bus stop detail here
  };

  renderBus = ({ position, color, ...additionalProps }) => {
    return <NTUGOMarker size={15} position={position} color={color} icon={NTUGO_ICON.BUS} {...additionalProps} />;
  };

  renderBusStop = ({ position, color, ...additionalProps }) => {
    return <NTUGOMarker size={20} position={position} color={color} icon={NTUGO_ICON.BUS_STOP} {...additionalProps} />;
  };

  renderData = () => {
    const { data, color } = this.props;
    const { bus = [], busStop = [] } = data;
    const Bus = this.renderBus;
    const BusStop = this.renderBusStop;
    return [
      bus.map(({ position, bearing, speed, ...additionalProps }, i) => (
        <Bus key={i} position={position} color={color} bearing={bearing - 45} {...additionalProps} />
      )),
      busStop.map(({ position, name, ...additionalProps }, i) => (
        <BusStop
          onClick={this.onClickBusStop}
          key={i}
          position={position}
          color={color}
          title={name}
          {...additionalProps}
        />
      )),
    ];
  };

  render() {
    return this.renderData();
  }
}
