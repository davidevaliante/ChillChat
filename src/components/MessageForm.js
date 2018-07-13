import React from 'react';
import {connect} from 'react-redux';
import { TextArea, Grid, Form, Button, Input } from 'semantic-ui-react';
import Channels from './Channels';
import { submitNewMessage } from './../firebase/firebase.js';

const MessageForm = (props) => {

    const sendMessage = (event) => {
        const message = document.getElementById('messageField').value;

        if(message.length>0){
            console.log('submitting ->'+ message);
            submitNewMessage({
                sender :  props.userId,
                content : message,
                time : Date.now(),
                userName : props.userName
            }, props.activeChannel.data.key)
            document.getElementById('messageField').value = '';
        }
    }

    return (
        <div>
            <Grid style={{marginLeft:'2px'}}>
                <Grid.Row width={16}>
                    <Form
                        onSubmit={() => sendMessage()}
                        action={this.sendMessage}
                        style={{width:'100%'}}>
                        <Input
                               id='messageField'
                               fluid
                               action={{ color: 'teal', labelPosition: 'right', icon: 'angle right', content: 'Send' }}
                               //actionPosition='left'
                               placeholder='Add new message'/>
                      </Form>
                </Grid.Row>
            </Grid>
        </div>
    );
}

const mapStateToProps = (state) => ({
    dispatch : state.dispatch,
    activeChannel : state.activeChannel,
    userId : state.user.userId,
    userName : state.user.userName
});

export default connect(mapStateToProps)(MessageForm);
