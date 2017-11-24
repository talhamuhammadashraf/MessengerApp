import React,{Component} from 'react';
import {View,Text,Button} from 'react-native'
import {connect} from 'react-redux';
import {Authentication} from '../store/actions/auth'
const mapStateToProps=(state)=>({
state:state
})
const mapDispatchToProps=(dispatch)=>({
})
class Settings extends Component{
    render(){
        return(
            <View>
        <Button title="Logout" onPress={()=>Authentication.logout()}/>
            </View>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Settings)