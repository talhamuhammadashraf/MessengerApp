import {Constants} from '../'
const InitialState = {
    isLoading:false,
    isError:{status:false,msg:null},
    isLoggedIn:false,
    user:{},
    isRegistered:false
}

export const Auth =(state=InitialState,action)=>{
    switch(action.type){
            // case Constants.HAS_SIGNED_IN:
            // const {email}=action;
            // return email

        case "SIGN_UP":
        return{...state,isLoading:true,}
        case "SIGN_UP_SUCCESS":
        return {...state,isLoading:false,isLoggedIn:true,isRegistered:true,user:action.payload}
        case "SIGN_UP_FAILED":
        return {...state,isError:{status:true,msg:action.payload}}

        case "SIGN_IN":
        return{...state,isLoading:true,isLoading:true}
        case "SIGN_IN_SUCCESS":
        return{...state,isLoading:false,isRegistered:true,isLoggedIn:true,user:action.payload}
        case "SIGN_IN_FAILED":
        return{...state,isLoading:false,isLoggedIn:false,isError:{state:true,msg:action.payload}}

        case "LOG_OUT":
        return{...state,user:action.payload}
        case "LOG_OUT_SUCCESS":
        return{...state,user:action.payload}
        case "LOG_OUT_FAILED":
        return{...state,user:action.payload,isError:payload}

        default: return state
    }

}