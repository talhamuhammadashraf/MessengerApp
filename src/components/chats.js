import React ,{Component} from 'react'
import {View,Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import {Spinner,Container,Content,Right,List,ListItem ,Button,Body,Left} from "native-base"
import {Chat} from '../store/actions/chat'
import {connect}  from 'react-redux';
import firebase from 'firebase'
const mapStateToProps=(state)=>({
state:state.Chat
})
class MyChats extends Component{
componentWillMount(){
    Chat.MyChatReq()
}
    render(){
        return(
            <Container>
            <Content>
            <List>
            {this.props.state.myChats?this.props.state.myChats.map((data,index)=>{
                    return <ListItem style={{marginLeft:-3}} key={index}>
                    <Left>
                    <Text style={{marginLeft:4}}>
                    {data.name}
                    </Text>
                    </Left>
                    <Body/>
                    <Right>
                    <Button transparent
                    onPress={()=>this.props.navigation.navigate("msg",{uid:data.UID,name:data.name})}>
                    <Icon name="ios-chatbubbles" size={30} color="#137777"/>
                    </Button>
                    </Right>
                    </ListItem>
                }):<Spinner/>}
            </List>
            </Content>
            </Container>
            // <View>
            // <Text>my chats</Text>
            // </View>
        )
    }
}export default connect(mapStateToProps)(MyChats)