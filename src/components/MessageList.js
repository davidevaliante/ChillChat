import React, {Component}from 'react';
import { connect } from 'react-redux';
import {Transition, List} from 'semantic-ui-react';
import {firebaseApp} from './../firebase/firebase.js';
import {Header, Container} from 'semantic-ui-react';
import style from './../styles/style.scss';
import moment from 'moment';



class MessageList extends Component {
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.messages.length !== this.props.messages.length
            && this.props.messages && this.props.messages.length>0){
            this.refs.lastchild.scrollIntoView(false);
        }
    }

    render() {
        return(
            <div>
                <div className='roundedBox' style={{marginBottom:'16px'}}>
                    <Header
                            as='h2'
                            style={{marginBottom:'4px', color: style.colorPrimary}}
                        >{this.props.activeChannel.data.channelName}</Header>
                    <Header
                        as='h5'                                             style={{marginTop:'4px'}}>{this.props.activeChannel.data.channelSubName}
                    </Header>
                </div>

                {(this.props.messages && this.props.messages.length>0) &&
                    <div
                        className='roundedBox'
                        style={{marginBottom:'16px', padding:'16px'}}>
                        <Transition.Group
                            className='scrollableList'
                            as={List}
                            duration={80}
                            divided
                            size='huge'
                            verticalAlign='middle'>
                            {console.log(this.props.messages)}
                            {this.props.messages &&
                                this.props.messages.map( (message, index) => {
                                    if(message.sender === this.props.userId){
                                        return (
                                            <List.Item
                                                key={index} >
                                                <List.Content
                                                    style={{color:style.colorPrimary, fontSize:'1.5rem'}}
                                                    header={message.userName} />
                                                <Container
                                                    className='wordwrap'>
                                                    <List.Content
                                                        style={{fontSize:'1rem'}}
                                                        content={message.content} />
                                                </Container>
                                                <List.Content
                                                    floated='right'
                                                    style={{fontSize:'0.7rem', marginTop:'0.5rem'}}
                                                    content={moment(message.time).format("dddd MMMM   hh:mm:ss")} />
                                            </List.Item>
                                        )
                                    }

                                    return(
                                        <List.Item key={index} style={{maxWidth:'150px'}}>
                                            <List.Content header={message.userName} />
                                            <List.Content content={message.content} />
                                        </List.Item>
                                    );
                                })
                            }
                        <div ref='lastchild' id='last_item'></div>
                        </Transition.Group>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        dispatch : state.dispatch,
        activeChannel : state.activeChannel,
        messages : state.activeChannel.messages,
        userId : state.user.userId,
        goToBottom : state.goToBottom
    }
);

export default connect(mapStateToProps)(MessageList);
