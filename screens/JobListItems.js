import * as React from 'react';
import {
  Text, View, StyleSheet, Image,
  Button, Alert, TouchableOpacity, ScrollView,
  Dimensions, StatusBar, TextInput
} from 'react-native';
import backSpecial from '../assets/backs.png';
import { connect } from 'react-redux';
// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
import Swipeout from 'react-native-swipeout';
import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';




class JobListItems extends React.Component {
  constructor(props) {
    super(props);

  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'List công việc'
    }
  };
  componentWillMount() {
    // const { params } = this.props.navigation.state;
    //  const oder_detail_id = params.oder_detail_id;
    //  const { btnStatus, myData } = this.props;
    //  let status= "";
    //     myData.map(e=>{
    //      e.oder_detail.map(e1=>{
    //        if(e1.Oder_detail_id==oder_detail_id){
    //             status=e1.status 
    //        }              
    //      });     
    //    });
    //  console.log('#jobdetail: status_curent:',status);
  
   }
  // onStatusOder(){
  //   const { btnStatus, myData } = this.props;
  //   const Oder_detail_id =this.props.Oder_detail_id
  //  let status= "";
  //      myData.map(e=>{
  //       e.oder_detail.map(e1=>{
  //         if(e1.Oder_detail_id==Oder_detail_id){
  //           status=e1.status 
  //          }         
  //       });     
  //     });
  //     console.log('#joblistitem.e1.status',status);
  //     return status
     
  // }

  render() {
    const { btnStatus, myData } = this.props;
    const Oder_detail_id =this.props.Oder_detail_id
     let status= "";
    //  let oder_state="";
       myData.map(e=>{
        e.oder_detail.map(e1=>{
          if(e1.Oder_detail_id==Oder_detail_id){
            status=e1.status; 
           }         
        });     
      });
    return (

      <TouchableOpacity
        disabled={
         (status==='INACTIVE')&(this.props.stateOder==='INACTIVE')?false:
         (status==='INACTIVE')&(this.props.stateOder==='ACTIVE')?true:
         (status==='COMPLETED')?true: false   
        }
        onPress={this.props.onPress}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor:
            (status==='PROCESSING')?'#DD3C6E':
            (status==='COMPLETED')&(this.props.stateOder==='ACTIVE')?'#808080': 
            (status==='INACTIVE')&(this.props.stateOder==='INACTIVE')?'#DD3C6E':
            (status==='INACTIVE')&(this.props.stateOder==='ACTIVE')?'#808080':
            (status==='PROCESSING')|(this.props.stateOder==='ACTIVE')?'#DD3C6E':
            (status==='INACTIVE')&(this.props.stateOder==='COMPLETED')?'#DD3C6E':
            (status==='COMPLETED')?'#808080':'#808080'         
       ,
            // backgroundColor: '#DD3C6E',
            marginHorizontal: 10,
            marginTop: 10,
            paddingHorizontal: 10,
            borderRadius: 2,
            padding: 10,
          }} >
          <View style={styles.wrapper_row}>
            <View style={styles.view_oder}>
              <Text style={styles.oder_id}>Đơn Hàng</Text>
              <Text style={styles.oder_content}>{this.props.id}</Text>
            </View>
            <View style={styles.view_oder}>
              <Text style={styles.oder_id}>Thời gian</Text>
              <Text style={styles.oder_content}>{this.props.time}</Text>
            </View>
            <View style={styles.view_oder}>
              <Text style={styles.oder_id}>Trạng Thái</Text>
              <Text style={{ color: 'yellow' }}>
                {status}
              </Text>
            </View>
          </View>
          <TouchableOpacity
             disabled={
              (status==='INACTIVE')&(this.props.stateOder==='INACTIVE')?false:
              (status==='INACTIVE')&(this.props.stateOder==='ACTIVE')?true:
              (status==='COMPLETED')?true: false   
             }
            onPress={this.props.onPress} >
            <Image source={backSpecial} style={{ width: 20, height: 20, marginVertical: 20 }} />
          </TouchableOpacity>

        </View>

      </TouchableOpacity>

    )
  }
}
function mapStateToProps(state) {
  return {
    myData: state.DataJob.Job,
    stateOder: state.stateOder.stateOder,
    actionID: state.stateOder.idOder,
  };
}
export default connect(mapStateToProps)(JobListItems);



const styles = StyleSheet.create({
  // wrapper: { flex: 1, backgroundColor: '#fff' },
  wrapper_oder: {
    flexDirection: 'row',
    backgroundColor: '#DD3C6E',
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 2,
    padding: 10,
  },
  wrapper_row: {
    flex: 80,
  },
  view_oder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
  },
  oder_id: { color: '#fff', fontWeight: 'bold' },
  oder_content: { color: '#fff' },

});