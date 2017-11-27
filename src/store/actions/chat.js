import store from '../'
import firebase from 'firebase';
import {NavigationActions} from 'react-navigation'

export class Chat {
    static findAll = () => {
        store.dispatch(Chat.find()),
            firebase.database().ref("user").on("value", (snap) => {
                var data = snap.val();
                var values=Object.values(data)
                console.log("users", values);
                store.dispatch(Chat.findSuccess(values))
            })
    }
    static find = () => ({
        type: "Find"
    })
    static findSuccess = (payload) => ({
        type: "FindSUCCESS",
        payload: payload
    })
    static findFail = (payload) => ({
        type: "FindFAILED",
        payload: payload
    })
    //----------------------------------------------------------------
    static AddReq = (uid) => {
        store.dispatch(Chat.Add())
        var currentUser=firebase.auth().currentUser.uid
        firebase.database().ref("user").child(uid).child("MyChats").child(currentUser).push({[firebase.auth().currentUser.displayName]:"Hi I've added you"}).then
            (() => {
                firebase.database().ref("user").child(currentUser).child("MyChats").child(uid).push({[firebase.auth().currentUser.displayName]:"Hi I've added you"}).then
                (()=>store.dispatch(Chat.AddSuccess()))
            }
            , (err) => { store.dispatch(Chat.AddFail(err)) }
            )
    }
    static Add = () => ({
        type: "Add"
    })
    static AddSuccess = (payload) => ({
        type: "AddSUCCESS",
        payload: payload
    })
    static AddFail = (payload) => ({
        type: "AddFAILED",
        payload: payload
    })
    //------------------------------------------------------------------
    static MyChatReq=()=>{
        store.dispatch(Chat.MyChats())
        firebase.database().ref("user").child(firebase.auth().currentUser.uid).child("MyChats").on("value",(snap)=>{
            var data=snap.val();
            var values
            values=Object.keys(data);
            console.log(values)
            var chatPerson=[];
            values.map((data)=>{firebase.database().ref("user").child(data).on("value",(snap)=>{var person=snap.val();chatPerson.push(person)})})
            console.log(values);
            console.log(chatPerson)            
            if (!chatPerson.length){
                store.dispatch(Chat.MyChatsFail("Empty"))
            }
            else{
                setTimeout(()=>{store.dispatch(Chat.MyChatsSuccess(chatPerson))},300);
            }
        })
    }
    static MyChats = () => ({
        type: "MyChats"
    })
    static MyChatsSuccess = (payload) => ({
        type: "MyChatsSUCCESS",
        payload: payload
    })
    static MyChatsFail = (payload) => ({
        type: "MyChatsFAILED",
        payload: payload
    })
}