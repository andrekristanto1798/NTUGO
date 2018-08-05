import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

export default class BusDetail extends Component {
  renderTime = time => {
    if (time === 0) {
      return 'Arriving';
    } else if (time) {
      return `${Math.floor(time) + 1} min`;
    } else {
      return 'N.A.';
    }
  };

  render() {
    const { busStopName, busType, timeList } = this.props;
    return (
      <View style={[styles.detailContainer]}>
        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text style={styles.title}> {busStopName} </Text>
          </View>
        </View>
        <View style={[styles.row, styles.busTimeBorder]}>
          <View style={[styles.box]}>
            <Text style={[styles.text, styles.highlight]}> {this.renderTime(timeList[0])}</Text>
          </View>
          <View style={[styles.box]}>
            <Text style={[styles.text]}> {this.renderTime(timeList[1])}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 0,
  },
  box: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'gray',
    fontWeight: '400',
    fontSize: 12,
  },
  title: {
    textAlign: 'left',
    fontSize: 15,
    color: 'black',
  },
  highlight: {
    color: 'black',
    fontWeight: 'bold',
  },
  busTimeBorder: {
    borderTopWidth: 0.5,
    borderTopColor: '#d6d7da',
  },
});
