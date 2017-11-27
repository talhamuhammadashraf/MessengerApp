import store,{Constants} from '../'
import firebase from 'firebase';
import {NavigationActions} from 'react-navigation'
export class Authentication{
    static registerUser=(user)=>{
        store.dispatch(Authentication.sign_up());
        console.log(user,"in action")
        firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
        .then(
            (res)=>{
                firebase.auth().currentUser.updateProfile({
                    displayName: user.name,
                })
                let uid=firebase.auth().currentUser.uid
                firebase.database().ref("user").child(firebase.auth().currentUser.uid).set(
                    user
                )
                firebase.database().ref("user").child(uid).child("UID").set(uid)                
                store.dispatch(Authentication.sign_up_success(user));
                store.dispatch(NavigationActions.navigate({ routeName: 'Home' }))
            // this.props.navigation.navigate("signup");
            console.log("registered")
            }
        )
        .catch((err)=>{console.log(err);
        store.dispatch(Authentication.sign_up_failed(err))
        })
    }
    static loginUser=(user)=>{
        console.log("in action",user)
        store.dispatch(Authentication.sign_in(user));
        firebase.auth().signInWithEmailAndPassword(user.email,user.password)
        .then(
            (res)=>{

                let uid=firebase.auth().currentUser.uid
                firebase.database().ref("user").child(uid).child("UID").set(uid)                
                store.dispatch(Authentication.sign_in_success(user));
                console.log("login success");
                store.dispatch(NavigationActions.navigate({ routeName: 'Home' }))                
            // this.props.navigation.navigate("signup");            
                console.log(store.getState())
        }
        )
        .catch((err)=>{console.log(err);
        store.dispatch(Authentication.sign_in_failed(err))
        })
    }
    static logout=(user)=>{

        store.dispatch(Authentication.log_out());
        firebase.auth().signOut().then(
            ()=>{store.dispatch(Authentication.log_out_success(user))
                store.dispatch(NavigationActions.navigate({ routeName: 'login' }))
            }
        ).catch(
            (err)=>{store.dispatch(Authentication.log_out_failed(err))}
        )
    }
    static sign_up=(user)=>({
        type:Constants.SIGN_UP,
        
    })
    static sign_up_success=(payload)=>({
        type:Constants.SIGN_UP_SUCCESS,
        payload:payload
    })
    static sign_up_failed=(payload)=>({
        type:Constants.SIGN_UP_FAILED,
        payload:payload
    })
    


    static sign_in=(user)=>({
        type:Constants.SIGN_IN,
        
    })
    static sign_in_success=(payload)=>({
        type:Constants.SIGN_IN_SUCCESS,
        payload:payload
    })
    static sign_in_failed=(payload)=>({
        type:Constants.SIGN_IN_FAILED,
        payload:payload
    })


    static log_out=()=>({
        type:Constants.LOG_OUT
    })
    static log_out_success=()=>({
        type:Constants.LOG_OUT_SUCCESS
    })
    static log_out_failed=(payload)=>({
        type:Constants.LOG_OUT_FAILED,
        payload:payload
    })
}
