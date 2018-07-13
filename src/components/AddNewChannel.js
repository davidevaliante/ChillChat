import React from 'react';
import { connect } from 'react-redux'
import {Button, Modal, Header, Icon, Input} from 'semantic-ui-react';
import { addnewChannel, firebaseApp } from './../firebase/firebase.js';
import { openAddChannelModal, closeAddChannelModal} from './../actions/addChannelModalActions';


const AddNewChannel = (props) => {

  const closeModal = () => props.dispatch(closeAddChannelModal());

  const handleNewChannel = () => {
    const name = document.getElementById('newTitleField').value.trim();
    const subName = document.getElementById('newSubTitleField').value.trim();

        firebaseApp.auth().onAuthStateChanged(function(user) {
            if (user) {
                const values = {
                    channelName : name,
                    channelSubName : subName,
                    creator:user.uid,
                    folks: []
                }
            closeModal();
            addnewChannel(values);
            } else {
              // No user is signed in.
            }
        });

  }



  return (
    <div
        className='horizontal_layout_center'
        style={{paddingBottom:'11px'}}>
      <Modal
            style={{width:'30%'}}
            onClose={() => props.dispatch(closeAddChannelModal())}
            closeOnEscape={props.isModalOpen}
            closeOnDimmerClick={props.isModalOpen}
            open={props.isModalOpen}
            trigger={
                <Button
                    onClick={() => props.dispatch(openAddChannelModal())}
                    color='teal'>Add Channel
                </Button>
            }
            basic>

        <Header icon='plus' content='Add new Channel' />
        <Modal.Content>
          <div>
            <Input
                  id='newTitleField'
                  fluid
                  style={{padding:'1rem',fontSize:'1.5rem'}}
                  inverted
                  transparent
                  placeholder='Title' />
          </div>
          <div>
            <Input
                  id='newSubTitleField'
                  fluid
                  style={{padding:'1rem'}}
                  inverted transparent placeholder='SubTitle (optional)' />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={()=>handleNewChannel()}>
            <Icon name='checkmark' /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}


const mapStateToProps = (state) => (
  {
    channels: state.channels,
    isModalOpen : state.addChannelModalOpen,
    dispatch: state.dispatch
  }
)

export default connect(mapStateToProps)(AddNewChannel)
