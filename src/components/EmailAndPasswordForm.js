import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { registerWithEmail, writeNewUserInDatabase, loginWithEmail } from '../firebase/firebase';
import { connect } from 'react-redux';
import {logIn, logOut} from '../actions/authReducerActions';
import { Icon, Input, Button, Segment, Message, Menu, Form } from 'semantic-ui-react';
import * as EmailValidator from 'email-validator';
import {firebaseApp} from '../firebase/firebase';

const marginTop = {
  marginTop: '1rem'
}

class EmailAndPasswordForm extends Component{

  state = {
    errorPasswordHidden : true,
    errorNameHidden : true,
    errorMailHidden : true,
    passwordOk:false,
    nameOk:false,
    emailOk:false,
    redirectToHomePage : false,
    loginFlow:true
  }

  componentDidMount(){
    firebaseApp.auth().onAuthStateChanged((user) => {
      if(user){
         console.log('auth state changed in loggedin');
         this.setState({...this.state, redirectToHomePage:true});
         this.props.dispatch(logIn());
      }else{
         console.log('auth state changed in logged out');
         this.props.dispatch(logOut());
      }
    });

  }

  // da ottimizzare, onChange in questo modo cambia lo state troppo spesso con conseguente
  // chiamata di render()
  passwordHandler = (event) => {
      const {minimumPassLength} = this.props;
      console.log(minimumPassLength);
      const currentInput = event.target.value.trim();
      if(currentInput.length >=1 && currentInput.length<minimumPassLength){
        this.setState({
          ...this.state,
          errorPasswordHidden:false,
          passwordOk:false
        })
      }else{
        this.setState({errorPasswordHidden:true})
        if(currentInput.length>=minimumPassLength){
          this.setState({
            ...this.state,
            errorPasswordHidden:true,
            passwordOk:true
          })
        }
      }
  }

  nameHandler = (event) => {
    const currentInput = event.target.value.trim();
    const {minimumNameLength}=this.props;
    if(currentInput.length >= 1 && currentInput.length<minimumNameLength){
      this.setState({
        ...this.state,
        errorNameHidden:false,
        nameOk:false
      });
    }else{
      this.setState({
        ...this.state,
        errorNameHidden:true,
        nameOk:true
      });
    }
  }

  mailHandler = (event) => {
    const usermail = event.target.value.trim();
    if(EmailValidator.validate(usermail)){
      this.setState({
        ...this.state,
        emailOk:true,
        errorMailHidden:true
      });
    }else{
      this.setState({
        ...this.state,
        emailOk:false,
        errorMailHidden:false
      });
    }
  }

  manageNewUserFromPromise = (promise) => {
    writeNewUserInDatabase({
      values:promise.user,
      onSuccess: this.signUpComplete,
      name : document.getElementById('nameField').value.trim(),
    })
  }

  signUpComplete = () =>{
    console.log('New user written in the database');
    this.setState({
      ...this.state,
      redirectToHomePage:true
    })
  }

  requestSignUp = () => registerWithEmail({
    onSuccess : this.manageNewUserFromPromise,
    onFail : this.explainIssue,
    values : {
      userMail : document.getElementById('emailField').value.trim(),
      userPassword : document.getElementById('passwordField').value.trim()
    }
  });

  requestLogin = () => {
    loginWithEmail({
      userMail : document.getElementById('emailField').value.trim(),
      userPassword : document.getElementById('passwordField').value.trim(),
      onFail : this.explainIssue,
    })
  }

  authModeSwitch = () =>{
      const switched = !this.state.loginFlow;
      this.setState({
        ...this.state,
        loginFlow : switched
      })
  }

  explainIssue = (errorMessage) => {
    console.log(errorMessage);
  }

  render(){
    // console.log(this.state);

    const {redirectToHomePage, nameOk, emailOk, passwordOk, loginFlow} = this.state;
    const {minimumPassLength, minimumNameLength, whenDoneGoTo} = this.props;
    const {isLoggedIn} = this.props
    const canLogin = emailOk && passwordOk;
    // console.log(!canLogin ? 'Cannot log in' : 'Can login');

    if(redirectToHomePage){
      return <Redirect to={whenDoneGoTo} />;
    }

    return (
        <div className='emailAndPasswordForm'>

                  <div>
                    <Menu attached='top' tabular>
                      <Menu.Item
                                 active={loginFlow}
                                 onClick={this.authModeSwitch}>
                            <h4 style={loginFlow ? {color:'black'} : {color:'white'}}>
                              Log In
                            </h4>
                      </Menu.Item>
                      <Menu.Item
                        active={!loginFlow}
                        onClick={this.authModeSwitch}
                      >
                        <h4 style={!loginFlow ? {color:'black'} : {color:'white'}}>
                          Register
                        </h4>
                      </Menu.Item>
                    </Menu>
                    <Segment attached='bottom'>
                    { !loginFlow && (
                        <div>
                          <Input
                                id='nameField'
                                fluid
                                autoFocus={true}
                                iconPosition='left'
                                placeholder='Name'
                                onChange={this.nameHandler}
                                size='large'>
                            <Icon name='user' />
                            <input />
                          </Input>
                        </div>
                      )
                    }
                      <Message
                              hidden={this.state.errorNameHidden}
                              negative>
                          <p>Name must be at least {minimumNameLength} characters long</p>
                      </Message>


                      <div>
                        <Input
                              id='emailField'
                              fluid
                              iconPosition='left'
                              placeholder='Email'
                              onChange={this.mailHandler}
                              style={marginTop}
                              size='large'>
                          <Icon name='at' />
                          <input />
                        </Input>
                      </div>
                      <Message
                              hidden={this.state.errorMailHidden}
                              negative>
                          <p>Insert a valid email</p>
                      </Message>


                      <div>
                        <Input
                              id='passwordField'
                              type='password'
                              fluid
                              iconPosition='left'
                              placeholder='Password'
                              onChange={this.passwordHandler}
                              size='large'
                              style={marginTop}>
                          <Icon name='lock' />
                          <input />
                        </Input>
                      </div>
                      <Message
                              hidden={this.state.errorPasswordHidden}
                              negative>
                          <p>Password must be at least {minimumPassLength} characters long</p>
                      </Message>


                      <Button
                              onClick={loginFlow ? this.requestLogin : this.requestSignUp}
                              fluid
                              style={marginTop}
                              animated
                              color={canLogin? 'green' : 'blue'}
                              size='large'>
                        <Button.Content visible>{loginFlow ? 'Sign In' : 'Sign Up'}</Button.Content>
                        <Button.Content hidden>
                          <Icon name='right arrow' />
                        </Button.Content>
                      </Button>
                    </Segment>
                  </div>

          </div>
    );
  };
};

const mapStateToProps = (state) => (
  {
    isLoggedIn : state.isLoggedIn,
    dispatch : state.dispatch
  }
);

export default connect(mapStateToProps)(EmailAndPasswordForm);
