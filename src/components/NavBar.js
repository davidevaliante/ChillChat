import React,{Component} from 'react';
import {logOutFromFirebase} from '../firebase/firebase';
import {logOut} from '../actions/authReducerActions';
import {connect} from 'react-redux';
import {Menu} from 'semantic-ui-react';
import { Redirect } from 'react-router';
import style from './../styles/base/_base.scss';

const requestLogOut = (dispatch) => {
  logOutFromFirebase();
  dispatch(logOut());
}


const handleItemClick = (props) => {

}


class NavBar extends Component {
  state = {
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem, backToHomePage} = this.state

    return (
    <div>
        <Menu inverted style={{margin:'0', borderRadius:'0'}}>
          <Menu.Item
            name='home'
            onClick={this.backToHomePage}
          >
            <p style={{fontSize:'1.3rem', color:style.colorPrimary}}><strong>Chill-Chat</strong></p>
          </Menu.Item>

          <Menu.Item name='first' active={activeItem === 'first'} onClick={this.handleItemClick}>
            Qualche pulsante
          </Menu.Item>
          <Menu.Item name='second' active={activeItem === 'second'} onClick={this.handleItemClick}>
            Qualche altro pulsante
          </Menu.Item>
          <Menu.Item name='third' active={activeItem === 'third'} onClick={this.handleItemClick}>
            Qualche altro altro pulsante
          </Menu.Item>
          {
            this.props.isLoggedIn && (
              <Menu.Item
                position='right'
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.handleItemClick}
              >
              Log Out
              </Menu.Item>
            )
          }
        </Menu>
    </div>

    )
  }
}



const mapStateToProps = (state) => (
  {
    isLoggedIn : state.isLoggedIn,
    dispatch : state.dispatch
  }
);

export default connect(mapStateToProps)(NavBar);
