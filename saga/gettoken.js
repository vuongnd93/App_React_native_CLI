import axios from 'axios';


function* getNewToken(){
    const response = yield axios('https://hcerp.vn/ords/retail/oauth/token?grant_type=client_credentials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic dElYNG52TEJ3UndhN0xnTkZMT01vUS4uOkl5NFpOcFcwZzNudGdyNFRGczZKTFEuLg==`,
          },
          data: {
            grant_type: 'client_credentials',
            scope: 'test',
          },
      
    });   
    // console.log(response.data.access_token); 
    const token = response.data.access_token
    return token;
}

export const Token = {
    getNewToken
}; 