import React ,{Component} from 'react'
import {View,Text} from 'react-native';
import {Spinner,Container,Content,List,ListItem ,Button} from "native-base"
import {Chat} from '../store/actions/chat'
import {connect}  from 'react-redux'
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
                    return <ListItem style={{marginLeft:-3}} key={index}><Text style={{marginLeft:4}}>{data.name}</Text>
                    <Button onPress={()=>this.props.navigation.navigate("msg",{uid:data.UID,name:data.name})}><Text>chat</Text></Button>
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