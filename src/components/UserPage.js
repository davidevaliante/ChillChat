import React, { Component } from 'react';
import { connect } from 'react-redux';
import Channels from '../components/Channels';
import ChatBody from './ChatBody.js';
import YouTubePlayer from './YouTubePlayer';
import {channelNode, getChannels, firebaseApp, messageNode } from './../firebase/firebase.js';
import {addNewChannel, resetChannelList} from './../actions/channelsReducerActions.js';
import { Dimmer, Loader, Segment, Grid, Container, Embed } from 'semantic-ui-react';
import { updateUserId, updateUserName } from './../actions/userIdActions.js';
import {logIn} from './../actions/authReducerActions.js';
import {switchChannel, updateMessageList, setActiveChannelName, setPresence} from './../actions/activeChannelActions.js';
const logo = require('../img/door.svg');


class UserPage extends Component {

    state = {
        channelListIsLoading : true,
    }


    componentDidMount(){

        // id dell'utente
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.dispatch(updateUserId(user.uid));
                this.props.dispatch(logIn())
                firebaseApp.database().ref(`Users/${user.uid}`).once('value', (snapshot) => {
                    const {name} = snapshot.val()
                    this.props.dispatch(updateUserName(name))
                    this.props.dispatch(setPresence(user.uid, name))
                });
            } else {
              // No user is signed in.
            }
        });

        // canali disponibili
        channelNode.on('value', (snapshot) => {
            this.setState(
                {...this.state,
                channelListIsLoading : false}
            )
            if(snapshot.val() !== undefined && snapshot.val() !== null){
                this.props.dispatch(resetChannelList());

                // per ogni canale
                for (const key of Object.keys(snapshot.val())) {
                    const {channelName, channelSubName, creator, folks} = snapshot.val()[key]
                    this.props.dispatch(
                        addNewChannel(key, channelName, channelSubName, creator, folks)
                    )
                    // console.log(key, snapshot.val()[key]);
                }
                this.setState(
                    {
                    ...this.state,
                    activeChannel:this.props.channels[0].key,
                    }
                )
                const firstChannel = this.props.channels[0]
                this.props.dispatch(switchChannel(firstChannel,this.props.userId))
            }
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot){

        // solo se il channel è cambiato
        if(prevProps.activeChannel.data.key !== this.props.activeChannel.data.key){
            console.log(this.props.activeChannel);

            // dopo aver switchato canale prende i messaggi relativi
            const channelId = this.props.activeChannel.data.key;
            firebaseApp.database().ref(`Messages/${channelId}`)
            .on('value', (snapshot) => {
                if(snapshot.val() !== undefined && snapshot.val() !== null){
                    let newList = [];
                    for (const key of Object.keys(snapshot.val())) {
                        newList.push(snapshot.val()[key])
                    }
                    this.props.dispatch(updateMessageList(newList));
                }else{
                    this.props.dispatch(updateMessageList([]))
                }
            })
        }
    }

    componentWillUnmount(){
        channelNode.off();
        this.state.channels.forEach( (channel) => {
            firebaseApp.database().ref(`Messages/${channel.key}`).off()
        })
    }

    render(){
        const {channelListIsLoading} = this.state
        return(
            <Container fluid style={{padding:'16px',height:'100%'}}>
            <Grid style={{height:'100%'}}>
                <Dimmer active={channelListIsLoading}>
                    <Loader />
                </Dimmer>

                <Grid.Row
                    divided
                    style={{height:'80%'}}
                    columns={2}>

                    <Grid.Column width={3}>
                        <div>
                            {!channelListIsLoading && <Channels />}
                        </div>
                    </Grid.Column>

                    <Grid.Column stretched width={9}>
                            <ChatBody />
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <YouTubePlayer />

                    </Grid.Column>

                </Grid.Row>

            </Grid>
        </Container>
        );
    }
}

const mapStateToProps = (state) => (
  {
    userId : state.userId,
    channels : state.channels,
    activeChannel : state.activeChannel,
    dispatch : state.dispatch
  }
)

export default connect(mapStateToProps)(UserPage);
