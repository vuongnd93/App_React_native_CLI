import * as React from 'react';
import { Text, View, StyleSheet, Image,
  Button,Alert,TouchableOpacity,ScrollView,
  Dimensions,StatusBar,TextInput,Modal,TouchableHighlight,
 } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
// import * as ImagePicker from 'expo-image-picker';
import backSpecial from '../assets/backs.png';
import shipping from '../assets/shipping.jpg';





 class JobTypeItems extends React.Component {
    constructor(props){
     super(props)
     this.state = {
      activeRowKey: null,
      show: false,
      hideReject: false,
      mau:'#1DA7FC',
    }; 
 }
    static navigationOptions = ({navigation})=>{
      return { 
        title : 'List công việc'    
      }    
     };

     async componentDidMount() {
      let idActive= this.props.id;
      let status = await AsyncStorage.getItem(idActive);
      console.log('Constructor, status = ',status);
  
      if (status === 'Reject') {
        // PROCESSING -> btnStartEnd lable shows END
        this.setState({
         show: true,
         mau:'#f5f5dc',
        });
      } else {
        // Stop -> btnStartEnd lable shows START
        this.setState({
          show: false,
        });
      }
   }
   
   _onAceptJob = async ()=>{
    try {
      await AsyncStorage.setItem('JobTypeStatus','Acept');
    } catch (error) {
       console.log(error);
    }
  }
  _onRejectJob = async ()=>{
    try { 
      let idActive = this.props.id    
      await AsyncStorage.setItem(idActive,'Reject')
      this.setState({show:true,mau:'#f5f5dc'})    
    } catch (error) {
       console.log(error);
    }
  }

  AcceptJob =()=>{
       Alert.alert(
  'Đồng ý! Nhận công việc',
  '',
  [
    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () =>this._onAceptJob()},
  ],
  {cancelable: false},
);
  }  ;

  RejectJob =()=>{
       Alert.alert(
  'Từ Chối Công Việc Này',
  '',
  [
    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => this._onRejectJob()},
  ],
  {cancelable: false},
);
  }  


  render() {
//   const {job} = this.props.job;
//   const {show} = this.state.show;
//  console.log(show)
const {btnStatus, myData } = this.props;
const swipeSettings = {
  autoClose: true,
  onClose: (secId, rowId, direction) => {
      if(this.state.activeRowKey != null) {
          this.setState({ activeRowKey: null });
      }              
  },          
  onOpen: (secId, rowId, direction) => {
      this.setState({ activeRowKey: this.props.id });
      console.log(this.state.activeRowKey);
  },      
  right: [
      { 
          onPress: () => {    
              const deletingRow = this.state.activeRowKey;          
              Alert.alert(
                  'Alert',
                  'Are you sure you want to delete ?',
                  [                              
                    {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'Yes', onPress: () => {        
                      myData.splice(this.props.index, 1); 
                      //Refresh FlatList ! 
                      this.props.parentFlatList.refreshFlatList(deletingRow);
                    }},
                  ],
                  { cancelable: true }
                ); 
          }, 
          text: 'Reject', type: 'delete' 
      }
  ],  
  rowId: this.props.index, 
  sectionId: 1    
};             
   
    return (
      <Swipeout {...swipeSettings}>
         <TouchableOpacity style={{backgroundColor:this.state.mau,
         borderBottomColor:'#fff',
         borderBottomWidth: 1,
        }}
          //  onPress={this.props.onPress} 
          //  disabled={this.state.show}                                      
             >
                 <View style={styles.jobcutom} >
                    <Image source={shipping} style={{ width: 40, height: 40 }}/>
                    <Text>Công Việc{` :  `+this.props.job} </Text>
                    <TouchableOpacity onPress={this.props.onPress} disabled={this.state.show} >
                        <Image source={backSpecial} style={{ width: 25, height: 25 }}/>                      
                    </TouchableOpacity>                       
                </View>
                <View style={styles.controlStyle}>
                        <TouchableOpacity style={styles.signInStyle} 
                          disabled={this.state.show}
                          onPress={this.AcceptJob} >
                            <Text style={ styles.activeStyle }>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signUpStyle} 
                          disabled={this.state.show}
                          onPress={this.RejectJob} >
                            <Text style={styles.activeStyle }>Reject</Text>
                        </TouchableOpacity>
                </View> 
         </TouchableOpacity>  
         </Swipeout>                               
    )}
}


// const { width } = Dimensions.get('window');
function mapStateToProps(state) {
  return { 
    myData: state.DataJob.Job,
      btnStatus: state.filterStatus
  };
}
export default connect(mapStateToProps)(JobTypeItems);

const styles = StyleSheet.create({
    // wrapper: { flex: 1, backgroundColor: '#fff' },
    wrapper_oder :{
     backgroundColor: '#1DA7FC',
    //  marginTop:15,
    borderBottomColor:'#fff',
    borderBottomWidth: 1,
   
    },
    jobcutom :{
      color :'#fff',
      marginHorizontal :10,
      marginTop : 5,
      padding : 10,
      borderRadius :2,
      flexDirection:'row',
       justifyContent: 'space-between',
       alignItems: 'center', 
    },

    controlStyle: {
        flexDirection: 'row',
       justifyContent: 'center',
       padding:5,
   
    },
    signInStyle: {
        backgroundColor: '#fff',
        alignItems: 'center',
    
        borderRadius :50,
        padding:10,
        marginRight:10
     
       
    },
    signUpStyle: {
       backgroundColor: '#fff',
        alignItems: 'center',
     
        borderRadius :50,
        padding:10,
        marginRight:10
    },
    activeStyle: {
        color: '#0D4C8F'
    },
    header:{
       backgroundColor:'#27B397',
       padding:20,
       justifyContent: 'center',
        alignItems: 'center'
    },
    text_header:{
      alignItems: 'center',
      color:'#fff'
    }


    




    // header: { flex: 1, backgroundColor: '#2ABB9C', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    // headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
    // backIconStyle: { width: 30, height: 30 },
    // body: { flex: 10, backgroundColor: '#F6F6F6' },
    // orderRow: {
    //     height: width / 3,
    //     backgroundColor: '#FFF',
    //     margin: 10,
    //     shadowOffset: { width: 2, height: 2 },
    //     shadowColor: '#DFDFDF',
    //     shadowOpacity: 0.2,
    //     padding: 10,
    //     borderRadius: 2,
    //     justifyContent: 'space-around'
    // }
});