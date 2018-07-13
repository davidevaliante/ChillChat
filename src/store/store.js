import {createStore, combineReducers} from 'redux';
import authStateReducer from './../reducers/authReducer.js';
import channelStateReducer from './../reducers/channelsReducer'
import addChannelModalStateReducer from './../reducers/addChannelReducer.js';
import activeChanneleReducer from './../reducers/activeChannelReducer.js';
import userIdReducer from './../reducers/userIdReducer.js';
import goToBottom from './../reducers/GoToBottomReducer';

const reducers = combineReducers(
  {
    'isLoggedIn' :         authStateReducer,
    'channels':            channelStateReducer,
    'addChannelModalOpen': addChannelModalStateReducer,
    'activeChannel'      : activeChanneleReducer,
    'user'             : userIdReducer,
    'goToBottom'        : goToBottom
  }
);

const store = () => {
    const store = createStore(
        reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}

export default store;
