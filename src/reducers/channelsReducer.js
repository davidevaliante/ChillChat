const deafaultState = []

const channelStateReducer = (state = deafaultState, action) => {
  switch(action.type){
    case 'ADD_NEW_CHANNEL':
      return [
        ...state,
        action.newChannel
    ]

    case 'RESET_CHANNEL_LIST':
        return deafaultState;

    default:
      return state;
  }
}

export default channelStateReducer;
