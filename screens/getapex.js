import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from 'react-native';
import { Constants,  } from 'expo';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { AuthSession } from 'expo';
import * as FileSystem from 'expo-file-system';
// import RNFetchBlob from 'rn-fetch-blob'
import axios from 'axios';
// import {RNFS} from 'react-native-fs';

const redirectUrl ='http://221.133.17.20:3030/api/upimage';
const getApex = 'http://118.70.197.124/ords/retail/delivery/putimage';

export default class Upimage  extends React.Component {
  static navigationOptions = ({navigation})=>{
    return {
      title : navigation.getParam('del_id')
     
    }
   
   };
  state = {
    image: null,
    uploading: false,
    paramsup : this.props.navigation.state.params.del_id,
  };

  render() {
    const {params}= this.props.navigation.state
    let {
      image
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />

        <Text
          style={styles.exampleText}>
          Example: Upload ImagePicker result
        </Text>

        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />

        <Button onPress={this._takePhoto} title="Take a photo" />

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
        <TouchableOpacity
        style={styles.button}
        onPress={() => this.props.navigation.navigate('maplocation', {thamso: params.del_id})}
     >
       <Text style={styles.buttonText}> VIEW MAP LOCATION + {params.del_id}</Text>
       </TouchableOpacity>
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

    return (
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
      console.log(pickerResult.uri)
    }
  };

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

      this._handleImagePicked(pickerResult);
      
      // console.log(pickerResult.uri)
    }
  };
  
  async uploadImageAsync(URI){

    const DEL_ID = this.state.paramsup;
    let apiUrl = 'http://118.70.197.124/ords/retail/delivery/putimage';
    // let apiUrl = 'http://221.133.17.20:3030/api/upimage';
    // let options = { encoding: FileSystem.EncodingType.Base64 };
    let options = { encoding: FileSystem.EncodingType.Base64 };
    let dataBase64 = '';
    await FileSystem.readAsStringAsync(URI, options).then(data => {
            dataBase64 = 'data:image/jpg;base64' + data;
            var BASE64_MARKER = ';base64,';

            let arr =  function convertDataURIToBinary(dataBase64) {
                var base64Index = dataBase64.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
                var base64 = dataBase64.substring(base64Index);
                var raw = window.atob(base64);
                var rawLength = raw.length;
                var array = new Uint8Array(new ArrayBuffer(rawLength));

                for(i = 0; i < rawLength; i++) {
                  array[i] = raw.charCodeAt(i);
                }
                return array;
              }
            
        }).catch(err => {
            console.log("​getFile -> err", err);
            reject(err) ;
        });
        console.log('data=:',dataBase64);
        console.log(arr);
    let uriParts = URI.split('.');
    let fileType = uriParts[uriParts.length - 1];  
    let formData = new FormData();
    
    // formData.append('photo', { 
    //   URI,    
    //   name: `photo.${fileType}`,
    //   type: `image/${fileType}`,
    // });
  
    // console.log(formData);
    axios(apiUrl, { 
      method: 'PUT',
      params : {P_DEL_ID: DEL_ID},         
      data: dataBase64,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }).then(
      response => {
        console.log('success up image to server apex ')
        //  console.log(response)
        console.log(response.data)
        // console.log("response" +JSON.stringify(response));

      }
      ).catch(err => {
      console.log('err ')
      console.log(err)
    } )
}


  _handleImagePicked = async pickerResult => {
    // const DEL_ID = this.props.navigation.state.params.del_id;
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true
      });

      if (!pickerResult.cancelled) {
        uploadResponse = this.uploadImageAsync(pickerResult.uri);
        // uploadResult = uploadResponse.json();
        // this.setState({
        //   image: uploadResult.location
        // });
      }
      console.log({ uploadResponse });
      alert('Upload success, okok :(');
    } catch (e) {
      console.log({ uploadResponse });
      // console.log({ uploadResult });
      // console.log({ e });
      // alert('Upload success, okok :(');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };

    

  
  // uploadImageAsync = (uri) => {
  //   let apiUrl = 'http://221.133.17.20:3030/api/upimage';
  //     let uriParts = uri.split('.');
  //     let fileType = uriParts[uriParts.length - 1];
  //      let formData = new FormData();
  //         formData.append('photo', {
  //            uri,
  //           name: `photo.${fileType}`,
  //            type: `image/${fileType}`,
  //        });
  
  //     fetch(apiUrl, {  
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'multipart/form-data'
  //       },
  //       method: 'POST',
  //       body:formData,
  //     }).then(
  //       response => {
  //         console.log('succ cesss ')
  //         console.log(response)
  //       }
  //       ).catch(err => {
  //       console.log('err ')
  //       console.log(err)
  //     } )
  //  }


}
// async function uploadImageAsync(uri) {
//   // const DEL_ID = this.state.paramsup;
//   // let apiUrl = 'http://118.70.197.124/ords/retail/delivery/putimage';
//   let apiUrl = 'http://221.133.17.20:3030/api/upimage';

//   let uriParts = uri.split('.');
//   let fileType = uriParts[uriParts.length - 1];
//   let formData = new FormData();
//   formData.append('photo', {
//     uri,
//     name: `photo.${fileType}`,
//     type: `image/${fileType}`,
//   });

//   let options = {
//     method: 'post',
//     // params : {P_DEL_ID: 100},
//     body: formData,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//     },
//   };

//   return fetch(apiUrl, options);
// }



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});