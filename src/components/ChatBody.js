import React from 'react';
import { connect } from 'react-redux';
import MessageForm from './MessageForm.js';
import MessageList from './MessageList';
import Presence from './Presence';
import {Grid} from 'semantic-ui-react';

const ChatBody = (props) => {
    return(
        <div>
            <MessageList />

            <MessageForm style={{marginTop:'100px'}} />
        </div>
    );
}

const mapStateToProps = (state) => (
    {
        dispatch:state.dispatch,
        activeChannel: state.activeChannel
    }
);

export default connect(mapStateToProps)(ChatBody);
