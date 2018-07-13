export const addNewChannel = (key,name, subName, creatorId, folks) => ({
  type : 'ADD_NEW_CHANNEL',
  newChannel : {
    channelName : name,
    channelSubName : subName,
    creator : creatorId,
    folks : folks,
    key : key
  }
});

export const resetChannelList = (name, subName, creatorId, folks) => ({
  type : 'RESET_CHANNEL_LIST'
});
