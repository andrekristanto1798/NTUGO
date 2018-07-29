import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

export default class BusDetail extends Component {
  render() {
    const { busStopName, busType, nextArrival, subsequentArrival } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.box]}>
            <Text style={styles.title}> { busStopName } </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.box, styles.box2]}>
            <Text style={styles.text}> { busType } </Text>
          </View>
          <View style={[styles.box]}>
            <Text style={styles.text}> { nextArrival } </Text>
          </View>
          <View style={[styles.box, styles.box3]}>
            <Text style={styles.text}> { subsequentArrival } </Text>
          </View>
        </View>
      </View>
    );
  }
}

// calculate window size to place 
// the component at the bottom
let { height, width } = Dimensions.get('window');
const WINDOW_HEIGHT = height;
const WINDOW_WIDTH = width;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: '#000',
    height: 120,
    left: 0,
    top: WINDOW_HEIGHT - 120,
    width: WINDOW_WIDTH,
    justifyContent: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  two: {
    flex: 2
  },
  text: {
    textAlign: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
});

