
import * as React from 'react';
import {
    Text, View, StyleSheet, Image
    , Alert, TouchableOpacity, ScrollView,
    Dimensions, StatusBar, TextInput, Modal,
    FlatList, RefreshControl,dismiss, TouchableWithoutFeedback,Keyboard, 
} from 'react-native';
// import * as Permissions from 'expo-permissions';
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
import { connect } from 'react-redux';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
// import { CheckBox } from 'react-native-elements';
import Button from 'react-native-button';


const redirectUrl ='http://221.133.17.20:3030/api/upimage';
const getApex = 'http://118.70.197.124/ords/retail/delivery/putimage';






class EventOnGo extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
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
    
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerTitle = 'Sự kiện';
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

    //select image from camera roll
    _pickImage = async () => {
        const {
          status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
        // only if user allows permission to camera roll
        if (cameraRollPerm === 'granted') {
          let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
          });
          Alert.alert(
            'Ảnh lựa chọn ',
            '',
            [
              { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress:() =>this._handleImagePicked(pickerResult)},
            ],
            { cancelable: false },
          );
        //   this._handleImagePicked(pickerResult);
          
          // console.log(pickerResult.uri)
        }
      };

      _handleImagePicked = async pickerResult => {
        // const DEL_ID = this.props.navigation.state.params.del_id;
        let uploadResponse, uploadResult;
    
        try {
          this.setState({
            uploading: true
          });
    
          if (!pickerResult.cancelled) {
            uploadResponse = this.uploadImageAsync(pickerResult.uri);
          }
          console.log({ uploadResponse });
        //   alert('Upload success, okok :(');
        } catch (e) {
          console.log({ uploadResponse });
        } finally {
          this.setState({
            uploading: false
          });
        }
      };

      async uploadImageAsync(URI) {

        let apiUrl = 'http://118.70.197.124/ords/retail/delivery/putimage';
    
        let uriParts = URI.split('.');
        let nameimage = URI.split('/');
        let filename = nameimage[nameimage.length - 1];
        // let uriParts = uri.split('/');    
        let fileType = uriParts[uriParts.length - 1];
        let formData = new FormData();
    
        // URI = URI.replace("file://", "");
        console.log('Hoang');
    
        let options = { encoding: FileSystem.EncodingType.Base64 };
        let dataBase64 = ''
        await FileSystem.readAsStringAsync(URI, options).then(data => {
          dataBase64 = data;
        }).catch(err => {
          console.log("​getFile -> err", err);
          reject(err);
        });
        let dataByte = this.convertToByteArray(dataBase64);
        console.log(dataByte);
    
        // formData.append('photo', {
        //   URI,
        //   name: `photo.${fileType}`,
        //   // filename :filename,
        //   type: `image/${fileType}`,
        // });
        // formData.append('Content-Type', 'image/png');
        // console.log(formData);
    
        axios(apiUrl, {
          method: 'PUT',
          params: { P_DEL_ID: '100' },
          data: dataByte,
          headers: {
            Accept: 'application/json',
            // 'Content-Type': 'multipart/form-data',
          },
        }).then(
          response => {
            console.log('success up image to server apex ')
            //  console.log(response)
            console.log(JSON.stringify(response))
            // console.log("response" +JSON.stringify(response));
    
          }
        ).catch(err => {
          console.log('err ')
          console.log(err)
        })
      }
    
      convertToByteArray(input) {
        var binary_string = this.atob(input);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
          bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes
      }
    
      atob(input) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    
        let str = input.replace(/=+$/, '');
        let output = '';
    
        if (str.length % 4 === 1) {
          throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        let bc = 0, bs = 0, buffer, i = 0
    
        for (let bc = 0, bs = 0, buffer, i = 0;
          buffer = str.charAt(i++);
    
          ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
        ) {
          buffer = chars.indexOf(buffer);
        }
    
        return output;
      }
    
      OnPostServer(){
          Alert.alert('Sen event to server success');
      }
     
    

    onHandlechange = (e) => {
        let options='';
        let checked = boolean;
        Alert.alert('get value on checked: '+e.target.Text);
        }
    CheckMe = (option) => {
        // const selectedCheckbox = new Array();
        // selectedCheckbox.push(optionOld+optionNew);
        // console.log('selectedCheckbox: ', optionOld);
            this.setState({selectedCheckbox: option}); // update selected item
     }; 
    

    render() {

        const { btnStatus, myData } = this.props;
        const { checkboxValue, selectedCheckbox } = this.state;
        console.log(this.state.event);
        // console.log(this.state.selectedCheckbox.label);
        // const name = "Sự Kiện";
        // const values= ["Hết xăng"];
      
        return (
            <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
            <View style={styles.wrapper}>
                 <View style={styles.area_first}>
               
                 </View>
                 <View style={styles.area_two}>
                    {checkboxValue.map(option=>{
                        // const checked= selectedCheckbox.includes(option.value);
                        return(<CheckBox
                            key={option.value}
                            title={option.label}               
                            checked={option.value === selectedCheckbox.value}
                            // checked={checked}
                            onPress={()=>{this.CheckMe(option)}}
                          />)                      
                    })}
                     <TextInput
                        value={this.state.event}
                        keyboardType = 'email-address'
                        onChangeText={(event) => this.setState({ event })}
                        placeholder='Nhập sự kiện khác'
                        placeholderTextColor = '#a9a9a9'
                        style={styles.input}
                        />
                    <TouchableOpacity style={styles.bigButton} onPress={this._pickImage} >
                        <Text style={styles.buttonText}>Select Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.save_event} onPress={this.OnPostServer} >
                        <Text style={styles.save_Text}>Gửi Sự kiện</Text>
                    </TouchableOpacity>

                 </View>
                 <View style={styles.area_three}>
                      <TouchableOpacity style={styles.MapView}
                      onPress={() => this.props.navigation.navigate('ShowMapView')} >
                        <Text style={styles.MapViewText}>MapView</Text>
                    </TouchableOpacity>
               
                 </View>
               
            </View>
            </TouchableWithoutFeedback>

        )
    }
}

function mapStateToProps(state) {
    return {
        myData: state.DataJob.Job,
        error: state.DataJob.error,
        isLoading: state.DataJob.isLoading,
        btnStatus: state.filterStatus
    };
}
export default connect(mapStateToProps )(EventOnGo);

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#fff' },
    area_first:{
        flex:10,
        backgroundColor:'#9932cc'
    },   
    area_two:{
        flex:80,
        backgroundColor:'#fffaf0'
    },
  
    area_three:{
        flex:10,
        backgroundColor:'#9400d3',
        alignItems: 'center',
    },
    input: {
        // width: 200,
        // fontFamily: 'Baskerville',
        fontSize: 16,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#6495ed',
        marginVertical: 10,
        marginHorizontal:10,
      },
      bigButton: {
        width: 100,
        height: 40,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: 100,
        marginLeft:10,
        backgroundColor: '#33BB79',
        marginTop: 5, 
      },
      buttonText: {
        // fontFamily: 'Avenir',
        color: '#fff',
        fontWeight: '400'
      },
      save_event:{
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 100,
        backgroundColor: '#8b008b',
        marginTop: 5, 
      },
      save_Text:{
        color: 'yellow',
        fontWeight: '400'
      },
      MapView:{
        width: 80,
        height: 40,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: 100,
        marginLeft:10,
        marginVertical: 10,
        backgroundColor: '#ff8c00',
        marginTop: 10,
        marginBottom:10, 
      },
      MapViewText:{
        color: '#fff',
      }

    // activeStyle: {
    //     flex: 90,
    //     marginHorizontal: 10,
    // },
    // header: {
    //     backgroundColor: '#27B397',
    //     padding: 20,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // text_header: {
    //     alignItems: 'center',
    //     color: '#fff'
    // },
    // view_button: {
    //     marginTop: 15,
    //     backgroundColor: '#29007B',
    //     marginHorizontal: 10,
    //     width: 130,
    //     height: 50,
    //     borderRadius: 20,
    //     paddingVertical: 9,
    //     marginBottom: 15,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // message: {
    //     color: 'blueviolet',
    //     fontSize: 30,
    //     alignItems: 'center',
    // },
    // view_message: {
    //     backgroundColor: '#fff',
    //     flex: 30,
    //     alignItems: 'center',
    // },
    // textGetjob: {
    //     color: 'yellow',
    //     fontSize: 15,
    // },
});