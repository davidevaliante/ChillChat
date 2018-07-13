import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Image} from 'semantic-ui-react';
import AddNewChannel from '../components/AddNewChannel';
import {switchChannel, setPresence} from './../actions/activeChannelActions.js';

const logo = require('../img/door.svg');





const Channels = (props) => {

  const channelSwitch  = (channel) => {
      console.log(channel);
      props.dispatch(switchChannel(channel))
      props.dispatch(setPresence(props.userId, props.userName));
  }

  const { channels } = props;

  return (
    <div
        style={{//width:'15%',
        backgroundColor:'white',
        borderTopLeftRadius:'6px',
        borderTopRightRadius:'6px',
        borderBottomLeftRadius:'6px',
        borderBottomRightRadius:'6px'}}>
        <List
            celled={true}>
            {channels.map((element, index) => (
            <List.Item
                      className='noselection asButton'
                      style={{padding:'0.8rem'}}
                      key={index}
                      onDoubleClick={() => channelSwitch(element)}
            >
                <Image avatar={true} src={logo}/>
                    <List.Content>
                    <List.Header>{element.channelName}</List.Header>
                    {element.channelSubName}
                    </List.Content>
                </List.Item>
            ))}
        </List>
        <AddNewChannel />
      </div>
    )
}

const mapStateToProps = (state) => ({
    userId:state.user.userId,
    channels : state.channels,
    activeChannel : state.activeChannel,
    dispatch : state.dispatch
});


export default connect(mapStateToProps) (Channels);
