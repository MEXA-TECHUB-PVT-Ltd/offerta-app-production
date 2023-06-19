import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers';
import loginuserReducer from './LoginUserReducer';
import otheruserReducer from './OtherUserReducer';
import locationReducer from './Location/reducers';

const rootReducer = combineReducers({ userReducer,loginuserReducer,otheruserReducer,locationReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));