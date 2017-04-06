import {
  AsyncStorage
  
} from 'react-native';
import constants from './constants';

const Api = {
  async getAssetsForUser(username, token) {
    console.log("getAssetsForUser:" + username);
    console.log("token: " + token);
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
      console.log("api.getAssets: " + JSON.stringify(error));
    }
  }  
}
export default Api;