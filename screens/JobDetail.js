import * as React from 'react';
import {
  Text, View, StyleSheet, Image,
  Alert, TouchableOpacity, ScrollView,
  Dimensions, StatusBar, TextInput, AsyncStorage,
  ActivityIndicator,
} from 'react-native';
// import * as Permissions from 'expo-permissions';
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
import { connect } from 'react-redux';
import AddModal from '../components/addmodal';
import axios from 'axios';
import Button from 'react-native-button';
import { START, END, ToggleBtn } from '../redux/actionCreators';




class JobDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myData: '',

    }
    this._onPressAdd = this._onPressAdd.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitle = 'Detail';
    let headerTitleStyle = { color: 'red' };
    let headerRight = (<Button
      containerStyle={{ margin: 5, padding: 10, borderRadius: 10, backgroundColor: 'darkviolet' }}
      style={{ fontSize: 15, color: 'white' }}
      onPress={() => {
        // params.onsave();
      }}
    >
      save
       </Button>);
    let headerBackTitle = 'Back';
    return {
      headerTitle, headerTitleStyle, headerRight, headerBackTitle,
    }
  };


  //  componentWillMount() {
  // }
  // componentDidMount() {
  //   this.props.navigation.setParams({ onsave: this._onsave.bind(this), isSaving: false });
  // }

  clearAsyncStorage = async() => {
    AsyncStorage.clear();
}
  _getStatusOder(){
    const { params } = this.props.navigation.state;
    // const oder_detail_item = params.item;  
    let oder_detail_id = params.oder_detail_id;
    let myData=this.props.myData;
   let status= "";
       myData.map(e=>{
        e.oder_detail.map(e1=>{
          if(e1.Oder_detail_id==oder_detail_id){
               status=e1.status 
          }              
        });     
      });
    return status;
  }
  _onPutLocation(){
    setInterval(() => {
      console.log('put location to server');
     }, 3000);
  }
  _onsave() {
    //  console.log('save success');

    if (this.props.navigation.state.params.isSaving == true) {
      return;
    }
    //do some task about 3s
    this.props.navigation.setParams({ isSaving: true });
    setInterval(() => {
      // console.log('finish task in 3s');
      // this.setState({
      //   btnStartEndName: 'COMPLETED',
      // });
      this.props.navigation.setParams({ isSaving: false });
    }, 3000);

  }
  _onStartOK(){
    const { params } = this.props.navigation.state;
    const order_detail_item = params.item;
    const Oder_detail_id= params.item.Oder_detail_id;
    const oder_state='START'
    this.props.START(Oder_detail_id,oder_state);
    this._onPutLocation();
  }
  _onStartJob = async () => {
    Alert.alert(
      'Đồng ý! Bắt đầu công việc',
      '',
      [
        { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress:() =>this._onStartOK()},
      ],
      { cancelable: false },
    );
  }


  // _takePhoto = async () => {
  //   const {
  //     status: cameraPerm
  //   } = await Permissions.askAsync(Permissions.CAMERA);

  //   const {
  //     status: cameraRollPerm
  //   } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  //   // only if user allows permission to camera AND camera roll
  //   if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
  //     let pickerResult = await ImagePicker.launchCameraAsync({
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //     });

  //     this._handleImagePicked(pickerResult);
  //   }
  // };

  // _handleImagePicked = async pickerResult => {
  //   // const DEL_ID = this.props.navigation.state.params.del_id;
  //   let uploadResponse, uploadResult;

  //   try {
  //     this.setState({
  //       uploading: true
  //     });

  //     if (!pickerResult.cancelled) {
  //       uploadResponse = this.uploadImageAsync(pickerResult.uri);
  //     }
  //     console.log({ uploadResponse });
  //     alert('Upload success, okok :(');
  //   } catch (e) {
  //     console.log({ uploadResponse });
  //   } finally {
  //     this.setState({
  //       uploading: false
  //     });
  //   }
  // };

  // async uploadImageAsync(URI) {

  //   let apiUrl = 'http://118.70.197.124/ords/retail/delivery/putimage';

  //   let uriParts = URI.split('.');
  //   let nameimage = URI.split('/');
  //   let filename = nameimage[nameimage.length - 1];
  //   // let uriParts = uri.split('/');    
  //   let fileType = uriParts[uriParts.length - 1];
  //   let formData = new FormData();

  //   // URI = URI.replace("file://", "");
  //   console.log('Hoang');

  //   let options = { encoding: FileSystem.EncodingType.Base64 };
  //   let dataBase64 = ''
  //   await FileSystem.readAsStringAsync(URI, options).then(data => {
  //     dataBase64 = data;
  //   }).catch(err => {
  //     console.log("​getFile -> err", err);
  //     reject(err);
  //   });
  //   let dataByte = this.convertToByteArray(dataBase64);
  //   console.log(dataByte);

  //   // formData.append('photo', {
  //   //   URI,
  //   //   name: `photo.${fileType}`,
  //   //   // filename :filename,
  //   //   type: `image/${fileType}`,
  //   // });
  //   // formData.append('Content-Type', 'image/png');
  //   // console.log(formData);

  //   axios(apiUrl, {
  //     method: 'PUT',
  //     params: { P_DEL_ID: '100' },
  //     data: dataByte,
  //     headers: {
  //       Accept: 'application/json',
  //       // 'Content-Type': 'multipart/form-data',
  //     },
  //   }).then(
  //     response => {
  //       console.log('success up image to server apex ')
  //       //  console.log(response)
  //       console.log(JSON.stringify(response))
  //       // console.log("response" +JSON.stringify(response));

  //     }
  //   ).catch(err => {
  //     console.log('err ')
  //     console.log(err)
  //   })
  // }

  // convertToByteArray(input) {
  //   var binary_string = this.atob(input);
  //   var len = binary_string.length;
  //   var bytes = new Uint8Array(len);
  //   for (var i = 0; i < len; i++) {
  //     bytes[i] = binary_string.charCodeAt(i);
  //   }
  //   return bytes
  // }

  // atob(input) {
  //   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  //   let str = input.replace(/=+$/, '');
  //   let output = '';

  //   if (str.length % 4 === 1) {
  //     throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
  //   }
  //   let bc = 0, bs = 0, buffer, i = 0

  //   for (let bc = 0, bs = 0, buffer, i = 0;
  //     buffer = str.charAt(i++);

  //     ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
  //       bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  //   ) {
  //     buffer = chars.indexOf(buffer);
  //   }

  //   return output;
  // }




  _onPressAdd() {
    this.refs.addModal.showAddModal();
  }
  // onStatusOder(){
  //   const { params } = this.props.navigation.state;
  //   const oder_detail_item = params.oder_detail_id;
  //   // const { btnStatus, myData } = this.state.myData;
  //   const myData=this.state.myData;
  //  let status= "";
  //      myData.map(e=>{
  //       e.oder_detail.map(e1=>{
  //         if(e1.Oder_detail_id==oder_detail_item){
  //              status=e1.status 
  //         }              
  //       });     
  //     });
  //     console.log('#jobDetatil.e1.status',status);
  //     return status
     
  // }

  render() {

    const { params } = this.props.navigation.state;
    const oder_detail_item = params.item;
    // const { params } = this.props.navigation.state;
    let order_id = params.order_id;
    // const { btnStatus, myData } = this.state.myData;
    let myData=this.props.myData;
   let status= "";
       myData.map(e=>{
        e.orders.map(e1=>{
          if(e1.order_id==order_id){
               status=e1.status 
          }              
        });     
      });
    // console.log('#jobdetail: status_curent:',status);
    // let mainView = (params && params.isSaving == true) ? <ActivityIndicator /> :
    return (
      <View style={styles.wrapper}>

        <View style={styles.content}>
          <View style={styles.contentdetail}>
            <Text style={styles.oder_infor}>Đơn Hàng:</Text>
            <Text style={styles.oder_infor}>{oder_detail_item.đơn_hàng}</Text>
          </View>
          <View style={styles.contentdetail}>
            <Text style={styles.oder_infor}>Tên Khách Hàng:</Text>
            <Text style={styles.oder_infor}>{oder_detail_item.namecustom}</Text>
          </View>
          <View style={styles.contentdetail}>
            <Text style={styles.oder_infor}>Số điện thoại liên hệ:</Text>
            <Text style={styles.oder_infor}>{oder_detail_item.SĐT}</Text>
          </View>
          <View style={styles.address}>
            <Text style={styles.oder_infor}>Địa chỉ giao Hàng:</Text>
            <Text style={styles.oder_infor}>{oder_detail_item.address}</Text>
          </View>
          <View style={styles.contentdetail}>
            <Text style={styles.oder_infor}>Trạng thái thanh toán</Text>
            <Text style={styles.oder_infor}>{oder_detail_item.thanhtoan}</Text>
          </View>
          <View style={styles.controlStyle}>
            <TouchableOpacity style={styles.signInStyle}
              onPress={() => this.props.navigation.navigate('EventComponent', { oder_detail_id:oder_detail_item.Oder_detail_id })}>
              <Text style={styles.activeStyle}>Sự Kiện</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signUpStyle}
              disabled={
                (status==='INACTIVE')?false:
                (status==='PROCESSING')|(status==='COMPLETED')?true:false
                
               }
              onPress={() => { this._onStartJob() }} >
              <Text style={styles.activeStyle}>{
                (status === 'INACTIVE') ? 'START' :
                (status === 'PROCESSING')?'PROCESSING':'COMPLETED'
                // (status === 'COMPLETED'?'COMPLETED'
              }</Text>
            </TouchableOpacity>
              
          </View>
          <AddModal ref={'addModal'}>
          </AddModal>
        </View>
        <View style={styles.sukien}>

          <TextInput
            style={styles.inputStyle}
            placeholder="Nhập sự cố trên đường đi"
            value={styles.email}
            onChangeText={text => this.setState({ email: text })}
          />
          <TouchableOpacity style={styles.bigButton} onPress={this._takePhoto} >
            <Text style={styles.buttonText}>Take_photo</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.bigButton} onPress={this.clearAsyncStorage} >
                <Text style={styles.buttonText}>Test_clear_cache</Text>
           </TouchableOpacity> */}
          

        </View>

      </View>
    )

    // return (
    //   mainView
    //   //  <AddModal ref={'addModal'}>

    //   //  </AddModal>                                                      
    // )
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

export default connect(mapStateToProps, { START, END, ToggleBtn })(JobDetail);

const styles = StyleSheet.create({
  wrapper: {
    flex: 4,
    backgroundColor: '#DD3C6E',
  },
  content: {
    flex: 3,
    backgroundColor: '#EF6193',
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  sukien: {
    flex: 1,
    backgroundColor: '#4095D1',
  },
  contentdetail: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    paddingVertical: 10


  },
  address: {
    flexDirection: 'column',
    marginBottom: 5,
  },
  oder_infor: {
    color: '#fff',

  },
  controlStyle: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 50,

  },
  signInStyle: {
    backgroundColor: '#D8CB00',
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginRight: 10
  },
  signUpStyle: {
    backgroundColor: '#D8CB00',
    paddingVertical: 15,
    alignItems: 'center',
    flex: 1,
    marginLeft: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20
  },
  inputStyle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 5,
    // flex: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 20

  },
  bigButton: {
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 100,
    backgroundColor: '#33BB79',
    marginTop: 5,


  },
  buttonText: {
    // fontFamily: 'Avenir',
    color: '#fff',
    fontWeight: '400'
  },

});