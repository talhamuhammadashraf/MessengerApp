import React from 'react';
import { StackNavigator,TabNavigator } from 'react-navigation';
import {View,Text} from 'react-native';
import Login from "./src/components/login"
import Settings from "./src/components/settings"
import {Authentication} from './src/store/actions/auth'
import Register from "./src/components/register"
import MyChats from "./src/components/chats"
import DisplayChat from "./src/components/displayChat"
import findFriends from "./src/components/findFriends"
const MyHomeScreen =()=>(<View><Text>login</Text></View>)
const App =()=>(<View><Text>App</Text></View>)
const MyNotificationsScreen =()=>(<View><Text>signup</Text></View>)

const MyApp = TabNavigator({
    Settings: {
      screen: Settings,
    },
    "Find Friends": {
      screen: findFriends,
    },
    Chats: {
        screen: MyChats,
    },
  }, {
    tabBarPosition: 'top',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
      style:{
          backgroundColor:"#137777"
      }
    },
  });

const Routes = StackNavigator({

    login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    signup: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
    msg: {
        screen: DisplayChat,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.name}`,
            headerStyle:{backgroundColor:"#137777",
            
        }
          })        },
    Home: {
        screen: MyApp,
        navigationOptions: {
            header: null
        }
    }
});

export default Routes;