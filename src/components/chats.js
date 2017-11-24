import React ,{Component} from 'react'
import {View,Text} from 'react-native';
import {Chat} from '../store/actions/chat'

class MyChats extends Component{
componentWillMount(){
    Chat.MyChatReq()
}
    render(){
        return(
            <View>
            <Text>chats</Text>
            </View>
        )
    }
}export default MyChats