import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

export default class BusDetail extends Component {
  renderTime = time => {
    if (time === 0 || time) {
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
          <View style={[styles.box, styles.header]}>
            <Text style={styles.title}> {busStopName} </Text>
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.box, styles.box2]}>
            <Text style={[styles.text]}> {busType} </Text>
          </View>
          <View style={[styles.box]}>
            <Text style={[styles.text]}> {this.renderTime(timeList[0])}</Text>
          </View>
          <View style={[styles.box, styles.box3]}>
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
    // borderLeftWidth: 0.5,
    borderLeftColor: '#d6d7da',
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
    backgroundColor: '#31659C',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  box2: {
    backgroundColor: '#639ACE',
  },
  box3: {
    backgroundColor: '#4A79A5',
  },
  toggler: {
    height: 10,
    backgroundColor: '#333',
    width: '100%',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    alignItems: 'center',
    fontSize: 18,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
});
