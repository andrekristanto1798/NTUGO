import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import * as BUS_TYPE from '../constants/BusType';
import { Icon } from 'react-native-elements';
import BusDetail from '../components/BusDetail';

export const defaultOption = [
  { name: BUS_TYPE.RED, icon: 'bus', color: 'red' },
  { name: BUS_TYPE.BLUE, icon: 'bus', color: 'blue' },
];

/**
 * To render the bus available options for the user
 * 
 * Requires `options`, `active`, `onSelect` props
 * 
 * <Optional> `children` to be rendered in the right container
 */
export default class BusSelectionFilter extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    active: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    children: PropTypes.children
  };

  constructor(props) {
    super(props);
    this.state = {
      showSelectionView: false,
    };
  }

  onPressSelection = name => () => {
    const { active, onSelect } = this.props;
    if (active === name) onSelect && onSelect(null);
    onSelect && onSelect(name);
  };

  renderSelectionView = () => {
    const { options, active } = this.props;
    return options.map((option, i) => {
      const { name, icon, color } = option;
      var buttonStyle = selectionButton;
      if (active === name) {
        buttonStyle = { ...buttonStyle, backgroundColor: '#f1f1f1' };
      }
      return (
        <TouchableOpacity key={i} style={buttonStyle} onPress={this.onPressSelection(name)}>
          <Icon type="font-awesome" name={icon} color={color} />
          <Text>{name}</Text>
        </TouchableOpacity>
      );
    });
  };

  onToogleSelectionView = () => this.setState({ showSelectionView: !this.state.showSelectionView });
  renderSettingIcon() {
    return (
      <View style={styles.overlay}>
        <TouchableOpacity onPress={this.onToogleSelectionView}>
          <Icon type="font-awesome" name="cog" />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { showSelectionView } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.buttonContainer}>{this.renderSelectionView()}</View>
        <BusDetail />
      </View>
    );
  }
}

const selectionButton = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  backgroundColor: '#DDDDDD',
  marginTop: 5,
  marginBottom: 5,
  padding: 10,
  backgroundColor: 'white',
  borderRadius: 4,
  borderWidth: 0.5,
  borderColor: '#d6d7da',
};

const styles = StyleSheet.create({
  mainContainer: {
    borderTopWidth: 0.5,
    borderTopColor: '#d6d7da',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
  },
});
