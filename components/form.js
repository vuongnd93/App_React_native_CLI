
import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text,Image } from 'react-native';
// import { CheckBox } from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';
import AddModal from './addmodal';
import Transport from '../assets/transport.png';
import Setting from '../assets/setting.png';
import ToCuttomer from '../assets/checkout.png';
import Lapdat from '../assets/lapdat.jpg';
import Config from '../assets/config.png';
import Gold from '../assets/gold.png';

import { connect } from 'react-redux';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
           one: false,
           two:false,
        };
        this._onPressAdd = this._onPressAdd.bind(this); 
        // this._onPressAdd = this._onPressAdd.bind(this); 
    }
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //       title: 'Công việc'
    //     }
    //   };

    // onAdd() {
    //     const { en, vn } = this.state;
    //     this.props.addWord(en, vn);
    //     this.props.toggleIsAdding();
    // }
    _onPressAdd () {
        // alert("You add Item");
        this.refs.addModal.showAddModal();
    }
    _onCheck() {
     this.setState({
         checked: true
     })
    }
    onChecked(){
        this.setState({
            one: true
        })
        console.log(this.state.one)
    }
    render() {
        // const {navigate} = this.props.navigate;
        return (
            
            <View style={styles.container}>   
                 <AddModal ref = {'addModal'}>
                 </AddModal>     
                <View style={styles.wrapp_checkbox}>
                    <View style={styles.wrapp_event}>
                        <TouchableOpacity style={styles.click_event}
                            onPress={this.props.onPress}
                         >
                            <Text>Trên Đường Đi</Text> 
                            <Image source={Transport} style={{ width: 30, height: 30 }}/>                                                                              
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.click_event} onPress={this._onPressAdd}>
                            <Text>Bảo Dưỡng</Text> 
                            <Image source={Setting} style={{ width: 30, height: 30 }}/>                                                                              
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.click_event} onPress={this._onPressAdd}>
                            <Text>Thanh Toán</Text> 
                            <Image source={ToCuttomer} style={{ width: 30, height: 30 }}/>                                                                              
                        </TouchableOpacity>
                                 
                    </View>

                    <View style={styles.wrapp_event}>
                        <TouchableOpacity style={styles.click_event}
                        // onPress={() => this.props.navigator.navigation.navigate('JobDetail')}
                            >
                            <Text>Bốc Dỡ Hàng</Text> 
                            <Image source={Lapdat} style={{ width: 30, height: 30 }}/>                                                                              
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.click_event} onPress={this._onPressAdd}>
                            <Text>Lắp Đặt</Text> 
                            <Image source={Config} style={{ width: 30, height: 30,marginTop: 5, }}/>                                                                              
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.click_event} onPress={this._onPressAdd}>
                            <Text>Nhận Thưởng</Text> 
                            <Image source={Gold} style={{ width: 30, height: 30 }}/>                                                                              
                        </TouchableOpacity>
                       
                    
                       
                        
                    
                    </View>

                </View>
                
            </View>
            
        );
    }
}

export default connect(null)(Form);

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'column',
        // alignSelf: 'stretch',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    wrapp_checkbox:{
        marginTop:5,
     flexDirection: 'row',
       alignSelf: 'stretch',
      justifyContent: 'center',
    //  alignItems: 'center'
    justifyContent: 'space-around', 
    },

    textInput: {
        height: 40,
        backgroundColor: '#E4F6D4',
        margin: 10,
        paddingHorizontal: 10
    },
    click_event:{
      flexDirection: 'column',
      backgroundColor:'#fff',
      paddingHorizontal: 10,
      borderRadius: 10,
      paddingVertical:10,
      marginBottom:10,
      marginTop:10,
      alignItems: 'center'
    }


});