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
    //Open the Bus stop detail here
  };

  renderBus = ({ position, color, ...additionalProps }) => {
    return <NTUGOMarker size={15} position={position} color={color} icon={NTUGO_ICON.BUS} {...additionalProps} />;
  };

  renderBusStop = ({ position, color, ...additionalProps }) => {
    return <NTUGOMarker size={20} position={position} color={color} icon={NTUGO_ICON.BUSSTOP} {...additionalProps} />;
  };

  renderData = () => {
    const { data, color } = this.props;
    const { bus = [], busStop = [] } = data;
    const Bus = this.renderBus;
    const BusStop = this.renderBusStop;
    return [
      bus.map(({ position, bearing, speed }, i) => (
        <Bus key={i} position={position} color={color} bearing={bearing - 45} />
      )),
      busStop.map(({ position, name }, i) => (
        <BusStop onClick={this.onClickBusStop} key={i} position={position} color={color} title={name} />
      )),
    ];
  };

  render() {
    return this.renderData();
  }
}
