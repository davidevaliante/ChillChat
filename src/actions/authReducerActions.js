export const logIn = () => ({
  type : 'MAKE_USER_LOGGED_IN',
  isLoggedIn : true
});

export const logOut = () => ({
  type : 'MAKE_USER_LOGGED_OUT',
  isLoggedIn : false 
});
