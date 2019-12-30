import * as React from 'react';
import { Text, View, StyleSheet, Image,TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
// import {CheckBox} from 'react-native-elements';
import Setting from '../assets/setting.jpg';
import Home from '../assets/homecustom.jpg';
import Pay from '../assets/checkout.jpg';
import CheckTick from '../assets/tick_check.png';
import Transport from '../assets/transport.png';
// import Loading from '../assets/loading.png';
import Showright from '../assets/buy_plus.png';



export default class OnGO extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
       showevent:false,
        event:'',
        selectedCheckbox: {}, 
        checkboxValue: [
            {
            label: "Tắc Đường",
            value: 1
            },
            {
            label: "Hết Xăng",
            value: 2
            },
            {
            label: "Tai Nạn Giao Thông",
            value: 3
            },
            {
            label: "Option4",
            value: 4
            },
            {
            label: "Option5",
            value: 5
            }
        ]
 })
}

_onEven_checkbox = () => {
  const { checkboxValue, selectedCheckbox } = this.state;
  return (
      <View style={styles.check_box}>
        {checkboxValue.map(option=>{                 
                        return(<CheckBox
                            key={option.value}
                            title={option.label}               
                            checked={option.value === selectedCheckbox.value}
                            // checked={checked}
                            onPress={()=>{this.CheckMe(option)}}
                          />)                      
                    })}        
      </View>)
}

  check_job(){

  }
  render() {
    const { checkboxValue, selectedCheckbox,} = this.state;
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
                    <TouchableOpacity
                  onPress={()=> this.setState({showevent:!this.state.showevent})}>                                                                                    
                      <Image source={Showright} style={{ width: 25, height: 25, marginRight: 10, }}/>    
                    </TouchableOpacity>                            
                </View>   

            </TouchableOpacity> 
            {(this.state.showevent== true)?this._onEven_checkbox():null}
           
        
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
