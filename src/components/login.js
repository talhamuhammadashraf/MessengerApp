import React ,{Component} from 'react';
import {View,StyleSheet,TouchableOpacity,Text,Dimensions} from 'react-native'
import {Authentication} from '../store/actions/auth'
import {Container, Header, Body,Content,Right, Button,Form, Item,Label, Input} from 'native-base'
import {connect} from 'react-redux';
// import firebase from 'firebase'
// import {Actions} from 'react-native-router-flux'
// import {Circle} from '../store/actions/circle'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/Ionicons';
const mapStateToProps=(state)=>({
    localState:state.Auth
})
const mapDispatchToProps=(dispatch)=>({
login:(user)=>Authentication.loginUser(user)    
})

const {width,height} = Dimensions.get("window")
class Login extends Component{
    constructor(){
        super();
        this.state={}
    }
    handle=()=>{
        let user={  email:this.state.email,
                    password:this.state.password
        }
        console.log("handleuser",user)
        this.props.login(user)
    }
componentWillMount(){
firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        this.props.navigation.navigate("Home")
    }
})
}
    render(){
        return(
            <Container style={styles.container}>
            <Content>
                <Form>
                    <Item floatingLabel style={styles.itemInput}>
                        <Input placeholder="Email" style={{color:"#137777"}}
                        keyboardType="email-address"
                        onChangeText={(email)=>{
                        this.setState({
                            email:email
                        })
                    }}
                    />
                    </Item>
                    <Item floatingLabel style={styles.itemInput}>
                        <Input placeholder="Password" style={{color:"#137777"}}
                        type="password" secureTextEntry={true}
                        onChangeText={(password)=>{
                        this.setState({
                            password:password
                        })
                    }}
                    />
                    </Item><Text>{"\n"}</Text>
                    <Button style={styles.button} 
                    onPress={this.handle.bind(this)} 
                    ><Text style={styles.buttonText}>Login</Text></Button>
                    <Text>{"\n"}</Text>
                    </Form>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("signup")}>
                    
                    <View style={{
                        
                        alignSelf:"center"
                        }}>
                    
                    <Text style={{
                        fontSize:17,
                        color:"#137777",}}>
                        Sign Up</Text>
                    </View>
                    </TouchableOpacity>
            </Content>
        </Container>

        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
const styles=StyleSheet.create({
    container:{
        width:width,
        justifyContent:"center",
        flexDirection:"row",
        alignItems:"center"
    },
    button:{
        justifyContent:"center",
        alignContent:"center",
        width:"75%",
        marginHorizontal:width/8,
        borderRadius:7,
        backgroundColor:"#137777",
    },
    itemInput:{
        width:"92%"
    },
    buttonText:{
        color:"white"        
    }
})