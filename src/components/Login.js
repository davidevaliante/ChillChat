import React from 'react';
import EmailAndPasswordForm from './EmailAndPasswordForm';
import { Container } from 'semantic-ui-react';

const Login = (props) => (
  <Container fluid>
      <div style={{height:'100%', marginTop:'8%'}}>
          <EmailAndPasswordForm
              whenDoneGoTo='/userpage'
              minimumNameLength={3}
              minimumPassLength={8}/>
        </div>
  </Container>
);

export default Login;
