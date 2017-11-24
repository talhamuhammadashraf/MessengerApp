
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import store from './src/store';
import Routes from './Routes';
import { AppRegistry,View,Text } from 'react-native';
// import App from './src/components/App';
import {addNavigationHelpers} from 'react-navigation';
import {connect} from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';



setTimeout = BackgroundTimer.setTimeout.bind(BackgroundTimer)
setInterval = BackgroundTimer.setInterval.bind(BackgroundTimer)
clearTimeout = BackgroundTimer.clearTimeout.bind(BackgroundTimer)
clearInterval = BackgroundTimer.clearInterval.bind(BackgroundTimer)


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB2hCXu_HndpdSrhbEP6XobGT73nyTgJcs",
    authDomain: "react-prac-8e4a5.firebaseapp.com",
    databaseURL: "https://react-prac-8e4a5.firebaseio.com",
    projectId: "react-prac-8e4a5",
    storageBucket: "react-prac-8e4a5.appspot.com",
    messagingSenderId: "650862483596"
  };
  firebase.initializeApp(config);


class AppWithNavigationState extends React.Component{
    render(){
      return(
        <Provider store={store}>
        <Routes 
          navigation={addNavigationHelpers({
            dispatch : this.props.dispatch,
            state : this.props.navReducer
          })}
        />
        </Provider>      
      )
    }
  }
  
  const mapStateToProps = (state) => ({
    navReducer : state.navReducer
  });
  
  const NavigationRedux = connect(mapStateToProps)(AppWithNavigationState);
  
  
  export default class ChatApp extends Component {
    render() {
      return (
        <Provider store={store}>
          <NavigationRedux />
        </Provider>
      );
    }
  }

console.disableYellowBox = true;

AppRegistry.registerComponent('family_tracker_app', () => ChatApp);
