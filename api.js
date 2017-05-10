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
    
    if (result.status >= 200 && result.status < 300) {       
        //handle success              
        return;        
      } else {        
        let error = res;
        throw error;
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
        let error = res;
        throw error;
      }

  },
  async getAssetsForUser(username, token) {
    alert("username:" + username)
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