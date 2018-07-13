const addChannelModalStateReducerDefault = false

const addChannelModalStateReducer = (state=addChannelModalStateReducerDefault, action) => {
  switch(action.type){
    case 'SHOW_ADD_CHANNEL_MODAL':
      return true;
    case 'HIDE_ADD_CHANNEL_MODAL':
      return false;
    default:
      return state;
  }
}

export default addChannelModalStateReducer;
