export const switchChannel = (activeChannel, userId) => {

    return {
        type:'SWITCH_CHANNEL',
        activeChannel:activeChannel,
        userId:userId
    }
}

export const setPresence = (userId,userName) => {
    return{
        type:'SET_PRESENCE_IN_CHANNEL',
        userId:userId,
        userName:userName
    }
}

export const updateMessageList = (newList) => {
    return{
        type:'UPDATE_MESSAGE_LIST',
        messages:newList
    }
}

export const changePlayList = (playlistId) => {
    return{
        type:'CHANGE_PLAYLIST',
        playlistId:playlistId
    }
}
