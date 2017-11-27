import store from '../'
import firebase from 'firebase';
import {NavigationActions} from 'react-navigation'

export class Message{
    static MessageReq=(uid,name)=>{
        store.dispatch(Message.Message())
        var currentUser=firebase.auth().currentUser.uid
        firebase.database().ref("user").child(currentUser)
        .child("MyChats").child(uid).on("value",(snap)=>{
            var Messages=snap.val()
            var val=Object.values(Messages)
            console.log("messageRetrvd", Object.values(Messages))
        store.dispatch(Message.MessageSuccess(val))
        },
    (error)=>{
        store.dispatch(Message.MessageFail(error))
    }
    )
        
    }
    static Message = () => ({
        type: "FetchMSG"
    })
    static MessageSuccess = (payload) => ({
        type: "FetchMSG_SUCCESS",
        payload: payload
    })
    static MessageFail = (payload) => ({
        type: "FetchMSG_FAILED",
        payload: payload
    })
}