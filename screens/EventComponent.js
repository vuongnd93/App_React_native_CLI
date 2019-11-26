
import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View,
  Alert,StyleSheet,TouchableOpacity,Image} from 'react-native';
import AddModal from '../components/addmodal';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import Form from '../components/form';
import {COMPLETED} from '../redux/actionCreators';
import backSpecial from '../assets/buy_plus.png';



  class  EventComponent extends React.Component {
    constructor(props){
      super(props)
      this.state ={
        isAdding: false
      }
      this._onPressAdd = this._onPressAdd.bind(this); 
      this._onAddForm =  this._onAddForm.bind(this); 
    }
    static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      let headerTitle = 'Event';
      let headerTitleStyle = { color: '#dc143c' };
      let headerRight = (<Button
          containerStyle={{ margin: 10, padding: 10, borderRadius: 50, backgroundColor: '#00ffff' }}
          style={{ fontSize: 15, color: 'white' }}
          onPress={() => {
              // params.onsave();
          }}
      >
      </Button>);
      let headerBackTitle = 'Back';
      return {
          headerTitle, headerTitleStyle, headerRight, headerBackTitle,
      }
  };

   _onAddForm(){
    if(this.state.isAdding ===false){
      this.setState({
        isAdding: true
      })
    }else{
      this.setState({
        isAdding: false
      })
    } 
   }
  _onPressAdd () {
    // alert("You add Item");
    this.refs.addModal.showAddModal();
}

_onCompletedJob = async ()=>{
  const {params}= this.props.navigation.state;
  oder_detail_id = params.oder_detail_id
  // console.log(oder_detail_id);
  let stateJob= 'COMPLETED';
  Alert.alert(
    'Đồng ý! Hoàn thành Công việc',
    '',
    [
      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () =>this.props.COMPLETED(oder_detail_id,stateJob)},
    ],
    {cancelable: false},
  );

  //  this.props.START(START);
    // try {
    //  let status = await AsyncStorage.getItem('status');
    //  console.log('status = ',status);
    //  if (status ==='PROCESSING'){
    //   await AsyncStorage.setItem('status', 'STOP');
    //   this.setState({
    //     btnStartEndName: 'START',
    //   });
    //  }else {
    //     await AsyncStorage.setItem('status','PROCESSING');
    //     this.setState({
    //       btnStartEndName: 'END',
    //     });
    //  }
    // } catch (error) {
    //    console.log(error);
    // }
  }


  render() {
    const { params } = this.props.navigation.state;
    const {navigate} = this.props.navigation;
    const oder_detail_id = params.oder_detail_id;
    // const { params } = this.props.navigation.state;
    // let oder_detail_id = params.oder_detail_id;
    // const { btnStatus, myData } = this.state.myData;
    let myData=this.props.myData;
   let status= "";
       myData.map(e=>{
        e.oder_detail.map(e1=>{
          if(e1.Oder_detail_id==oder_detail_id){
               status=e1.status 
          }              
        });     
      });
    return (
     <View style={styles.container} >
        <View style={styles.header} >
          <Text style={styles.text}>Sự kiện</Text>
        </View>

         <View style={styles.acident} >
              <Text style={styles.option_text}>Chọn sự kiện</Text>
            <TouchableOpacity style={styles.option} 
            //  onPress={()=>this.props.navigation.navigate('EvenOnGo')}
            >
                <Text style={styles.text}>Tất cả sự kiện</Text>
                <TouchableOpacity onPress={this._onAddForm} >
                    <Image source={backSpecial} style={{ width: 30, height: 30 }}/>
                </TouchableOpacity>
            </TouchableOpacity>
            {this.state.isAdding ? <Form onPress={()=>this.props.navigation.navigate('EvenOnGo')}/> : null}
        </View>
      
      
         {/* <View style={styles.acidentDetail} >           */}
            <View  style={styles.sukien_buttom}> 
              <TouchableOpacity style={styles.endjob}
                disabled={
                  (status==='INACTIVE')|(status==='COMPLETED')?true:
                  (status==='PROCESSING')?false:false                 
                 }
               onPress={() => {this._onCompletedJob()}}   >      
                     <Text style={styles.sukien_text}>Completed</Text>                    
              </TouchableOpacity >
            </View>
        {/* </View> */}
            <AddModal ref = {'addModal'}>
            </AddModal>
     </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    myData: state.DataJob.Job,
    btnStatus: state.filterStatus,
    stateOder: state.stateOder.stateOder,
    actionID: state.stateOder.idOder,
    stateJob: state.StartJob
   };
}

export default connect(mapStateToProps,{COMPLETED})(EventComponent);

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'blueviolet'
  },
  sukien:{
    flex:70,
    backgroundColor:'darkorange',
    flexDirection:'row',
    justifyContent: 'space-between',
    padding:30,
  },
  endjob:{
    width:80,
    height:50,
    backgroundColor:'yellow',
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    
  },

  sukien_click:{
    backgroundColor:'chartreuse',
    width:100,
    height:80,
    marginRight:5,
    padding:10,
    borderRadius:5,
    alignItems:'center',
    justifyContent: 'space-between',
  },
  sukien_buttom:{
    flex:20,
    textAlign:'right',
    alignItems:'center',
    justifyContent:'center'
    
  },
  header: {
    flex:10,
    backgroundColor :'blanchedalmond',
    alignItems:'center',
    paddingTop:10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius:40,
  },
  option:{
     flexDirection:'row',
    justifyContent: 'space-between',
     backgroundColor:'#00ffff',
     padding:10,
     marginHorizontal:20,
     marginTop:10,
     borderRadius:50,
     
  },

  text:{
   color:'#b22222',
   fontSize:15,
  },
  option_text:{
    fontSize:20,
    color:'#fff',
    marginTop:10,
  },
  acident: {
   flex:70,
   backgroundColor:'blueviolet',
   alignSelf: 'stretch',
  },
  
});
