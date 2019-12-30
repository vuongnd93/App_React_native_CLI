import * as React from 'react';
import { Text, View, StyleSheet, Image,
  Button,Alert,TouchableOpacity,ScrollView,
  Dimensions,StatusBar,TextInput,Modal,TouchableHighlight,
  AsyncStorage
 } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import Check from '../assets/check.png';
import shipping from '../assets/shipping.jpg';
import { STARTLVC } from '../redux/actionCreators';




 class JobTypeItems extends React.Component {
    constructor(props){
     super(props)
     this.state = {
      activeRowKey: null,
      show: false,
      hideReject: false,
      mau:'#fff',
    }; 
 }
    static navigationOptions = ({navigation})=>{
      return { 
        title : 'List công việc'    
      }    
     };


   _oncheckJob = async () => {
    Alert.alert(
      'Đồng ý! Nhận công việc',
      '',
      [
        { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress:() =>this._onCheckOK()},
      ],
      { cancelable: false },
    );
  }
  _onCheckOK(){
    // const { params } = this.props.navigation.state;
    // const order_detail_item = params.item;
    // const Oder_detail_id= params.item.Oder_detail_id;
    // const oder_state='START'
    const P_DEL_ID = 452208;
    const P_START_BY='haile';
    this.props.STARTLVC(P_DEL_ID,P_START_BY);
    // this._onPutLocation();
    // this.OnPostServer();
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
         <TouchableOpacity  onPress={this.props.onPress} disabled={this.state.show}
        style={{backgroundColor:this.state.mau,
        borderRadius: 5,
        shadowColor: 'rgb(255, 0, 255)',
        shadowOpacity: 0.5,
        shadowRadius:20 ,
        shadowOffset:{width:0,height:0},
        marginBottom: 1,
        padding:5,
        marginHorizontal:10,
        marginVertical: 10,
        borderLeftColor: '#6495ed',
        borderLeftWidth: 10,

        }}
          //  onPress={this.props.onPress} 
          //  disabled={this.state.show}                                      
             >
                 <View style={styles.jobcutom} >
                    <Image source={shipping} style={{ width: 60, height: 60 }}/>
                      <View>
                        <Text style={styles.textstyle}>Vận chuyển: {this.props.method}</Text>
                        <Text style={styles.textstyle}>Số xe: {this.props.car_number}</Text>
                        <Text style={styles.textstyle}>Từ: {this.props.timestart}</Text>
                        <Text style={styles.textstyle}>Đến:{this.props.timeend}</Text>
                       
                      </View>
                    <TouchableOpacity 
                    onPress={() => { this._oncheckJob() }}
                    style={styles.check_style}
                     >
                     {(this.props.myData.status==='P')?<Image source={Check} style={{width: 25, height: 25,}}/>:null}                                  
                    </TouchableOpacity>                       
                </View>
                {/* <View style={styles.controlStyle}>
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
                </View>  */}
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
export default connect(mapStateToProps,{STARTLVC})(JobTypeItems);

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
      marginHorizontal :5,
      marginTop : 5,
      paddingVertical:15,
      borderRadius :2,
      flexDirection:'row',
       justifyContent: 'space-between',
       justifyContent: 'space-around', 
      //  alignItems: 'center', 
    },
    textstyle:{
      marginBottom:10,
    },
    check_style:{
       borderColor:'#2196F3',
       borderWidth:1,
       width:27,
       height:27,
       borderRadius:50,
      
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

});