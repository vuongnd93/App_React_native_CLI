import React, { Component } from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Button } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
// import BackgroundTimer from 'react-native-background-timer';
import axios from 'axios';
const postlocation = 'http://118.70.197.124/ords/retail/delivery/putlocation';
const postnodejs = 'http://221.133.17.20:3030/api/dangnhap';

export default class MapPUT extends Component {
  static navigationOptions = ({navigation})=>{
    return {
      title : navigation.getParam('del_id')
     
    }
   
   };
  
  state = {
    mapRegion: { latitude: 21.072325, longitude: 105.786573, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 21.072325, longitude: 105.786573}},
  };


  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };
 
  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location), location, });
   let loglocation = this.state.locationResult;
   let latitude = this.state.location.coords.latitude;
   let longitude = this.state.location.coords.longitude;
  //  console.log(loglocation);
   console.log(latitude);
   console.log(longitude);
 };

 _postlocation = async () => {
  // const {navigate}= this.props.navigation;
  // const {params}= this.props.navigation.state
  const p_del_id = this.props.navigation.state.params.thamso
  let latitude = this.state.location.coords.latitude;
  let longitude = this.state.location.coords.longitude;
  try {
    let responce = await axios(postlocation,
      {   
      method :"PUT",
      params: {
        p_long:longitude,
        p_lat:latitude,
        p_del_id: p_del_id,
      }
    }        
  );
    console.log(responce.data);
    // console.log(latitude);
    // console.log(responce)
  } catch(error){
      console.log(`error is : ${error}`);      
  }
}
// _postnodejs = async () => {
//   try {
//     let responce = await axios.put(postnodejs,
//       {params:{latitude:this.state.latitude,longitude:this.state.longitude}}    
//     );
//     console.log(responce.data);
//   } catch(error){
//       console.log(`error is : ${error}`);      
//   }
// }
 

  render() {
    // const {params}= this.props.navigation.state
    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: 500 }}
          initialRegion={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          onRegionChange={this._handleMapRegionChange}
        >
    <MapView.Marker
      coordinate={this.state.location.coords}
      title="My Marker"
      description="Some description"
    />
        </MapView>
            
        <Text>
          Location: {this.state.locationResult}       
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this._postnodejs}
       >
         <Text style={styles.buttonText}> ${this.props.navigation.state.params.thamso} </Text>
       </TouchableOpacity>
      
      </View>
    );
  }
}

 


const styles = StyleSheet.create({
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
});
