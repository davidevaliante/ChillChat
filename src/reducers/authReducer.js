const d = false;

const authStateReducer = (state = d, action) => {
  if(action.type ==='MAKE_USER_LOGGED_IN' || action.type ==='MAKE_USER_LOGGED_OUT'){
    console.log(`Dispatching new AuthState -> isLoggedIn = ${action.isLoggedIn}`)
    return action.isLoggedIn;
  }else{
    return state;
  }
};

export default authStateReducer;
