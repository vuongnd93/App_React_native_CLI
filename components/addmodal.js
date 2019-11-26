import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,TouchableOpacity,
    TextInput
} from 'react-native';
// import { CheckBox } from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import Photo from '../assets/takephoto.png';
// import flatListData from '../data/flatListData';

var screen = Dimensions.get('window');
export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            one: true,
            two:false,
            three: false,
         };
    }
    showAddModal = () => {
        this.refs.myModal.open();
    }
    // generateKey = (numberOfCharacters) => {
    //     return require('random-string')({length: numberOfCharacters});        
    // }
    _onCheck() {    
        if(this.state.one===true){
            this.setState({
                one: false,  
                two:true          
             })  
        } else{
            this.setState({
                one: true,
                two : false            
             })  
        }  
            
 }
      

    render() {
        return (
            <Modal
                ref={"myModal"}
                style={{
                    paddingVertical: 20,
                    paddingHorizontal: 10,                 
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 70,
                    height: 350,
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    // alert("Modal closed");
                }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 5
                }}>Thanh Toán</Text>
                <CheckBox
                    title='Đã Thanh Toán'
                    checked={this.state.one}
                    onPress={()=>this._onCheck()}
                />
                 <CheckBox
                    title='Nhận Thưởng'
                    checked={this.state.two}
                    onPress={()=>this._onCheck()}
                 />
                 <CheckBox
                    title='Nhận Thưởng'
                    checked={this.state.three}
                    onPress={()=>this._onCheck()}
                 />
                 <View style={styles.take_photo}>
                    <TouchableOpacity style={styles.click_event} onPress={this._onPressAdd}>
                                <Text>Images</Text> 
                                <Image source={Photo} style={{ width: 20, height: 20 }}/>                                                                              
                    </TouchableOpacity>
                </View>
                  {/* <CheckBox
                    title='Đổ Xăng'
                    checked={this.state.checked}
                 />
                  <CheckBox
                    title='Đổ Xăng'
                    checked={this.state.checked}
                 /> */}
                {/* <TextInput
                    style={{
                        height: 30,
                        borderBottomColor: 'gray',
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop:5,
                        marginBottom: 5,
                        borderBottomWidth: 1
                    }}           
                    onChangeText={(text) => this.setState({ newFoodName: text })}
                    placeholder="Sự cố khác..."
                    value={this.state.newFoodName}                 
                />
                 */}
                 <Button 
                  style={{ fontSize: 18, color: 'white' }}
                  containerStyle={{
                      padding: 8,
                      marginLeft: 70,
                      marginRight: 70,
                      height: 40,
                      borderRadius: 6,
                      backgroundColor: 'mediumseagreen'
                  }}
                 > Save</Button>
                {/* <Button
                    style={{ fontSize: 18, color: 'white' }}
                    containerStyle={{
                        padding: 8,
                        marginLeft: 70,
                        marginRight: 70,
                        height: 40,
                        borderRadius: 6,
                        backgroundColor: 'mediumseagreen'
                    }}
                    onPress={() => {
                         if (this.state.newFoodName.length == 0 || this.state.newFoodDescription.length == 0) {
                            alert("You must enter food's name and description");
                            return;
                        }       
                        const newKey = this.generateKey(24);
                        const newFood = {
                            key: newKey,
                            name: this.state.newFoodName,
                            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/64/Foods_%28cropped%29.jpg",
                            foodDescription: this.state.newFoodDescription
                        };    
                        flatListData.push(newFood);    
                        this.props.parentFlatList.refreshFlatList(newKey);                                
                        this.refs.myModal.close();                                                                       
                    }}>
                    Save
                </Button> */}
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    click_event:{
     
      backgroundColor:'#ffd700',
      paddingHorizontal: 5,
      borderRadius: 5,
      paddingVertical:5,
      marginBottom:5,
      marginTop:5,
      alignItems: 'center',
        width: 60,
        height:60,
    justifyContent: 'space-around', 
    },

    take_photo:{
        textAlign:'right',
    },


});