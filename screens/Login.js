
import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View,
   StyleSheet,dismiss,
   TouchableWithoutFeedback,Keyboard } from 'react-native';
// import { AuthSession } from 'expo';
// import {getdata} from '../networking/server';
import axios from 'axios';
// import * as TaskManager from 'expo-task-manager';
// import * as Location from 'expo-location';
// import datajson from '../datajson';

const LOCATION_TASK_NAME = 'background-location-task';
const getApex = 'http://118.70.197.124/ords/retail/delivery/login?';
export default class Login extends React.Component {
    state = {
      email: '',
      password: '',    
    };
    
    static navigationOptions ={
      title: 'Đăng Nhập',
    };
    componentDidMount = async () => {
     
    };

  onLogin() {
    const { email, password } = this.state;
   
    Alert.alert('Credentials', `email: ${email} + password: ${password}`);
  }
 
  _getdata = async () => {
   
    try {
      let responce = await axios.get(getApex,
        {params:{P_UNAME:this.state.email,P_PWD:this.state.password}}
        
      );
      let responcedata = responce.data.state;
      console.log(responce.data);
      console.log(responce.data.state);
      // console.log(datajson);
      // console.log(JSON.stringify(datajson));

       if (responcedata === 'OK') {Alert.alert('login success: OK'),
            // this.props.navigation.navigate('JobList',{data:{dataserver}}) 
            this.props.navigation.navigate('JobType')      
        }
       else {Alert.alert('Login fail')};
       return responcedata;  
    } catch(error){
        console.log(`error is : ${error}`); 
        {Alert.alert('Login fail')};
    }
  }
  
  render() {
   
    return (
      <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
      <View style={styles.container}>
      <Text style={styles.titleText}>Hi, Welcome To</Text>
        <Text style={styles.titleText}>HC-GPS</Text>
        <TextInput
          value={this.state.email}
          keyboardType = 'email-address'
          onChangeText={(email) => this.setState({ email })}
          placeholder='email'
          placeholderTextColor = 'white'
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'password'}
          secureTextEntry={true}
          placeholderTextColor = 'white'
          style={styles.input}
        />
            
        <TouchableOpacity
          style={styles.button}
          onPress={()=> this.props.navigation.navigate('JobType') }
       >
         <Text style={styles.buttonText}> Sign Up / Login </Text>
       </TouchableOpacity>
      
      </View>
     
       </TouchableWithoutFeedback>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: 'salmon',
  },
  titleText:{
    // fontFamily: 'Baskerville',
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'powderblue',
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText:{
    // fontFamily: 'Baskerville',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    // fontFamily: 'Baskerville',
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
  },
});
