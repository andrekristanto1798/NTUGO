import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

export default class BusDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flex}>
          <Text style={styles.title}> Bus Stop Detail </Text>
        </View>
        <View style={{
          flexDirection: 'row'
        }}>
          <View style={styles.flex}>
            <Text style={styles.text}> Campus Loop Red </Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.text}> 5 mins </Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.text}> 10 mins </Text>
          </View>
        </View>
      </View>
    );
  }
}

let {height, width} = Dimensions.get('window');

const WINDOW_HEIGHT = height;
const WINDOW_WIDTH = width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 120,
    padding: 20,
    left: 0, 
    top: WINDOW_HEIGHT - 120, 
    width: WINDOW_WIDTH,
  },
  text: {
    textAlign: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 20
  },
  contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
    height: 100
  },
  flex: {
    flex: 1
  }
});