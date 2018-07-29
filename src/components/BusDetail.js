import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Button } from '../../node_modules/react-native-elements';

export default class BusDetail extends Component {
  render() {
    const { busStopName, busType, nextArrival, subsequentArrival } = this.props;

    return (
      <View style={[styles.container]}>
        <View style={[styles.toggler]}>
          <Button color="#333"
            title="toggle details"
            onPress={this.toggleDetails}>
          </Button>
        </View>
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
    );
  }
}

toggleDetails = () => {
  // method to toggle the component rendering
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
    width: WINDOW_WIDTH
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
  toggler: {
    height: 10,
    backgroundColor: '#333',
    width: '100%'
  },
  two: {
    flex: 2
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

