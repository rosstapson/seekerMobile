/*jshint esversion: 6 */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 10
  },
  assetSmall: {
    minHeight: 70,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8
  },
  assetSmallTextBox: {
    
  },
  assetSmallThumbnail: {
    alignItems: 'flex-end'
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
    marginTop: 20,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 25,
    color: '#FFF',
    alignSelf: 'center'
  },
  cameraPreview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cameraCapture: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  heading: {
    alignSelf: 'center',    
    fontSize: 35    
  },
  headingContainer : {
    backgroundColor: '#48BBEC',
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'stretch'
  },
  iconButton : {
    backgroundColor: '#48BBEC'
  },
  label: {
    paddingTop: 20,
    alignSelf: 'center',
    fontSize: 25
  },
  navbar: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8
  },
  navButton: {
    flexDirection: 'row',
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 6,
    justifyContent: 'space-around',
    width: 60
  },
  required: {
    color: 'red',
    fontSize: 20,
    
  },
  textBold: {
    fontWeight: 'bold'
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
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