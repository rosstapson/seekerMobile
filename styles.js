/*jshint esversion: 6 */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
    marginTop: 10,
    alignSelf: 'auto',
    padding: 3,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button : {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    alignSelf: 'center',
    fontSize: 30
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
  ,
  loader: {
    marginTop: 20
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  }
});

export default styles;