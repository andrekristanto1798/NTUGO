import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NTUGOMarker, { NTUGO_ICON } from './NTUGOMarker';

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
  };

  renderBus = ({ position, color }) => {
    return <NTUGOMarker position={position} color={color} icon={NTUGO_ICON.BUS} />;
  };

  renderBusStop = ({ position, color, ...props }) => {
    return <NTUGOMarker size={20} position={position} color={color} icon={NTUGO_ICON.BUSSTOP} {...props} />;
  };

  renderData = () => {
    const { data, color } = this.props;
    const { bus = [], busStop = [] } = data;
    const Bus = this.renderBus;
    const BusStop = this.renderBusStop;
    return [
      bus.map((bus, i) => <Bus key={i} position={bus} color={color} />),
      busStop.map((bus_stop, i) => <BusStop onClick={this.onClickBusStop} key={i} position={bus_stop} color={color} />),
    ];
  };

  render() {
    return this.renderData();
  }
}
