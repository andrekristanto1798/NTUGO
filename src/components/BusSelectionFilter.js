import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import * as BUS_TYPE from '../constants/BusType';
import { Icon } from 'react-native-elements';

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
export default class BusSelectionFilter extends React.PureComponent {
  static propTypes = {
    options: PropTypes.array.isRequired,
    active: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showSelectionView: false,
    };
  }

  onPressSelection = name => () => {
    const { onSelect } = this.props;
    onSelect && onSelect(name);
  };

  renderSelectionView = () => {
    const { options, active } = this.props;
    return options.map((option, i) => {
      const { name, icon, color } = option;
      var buttonStyle = selectionButton,
        textButtonStyle = [styles.buttonText, { color }];
      iconColor = color;
      if (active === name) {
        buttonStyle = { ...buttonStyle, backgroundColor: color, borderColor: color };
        textButtonStyle = [...textButtonStyle, { color: 'white' }];
        iconColor = 'white';
      }
      return (
        <TouchableOpacity key={i} style={buttonStyle} onPress={this.onPressSelection(name)}>
          <Icon type="font-awesome" name={icon} color={iconColor} />
          <Text style={textButtonStyle}>{name}</Text>
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
    return (
      <View style={styles.mainContainer}>
        <View style={styles.buttonContainer}>{this.renderSelectionView()}</View>
        {!!this.props.children && <View style={styles.detailContainer}>{this.props.children}</View>}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    borderLeftWidth: 0.5,
    borderLeftColor: '#d6d7da',
  },
  buttonText: {
    marginLeft: 5,
    color: 'black',
  },
});
