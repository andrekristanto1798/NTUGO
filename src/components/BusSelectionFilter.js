import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import * as BUS_TYPE from '../constants/BusType';
import { Icon } from 'react-native-elements';

export const defaultOption = [
  { name: BUS_TYPE.RED, icon: 'bus', color: 'red' },
  { name: BUS_TYPE.BLUE, icon: 'bus', color: 'blue' },
];

export default class BusSelectionFilter extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    active: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
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
    return (
      <View style={styles.container}>
        {options.map((option, i) => {
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
        })}
      </View>
    );
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
    console.log('rendering BusSelectionFilter');
    const { showSelectionView } = this.state;
    return (
      <View style={{ flex: 1, zIndex: 999, backgroundColor: 'black' }}>
        {this.renderSettingIcon()}
        {showSelectionView ? this.renderSelectionView() : null}
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
  overlay: {
    position: 'absolute',
    top: 32,
    right: 16,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  container: {
    position: 'absolute',
    top: 32,
    right: 56,
    height: 'auto',
    backgroundColor: 'white',
    padding: 10,
    marginRight: 5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
});
