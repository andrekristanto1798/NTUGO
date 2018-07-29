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

export default class BusSelectionFilter extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    active: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    busDetail: PropTypes.object.isRequired
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

  renderBusDetail = () => {
    const { busDetail } = this.props;
    const { busStopName, busType, nextArrival, subsequentArrival } = this.props;
    return (
      <View style={[styles.detailContainer]}>
        <View style={[styles.row]}>
          <View style={[styles.box, styles.header]}>
            <Text style={styles.title}> {busStopName} </Text>
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.box, styles.box2]}>
            <Text style={[styles.text]}> {busType} </Text>
          </View>
          <View style={[styles.box]}>
            <Text style={[styles.text]}> {nextArrival} </Text>
          </View>
          <View style={[styles.box, styles.box3]}>
            <Text style={[styles.text]}> {subsequentArrival} </Text>
          </View>
        </View>
      </View>
    )
  }  

  render() {
    const { showSelectionView } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.buttonContainer}>{this.renderSelectionView()}</View>
        <View style={styles.detailContainer}>{this.renderBusDetail()}</View>
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
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    flex: 1,
    // borderLeftWidth: 0.5,
    borderLeftColor: '#d6d7da',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 0
  },
  box: {
    flex: 1,
    height: '100%',
    backgroundColor: '#31659C',
  },
  box2: {
    backgroundColor: '#639ACE'
  },
  box3: {
    backgroundColor: '#4A79A5'
  },
  text: {
    textAlign: 'center',
    color: 'white',
    alignItems: 'center',
    fontSize: 18
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  }
});
