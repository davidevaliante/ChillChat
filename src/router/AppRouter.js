import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../components/Login';
import LandingPage from '../components/LandingPage';
import UserPage from '../components/UserPage';
import NavBar from '../components/NavBar';


const AppRouter = () => {


 return(
   <div className='matchParentHeight'>
     <BrowserRouter>
      <div className='matchParentHeight'>
        <NavBar />
        <Switch>
            <Route path='/' component={Login} exact={true} />
            <Route path='/login' component={Login} />
            <Route path='/userpage' component={UserPage} />
        </Switch>
      </div>
     </BrowserRouter>
   </div>
 );};

export default AppRouter;
