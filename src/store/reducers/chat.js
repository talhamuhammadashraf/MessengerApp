const InitialState = {
    isLoading:false,
    isError:{status:false,msg:null},
    members:null,
    myChats:null
}

export const Chat =(state=InitialState,action)=>{
    switch(action.type){
            // case Constants.HAS_SIGNED_IN:
            // const {email}=action;
            // return email

        case "Find":
        return{...state,isLoading:true,}
        case "FindSUCCESS":
        return {...state,isLoading:false,members:action.payload}
        case "FindFAILED":
        return {...state,isError:{status:true,msg:action.payload}}

        case "Add":
        return{...state,isLoading:true}
        case "AddSUCCESS":
        return {...state,isLoading:false,}
        case "AddFAILED":
        return {...state,isError:{status:true,msg:action.payload}}

        case "MyChats":
        return{...state,isLoading:true}
        case "MyChatsSUCCESS":
        return {...state,isLoading:false,myChats:action.payload}
        case "MyChatsFAILED":
        return {...state,isError:{status:true,msg:action.payload}}

        default: return state
    }

}