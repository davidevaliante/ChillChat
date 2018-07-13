const defaultState = {'data':'nochannel',
                      'messages':[],
                      'folks':[],
                      'playlist':{
                          playlistId:'RMDItOwN_SU'
                      }
                    };

const activeChanneleReducer = (state = defaultState, action) => {
  switch(action.type){
    case 'SWITCH_CHANNEL':
      return {
          ...state,
          data:action.activeChannel,
      }
    case 'UPDATE_MESSAGE_LIST':
        return{
            ...state,
            messages:action.messages
        }

    case 'SET_PRESENCE_IN_CHANNEL':
        return{
            ...state,
            folks : [...state.folks, {userId:action.userId,userName:action.userName}]
        }

    case 'CHANGE_PLAYLIST':
        return{
            ...state,
            playlist:{
                ...state.playlist,
                playlistId : action.playlistId
            }
        }

    default:
      return state;
  }
}

export default activeChanneleReducer;
