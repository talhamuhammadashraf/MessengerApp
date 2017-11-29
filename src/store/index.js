import React from 'react';
import {createStore , applyMiddleware} from 'redux';
import navReducer from './reducers/navReducer';
import {NavigationActions} from 'react-navigation'
import {Auth} from './reducers/auth';
import {Message} from './reducers/messages';
import {Chat} from './reducers/chat';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {combineReducers} from 'redux';

export class Constants {
    
        static HAS_SIGNED_IN = 'HAS_SIGNED_IN';
    
        static SIGN_UP = 'SIGN_UP';
        static SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
        static SIGN_UP_FAILED = 'SIGN_UP_FAILED';
    
        static SIGN_IN = 'SIGN_IN';
        static SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
        static SIGN_IN_FAILED = 'SIGN_IN_FAILED'
    
        static LOG_OUT = 'LOG_OUT';
        static LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
        static LOG_OUT_FAILED = 'LOG_OUT_FAILED';
        
    }

const rootReducer = combineReducers({
    navReducer,Auth,Chat,Message
});

const middleware = applyMiddleware(thunk,logger);

let store = createStore(
    rootReducer,
    middleware
);
// store.subscribe(()=>console.log(store.getState()))
export default store;