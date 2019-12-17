import * as React from 'react';
import Constants from 'expo-constants';
import { Text, View, StyleSheet, Image,TouchableOpacity } from 'react-native';
import Setting from '../assets/setting.jpg';
import Home from '../assets/homecustom.jpg';
import Pay from '../assets/checkout.jpg';
import CheckTick from '../assets/tick_check.png';
import Transport from '../assets/transport.png';
import Loading from '../assets/loading.png';
import Showright from '../assets/buy_plus.png';
export default class JobDetail extends React.Component {
  
  check_job(){

  }
  render() {
    return (
     <View style={styles.container}>

        <View style={styles.one}>
           <TouchableOpacity  style={styles.even}>
               <Text  >
                  TakePhoto
               </Text>
              
           </TouchableOpacity>
            <TouchableOpacity  style={styles.start}>
             <Text  >
                Save
               </Text>         
           </TouchableOpacity>

        </View> 

        <View style={styles.two}>

            <TouchableOpacity style={styles.On_Go} >
                <View style={styles.flex_image}>
                   <Image source={Transport} style={{ width: 30, height: 30, marginRight: 10, }}/>          
                </View>
                <View style={styles.flex_title}>                    
                      <Text style={styles.text_title} >
                         Trên Đường Đi
                       </Text>
                </View>
                 <View style={styles.flex_check}>
                    <TouchableOpacity  >                               
                      <Image source={Showright} style={{ width: 25, height: 25, marginRight: 10, }}/>    
                    </TouchableOpacity>                            
                </View>   

            </TouchableOpacity> 
            <View style={styles.title} >
                <View style={styles.flex_image}>
                   <Image source={Home} style={{ width: 30, height: 30, marginRight: 10, }}/>          
                </View>
                <View style={styles.flex_title}>                    
                      <Text style={styles.text_title} >
                         Đến Nhà Khách Hàng
                       </Text>
                </View>
                 <View style={styles.flex_check}>
                    <TouchableOpacity                 
                     style={styles.touchab_check}>
                      <Image source={CheckTick} style={{ width: 20, height: 20, marginRight: 10, }}/>    
                    </TouchableOpacity>                            
                </View>   
                            
            </View> 
            <View style={styles.title} >
                <View style={styles.flex_image}>
                   <Image source={Setting} style={{ width: 30, height: 30, marginRight: 10, }}/>          
                </View>
                <View style={styles.flex_title}>                    
                      <Text style={styles.text_title} >
                        Lắp Đặt Và Bàn Giao
                       </Text>
                </View>
                 <View style={styles.flex_check}>
                    <TouchableOpacity                 
                     style={styles.touchab_check}>
                      <Image source={CheckTick} style={{ width: 20, height: 20, marginRight: 10, }}/>    
                    </TouchableOpacity>                            
                </View>   
                            
            </View> 
            <View style={styles.title} >
                <View style={styles.flex_image}>
                   <Image source={Pay} style={{ width: 30, height: 30, marginRight: 10, }}/>          
                </View>
                <View style={styles.flex_title}>                    
                      <Text style={styles.text_title} >
                       Thanh Toán
                       </Text>
                </View>
                 <View style={styles.flex_check}>
                    <TouchableOpacity                 
                     style={styles.touchab_check}>
                      <Image source={CheckTick} style={{ width: 20, height: 20, marginRight: 10, }}/>    
                    </TouchableOpacity>                            
                </View>   
                            
            </View> 

                      
        </View>

      
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  one: {
   flex:10,
   backgroundColor:'#f5f5f5',
   flexDirection: 'row',
   justifyContent: 'space-around', 
   paddingVertical:30,
   paddingHorizontal:20,
 },
 two: {
    flex:90,
    backgroundColor:'#fff',
   },
 even:{
    backgroundColor: '#87cefa',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius:50,
    marginRight: 10
 },
 start:{
    backgroundColor: '#D8CB00',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius:50,
    marginRight: 10
 },
  title:{
    flexDirection:'row',   
     padding:15,
     marginBottom:5,
     borderColor:'#696969',
     borderBottomWidth:2,    
 },
 On_Go:{
    flexDirection:'row',   
    padding:15,
    marginBottom:5,
    borderColor:'#696969',
    borderBottomWidth:2,    
 },
  text_title:{
    fontSize:15,
    fontWeight:'300'

  },
  
  flex_image:{
    justifyContent:'center',
    flex:20,
  },
   flex_title:{
      flex:70,
    justifyContent:'center'
  },
   flex_check:{
      flex:10,
    justifyContent:'center'
  },
   touchab_check:{
     width:30,
     height:30,
     borderColor: '#48d1cc',
     borderWidth:1,
    //  alignItems: 'center',
     justifyContent: 'center',
     paddingHorizontal:4,   
   }
   
});
