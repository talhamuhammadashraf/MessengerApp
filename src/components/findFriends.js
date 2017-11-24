import Icon from "react-native-vector-icons/MaterialIcons"
import React,{Component} from 'react';
import {View,Text} from 'react-native';
import {Spinner,Container,Button,Content,List,ListItem} from 'native-base'
import {connect} from 'react-redux';
import {Chat} from '../store/actions/chat'
const mapStateToProps=(state)=>({
state:state
})
class FindFriends extends Component{
    componentDidMount(){
Chat.findAll()
    }
    render(){
        return(
  
            <Container>
            <Content>
            <List>
            {this.props.state.Chat.members?this.props.state.Chat.members.map((data,index)=>{
                return (<ListItem key={index} style={{marginLeft:-3}}><Text style={{marginLeft:4}}>{data.name}</Text>
                    <Button transparent onPress={()=>Chat.AddReq(data.UID)}><Icon size={30} color="#137777" name="add"/></Button>
                    </ListItem>)}):<Spinner/>}            
            </List>
            </Content>
            </Container>
        )
    }
} export default connect(mapStateToProps)(FindFriends)