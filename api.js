import {
  AsyncStorage
  
} from 'react-native';
import constants from './constants';

const Api = {
  
  async updateAssetForUser(asset, username, token) {
    let config = {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'x-access-token': token
        },
        body: JSON.stringify({
            username: username,
            asset: asset
        })
    };
    let result = await fetch("https://seekerdnasecure.co.za:3002/updateasset", config);
    let json = await result.json();
    if (result.status >= 200 && result.status <= 299) {
          
        return json.assets;        
      } else {
        throw new Error("status" + json.errorMessage);
      }

  },
  async addAssetForUser(asset, username, token) {
    let config = {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'x-access-token': token
        },
        body: JSON.stringify({
            username: username,
            asset: asset
        })
    };
    let result = await fetch("https://seekerdnasecure.co.za:3002/addasset", config);
    
    if (result.status >= 200 && result.status < 300) {       
        //handle success              
        return;        
      } else {        
        let error = result;
        throw error;
      }

  },
  async getAssetsForUser(username, token) {
    
    try {
      //Alert.alert("getAssets", "some text");
      let response = await fetch('https://seekerdnasecure.co.za:3002/assets', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify({username: username})
      });
      let res = await response.json();
      //await AsyncStorage.setItem(JSON.stringify("assets", res.assets));
     
      if (response.status >= 200 && response.status < 300) {       
        //handle success        
        return res.assets;        
      } else {        
        let error = res;
        throw error;
      }
    }
    catch(error) {
      console.log("api.getAssets: " + error.message);
      alert(error);
    }
  }  
}
export default Api;