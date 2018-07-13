import React from 'react';
import {NavLink} from 'react-router-dom';
import {firebaseApp} from '../firebase/firebase';
import {isLoggedIn} from '../firebase/firebase';
import { Redirect } from 'react-router';


const LandingPage = (props) => {

  
  return(
    <div>
      I'm landing page
      <NavLink to='/login'>Login</NavLink>
    </div>
  );
}

export default LandingPage;
