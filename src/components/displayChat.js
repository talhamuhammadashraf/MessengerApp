import React,{Component} from 'react';
import {View,Text,TextInput,StyleSheet,Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import firebase from 'firebase'
import {connect} from 'react-redux'
import {Message} from '../store/actions/message'
import {Container,ListItem,List,Content,Footer,Spinner,Input,Right,Left,Body,Item,Header,Button} from 'native-base';

const {width,height} =Dimensions.get("window")

const mapStateToProps=(state)=>({state:state.Message})

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
        // console.log("uid sent",this.props.navigation.state.params.uid)
        return(
            <Container style={{flex:1,flexDirection:"column"}}>
            <Content>
            <List>
            {this.props.state.MessageArray?this.props.state.MessageArray.map((data,index)=>
            (<ListItem key={index} style={{marginLeft:-3}}>
                <Text style={{marginLeft:4,color:"blue"}}>{Object.keys(data)}</Text>
                <Text>{"\n"}</Text>
                <Text style={{marginLeft:7}}>{Object.values(data)}</Text>
            </ListItem>)):
            <Spinner/>
            }
            </List>
            </Content>
            <Footer style={{backgroundColor:"transparent",marginBottom:0}}>
            
            
            <TextInput placeholder="Type Your Message" onChangeText={(text)=>{this.setState({message:text})}}
            style={{width:width*0.8}}
            />
            
            <Right>
            <Button onPress={()=>{this.send(this.props.navigation.state.params.uid,this.state.message);
            }} transparent>
            <Icon name="md-send" size={30} color="#137777"/>
            </Button>
            </Right>
            </Footer>
            </Container>
            
            //----------------------
        // <View>
        // <Text>chats</Text>
        // </View>
        )
    }
}

export default connect(mapStateToProps)(DisplayChat)