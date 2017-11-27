import React,{Component} from 'react';
import {View,Text,TextInput,Button} from 'react-native'
import {Container,Content} from 'native-base'
import firebase from 'firebase'
import {connect} from 'react-redux'
import {Message} from '../store/actions/message'

const mapStateToProps=(state)=>({state:state})
class DisplayChat extends Component{
    constructor(props){
        super(props);
        this.state={message:""}
        this.send=this.send.bind(this)
    }
    send(uid,message){
        var myID=firebase.auth().currentUser.uid
        firebase.database().ref("user").child(uid)
        .child("MyChats").child(myID).push({[firebase.auth().currentUser.displayName]:message})
        .then(()=>{
            firebase.database().ref("user").child(myID).child("MyChats").child(uid).
            push({[firebase.auth().currentUser.displayName]:message})
        },(error)=>{console.log("message rejected", error)})
    }
    componentWillMount(){
        Message.MessageReq(this.props.navigation.state.params.uid,this.props.navigation.state.params.name)
    }
    render(){
        console.log("uid sent",this.props.navigation.state.params.uid)
        return(
            <View>{console.log(this.state.message)}
            <TextInput onChangeText={(text)=>{this.setState({message:text})}}/>
            <Button title="send" onPress={()=>this.send(this.props.navigation.state.params.uid,this.state.message)}/>
            </View>
        // <View>
        // <Text>chats</Text>
        // </View>
        )
    }
}

export default connect(mapStateToProps)(DisplayChat)