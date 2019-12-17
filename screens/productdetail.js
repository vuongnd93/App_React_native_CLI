import React, { Component } from 'react';
import Constants from 'expo-constants';
import { Text, View, StyleSheet, Image,TouchableOpacity } from 'react-native';

export default class ProductDetail extends Component {
  render() {
    return (
     <View style={styles.container}>

        <View style={styles.one}>
           <TouchableOpacity  style={styles.even}>
               <Text>
                  Sự kiện
               </Text>
              
           </TouchableOpacity>
            <TouchableOpacity  style={styles.start}>
             <Text>
                 Start
               </Text>         
           </TouchableOpacity>

        </View> 

        <View style={styles.two}>

            <View style={styles.title} >
              <Text style={styles.text_title} >
                Chi tiết đơn Hàng
              </Text>
            </View> 

            <View style={styles.detail_oder}>
               <View style={styles.detail_infor}>
                  <View style={styles.oder_infor_title}>
                     <Text >Đơn Hàng:</Text>
                  </View>
                   <View style={styles.oder_infor}>
                     <Text >TR02.00086035_6</Text>
                  </View>
                          
               </View>

               <View style={styles.detail_infor}>
                  <View style={styles.oder_infor_title}>
                     <Text >Khách hàng:</Text>
                  </View>
                   <View style={styles.oder_infor}>
                     <Text >Siêu Thị điện máy HC Hậu Lộc Thanh Hóa</Text>
                  </View>
                          
               </View>
               <View style={styles.detail_infor}>
                  <View style={styles.oder_infor_title}>
                     <Text >Địa chỉ:</Text>
                  </View>
                   <View style={styles.oder_infor}>
                     <Text >Đội 7, Xã Hoa Lộc, Huyện Hậu Lộc, Tỉnh Thanh Hóa</Text>
                  </View>
                          
               </View>
               <View style={styles.detail_infor}>
                  <View style={styles.oder_infor_title}>
                     <Text >SĐT:</Text>
                  </View>
                   <View style={styles.oder_infor}>
                     <Text >TR02.00086035_6</Text>
                  </View>
                          
               </View>
               <View style={styles.detail_infor}>
                  <View style={styles.oder_infor_title}>
                     <Text >Sản phẩm giao</Text>
                  </View>
                   <View style={styles.oder_product_detail}>
                    <TouchableOpacity style={styles.product_detail}>
                        <Text>Xem Chi tiết</Text>
                    </TouchableOpacity>
                  </View>
                          
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
 even:{
    backgroundColor: '#87cefa',
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
    borderRadius:50,
    marginRight: 10
 },
 start:{
    backgroundColor: '#D8CB00',
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
    borderRadius:50,
    marginRight: 10
 },
  title:{
    flex:8,
     alignItems:'center',
     padding:10,
     marginBottom:5,
      borderRadius: 5,
        shadowColor: '#a9a9a9',
        shadowOpacity: 0.5,
        shadowRadius:20 ,
        shadowOffset:{width:0,height:5},     
 },
  text_title:{
    fontSize:15,
    fontWeight:'300'

  },
   two: {
   flex:90,
   backgroundColor:'#fff',
  },
  detail_oder:{
    flex:90,
    // alignItems:'center',
     marginBottom:5,
      borderRadius: 5,
        shadowColor: 'rgb(255, 0, 255)',
        shadowOpacity: 0.5,
        shadowRadius:20 ,
        shadowOffset:{width:0,height:5},  
  },
  detail_infor:{
    // flex:20,
  flexDirection: 'row', 
   justifyContent: 'space-between',
    alignItems:'stretch',
    padding:10,
    backgroundColor: '#fff',
    // borderBottomColor:'f5f5dc',
    // borderBottomWidth:1,
    shadowColor: '#a9a9a9',
        shadowOpacity: 0.5,
        shadowRadius:20 ,
        shadowOffset:{width:0,height:5},
        marginBottom:5,

   
  },
  oder_infor_title:{
  //  backgroundColor:'#ffebcd',
   flex:30,
  },
  oder_infor:{
  //  backgroundColor:'#ff8c00',
   flex:70,
  },
   product_detail:{
     borderColor: '#add8e6',
     padding:5,
    //  backgroundColor:'#add8e6',
     borderWidth:3,
     width:120
   },
   oder_product_detail:{
       alignItems: 'center',
   }
});
