import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

// const LATITUDE_DELTA = 0.009;
// const LONGITUDE_DELTA = 0.009;
// const LATITUDE = 18.7934829;
// const LONGITUDE = 98.9867401;

const styles =StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class ShowMapView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('del_id')
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      // mapRegion: { latitude: 21.072325, longitude: 105.786573, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      // locationResult: null,
      // location: {coords: { latitude: 21.072325, longitude: 105.786573}},
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      latitude: 21.072325,
      longitude: 105.786573,
      error: null,
      routeCoordinates: [],
    };
  }

 
  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: this.state.latitudeDelta,
    longitudeDelta: this.state.longitudeDelta,
  });  

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={this.getMapRegion()}
        >
          <Polyline
            coordinates={this.state.routeCoordinates}
            strokeWidth={5} />

          {/* <Marker coordinate={this.getMapRegion()} /> */}

          <Marker
            coordinate={this.getMapRegion()}
            title="Driver"
            description="Current location"
          />
        </MapView>

      </View>
    );
  }
}
