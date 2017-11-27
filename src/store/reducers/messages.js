const InitialState = {
 MessageArray:null,
 isError:{
     status:false,
     msg:null
 }
}

export const Message =(state=InitialState,action)=>{
    switch(action.type){

        case "FetchMSG":
        return{...state,isLoading:true,}
        case "FetchMSG_SUCCESS":
        return {...state,isLoading:false,MessageArray:action.payload}
        case "FetchMSG_FAILED":
        return {...state,isError:{status:true,msg:action.payload}}

        default: return state
    }

}